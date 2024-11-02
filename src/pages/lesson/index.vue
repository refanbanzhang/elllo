<template>
  <div>
    <h1>
      {{ audio?.title }}
    </h1>
    <img v-if="audio?.img" :src="getProxiedImageUrl(audio.img)" alt="">
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router"
import { getProxiedImageUrl } from "@/utils"
import audios from "../../../audios.json"

const route = useRoute()

const audio = audios.find((item) => item.lessonNo === route.params.id)
</script>
