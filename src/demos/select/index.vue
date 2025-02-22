<script setup>
import { ref } from "vue"
import Select from "@/components/select/index.vue"

const options = [
  { label: "选项1", value: "1" },
  { label: "选项2", value: "2" },
  { label: "选项3", value: "3", disabled: true },
  { label: "选项4", value: "4" }
]
const value = ref("2")
</script>

<template>
  <div class="select-demo">
    <h3>基础用法</h3>
    <Select
      v-model="value"
      :options="options"
      placeholder="请选择"
    />
    <div>选中值: {{ value }}</div>

    <h3>禁用状态</h3>
    <Select
      v-model="value"
      :options="options"
      disabled
      placeholder="禁用状态"
    />
  </div>
</template>

<style scoped>
.select-demo {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

h3 {
  margin: 0;
}
</style>
