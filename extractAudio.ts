import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs";
import type { AudioItem } from "./src/types";
import { HOST, AUDIO_PREFIX } from "./src/constant";

interface List {
  url: string;
  audioSelector: string;
  coverImgSelector: string;
  lessonNoSelector: ($: cheerio.CheerioAPI) => string[];
}

interface Page {
  url: string;
  img: string;
  lessonNo: string;
}

interface LinkItem {
  title: string;
  url: string;
  html: string;
}

const instance = axios.create({
  timeout: 60000,
});

const lessonNoSelector = ($: cheerio.CheerioAPI) =>
  $(".mobilelist2 .floatleft + * a")
    .map((_, element) => $(element).attr("href")?.split("-")[0])
    .get();

const lessonNoSelector26 = ($: cheerio.CheerioAPI) =>
  $(".mobilelist2 .floatleft + a")
    .map((_, element) => $(element).attr("href")?.split("-")[0])
    .get();

const lessonNoSelector51 = ($: cheerio.CheerioAPI) =>
  $(".mobilelist .floatleft + * a")
    .map((_, element) => $(element).attr("href")?.split("-")[0])
    .get();

const mainPages = [
  {
    url: "https://elllo.org/english/Mixer001/",
    audioSelector: ".floatleft + * a",
    coverImgSelector: ".floatleft img",
    lessonNoSelector,
  },
  {
    url: "https://elllo.org/english/Mixer026/",
    audioSelector: ".floatleft + a",
    coverImgSelector: ".floatleft img",
    lessonNoSelector: lessonNoSelector26,
  },
  {
    url: "https://elllo.org/english/Mixer051/",
    audioSelector: ".titlebox a",
    coverImgSelector: ".floatleft img",
    lessonNoSelector: lessonNoSelector51,
  },
  {
    url: "https://elllo.org/english/Mixer076/",
    audioSelector: ".titlebox a",
    coverImgSelector: ".floatleft img",
    lessonNoSelector: lessonNoSelector51,
  },
  {
    url: "https://elllo.org/english/Mixer101/",
    audioSelector: ".titlebox a",
    coverImgSelector: ".floatleft img",
    lessonNoSelector: lessonNoSelector51,
  },
  {
    url: "https://elllo.org/english/Mixer126/",
    audioSelector: ".titlebox a",
    coverImgSelector: ".floatleft img",
    lessonNoSelector: lessonNoSelector51,
  },
];

const extractPages = async (listPage: List): Promise<Page[]> => {
  try {
    const response = await instance.get(listPage.url);
    const html = response.data;
    const $ = cheerio.load(html);

    const links: string[] = $(listPage.audioSelector)
      .map((_, element) => $(element).attr("href"))
      .get()
      .filter(Boolean);

    const imgs: string[] = $(listPage.coverImgSelector)
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

const extractAudioLink = async (pageUrl: string): Promise<LinkItem> => {
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
  const pages: Page[] = [];
  for (const page of mainPages) {
    pages.push(...(await extractPages(page)));
  }

  const audios: AudioItem[] = [];

  for (const page of pages) {
    const audioLink = await extractAudioLink(page.url);

    if (audioLink && audioLink.url.includes("../../Audio/AMXR/")) {
      audios.push({
        ...audioLink,
        ...page,
        url: audioLink.url.replace("../../Audio/AMXR/", AUDIO_PREFIX),
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
