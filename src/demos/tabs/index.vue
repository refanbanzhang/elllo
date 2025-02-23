<script setup lang="ts">
import { ref } from "vue"
import Tabs from "@/components/tabs/index.vue"
import DemoBlock from "@/components/demo-block/index.vue"
import CodeBlock from "@/components/code-block/index.vue"

const modelValue = ref("Home")

const items = [
  {
    label: "Home",
    icon: "home"
  },
  {
    label: "Search",
    icon: "search"
  },
  {
    label: "Settings",
    icon: "settings"
  }
]

const basicCode = `<Tabs :items="items" v-model="modelValue" />`
</script>

<template>
  <div class="tabs-demo">
    <!-- 组件说明 -->
    <div class="doc-section">
      <h2>标签页组件</h2>
      <p>用于在不同的内容区域之间进行切换。</p>
    </div>

    <!-- 基础用法 -->
    <div class="doc-section">
      <h3>基础用法</h3>
      <DemoBlock>
        <template #demo>
          <div style="background: #000; padding: 20px">
            <Tabs :items="items" v-model="modelValue" />
          </div>
          <div class="demo-value">当前标签: {{ modelValue }}</div>
        </template>
        <template #code>
          <CodeBlock :code="basicCode" />
        </template>
      </DemoBlock>
    </div>

    <!-- 属性说明 -->
    <div class="doc-section">
      <h3>属性说明</h3>
      <table class="props-table">
        <thead>
          <tr>
            <th>属性</th>
            <th>说明</th>
            <th>类型</th>
            <th>可选值</th>
            <th>默认值</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>v-model</td>
            <td>当前激活的标签</td>
            <td>string</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
            <td>items</td>
            <td>标签项配置</td>
            <td>array</td>
            <td>-</td>
            <td>[]</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.tabs-demo {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

.doc-section {
  margin-bottom: 30px;
}

.doc-section h2 {
  font-size: 24px;
  margin-bottom: 16px;
}

.doc-section h3 {
  font-size: 20px;
  margin-bottom: 16px;
}

.demo-value {
  margin-top: 10px;
  color: #666;
}

.props-table {
  width: 100%;
  border-collapse: collapse;
}

.props-table th,
.props-table td {
  border: 1px solid #dcdfe6;
  padding: 12px;
  text-align: left;
}

.props-table th {
  background: #f5f7fa;
}
</style>