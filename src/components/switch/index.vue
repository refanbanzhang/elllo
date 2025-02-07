<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  activeColor: {
    type: String,
    default: '#409EFF'
  },
  inactiveColor: {
    type: String,
    default: '#DCDFE6'
  }
})

const emit = defineEmits(['update:modelValue'])

const toggle = () => {
  emit('update:modelValue', !props.modelValue)
}
</script>

<template>
  <div
    class="switch"
    :class="{ 'is-checked': modelValue }"
    :style="{
      backgroundColor: modelValue ? activeColor : inactiveColor 
    }"
    @click="toggle"
  >
    <span class="switch-core" />
  </div>
</template>

<style lang="less" scoped>
.switch {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 40px;
  height: 20px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;

  .switch-core {
    position: absolute;
    left: 2px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #fff;
    transition: all 0.3s;
  }

  &.is-checked {
    .switch-core {
      left: 22px;
    }
  }
}
</style>
