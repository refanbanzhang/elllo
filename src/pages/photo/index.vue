<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router"
import { photos } from "@/api";

const router = useRouter()
const route = useRoute()

const id = route.params.id as string
const data = computed(() => photos.find((photo) => photo.id === Number(id)))

const handleBack = () => {
  document.startViewTransition(() => {
    router.push("/photos")
  })
}
</script>

<template>
  <div class="container" @click.self="handleBack">
    <img v-if="data" :src="data.src" :alt="data.alt" :style="`view-transition-name: photo-${id}`" />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: #000;
}
</style>
