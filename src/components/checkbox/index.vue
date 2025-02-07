<script setup>
const props = defineProps({
  // 是否选中
  modelValue: {
    type: Boolean,
    default: false
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

// 处理点击事件
const onClick = () => {
  if (props.disabled) {
    return
  }

  emit('update:modelValue', !props.modelValue)
}
</script>

<template>
  <div
    class="checkbox-wrapper"
    :class="{ 'is-disabled': disabled }"
    @click="onClick"
  >
    <span
      class="checkbox"
      :class="{
        'is-checked': modelValue,
        'is-disabled': disabled
      }"
    >
      <span v-show="modelValue" class="checkbox-inner">✓</span>
    </span>
  </div>
</template>

<style lang="less" scoped>
.checkbox-wrapper {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;

  &.is-disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
}

.checkbox {
  position: relative;
  width: 16px;
  height: 16px;
  border: 1px solid #dcdfe6;
  border-radius: 2px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &.is-checked {
    background-color: #409eff;
    border-color: #409eff;
  }

  .checkbox-inner {
    color: white;
    font-size: 12px;
    line-height: 1;
  }
}
</style>
