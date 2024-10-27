<script setup lang="ts">
import { ref } from 'vue';
import Card from './card/index.vue'
import router from '@/router';
import { playlists } from '@/api';

const cards = ref(playlists)

const navigateTo = (id: number) => {
  document.startViewTransition(() => {
    router.push(`/live-transitions/${id}`)
  })
}
</script>

<template>
  <div class="container">
    <header class="header">
      <div class="header-content">
        <svg class="logo" viewBox="0 0 63 79" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M19.4924 65.9282C15.6165 62.432 14.4851 55.0859 16.0999 49.7638C18.8998 53.1193 22.7793 54.1822 26.7977 54.7822C33.0013 55.7081 39.0937 55.3618 44.8565 52.5637C45.5158 52.2434 46.125 51.8174 46.8454 51.386C47.3861 52.9341 47.5268 54.497 47.338 56.0877C46.8787 59.9617 44.9251 62.9542 41.8177 65.2227C40.5752 66.13 39.2604 66.9411 37.9771 67.7967C34.0346 70.4262 32.9679 73.5095 34.4494 77.9946C34.4846 78.1038 34.5161 78.2131 34.5957 78.4797C32.5828 77.5909 31.1124 76.2965 29.9921 74.5946C28.8088 72.7984 28.2458 70.8114 28.2162 68.6615C28.2014 67.6152 28.2014 66.5597 28.0588 65.5282C27.7107 63.0135 26.5144 61.8876 24.2608 61.8227C21.9479 61.7561 20.1183 63.1672 19.6331 65.3893C19.5961 65.5597 19.5424 65.7282 19.4887 65.9263L19.4924 65.9282Z"
            fill="#17191E"></path>
          <path
            d="M0 51.3932C0 51.3932 10.5979 46.2433 21.2254 46.2433L29.2382 21.5069C29.5381 20.3106 30.4141 19.4977 31.4029 19.4977C32.3918 19.4977 33.2677 20.3106 33.5677 21.5069L41.5804 46.2433C54.1672 46.2433 62.8058 51.3932 62.8058 51.3932C62.8058 51.3932 44.8044 2.47586 44.7692 2.37772C44.2526 0.931458 43.3804 0 42.2045 0H20.6032C19.4273 0 18.5903 0.931458 18.0384 2.37772C17.9995 2.47401 0 51.3932 0 51.3932Z"
            fill="#17191E"></path>
        </svg>
        <h1 class="title">Playlists</h1>
      </div>
    </header>
    <main class="main">
      <div class="card-list">
        <Card v-for="card in cards" :key="card.id" :data="card" @click="navigateTo(card.id)" />
      </div>
      <footer class="footer">
        <p>
          This site is a demo of how to persist animating elements across navigation
          events using the
          <a href="https://developer.chrome.com/docs/web-platform/view-transitions/" target="_blank" rel="noopener">
            View Transitions API
          </a>
          and the
          <a href="https://developer.chrome.com/docs/web-platform/navigation-api/" target="_blank" rel="noopener">
            Navigation API
          </a>. Both APIs are available in Chrome 111+.
        </p>
        <hr>
        <p>
          Made with ☕️ by <a href="https://twitter.com/charca" target="_blank" rel="noopener">Maxi Ferreira</a> — Based
          on
          the <a href="https://dribbble.com/shots/4650389-Music-Playlist-App-Interaction" target="_blank"
            rel="noopener">original concept</a> by Ehsan Rahimi. <a
            href="https://github.com/Charca/view-transitions-live" target="_blank" rel="noopener">Source code</a>.
          Powered by <a href="https://astro.build" target="_blank" rel="noopener">Astro</a>.
        </p>
      </footer>
    </main>

  </div>
</template>

<style scoped lang="less">
.header {
  box-shadow: var(--shadow-elevation-low);
  margin-bottom: 20px;
  position: sticky;
  top: 0;
  z-index: 20;
  background-color: white;
  view-transition-name: app-header;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 16px;
  margin: auto;
  padding: 24px 24px;
  max-width: 600px;
}

.logo {
  width: 26px;
  margin-bottom: -7px;
}

.title {
  flex: 1;
  font-size: 22px;
}

.main {
  margin: auto;
  padding: 0 24px 24px;
  max-width: 600px;
}

.card-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.footer {
  padding: 40px 0px;

  p {
    margin: 10px 0;
  }
}
</style>
