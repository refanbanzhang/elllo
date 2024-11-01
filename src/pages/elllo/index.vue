<script setup lang="ts">
import { onMounted, ref } from "vue"
import audios from "./audios.json"
import useAudioPlayer from "../../composables/use-audio-player"

const { play, pause, resume, currentIndex, isPlaying, items, setCurrentIndex } = useAudioPlayer(audios)

const mainElement = ref<HTMLElement | null>(null)
const restoreScrollPosition = () => {
  const audioElement = document.getElementById(`audio-${currentIndex.value}`)
  if (audioElement && mainElement.value) {
    mainElement.value.scrollTop = audioElement.offsetTop - mainElement.value.offsetTop - 15
  }
}

const loadLastPlayedIndex = () => {
  const lastPlayedIndex = localStorage.getItem("lastPlayedIndex")
  if (lastPlayedIndex) {
    setCurrentIndex(parseInt(lastPlayedIndex))
  }
}

const onPlay = () => {
  if (isPlaying.value) {
    pause()
  } else {
    resume()
  }
}

onMounted(() => {
  loadLastPlayedIndex()
  restoreScrollPosition()
})
</script>

<template>
  <div class="elllo">
    <main ref="mainElement">
      <ul>
        <li :class="['audio', currentIndex === index ? 'audio--active' : '']" v-for="(url, index) in items"
          :id="`audio-${index}`" :key="url" @click="play(index)">
          <img class="audio__image" src="https://picsum.photos/200/300" alt="">
          <div class="audio__link" :href="url">
            {{ url.split("/").pop()?.split(".")[0] }}
          </div>
        </li>
      </ul>
    </main>
    <footer class="footer">
      <div class="footer__content">
        <div class="footer__content-inner">
          <img class="footer__img" src="https://picsum.photos/200/300" alt="">
          Lofi Road Trip
          <div class="play-btn-wrapper" @click="onPlay" v-if="!isPlaying">
            <svg class="play-btn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z">
              </path>
            </svg>
          </div>
          <div class="play-btn-wrapper" @click="onPlay" v-if="isPlaying">
            <svg class="play-btn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z">
              </path>
            </svg>
          </div>
        </div>
      </div>
    </footer>
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

.footer {
  position: sticky;
  bottom: 0;

  &__content {
    padding: 15px;
  }

  &__content-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;
    border-radius: 3px;
    background-color: rgb(49, 128, 153);
    padding: 10px;
  }

  &__img {
    width: 50px;
    height: 50px;
  }
}

.play-btn-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: white;
}

.play-btn {
  width: 28px;
  height: 28px;
}
</style>
