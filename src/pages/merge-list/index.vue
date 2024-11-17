<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import api, { Landmark, Topic, mergeLists } from './api'

const landmarkList = ref<Landmark[]>([])
const topicList = ref<Topic[]>([])
const mixedList = ref<(Landmark | Topic)[]>([])
const currentPage = ref(1)

// 记录两种数据的加载状态
const isLandmarkEnd = ref(false)
const isTopicEnd = ref(false)

const TOTAL = 4 * 2
const PER_PAGE_LANDMARK = TOTAL - (TOTAL / 4)
const PER_PAGE_TOPIC = TOTAL / 4

const getLandmarkList = async (page: number) => {
  try {
    const data = await api.getLandmarkList(page, PER_PAGE_LANDMARK)

    landmarkList.value.push(...data)
    if (data.length < PER_PAGE_LANDMARK) {
      isLandmarkEnd.value = true
    }
  } catch (error) {
    console.error("加载landmark失败:", error)
  }
}

const getTopicList = async (page: number) => {
  try {
    const data = await api.getTopicList(page, PER_PAGE_TOPIC)

    topicList.value.push(...data)
    if (data.length < PER_PAGE_TOPIC) {
      isTopicEnd.value = true
    }
  } catch (error) {
    console.error("加载topic失败:", error)
  }
}

const nextPage = async (page: number) => {
  await Promise.all([
    getLandmarkList(page),
    getTopicList(page)
  ])

  mixedList.value = mergeLists(topicList.value, landmarkList.value)
}

const hasNextPage = computed(() => !isLandmarkEnd.value || !isTopicEnd.value)

const loadMore = async () => {
  currentPage.value++
}

watch(() => currentPage.value, async (value) => {
  await nextPage(value)
}, { immediate: true })
</script>

<template>
  <div>
    <div v-for="item in mixedList" :key="item.id">{{ item.name }}</div>
    <button v-if="hasNextPage" @click="loadMore">下一页</button>
  </div>
</template>
