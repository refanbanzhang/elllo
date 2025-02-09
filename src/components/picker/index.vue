<template>
  <Popup :visible="visible" position="bottom" @close="onClose" closeOnOverlayClick>
    <div class='picker-content'>
      <div class='picker-header'>
        <div class='picker-cancel' @click='onClose'>取消</div>
        <div class='picker-title'>{{ props.title }}</div>
        <div class='picker-confirm' @click='onConfirm'>确定</div>
      </div>

      <div
        class='picker-body'
        @touchstart='onTouchStart'
        @touchmove='onTouchMove'
        @touchend='onTouchEnd'
      >
        <div class='picker-column' :style='{ transform: `translateY(${offset}px)` }'>
          <div
            v-for='item in props.options'
            :key='item.value'
            class='picker-item'
          >
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

// 触摸事件处理
const onTouchStart = (e) => {
  // 记录触摸起始位置的Y坐标
  startY.value = e.touches[0].clientY
  // 记录当前偏移量,用于计算滑动距离
  moveY.value = offset.value
  // 重置速度相关变量
  lastY.value = e.touches[0].clientY
  lastTime.value = Date.now()
  velocity.value = 0
}

const onTouchMove = (e) => {
  // 计算手指移动的距离
  const deltaY = e.touches[0].clientY - startY.value
  // 更新偏移量 = 初始偏移量 + 移动距离
  offset.value = moveY.value + deltaY

  // 计算速度
  const now = Date.now()
  const deltaTime = now - lastTime.value
  if (deltaTime > 0) {
    velocity.value = (e.touches[0].clientY - lastY.value) / deltaTime
  }
}

const onTouchEnd = () => {
  // 根据速度计算惯性滚动距离
  const momentum = velocity.value * 300 // 调整系数控制惯性大小
  const targetOffset = offset.value + momentum

  // 限制边界
  const maxOffset = 0
  const minOffset = -(props.options.length - 1) * itemHeight
  const boundedOffset = Math.max(Math.min(targetOffset, maxOffset), minOffset)

  // 滚动到最近的选项
  offset.value = Math.round(boundedOffset / itemHeight) * itemHeight
}

const initDefaultValue = () => {
  // 如果有传入的modelValue，计算对应的偏移量
  if (props.modelValue) {
    const selectedIndex = props.options.findIndex(item => item.value === props.modelValue)
    const hasValue = selectedIndex !== -1
    if (hasValue) {
      offset.value = -selectedIndex * itemHeight
    }
  } else if (props.options.length > 0) {
    // 如果没有传入modelValue，默认选中第一项
    emit('update:modelValue', props.options[0].value)
  }
}

onMounted(() => {
  initDefaultValue()
})

const onConfirm = () => {
  // 确保有选中值
  const index = Math.abs(offset.value / itemHeight)
  emit('update:modelValue', props.options[index].value)
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
  height: 220px;
  position: relative;
  overflow: hidden;
  mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    transparent 10%,
    #000 40%,
    #000 60%,
    transparent 90%,
    transparent 100%
  );
}

.picker-column {
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