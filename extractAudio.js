import axios from "axios";
import * as cheerio from "cheerio";
import fs from 'fs';

const instance = axios.create({
  timeout: 60000
});

const mainPages = [
  { url: "https://elllo.org/english/Mixer001/", selector: ".titlebox a" },
  { url: "https://elllo.org/english/Mixer026/", selector: ".floatleft + a" },
  { url: "https://elllo.org/english/Mixer051/", selector: ".titlebox a" },
  { url: "https://elllo.org/english/Mixer076/", selector: ".titlebox a" },
  { url: "https://elllo.org/english/Mixer101/", selector: ".titlebox a" },
  { url: "https://elllo.org/english/Mixer126/", selector: ".titlebox a" },
];

const extractPages = async (page) => {
  try {
    const response = await instance.get(page.url);
    const html = response.data;
    const $ = cheerio.load(html);

    const links = $(page.selector)
      .map((_, element) => $(element).attr("href"))
      .get()
      .filter(Boolean);

    return links.map((link) => `${page.url}${link}`).reverse();
  } catch (error) {
    console.error("提取音频链接时出错:", error);
  }
};

const extractAudioLink = async (pageUrl) => {
  // 使用新的instance替代axios
  const response = await instance.get(pageUrl);
  const html = response.data;
  const $ = cheerio.load(html);

  return $(".topset > .audio source").attr("src");
}

const main = async () => {
  const allPages = [];
  for (const page of mainPages) {
    const extractedPages = await extractPages(page);
    allPages.push(...extractedPages);
  }

  const prefix = "https://s3-us-west-1.amazonaws.com/elllo-audio/mixer-001-150/"
  const allAudioLinks = []
  for (const page of allPages) {
    const audioLink = await extractAudioLink(page);
    if (audioLink && audioLink.includes('../../Audio/AMXR/')) {
      allAudioLinks.push(audioLink.replace('../../Audio/AMXR/', prefix));
    } else {
      allAudioLinks.push(audioLink);
    }
  }

  fs.writeFileSync('audios.json', JSON.stringify(allAudioLinks, null, 2));
  console.log('音频链接已保存到 audios.json 文件中');
};

main();
