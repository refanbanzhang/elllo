<script setup lang="ts">
import { onMounted } from "vue"
import { useRouter } from "vue-router"
import { getProxiedImageUrl } from "@/utils"
import useAudioPlayer from "@/composables/use-audio-player"
import Player from "@/components/player/index.vue"

const router = useRouter()
const { play, currentLessonNo, setCurrentLessonNo, audios } = useAudioPlayer()

const restoreScrollPosition = () => {
  const audioElement = document.getElementById(`audio-${currentLessonNo.value}`)
  const paddingTop = 15
  if (audioElement) {
    window.scrollTo({
      top: audioElement.offsetTop - paddingTop - window.innerHeight / 2,
      behavior: "instant"
    })
  }
}

const loadLastPlayedLessonNo = () => {
  const lastPlayedLessonNo = localStorage.getItem("lastPlayedLessonNo")
  if (lastPlayedLessonNo) {
    setCurrentLessonNo(lastPlayedLessonNo)
  }
}

onMounted(() => {
  loadLastPlayedLessonNo()
  restoreScrollPosition()
})

const onGoToLesson = (index: number) => {
  if ("startViewTransition" in document) {
    document.startViewTransition(() => {
      router.push(`/elllo/${audios.value[index].lessonNo}`)
    })
  } else {
    router.push(`/elllo/${audios.value[index].lessonNo}`)
  }
}
</script>

<template>
  <div class="page">
    <ul>
      <li
        :class="['audio', currentLessonNo === item.lessonNo ? 'audio--active' : '']"
        v-for="(item, index) in audios"
        :id="`audio-${item.lessonNo}`"
        :key="item.url"
        @click="play(item.lessonNo)"
      >
        <img
          v-if="item.img"
          class="audio__image"
          :src="getProxiedImageUrl(item.img)"
          alt=""
          @click.stop="onGoToLesson(index)"
        >
        <div
          class="audio__link"
          :href="item.url"
        >
          {{ item.title }}
          <br />
          {{ item.lessonNo }}
        </div>
      </li>
    </ul>
    <Player />
  </div>
</template>

<style lang='less' scoped>
.page {
  background: #000;
}

ul {
  padding: 15px;
  padding-bottom: 0;
}

.audio {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 15px;
  border-radius: 6px;

  &:last-child {
    margin-bottom: 0;
  }

  &__image {
    flex-shrink: 0;
    width: 60px;
    height: 60px;
    margin-right: 10px;
    border-radius: 3px;
    object-fit: cover;
  }

  &__link {
    flex: 1;
    margin-right: 10px;
    color: #fff;
  }

  &--active .audio__link {
    color: #1ed760;
  }
}

</style>
