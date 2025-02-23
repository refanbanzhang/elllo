<script setup lang="ts">
defineProps<{
  items: {
    label: string
    icon: string
  }[],
  modelValue: string
}>()
const emit = defineEmits(["update:modelValue"])

const onClick = (item: { label: string }) => {
  emit("update:modelValue", item.label)
}
</script>

<template>
  <div class="tabs">
    <div
      class="tabs__item"
      :class="{'tabs__item--active': modelValue === item.label}"
      v-for="item in items"
      :key="item.label"
      @click="onClick(item)"
    >
      <component
        class="tabs__icon"
        :is="item.icon"
      />
      {{ item.label }}
    </div>
  </div>
</template>

<style lang="less" scoped>
.tabs {
  display: flex;
  align-items: center;

  &__item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;

    &--active {
      font-weight: bold;
    }
  }

  &__icon {
    width: 25px;
  }
}
</style>
