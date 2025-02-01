<script setup lang="ts">
import Popup from "@/components/popup/index.vue"

type Option = {
  label: string
  value: number
}

defineProps<{
  value: number
  visible: boolean
  options: Option[]
}>()

const emit = defineEmits(["change", "close"])

const selectOption = (option: Option) => {
  emit("change", option)
}
</script>

<template>
  <Popup
    class="picker"
    closeOnOverlayClick
    position="bottom"
    :visible="visible"
    @close="emit('close')"
  >
    <div
      class="option"
      :class="{ 'active': value === option.value }"
      v-for="option in options"
      :key="option.value"
      @click="selectOption(option)"
    >
      {{ option.label }}
    </div>
  </Popup>
</template>

<style lang="less" scoped>
.picker {
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, .7) !important;
}

.option {
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 5px;
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
