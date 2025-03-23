<template>
  <div class="page">
    <div
      v-for="(item, index) in items"
      :key="item.id"
      class="item"
      :style="getItemStyle(index)"
      @touchstart="onTouchStart($event, index)"
      @touchmove="onTouchMove($event, index)"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script setup>
import { useDraggableList } from "../../composables/useDraggableList"

const initialItems = [
  { id: 1, name: "1" },
  { id: 2, name: "2" },
  { id: 3, name: "3" },
  { id: 4, name: "4" },
  { id: 5, name: "5" },
  { id: 6, name: "6" },
  { id: 7, name: "7" },
  { id: 8, name: "8" },
  { id: 9, name: "9" },
  { id: 10, name: "10" },
]

const { items, onTouchStart, onTouchMove, getItemStyle } = useDraggableList(initialItems, {
  itemHeight: 110 // 100px高度 + 10px间距
})
</script>

<style scoped>
.page {
  padding: 20px;
  touch-action: none;
}

.item {
  height: 100px;
  background-color: #ccc;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  position: relative;
  font-size: 20px;
  will-change: transform;
  border-radius: 8px;
}
</style>
