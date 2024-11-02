import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs";

const HOST = "https://elllo.org";

export interface ListItem {
  title: string;
  url: string;
  img?: string;
  html?: string;
}

interface LinkItem {
  url: string;
  img: string;
  lessonNo: string;
}

interface Page {
  url: string;
  selector: string;
  imgSelector: string;
  lessonNoSelector: ($: cheerio.CheerioAPI) => string[];
}

const instance = axios.create({
  timeout: 60000,
});

const lessonNoSelector = ($: cheerio.CheerioAPI) => {
  const items = $(".mobilelist2 .floatleft + * a").map((_, element) => {
    const res = $(element).attr("href")?.split("-")[0];
    return res;
  }).get();
  return items;
};

const lessonNoSelector26 = ($: cheerio.CheerioAPI) => {
  const items = $(".mobilelist2 .floatleft + a").map((_, element) => {
    const res = $(element).attr("href")?.split("-")[0];
    return res;
  }).get();
  return items;
};

const lessonNoSelector51 = ($: cheerio.CheerioAPI) => {
  const items = $(".mobilelist .floatleft + * a").map((_, element) => {
    const res = $(element).attr("href")?.split("-")[0];
    return res;
  }).get();
  return items;
};

const mainPages = [
  {
    url: "https://elllo.org/english/Mixer001/",
    selector: ".floatleft + * a",
    imgSelector: ".floatleft img",
    lessonNoSelector,
  },
  {
    url: "https://elllo.org/english/Mixer026/",
    selector: ".floatleft + a",
    imgSelector: ".floatleft img",
    lessonNoSelector: lessonNoSelector26,
  },
  {
    url: "https://elllo.org/english/Mixer051/",
    selector: ".titlebox a",
    imgSelector: ".floatleft img",
    lessonNoSelector: lessonNoSelector51,
  },
  {
    url: "https://elllo.org/english/Mixer076/",
    selector: ".titlebox a",
    imgSelector: ".floatleft img",
    lessonNoSelector: lessonNoSelector51,
  },
  {
    url: "https://elllo.org/english/Mixer101/",
    selector: ".titlebox a",
    imgSelector: ".floatleft img",
    lessonNoSelector: lessonNoSelector51,
  },
  {
    url: "https://elllo.org/english/Mixer126/",
    selector: ".titlebox a",
    imgSelector: ".floatleft img",
    lessonNoSelector: lessonNoSelector51,
  },
];

const extractPages = async (listPage: Page): Promise<LinkItem[]> => {
  try {
    const response = await instance.get(listPage.url);
    const html = response.data;
    const $ = cheerio.load(html);

    const links: string[] = $(listPage.selector)
      .map((_, element) => $(element).attr("href"))
      .get()
      .filter(Boolean);

    const imgs: string[] = $(listPage.imgSelector)
      .map((_, element) => $(element).attr("src"))
      .get()
      .map((img) => {
        if (img.includes("../..")) {
          return img.replace("../..", HOST);
        }
        return `${HOST}${img}`;
      })
      .filter(Boolean);

    const lessonNos = listPage.lessonNoSelector($);

    return links
      .map((link, index) => ({
        url: `${listPage.url}${link}`,
        img: imgs[index],
        lessonNo: lessonNos[index],
      }))
      .reverse();
  } catch (error) {
    console.error("提取音频链接时出错:", error);
    return [];
  }
};

const extractAudioLink = async (pageUrl: string): Promise<ListItem> => {
  // 使用新的instance替代axios
  const response = await instance.get(pageUrl);
  const html = response.data;
  const $ = cheerio.load(html);

  return {
    url: $(".topset > .audio source").attr("src") || "",
    title:
      $(".topset .lesson1title h1 strong").text() ||
      $(".topset .lesson1title h2 strong").text() ||
      $(".topset .lesson1title h3 strong").text() ||
      "",
    html: $("#transcript").html() || $(".tabcontents .spacer").html() || "",
  };
};

const main = async () => {
  const allPages: LinkItem[] = [];
  for (const page of mainPages) {
    const extractedPages = await extractPages(page);
    allPages.push(...extractedPages);
  }

  const prefix =
    "https://s3-us-west-1.amazonaws.com/elllo-audio/mixer-001-150/";
  const audios: (ListItem & { lessonNo: string })[] = [];

  for (const page of allPages) {
    const audioLink = await extractAudioLink(page.url);

    if (audioLink && audioLink.url.includes("../../Audio/AMXR/")) {
      audios.push({
        ...audioLink,
        ...page,
        url: audioLink.url.replace("../../Audio/AMXR/", prefix),
      });
    } else if (audioLink.url) {
      audios.push({
        ...audioLink,
        ...page,
        url: audioLink.url,
      });
    }
  }
  fs.writeFileSync("audios.json", JSON.stringify(audios, null, 2));
  console.log("音频链接已保存到 audios.json 文件中");
};

main();
