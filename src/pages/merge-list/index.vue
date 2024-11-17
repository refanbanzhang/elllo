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

const getPageSizes = ({
  topicSize,
  landmarkSize,
  groupSize
}: {
  topicSize: number,
  landmarkSize: number,
  groupSize: number
}) => {
  const oneGroupSize = topicSize + landmarkSize
  const totalSize = groupSize * oneGroupSize
  const landmarkPageSize = totalSize - groupSize

  return {
    topicPageSize: groupSize,
    landmarkPageSize,
    secondaryItemsPerPrimary: landmarkSize
  }
}

const getLandmarkList = async (page: number, pageSize: number) => {
  try {
    const data = await api.getLandmarkList(page, pageSize)

    landmarkList.value.push(...data)
    if (data.length < pageSize) {
      isLandmarkEnd.value = true
    }
  } catch (error) {
    console.error("加载landmark失败:", error)
  }
}

const getTopicList = async (page: number, pageSize: number) => {
  try {
    const data = await api.getTopicList(page, pageSize)

    topicList.value.push(...data)
    if (data.length < pageSize) {
      isTopicEnd.value = true
    }
  } catch (error) {
    console.error("加载topic失败:", error)
  }
}

const hasNextPage = computed(() => !isLandmarkEnd.value || !isTopicEnd.value)

const { topicPageSize, landmarkPageSize, secondaryItemsPerPrimary } = getPageSizes({
  topicSize: 1,
  landmarkSize: 3,
  groupSize: 3,
})

const nextPage = async (page: number) => {
  await Promise.all([
    getLandmarkList(page, landmarkPageSize),
    getTopicList(page, topicPageSize)
  ])

  mixedList.value = mergeLists({
    primaryList: topicList.value,
    secondaryList: landmarkList.value,
    bothEnded: !hasNextPage.value,
    secondaryItemsPerPrimary
  })
}


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
