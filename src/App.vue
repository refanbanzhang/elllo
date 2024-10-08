<script setup lang="ts">
import { ref, watch } from 'vue';
import audios from './audios.json'

const audioElement = ref<HTMLAudioElement | null>(null);
const playbackRate = ref<number>(1);
const audioIndex = ref<number>(0);
const isPlaying = ref<boolean>(false);

const playAudio = async (index: number) => {
  audioIndex.value = index;
  const audioUrl = audios[audioIndex.value];

  if (!audioUrl) {
    console.error('无效的音频索引');
    return;
  }

  if (!audioElement.value) {
    return;
  }

  audioElement.value.src = audioUrl;
  audioElement.value.playbackRate = playbackRate.value;
  try {
    await audioElement.value.play();
    isPlaying.value = true;
  } catch (error) {
    console.error('播放错误:', error);
    await playNextAudio();
  }
};

const playNextAudio = async () => {
  audioIndex.value++;
  const nextAudioUrl = audios[audioIndex.value];

  if (!nextAudioUrl) {
    console.error('没有更多音频可播放');
    return;
  }

  await playAudio(audioIndex.value);
};

const pauseAudio = () => {
  if (audioElement.value && isPlaying.value) {
    audioElement.value.pause();
    isPlaying.value = false;
  }
};

const resumeAudio = () => {
  if (audioElement.value && !isPlaying.value) {
    audioElement.value.play();
    isPlaying.value = true;
  }
};

watch(playbackRate, (newRate) => {
  if (audioElement.value) {
    audioElement.value.playbackRate = newRate;
  }
});
</script>

<template>
  <div class="container">
    <header class="header">
      <h1 class="title">Elllo</h1>
      <audio class="audio" ref="audioElement" controls @ended="playNextAudio"></audio>
      <select class="speed" v-model="playbackRate">
        <option :value="0.5">0.5x</option>
        <option :value="0.75">0.75x</option>
        <option :value="1">1x</option>
        <option :value="1.25">1.25x</option>
        <option :value="1.5">1.5x</option>
        <option :value="2">2x</option>
      </select>
    </header>
    <ul>
      <li :class="['audio', audioIndex === index ? 'audio--active' : '']" v-for="(url, index) in audios" :key="url">
        <div class="audio__link" :href="url">{{ url }}</div>
        <div class="audio__control">
          <button v-if="audioIndex === index && isPlaying" class="audio__btn" @click="pauseAudio">
            暂停
          </button>
          <button v-else-if="audioIndex === index && !isPlaying" class="audio__btn" @click="resumeAudio">
            恢复
          </button>
          <button v-else class="audio__btn" @click="playAudio(index)">
            播放
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang='less' scoped>
.container {
  padding: 20px;
}

.header {
  position: sticky;
  top: 0;
  padding-top: 20px;
  background: #fff;
}

.title {
  text-align: center;
  margin-bottom: 20px;
}

.speed {
  width: 100%;
  margin-bottom: 20px;
  padding: 10px;
}

.audio {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
  border-radius: 6px;
  padding: 10px;
}

.audio__btn {
  padding: 5px 15px;
}

.audio__link {
  flex: 1;
  margin-right: 10px;
}

.audio--active {
  color: #fff;
  background: rgba(0, 0, 0, 0.3);

  .audio__link {
    color: #fff;
    text-decoration: none;
  }
}

.audio__control {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
</style>