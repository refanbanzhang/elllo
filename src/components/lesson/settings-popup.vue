<script setup lang="ts">
import { computed } from "vue"
import { getProxiedImageUrl } from "@/utils"
import Popup from "@/components/popup/index.vue"
import sleepTimerStore from "@/stores/sleep-timer"
import currentLessonStore from "@/stores/current-lesson"

interface Props {
  visible: boolean
}

defineProps<Props>()
const emit = defineEmits<{
  (e: "close"): void
  (e: "sleep-timer"): void
  (e: "speed"): void
}>()

const { remainingTime } = sleepTimerStore
const { lesson } = currentLessonStore

const imgSrc = computed(() => lesson.value?.img ? getProxiedImageUrl(lesson.value.img) : "")

const onClose = () => {
  emit("close")
}

const menuItems = computed(() => [
  {
    name: "Sleep timer",
    action: () => {
      emit("sleep-timer")
    }
  },
  {
    name: "Set speed",
    action: () => {
      emit("speed")
    }
  },
  {
    name: "Add to playlist",
  },
  {
    name: "Hide song",
  },
  {
    name: "Share",
  },
  {
    name: "View artist",
  },
  {
    name: "Report",
  },
  {
    name: "Song credits",
  }
])
</script>

<template>
  <Popup
    :visible="visible"
    @close="onClose"
  >
    <div class="settings">
      <img class="settings-cover" :src="imgSrc" alt="">
      <div class="settings-title">
        {{ lesson?.title }}
      </div>
      <div class="settings-lesson-no">
        {{ lesson?.lessonNo }}
      </div>
      <div class="menus">
        <div
          class="menu-item"
          v-for="(item, index) in menuItems"
          :key="index"
          @click="item.action?.()"
        >
          {{ item.name }}
          {{ item.name === "Sleep timer" && remainingTime > 0 ? `${Math.floor(remainingTime / 60)}:${(remainingTime % 60).toString().padStart(2, "0")} left` : "" }}
        </div>
      </div>
      <div class="settings-close" @click="onClose">close</div>
    </div>
  </Popup>
</template>

<style lang="less" scoped>
.settings {
  overflow: auto;
  height: 100%;
  padding: 20px;
  color: #fff;
  background: #000;
}

.settings-cover {
  margin-top: 40px;
  margin-bottom: 20px;
  width: 100%;
}

.settings-title {
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: 600;
}

.settings-lesson-no {
  margin-bottom: 70px;
  font-size: 16px;
  color: #999;
}

.settings-close {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
  color: #fff;
  font-size: 18px;
  background: #000;
}

.menus {
  margin-bottom: 100px;
}

.menu-item {
  padding: 15px 0;
}
</style>