<script setup lang="ts">
import Popup from "@/components/popup/index.vue"

type Value = number | string

type Option = {
  label: string
  value: Value
}

defineProps<{
  modelValue: undefined | Value
  visible: boolean
  options: Option[]
}>()

const emit = defineEmits(["update:modelValue", "close"])

const selectOption = (option: Option) => {
  emit("update:modelValue", option.value)
  emit("close")
}
</script>

<template>
  <Popup
    :visible="visible"
    position="bottom"
    closeOnOverlayClick
    @close="emit('close')"
  >
    <div
      class="option"
      :class="{ 'active': modelValue === option.value }"
      v-for="option in options"
      :key="option.value"
      @click.stop="selectOption(option)"
    >
      {{ option.label }}
    </div>
  </Popup>
</template>

<style lang="less" scoped>
.option {
  padding: 10px;
  border-radius: 5px;
  border: 2px solid #ccc;
  color: #ccc;

  &:not(:last-child) {
    margin-bottom: 10px;
  }
}

.active {
  color: var(--color-primary);
  border-color: var(--color-primary);
}
</style>
