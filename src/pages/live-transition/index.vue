<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router"
import { playlists } from "@/api";

const router = useRouter()
const route = useRoute()

const id = route.params.id as string
const data = computed(() => playlists.find((playlist) => playlist.id === Number(id)))

const handleBack = () => {
  document.startViewTransition(() => {
    router.push("/live-transitions")
  })
}
</script>

<template>
  <main class="main" v-if="data" :style="data.style">
    <header class="header">
      <div class="bg" />
      <div class="header-content">
        <div class="back-btn" @click="handleBack">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"></path>
          </svg>
        </div>

        <div class="avatar-container">
          <img :src="data.avatar" alt="avatar" />
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path>
            </svg>
          </button>
        </div>

        <div class="info">
          <div>
            {{ data.name }}
          </div>
          <div>{{ data.date }}</div>
        </div>

        <div class="title">
          {{ data.title }}
        </div>

        <div class="stats">
          <span class="stat">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
              <path
                d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z">
              </path>
            </svg>
            {{ data.num }}
          </span>
          <span>-</span>
          <span class="stat">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
              <path fill-rule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
                clip-rule="evenodd"></path>
            </svg>
            {{ data.duration }}
          </span>
        </div>

        <div class="desc">
          {{ data.desc }}
        </div>

      </div>

      <div class="media">
        <img v-if="data.media.endsWith('.webp')" :src="data.media" alt="media" />
        <video width="552" height="427" v-else :src="data.media" alt="media" muted autoplay loop playsinline />

        <div class="controls" :style="{
          '--visibility': 'visible',
        }">
          <div class="controls-content">
            <div class="control small-control extra-control">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                <path fill-rule="evenodd"
                  d="M10.5 3.75a6 6 0 00-5.98 6.496A5.25 5.25 0 006.75 20.25H18a4.5 4.5 0 002.206-8.423 3.75 3.75 0 00-4.133-4.303A6.001 6.001 0 0010.5 3.75zm2.25 6a.75.75 0 00-1.5 0v4.94l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V9.75z"
                  clip-rule="evenodd"></path>
              </svg>
            </div>
            <div class="control small-control">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636">
                </path>
              </svg>
            </div>
            <div class="control big-control">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                  clip-rule="evenodd"></path>
              </svg>
            </div>
            <div class="control small-control">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                <path
                  d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z">
                </path>
              </svg>
            </div>
            <div class="control small-control extra-control">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                <path fill-rule="evenodd"
                  d="M4.5 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
                  clip-rule="evenodd"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

    </header>
  </main>
</template>

<style scoped lang="less">
.main {
  margin: auto;
  padding: 0 24px 24px;
  max-width: 600px;
}

.header {
  color: var(--textColor);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}


.bg {
  background: var(--backgroundColor);
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-image: var(--backgroundImage);
  background-repeat: repeat-y;
  background-size: contain;
}

.header-content {
  gap: 18px;
  width: 100%;
  padding: 40px 30px 20px;
  color: var(--textColor);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}

.back-btn {
  position: absolute;
  left: 30px;
  top: 30px;
  background: none;
  border: none;
  z-index: 10;

  svg {
    width: 30px;
    height: 30px;
    color: var(--textColor);
  }
}

.avatar-container {
  position: relative;

  img {
    width: 50px;
    height: 50px;
    display: block;
    border-radius: 50%;
    border: 1px solid var(--secondaryTextColor);
    padding: 3px;
  }

  button {
    background-color: white;
    width: 24px;
    height: 24px;
    display: block;
    border-radius: 50%;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: -6px;
    right: -6px;

    svg {
      width: 16px;
      height: 16px;
    }
  }
}

.info {
  flex: 1;
  display: flex;
  gap: 3px;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.title {
  font-weight: bold;
  margin: 10px 0 15px;
  font-size: 3rem;
  text-align: center;
  z-index: 1;
}

.stats {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--secondaryTextColor);
  margin: 10px 0;
  position: relative;

  .stat {
    display: flex;
    gap: 4px;
  }

  svg {
    width: 16px;
    height: 16px;
  }
}

.desc {
  text-align: center;
  max-width: 360px;
  line-height: 1.6;
  color: var(--secondaryTextColor);
  z-index: 1;
  margin: 16px 0;
}

.media {
  position: relative;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
  overflow-x: clip;

  img {
    display: block;
    max-height: 480px;
    z-index: 1;
  }

  video {
    display: block;
    max-width: 100%;
    border-radius: 0 0 2rem 2rem;
    min-height: 418px;
    object-fit: cover;
    clip-path: inset(1px 1px);
    margin-bottom: -1px;
  }
}


.controls {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}

.controls-content {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28px 0;
  gap: 20px;
}

.control {
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.small-control {
  width: 46px;
  height: 46px;
  background: rgba(0, 0, 0, 0.8);

  svg {
    width: 20px;
    height: 20px;
    color: white;
  }
}

.big-control {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: white;

  svg {
    width: 28px;
    height: 28px;
    color: black;
  }
}

.extra-control {
  visibility: var(--visibility);
}
</style>
