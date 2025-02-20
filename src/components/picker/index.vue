<template>
  <Popup :visible="visible" position="bottom" @close="onClose" closeOnOverlayClick>
    <div class='picker-content'>
      <div class='picker-header'>
        <div class='picker-cancel' @click='onClose'>取消</div>
        <div class='picker-title'>{{ props.title }}</div>
        <div class='picker-confirm' @click='onConfirm'>确定</div>
      </div>

      <div class='picker-body'>
        <div class='picker-column' v-for="(column, index) in columns" :key="index" :data-index="index"
          :style='{ transform: `translateY(${offsets[index]}px)` }' @touchstart='onTouchStart' @touchmove='onTouchMove'
          @touchend='onTouchEnd'>
          <div v-for='item in column' :key='item.value' class='picker-item'>
            {{ item.label }}
          </div>
        </div>
        <div class='picker-frame'></div>
      </div>
    </div>
  </Popup>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import Popup from '../popup/index.vue'


const props = defineProps({
  title: {
    type: String,
    default: '请选择'
  },
  options: {
    type: Array,
    default: () => []
  },
  modelValue: {
    type: [String, Number],
    default: ''
  },
  visible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'confirm', 'close'])

// 存储所有列的数据
const columns = ref([])
const offsets = ref([])

// 记录滚动位置
const offset = ref(0)
// 每项高度
const itemHeight = 44
// 记录触摸开始时的Y坐标
const startY = ref(0)
// 记录触摸开始时的偏移量
const moveY = ref(0)

// 添加速度相关变量
const lastY = ref(0)
const lastTime = ref(0)
const velocity = ref(0)

const updateChildren = (columnIndex) => {
  if (columnIndex >= columns.value.length - 1) {
    return
  }

  const index = Math.abs(offsets.value[columnIndex] / itemHeight)
  const currentOptions = columns.value[columnIndex][index]?.children || []

  columns.value.splice(columnIndex + 1)
  offsets.value.splice(columnIndex + 1)

  // 递归更新后续列
  const updateNextColumn = (options, level) => {

    columns.value[level] = options
    offsets.value[level] = 0

    // 递归更新下一级
    const firstOption = options[0]
    if (firstOption?.children?.length) {
      updateNextColumn(firstOption.children, level + 1)
    }
  }

  updateNextColumn(currentOptions, columnIndex + 1)
}

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
  const minOffset = -(columns.value[columnIndex].length - 1) * itemHeight
  const boundedOffset = Math.max(Math.min(targetOffset, maxOffset), minOffset)

  // 滚动到最近的选项
  offsets.value[columnIndex] = Math.round(boundedOffset / itemHeight) * itemHeight

  updateChildren(columnIndex)
}

const initializeColumn = (options, level = 0) => {
  if (!options?.length) {
    return
  }

  columns.value[level] = options
  offsets.value[level] = 0

  const selectedValue = props.modelValue?.[level]
  const selectedOption = options.find(item => item.value === selectedValue) ?? options[0]

  selectedOption?.children?.length && initializeColumn(selectedOption.children, level + 1)
}

const initColumns = () => {
  columns.value = []
  offsets.value = []

  initializeColumn(props.options)
}

const initOffsets = () => {
  const setOffsets = (options, level = 0) => {
    const selectedIndex = options.findIndex(item => item.value === props.modelValue[level])
    if (selectedIndex !== -1) {
      offsets.value[level] = -selectedIndex * itemHeight
      const selectedOption = options[selectedIndex]
      if (selectedOption?.children?.length) {
        setOffsets(selectedOption.children, level + 1)
      }
    }
  }

  setOffsets(props.options, 0)
}

watch(() => props.visible, (newValue) => {
  if (newValue) {
    initColumns()
    if (props.modelValue) {
      initOffsets()
    }
  }
}, { immediate: true })

const onConfirm = () => {
  // 根据每列的偏移量计算选中值
  const selectedValues = offsets.value.map((offset, columnIndex) => {
    const selectedIndex = Math.abs(offset / itemHeight)
    return columns.value[columnIndex][selectedIndex].value
  })

  // 返回所有级别的选中值
  const finalValue = selectedValues
  emit("update:modelValue", finalValue)
  emit('confirm')
  onClose()
}

const onClose = () => {
  emit('close')
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