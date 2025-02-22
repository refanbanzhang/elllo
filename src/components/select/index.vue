<script setup lang="ts">
import { ref, computed } from "vue"
import IconArrow from "@/assets/arrow.svg"

interface Option {
  label: string
  value: string | number
  disabled?: boolean
}

const props = defineProps<{
  modelValue?: string | number
  options: Option[]
  placeholder?: string
  disabled?: boolean
}>()

const emit = defineEmits<{
  "update:modelValue": [value: string | number]
}>()

const isOpen = ref(false)
const selectedLabel = computed(() => {
  const selected = props.options.find(option => option.value === props.modelValue)
  return selected?.label || props.placeholder || "请选择"
})

const toggleDropdown = () => {
  if (props.disabled) {
    return
  }

  isOpen.value = !isOpen.value
}

const selectOption = (option: Option) => {
  if (option.disabled) {
    return
  }

  emit("update:modelValue", option.value)
  isOpen.value = false
}

const closeDropdown = () => {
  isOpen.value = false
}
</script>

<template>
  <div
    class="select-wrapper"
    :class="{ 'is-disabled': disabled }"
  >
    <div
      class="select-trigger"
      @click="toggleDropdown"
    >
      <span class="select-value">{{ selectedLabel }}</span>
      <IconArrow
        class="select-arrow"
        :class="{ 'is-open': isOpen }"
      />
    </div>
    <div
      v-if="isOpen"
      class="select-dropdown"
    >
      <div
        v-for="option in options"
        :key="option.value"
        class="select-option"
        :class="{
          'is-selected': option.value === modelValue,
          'is-disabled': option.disabled
        }"
        @click="selectOption(option)"
      >
        {{ option.label }}
      </div>
    </div>
    <div
      v-if="isOpen"
      class="select-mask"
      @click="closeDropdown"
    />
  </div>
</template>

<style lang="less" scoped>
.select-wrapper {
  position: relative;
  width: 100%;

  &.is-disabled {
    opacity: 0.5;
    cursor: not-allowed;

    .select-trigger {
      pointer-events: none;
    }
  }
}

.select-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  cursor: pointer;
  background: #fff;
  transition: all 0.2s;

  &:hover {
    border-color: #409eff;
  }
}

.select-value {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.select-arrow {
  width: 12px;
  height: 12px;
  margin-left: 8px;
  transition: transform 0.2s;
  fill: #c0c4cc;

  &.is-open {
    transform: rotate(180deg);
  }
}

.select-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  max-height: 200px;
  overflow-y: auto;
  background: #fff;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
  z-index: 100;
}

.select-option {
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(.is-disabled) {
    background: #f5f7fa;
  }

  &.is-selected {
    color: #409eff;
    font-weight: bold;
  }

  &.is-disabled {
    color: #c0c4cc;
    cursor: not-allowed;
  }
}

.select-mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
}
</style> 