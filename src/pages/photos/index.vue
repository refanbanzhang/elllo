<script setup lang="ts">
import { ref } from "vue"
import router from "../../router";

import { photos as photosData } from "@/api";

const photos = ref(photosData)

const currentPhoto = ref('')

const handleClick = (id: number) => {
  document.startViewTransition(() => {
    router.push(`/photos/${id}`)
  })
}
</script>

<template>
  <div class="container">
    <div class="photos" v-if="!currentPhoto">
      <img class="photo" v-for="photo in photos" :key="photo.id" :src="photo.src" :alt="photo.alt"
        :style="`view-transition-name: photo-${photo.id}`" @click="handleClick(photo.id)">
    </div>
  </div>
</template>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
}

.photos {
  display: flex;
  flex-wrap: wrap;
  width: 900px;
}

.photo {
  display: block;
  width: 300px;
  /* 作用是啥？ */
  object-fit: cover;
}

::view-transition-group(*) {
  animation-duration: .3s;
}
</style>
