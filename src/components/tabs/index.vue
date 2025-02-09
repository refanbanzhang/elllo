<script setup lang="ts">
import IconPlay from "@/assets/play.svg"

const props = defineProps({
  items: {
    type: Array,
    required: true,
    default: () => []
  },
  modelValue: {
    type: [String, Number],
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const handleClick = (item) => {
  emit('update:modelValue', item.label)
}
</script>

<template>
  <div class="tabs">
    <div
      class="tabs__item"
      :class="{'tabs__item--active': modelValue === item.label}"
      v-for="item in items"
      :key="item.label"
      @click="handleClick(item)"
    >
      <component class="tabs__icon" :is="item.icon" />
      {{ item.label }}
    </div>
  </div>
</template>

<style lang="less" scoped>
@height: 60px;

.tabs {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: @height;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 80%);

  &__item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: rgb(179, 179, 179);
    font-size: 12px;
  }

  &__item--active {
    color: #fff;
  }

  &__icon {
    width: 25px;
    height: 25px;
  }
}
</style>
