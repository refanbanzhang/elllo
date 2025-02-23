<template>
  <div class="demo-block">
    <div class="demo-block__display">
      <slot name="demo" />
    </div>
    <div class="demo-block__code">
      <div
        class="demo-block__code-control"
        @click="toggleCode"
      >
        <span>{{ expanded ? "隐藏代码" : "显示代码" }}</span>
        <span
          class="icon"
          :class="{ expanded }"
        >▼</span>
      </div>
      <div
        class="demo-block__code-content"
        v-show="expanded"
      >
        <slot name="code" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

const expanded = ref(false)
const toggleCode = () => expanded.value = !expanded.value
</script>

<style scoped>
.demo-block {
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  margin-bottom: 24px;
}

.demo-block__display {
  padding: 24px;
  border-bottom: 1px solid #e4e7ed;
}

.demo-block__code-control {
  padding: 8px 16px;
  color: #409eff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  margin-left: 8px;
  transition: transform 0.3s;
}

.icon.expanded {
  transform: rotate(-180deg);
}

.demo-block__code-content {
  border-top: 1px solid #e4e7ed;
}
</style>