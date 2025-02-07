<script setup>
const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: ''
  },
  value: {
    type: [String, Number, Boolean],
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const onClick = () => {
  if (props.disabled) {
    return
  }

  emit('update:modelValue', props.value)
}
</script>

<template>
  <div
    class="radio-wrapper"
    :class="{ 'is-disabled': disabled }"
    @click="onClick"
  >
    <span
      class="radio"
      :class="{
        'is-checked': modelValue === value,
        'is-disabled': disabled
      }"
    >
      <span v-show="modelValue === value" class="radio-inner" />
    </span>
    <slot />
  </div>
</template>

<style lang="less" scoped>
.radio-wrapper {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;

  &.is-disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
}

.radio {
  position: relative;
  width: 16px;
  height: 16px;
  border: 1px solid #dcdfe6;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &.is-checked {
    border-color: #409eff;
  }

  .radio-inner {
    width: 8px;
    height: 8px;
    background-color: #409eff;
    border-radius: 50%;
  }
}
</style> 