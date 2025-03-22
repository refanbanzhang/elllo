<template>
  <div class="page">
    <div>header</div>
    <div
      v-for="(item, index) in items"
      :key="item.id"
      class="item"
      :class="{ 'is-dragging': dragIndex === index }"
      :style="getItemStyle(index)"
      @touchstart.passive="handleDragStart($event, index)"
      @touchmove="handleDragMove($event, index)"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"

// 使用节流函数减少事件触发频率
const throttle = (fn, delay) => {
  let lastCall = 0
  return function(...args) {
    const now = new Date().getTime()
    if (now - lastCall < delay) return
    lastCall = now
    return fn(...args)
  }
}

const items = ref([
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
])

// 常量定义
const ITEM_HEIGHT = 100 // 项目高度
const ITEM_MARGIN = 10 // 项目间距
const ITEM_TOTAL_HEIGHT = ITEM_HEIGHT + ITEM_MARGIN // 项目总高度（包含间距）

// 拖拽相关状态
const dragIndex = ref(-1) // 当前拖拽项的索引
const startY = ref(0) // 开始拖拽时手指的Y坐标
const currentY = ref(0) // 当前手指的Y坐标
const targetIndex = ref(-1) // 目标交换位置的索引
const isDragging = ref(false) // 是否正在拖动中

/**
 * 计算当前拖拽项的偏移量
 */
const dragOffset = computed(() => {
  if (dragIndex.value === -1) {
    return 0
  }

  return currentY.value - startY.value
})

// 监听全局的touchend和touchcancel事件
const setupGlobalListeners = () => {
  // 添加全局事件监听
  document.addEventListener("touchend", handleGlobalTouchEnd)
  document.addEventListener("touchcancel", handleGlobalTouchEnd)
}

/**
 * 计算移动距离对应的目标索引
 */
 const calculateTargetIndex = (index, offset) => {
  // 越过的项目数量
  const itemsToMove = Math.round(offset / ITEM_TOTAL_HEIGHT)
  // 计算新索引
  const newIndex = index + itemsToMove
  // 确保索引不小于0
  const minBound = Math.max(0, newIndex)
  // 确保索引不大于数组最大索引
  return Math.min(items.value.length - 1, minBound)
}

// 限制移动事件处理的频率
const updateDragPosition = throttle((event, index) => {
  // 更新当前手指的Y坐标
  currentY.value = event.touches[0].clientY
  // 计算目标交换位置的索引
  const offset = currentY.value - startY.value
  targetIndex.value = calculateTargetIndex(index, offset)
}, 16)

// 修改handleDragStart以添加全局监听
const handleDragStart = (event, index) => {
  // 记录当前拖拽的元素索引
  dragIndex.value = index
  // 记录目标位置
  targetIndex.value = index
  // 记录开始拖拽时手指的Y坐标
  startY.value = event.touches[0].clientY
  // 当前手指的Y坐标
  currentY.value = startY.value
  // 是否正在拖动中
  isDragging.value = true

  // 添加全局事件监听
  setupGlobalListeners()
}

/**
 * 处理触摸移动事件
 */
const handleDragMove = (event, index) => {
  // 判断和起始元素是否相同
  if (dragIndex.value === index) {
    // 阻止页面滚动
    event.preventDefault()
    // 更新拖拽位置
    updateDragPosition(event, index)
  }
}

// 处理全局的触摸结束事件
const handleGlobalTouchEnd = () => {
  if (isDragging.value && dragIndex.value !== -1) {
    // 计算目标交换位置的索引
    const newIndex = calculateTargetIndex(dragIndex.value, currentY.value - startY.value)
    // 如果目标交换位置的索引和当前拖拽的元素索引不同，则交换位置
    if (newIndex !== dragIndex.value) {
      // 记录当前拖拽的元素
      const temp = items.value[dragIndex.value]
      // 删除当前拖拽的元素
      items.value.splice(dragIndex.value, 1)
      // 将当前拖拽的元素插入到目标交换位置
      items.value.splice(newIndex, 0, temp)
    }
    // 重置拖拽状态
    reset()
  }
}


// 修改reset函数
const reset = () => {
  dragIndex.value = -1
  targetIndex.value = -1
  startY.value = 0
  currentY.value = 0
  isDragging.value = false
}

/**
 * 计算每个项目的样式
 */
const getItemStyle = (index) => {
  // 当还没有触发end事件时，这里根据targetIndex来实现自动避让的动画效果

  // 当前没有拖拽操作
  if (dragIndex.value === -1) {
    return {}
  }

  // 被拖拽的项目
  if (index === dragIndex.value) {
    return {
      border: "2px dashed #666",
      transform: `translate3d(0, ${dragOffset.value}px, 0)`,
      transition: "none",
      zIndex: 10
    }
  }

  // 简化的逻辑：检查item是否在拖拽起点和目标点之间
  const min = Math.min(dragIndex.value, targetIndex.value)
  const max = Math.max(dragIndex.value, targetIndex.value)

  // 如果index在拖拽起点和目标点之间，则需要移动
  if (index >= min && index <= max) {
    // 根据拖拽方向决定移动方向
    const direction = targetIndex.value > dragIndex.value ? -1 : 1
    return {
      transform: `translate3d(0, ${direction * ITEM_TOTAL_HEIGHT}px, 0)`,
      transition: isDragging.value ? "transform 0.15s ease-out" : "transform 0.3s ease-out",
      zIndex: 5
    }
  }

  // 不需要移动的项目
  return {
    transform: "translate3d(0, 0, 0)",
    transition: "transform 0.3s ease-out",
    zIndex: 1
  }
}
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

.is-dragging {
  background-color: #999;
  opacity: 0.9;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}
</style>

