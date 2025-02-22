<template>
  <Popup
    :visible="visible"
    position="bottom"
    @close="onClose"
    close-on-overlay-click
  >
    <div class="picker-content">
      <div class="picker-header">
        <div
          class="picker-cancel"
          @click="onClose"
        >
          取消
        </div>
        <div class="picker-title">
          {{ props.title }}
        </div>
        <div
          class="picker-confirm"
          @click="onConfirm"
        >
          确定
        </div>
      </div>

      <div class="picker-body">
        <div
          class="picker-column"
          v-for="(column, index) in columns"
          :key="index"
          :data-index="index"
          :style="{ transform: `translateY(${offsets[index]}px)` }"
          @touchstart="onTouchStart"
          @touchmove="onTouchMove"
          @touchend="onTouchEnd"
        >
          <div
            v-for="item in column"
            :key="item.value"
            class="picker-item"
          >
            {{ item.label }}
          </div>
        </div>
        <div class="picker-frame" />
      </div>
    </div>
  </Popup>
</template>

<script setup>
import { ref, watch } from "vue"
import Popup from "../popup/index.vue"

const props = defineProps({
  title: {
    type: String,
    default: "请选择"
  },
  options: {
    type: Array,
    default: () => []
  },
  modelValue: {
    type: [String, Number],
    default: ""
  },
  visible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(["update:modelValue", "confirm", "close"])

// 存储所有列的数据
const columns = ref([])
const offsets = ref([])

// 每项高度
const ITEM_HEIGHT = 44
// 记录触摸开始时的Y坐标
const startY = ref(0)
// 记录触摸开始时的偏移量
const moveY = ref(0)

// 添加速度相关变量
const lastY = ref(0)
const lastTime = ref(0)
const velocity = ref(0)

// 触摸事件处理
const onTouchStart = (e) => {
  const columnIndex = Number(e.currentTarget.dataset.index)

  // 记录触摸起始位置的Y坐标
  startY.value = e.touches[0].clientY
  // 记录当前偏移量,用于计算滑动距离
  moveY.value = offsets.value[columnIndex]
  // 重置速度相关变量
  lastY.value = e.touches[0].clientY
  lastTime.value = Date.now()
  velocity.value = 0
}

const onTouchMove = (e) => {
  const columnIndex = Number(e.currentTarget.dataset.index)

  // 计算手指移动的距离
  const deltaY = e.touches[0].clientY - startY.value
  // 更新偏移量 = 初始偏移量 + 移动距离
  offsets.value[columnIndex] = moveY.value + deltaY

  // 计算速度
  const now = Date.now()
  const deltaTime = now - lastTime.value
  if (deltaTime > 0) {
    velocity.value = (e.touches[0].clientY - lastY.value) / deltaTime
  }
}

const onTouchEnd = (e) => {
  const columnIndex = Number(e.currentTarget.dataset.index)

  // 根据速度计算惯性滚动距离
  const momentum = velocity.value * 300 // 调整系数控制惯性大小
  const targetOffset = offsets.value[columnIndex] + momentum

  // 限制边界
  const maxOffset = 0
  const minOffset = -(columns.value[columnIndex].length - 1) * ITEM_HEIGHT
  const boundedOffset = Math.max(Math.min(targetOffset, maxOffset), minOffset)

  // 滚动到最近的选项
  // 这行代码的目的是确保选择器最终停在某个选项的精确位置上，不会停在两个选项之间
  offsets.value[columnIndex] = Math.round(boundedOffset / ITEM_HEIGHT) * ITEM_HEIGHT

  // 更新当前选中项子孙节点的选项和位置
  updateChildren(columnIndex)
}

// 递归重置后续列
const updateNextColumn = (options, level) => {
  columns.value[level] = options
  offsets.value[level] = 0

  // 递归更新下一级
  const firstOption = options[0]
  if (firstOption?.children?.length) {
    updateNextColumn(firstOption.children, level + 1)
  }
}

const updateChildren = (level) => {
  // 通过偏移量计算当前列的索引
  // 使用Math.abs() 获取绝对值，确保索引为正数，因为我们只需要知道移动了几个选项，不关心方向
  const optionIndex = Math.abs(offsets.value[level] / ITEM_HEIGHT)

  // 清空当前级别后的数据
  columns.value.splice(level + 1)
  offsets.value.splice(level + 1)

  // 取出当前列的子元素
  const children = columns.value[level][optionIndex]?.children
  // 重置当前选中项子孙节点的选项和位置，位置默认为0
  if (children?.length) {
    updateNextColumn(children, level + 1)
  }
}

const initializeColumn = (options, level = 0) => {
  columns.value[level] = options
  offsets.value[level] = 0

  // 取出第一级的值
  const selectedValue = props.modelValue?.[level]
  // 找到第一级值对于的选项 如果找不到就默认为第一项
  const selectedOption = options.find(item => item.value === selectedValue) ?? options[0]

  if (selectedOption?.children?.length) {
    initializeColumn(selectedOption.children, level + 1)
  }
}

const setOffsets = (options, level = 0) => {
  const currentLevelValue = props.modelValue[level]
  const selectedIndex = options.findIndex(item => item.value === currentLevelValue)

  if (selectedIndex !== -1) {
    // 保存当前级别的位置
    offsets.value[level] = -selectedIndex * ITEM_HEIGHT

    // 获取当前选项的的子元素
    const selectedOption = options[selectedIndex]

    // 如果有子元素，则递归计算子元素的位置
    if (selectedOption?.children?.length) {
      setOffsets(selectedOption.children, level + 1)
    }
  }
}

watch(() => props.visible, (newValue) => {
  if (newValue) {
    columns.value = []
    offsets.value = []
    initializeColumn(props.options)

    if (props.modelValue) {
      setOffsets(props.options, 0)
    }
  }
}, { immediate: true })

const onConfirm = () => {
  // 根据每列的偏移量计算选中值
  const selectedValues = offsets.value.map((offset, columnIndex) => {
    const selectedIndex = Math.abs(offset / ITEM_HEIGHT)
    return columns.value[columnIndex][selectedIndex].value
  })

  // 返回所有级别的选中值
  const finalValue = selectedValues
  emit("update:modelValue", finalValue)
  emit("confirm")
  onClose()
}

const onClose = () => {
  emit("close")
}
</script>

<style scoped>
.picker-content {
  background: #fff;
  border-radius: 12px 12px 0 0;
}

.picker-header {
  display: flex;
  align-items: center;
  height: 44px;
  border-bottom: 1px solid #eee;
}

.picker-title {
  flex: 1;
  text-align: center;
  font-size: 16px;
}

.picker-cancel,
.picker-confirm {
  padding: 0 16px;
  font-size: 14px;
}

.picker-body {
  display: flex;
  height: 220px;
  position: relative;
  overflow: hidden;
  mask-image: linear-gradient(to bottom,
      transparent 0%,
      transparent 10%,
      #000 40%,
      #000 60%,
      transparent 90%,
      transparent 100%);
}

.picker-column {
  flex: 1;
  transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  padding: 88px 0;
}

.picker-item {
  height: 44px;
  line-height: 44px;
  text-align: center;
  font-size: 16px;
}

.picker-frame {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 44px;
  pointer-events: none;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}
</style>