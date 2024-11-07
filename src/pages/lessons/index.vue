<script setup lang="ts">
import { onMounted } from "vue"
import { useRouter } from "vue-router"
import { getProxiedImageUrl } from "@/utils"
import useAudioPlayer from "@/composables/use-audio-player"
import PlayerBar from "@/components/player-bar/index.vue"

const router = useRouter()
const { play, currentIndex, audios, setCurrentIndex } = useAudioPlayer()

const restoreScrollPosition = () => {
  const audioElement = document.getElementById(`audio-${currentIndex.value}`)
  const paddingTop = 15
  if (audioElement) {
    window.scrollTo({
      top: audioElement.offsetTop - paddingTop - window.innerHeight / 2,
      behavior: "smooth"
    })
  }
}

const loadLastPlayedIndex = () => {
  const lastPlayedIndex = localStorage.getItem("lastPlayedIndex")
  if (lastPlayedIndex) {
    setCurrentIndex(parseInt(lastPlayedIndex))
  }
}

onMounted(() => {
  loadLastPlayedIndex()
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
  <div class="elllo">
    <main>
      <ul>
        <li :class="['audio', currentIndex === index ? 'audio--active' : '']" v-for="(item, index) in audios"
          :id="`audio-${index}`" :key="item.url" @click="play(index)">
          <img v-if="item.img" class="audio__image" :src="getProxiedImageUrl(item.img)" alt="" @click.stop="onGoToLesson(index)">
          <div class="audio__link" :href="item.url">
            {{ item.title }}
            <br />
            {{ item.lessonNo }}
          </div>
        </li>
      </ul>
    </main>
    <PlayerBar />
  </div>
</template>

<style lang='less' scoped>
.elllo {
  background: #000;
}

header {
  padding: 15px;
  background: #f7f7f8;
}

main {
  padding: 15px;
  padding-bottom: 0;
}

.title {
  text-align: center;
  margin-bottom: 15px;
}

.speed {
  width: 100%;
  margin-bottom: 15px;
  padding: 10px;
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
}

.audio__image {
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  margin-right: 10px;
  border-radius: 3px;
  object-fit: cover;
}

.audio__link {
  flex: 1;
  margin-right: 10px;
  color: #fff;
}

.audio--active {
  .audio__link {
    color: #1ed760;
  }
}
</style>
