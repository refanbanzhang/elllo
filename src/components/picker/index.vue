<script setup lang="ts">
import Popup from "@/components/popup/index.vue"

defineProps<{
  visible: boolean
  options: string[]
}>()

const emit = defineEmits(["change"])

const selectOption = (option: string) => {
  emit("change", option)
}
</script>

<template>
  <Popup class="picker" position="bottom" :visible="visible">
    <div
      class="option"
      v-for="option in options"
      :key="option"
      @click="selectOption(option)"
    >
      {{ option }}
    </div>
  </Popup>
</template>

<style lang="less" scoped>
.picker {
  display: flex;
  flex-direction: column;
}

.option {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;

  &:not(:last-child) {
    margin-bottom: 10px;
  }
}
</style>
