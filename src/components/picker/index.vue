<script setup lang="ts">
import { ref } from "vue"
import Popup from "@/components/popup/index.vue"

type Value = number | string

interface Panel {
  label: string
  value: Value
  children?: Panel[]
}

const props = defineProps<{
  modelValue: Panel[]
  visible: boolean
  options: Panel[]
}>()

const emit = defineEmits(['update:modelValue', 'close'])

const panels = ref<Panel[][]>([props.options])
const selected = ref<Panel[]>(props.modelValue)

const selectOption = (panel: Panel, level: number) => {
  // 清除当前层级之后的选中项,保留当前层级之前的选中项
  selected.value = selected.value.slice(0, level)
  selected.value[level] = panel

  if (panel.children) {
    // 如果有子选项，将当前值加入路径
    panels.value = panels.value.slice(0, level + 1)
    panels.value.push(panel.children)
  } else {
    panels.value = panels.value.slice(0, level + 1)
    emit('update:modelValue', selected.value.map(item => item.value))
    emit('close')
  }
}

const isSelected = (option: Panel, level: number) => {
  return selected.value[level]?.value === option.value
}
</script>

<template>
  <Popup
    :visible="visible"
    position="bottom"
    closeOnOverlayClick
    @close="emit('close')"
  >
    <div class="picker">
      <div
        class="panel"
        v-for="(panel, panelIndex) in panels"
        :key="panelIndex"
      >
        <div
          class="option"
          :class="{
            'active': isSelected(option, panelIndex),
            'has-children': option.children?.length
          }"
          v-for="option in panel"
          :key="option.value"
          @click.stop="selectOption(option, panelIndex)"
        >
          {{ option.label }}
          <span v-if="option.children?.length" class="arrow">›</span>
        </div>
      </div>
    </div>
  </Popup>
</template>

<style lang="less" scoped>
.picker {
  display: flex;
  gap: 10px;
  max-height: 300px;
  padding: 10px;
}

.panels {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
}

.option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  border: 2px solid #ccc;
  color: #ccc;
}

.active {
  color: var(--color-primary);
  border-color: var(--color-primary);
}

.has-children {
  cursor: pointer;
}

.arrow {
  font-size: 18px;
}
</style>
