<script setup lang="ts">
import { ref, watch } from 'vue';
import audios from './audios.json'

const audioElement = ref<HTMLAudioElement | null>(null);
const playbackRate = ref<number>(1);
const audioIndex = ref<number>(0);
const isPlaying = ref<boolean>(false);
const marksRange = ref({
  0.5: '0.5',
  1: '1',
  1.5: '1.5',
  2: '2',
});

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
    <header>
      <h1 class="title">Elllo</h1>
      <audio class="audio" ref="audioElement" controls @ended="playNextAudio"></audio>
      <t-slider v-model="playbackRate" :marks="marksRange" :min="0.5" :max="2" :step="0.5" />
    </header>
    <main>
      <ul>
        <li :class="['audio', audioIndex === index ? 'audio--active' : '']" v-for="(url, index) in audios" :key="url">
          <div class="audio__link" :href="url">{{ url }}</div>
          <div class="audio__control">
            <t-button v-if="audioIndex === index && isPlaying" size="small" theme="primary" @click="pauseAudio">
              暂停
            </t-button>
            <t-button v-else-if="audioIndex === index && !isPlaying" size="small" theme="primary" @click="resumeAudio">
              恢复
            </t-button>
            <t-button v-else size="small" theme="primary" @click="playAudio(index)">播放</t-button>
          </div>
        </li>
      </ul>
    </main>
  </div>
</template>

<style lang='less' scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

header {
  flex-shrink: 0;
  padding: 15px;
  background: #f7f7f8;
}

main {
  flex: 1;
  overflow: auto;
  padding: 15px;
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
  padding: 15px;
}

.audio__link {
  flex: 1;
  margin-right: 10px;
}

.audio--active {
  background: #f7f7f8;

  .audio__link {
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