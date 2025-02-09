<template>
  <div class='date-picker'>
    <input type='text' :value="displayValue" @click="toggleCalendar" readonly class='date-input' />

    <div v-if="isOpen" class='calendar'>
      <div class='header'>
        <button @click="prevMonth">&lt;</button>
        <span>{{ currentMonth }} {{ currentYear }}</span>
        <button @click="nextMonth">&gt;</button>
      </div>

      <div class='days'>
        <div v-for="day in ['日', '一', '二', '三', '四', '五', '六']" :key="day" class='day-name'>
          {{ day }}
        </div>

        <div v-for="date in dates" :key="date.date" :class="['day', {
          'selected': isSelected(date.date),
          'in-range': isInRange(date.date),
          'range-start': isRangeStart(date.date),
          'range-end': isRangeEnd(date.date),
          'current-month': date.currentMonth
        }]" @click="selectDate(date.date)">
          {{ date.date.getDate() }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [Date, Array],
    default: () => new Date()
  },
  isRange: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const currentDate = ref(new Date())
const selectedDate = ref(Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue])

// 切换日历显示
const toggleCalendar = () => {
  isOpen.value = !isOpen.value
}

// 格式化日期
const formatDate = (date) => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

// 计算当前月份和年份
const currentMonth = computed(() => {
  const months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
  return months[currentDate.value.getMonth()]
})

const currentYear = computed(() => currentDate.value.getFullYear())

// 生成日历数据
const dates = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)

  const dates = []

  // 添加上个月的日期
  for (let i = firstDay.getDay(); i > 0; i--) {
    dates.push({
      date: new Date(year, month, 1 - i),
      currentMonth: false
    })
  }

  // 添加当前月的日期
  for (let i = 1; i <= lastDay.getDate(); i++) {
    dates.push({
      date: new Date(year, month, i),
      currentMonth: true
    })
  }

  return dates
})

// 格式化显示值
const displayValue = computed(() => {
  if (!props.isRange) {
    return formatDate(selectedDate.value[0])
  }
  if (selectedDate.value.length === 2) {
    return `${formatDate(selectedDate.value[0])} 至 ${formatDate(selectedDate.value[1])}`
  }
  return selectedDate.value[0] ? formatDate(selectedDate.value[0]) : ''
})

// 选择日期
const selectDate = (date) => {
  if (!props.isRange) {
    selectedDate.value = [date]
    emit('update:modelValue', date)
    isOpen.value = false
    return
  }

  if (selectedDate.value.length === 0 || selectedDate.value.length === 2) {
    selectedDate.value = [date]
  } else {
    if (date < selectedDate.value[0]) {
      selectedDate.value = [date, selectedDate.value[0]]
    } else {
      selectedDate.value = [selectedDate.value[0], date]
    }
    emit('update:modelValue', selectedDate.value)
    isOpen.value = false
  }
}

// 判断日期是否被选中
const isSelected = (date) => {
  return selectedDate.value.some(d => d?.toDateString() === date.toDateString())
}

// 判断是否在范围内
const isInRange = (date) => {
  if (!props.isRange || selectedDate.value.length !== 2) return false
  return date > selectedDate.value[0] && date < selectedDate.value[1]
}

// 判断是否是范围起点
const isRangeStart = (date) => {
  if (!props.isRange || !selectedDate.value[0]) return false
  return date.toDateString() === selectedDate.value[0].toDateString()
}

// 判断是否是范围终点
const isRangeEnd = (date) => {
  if (!props.isRange || !selectedDate.value[1]) return false
  return date.toDateString() === selectedDate.value[1].toDateString()
}

// 上个月/下个月
const prevMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1)
}
</script>

<style scoped>
.date-picker {
  position: relative;
  width: 200px;
}

.date-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.calendar {
  position: absolute;
  top: 100%;
  left: 0;
  width: 280px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px;
  margin-top: 4px;
  z-index: 1000;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.day-name {
  text-align: center;
  font-weight: bold;
  padding: 4px;
}

.day {
  text-align: center;
  padding: 4px;
  cursor: pointer;
  border-radius: 4px;
}

.day:hover {
  background: #f0f0f0;
}

.selected {
  background: #007bff;
  color: white !important;
}

.current-month {
  color: #333;
}

.day:not(.current-month) {
  color: #999;
}

.in-range {
  background: #e6f3ff;
}

.range-start {
  background: #007bff;
  color: white !important;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.range-end {
  background: #007bff;
  color: white !important;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>