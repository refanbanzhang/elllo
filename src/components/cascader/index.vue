<template>
  <div class='cascader-wrapper'>
    <div class='cascader-input' @click='toggleDropdown'>
      <input
        type='text'
        readonly
        :value='selectedLabel'
        :placeholder='placeholder'
      />
      <span class='arrow' :class='{ "arrow-active": isOpen }'>▼</span>
    </div>
    <div v-show='isOpen' class='cascader-dropdown'>
      <div v-for='(menu, index) in activePanels' :key='index' class='cascader-menu'>
        <div
          v-for='item in menu'
          :key='item.value'
          class='cascader-item'
          :class='{ "active": isSelected(item, index) }'
          @click='handleSelect(item, index)'
        >
          {{ item.label }}
          <span v-if='item.children' class='arrow-right'>▶</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  options: {
    type: Array,
    default: () => []
  },
  placeholder: {
    type: String,
    default: '请选择'
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const isOpen = ref(false)
const selected = ref([])
const activePanels = ref([props.options])

const selectedLabel = computed(() => {
  return selected.value.map(item => item.label).join(' / ') || ''
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const isSelected = (item, level) => {
  return selected.value[level]?.value === item.value
}

const handleSelect = (item, level) => {
  // 清除当前层级之后的选中项,保留当前层级之前的选中项
  selected.value = selected.value.slice(0, level)
  selected.value[level] = item

  if (item.children) {
    // 清除当前层级之后的面板
    activePanels.value = activePanels.value.slice(0, level + 1)
    // 添加下一层级的选项到面板中
    activePanels.value.push(item.children)
  } else {
    isOpen.value = false
    emit('update:modelValue', selected.value.map(item => item.value))
    emit('change', selected.value)
  }
}
</script>

<style scoped>
.cascader-wrapper {
  position: relative;
  width: 220px;
}

.cascader-input {
  position: relative;
  width: 100%;
}

.cascader-input input {
  width: 100%;
  height: 32px;
  padding: 0 30px 0 10px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  cursor: pointer;
}

.arrow {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  color: #c0c4cc;
  transition: transform 0.3s;
}

.arrow-active {
  transform: translateY(-50%) rotate(180deg);
}

.cascader-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  margin-top: 5px;
  background: #fff;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
  display: flex;
}

.cascader-menu {
  min-width: 160px;
  border-right: 1px solid #e4e7ed;
}

.cascader-menu:last-child {
  border-right: none;
}

.cascader-item {
  padding: 8px 20px;
  line-height: 1.5;
  cursor: pointer;
  position: relative;
}

.cascader-item:hover {
  background: #f5f7fa;
}

.cascader-item.active {
  color: #409eff;
  font-weight: bold;
}

.arrow-right {
  position: absolute;
  right: 10px;
  font-size: 12px;
  color: #c0c4cc;
}
</style>