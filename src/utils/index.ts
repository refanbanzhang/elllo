import { HOST } from "@/constant"

export const getAverageColor = (imgEl: HTMLImageElement): Promise<string> => {
  return new Promise((resolve) => {
    // 设置跨域属性
    imgEl.crossOrigin = "anonymous"

    // 处理加载错误的情况
    imgEl.onerror = () => {
      resolve("rgb(49, 128, 153)") // 返回默认颜色
    }

    imgEl.onload = () => {

      const canvas = document.createElement("canvas")
      const context = canvas.getContext("2d")

      if (!context) {
        resolve("rgb(49, 128, 153)")
        return
      }

      const width = imgEl.width
      const height = imgEl.height

      canvas.width = width
      canvas.height = height

      try {
        context.drawImage(imgEl, 0, 0, width, height)
        const imageData = context.getImageData(0, 0, width, height).data
        let r = 0, g = 0, b = 0, count = 0

        for (let i = 0; i < imageData.length; i += 4) {
          r += imageData[i]
          g += imageData[i + 1]
          b += imageData[i + 2]
          count++
        }

        r = Math.round(r / count)
        g = Math.round(g / count)
        b = Math.round(b / count)

        resolve(`rgb(${r}, ${g}, ${b})`)
      } catch (error) {
        console.error("获取图片颜色失败:", error)
        resolve("rgb(49, 128, 153)")
      }
    }
  })
}

// 图片代理服务
export const getProxiedImageUrl = (url: string) =>
  `https://images.weserv.nl/?url=${encodeURIComponent(url)}`


export const updateHtmlImgUrl = (html: string) => {
  // 匹配../..，替换为HOST
  const newHtml = html.replaceAll('../..', HOST)
  // 匹配图片地址，代理图片地址
  return newHtml.replace(/<img([^>]+)src="([^"]+)"/g, (_: string, attrs: string, src: string) => {
    return `<img${attrs}src="${getProxiedImageUrl(src)}"`
  })
}