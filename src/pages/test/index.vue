<script setup lang="ts">
import { ref } from "vue"

const isPopupOpen = ref(false)
const toggle = () => {
  document.startViewTransition(() => {
    isPopupOpen.value = !isPopupOpen.value
  })
}
</script>

<template>
  <img v-if="!isPopupOpen" class="img transition-img" src="https://live.staticflickr.com/65535/50187927333_12dc192ab6_b.jpg" alt="" @click="toggle">
  <div class="popup" v-if="isPopupOpen" @click="toggle">
    <div class="popup-content transition-img">
      <img class="popup-img" src="https://live.staticflickr.com/65535/50187927333_12dc192ab6_b.jpg" alt="" @click="toggle">
    </div>
  </div>
</template>

<style>
.transition-img {
  view-transition-name: transition-img;
}

.img {
  width: 200px;
}

.popup-img {
  max-width: 100%;
}

.popup {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  /* view-transition-name: popup; */
}

.popup-content {
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  background-color: white;
  text-align: center;
  /* view-transition-name: popup-content; */
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

/* ::view-transition-old(popup-content) {
  animation: .3s move-out;
}

::view-transition-new(popup-content) {
  animation: .3s move-in;
} */
</style>
