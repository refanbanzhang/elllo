<script setup lang="ts">
import { ref } from "vue"
import { ElMessage } from "element-plus"
import { DocumentCopy } from "@element-plus/icons-vue"

interface Emoji {
  id: string
  url: string
}

/**
 * 将图片 URL 转换为 Blob 对象
 * @param url 图片 URL
 * @param type 输出的图片类型，默认为 "image/png"
 * @returns Promise<Blob>
 */
const imageUrlToBlob = async (url: string, type = "image/png"): Promise<Blob> => {
  const img = new Image()
  img.crossOrigin = "anonymous"

  // 等待图片加载
  await new Promise((resolve, reject) => {
    img.onload = resolve
    img.onerror = reject
    img.src = url
  })

  // 创建 canvas 并绘制图片
  const canvas = document.createElement("canvas")
  canvas.width = img.width
  canvas.height = img.height
  const ctx = canvas.getContext("2d")
  ctx?.drawImage(img, 0, 0)

  // 转换为 blob
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob)
        } else {
          reject(new Error("Failed to convert image to blob"))
        }
      },
      type
    )
  })
}

const emojis = ref<Emoji[]>([
  { id: "1", url: "/uploadimg/image/20200218/20200218160848_67690.jpg" },
  { id: "2", url: "/uploadimg/image/20200218/20200218160848_67690.jpg" },
  { id: "3", url: "/uploadimg/image/20200218/20200218160848_67690.jpg" },
])

const onAddEmoji = () => {
  emojis.value = [
    ...emojis.value,
    {
      id: String(emojis.value.length + 1),
      url: "/uploadimg/image/20200218/20200218160848_67690.jpg"
    }
  ]
}

const onRemoveEmoji = (id: string) => {
  emojis.value = emojis.value.filter((emoji) => emoji.id !== id)
}

const onCopyEmoji = async (url: string) => {
  try {
    const blob = await imageUrlToBlob(url)

    // 复制到剪贴板
    await navigator.clipboard.write([
      new ClipboardItem({
        "image/png": blob
      })
    ])

    ElMessage.success("复制成功")
  } catch (error) {
    console.error("复制失败:", error)
    ElMessage.error("复制失败")
  }
}
</script>

<template>
  <div class="page">
    <div class="emojis">
      <div class="emoji" v-for="emoji in emojis" :key="emoji.id">
        <img class="emoji__img" :src="emoji.url" />
        <div class="emoji__actions">
          <div class="emoji__copy" @click="onCopyEmoji(emoji.url)">
            <DocumentCopy />
          </div>
          <div class="emoji__remove" @click="onRemoveEmoji(emoji.id)">×</div>
        </div>
      </div>
      <div class="emoji emoji--add" @click="onAddEmoji">
        <div class="emoji__btn">+</div>
      </div>
    </div>
  </div>
</template>

<style lang='less' scoped>
.emojis {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px;
}

.emoji {
  width: 100px;
  height: 100px;
  position: relative;

  &__img {
    width: 100%;
    height: 100%;
  }

  &__actions {
    position: absolute;
    top: -8px;
    right: -8px;
    display: flex;
    gap: 4px;
    opacity: 0;
    transition: opacity 0.3s;
  }

  &__copy,
  &__remove {
    width: 25px;
    height: 25px;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 16px;
  }

  &__copy {
    background-color: #409EFF;
    color: white;
  }

  &__remove {
    background-color: #f56c6c;
    color: white;
  }

  &:hover {
    .emoji__actions {
      opacity: 1;
    }
  }

  &--add {
    border: 2px dashed #ddd;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;

    &:hover {
      border-color: #409EFF;
      color: #409EFF;
    }
  }

  &__btn {
    font-size: 30px;
    font-weight: bold;
    color: #999;
  }
}
</style>
