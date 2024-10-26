<script setup lang="ts">
import { ref } from "vue"

const isPopupOpen = ref(false)
const handlePopupToggle = () => {
  // @ts-ignore
  document.startViewTransition(() => {
    isPopupOpen.value = !isPopupOpen.value
  })
}
</script>

<template>
  <div>
    <button class="btn" @click="handlePopupToggle">open</button>
    <div class="popup" v-if="isPopupOpen" @click="handlePopupToggle">
      <div class="popup-content">
        popup
      </div>
    </div>
  </div>
</template>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

/* 两个元素不能使用相同的 view-transition-name */
/* Unexpected duplicate view-transition-name */

.btn {}

.popup {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.5);
}

.popup-content {
  width: 100%;
  height: 400px;
  padding: 20px;
  border-radius: 10px;
  background-color: white;
  view-transition-name: popup-content;
}


@keyframes move-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0%);
  }
}

@keyframes move-out {
  from {
    opacity: 1;
    transform: translateY(0%);
  }

  to {
    opacity: 0;
    transform: translateY(10px);
  }
}

::view-transition-old(popup-content) {
  animation: 1s move-out;
}

::view-transition-new(popup-content) {
  animation: 1s move-in;
}
</style>
