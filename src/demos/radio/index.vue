<script setup lang="ts">
import { ref } from "vue"
import Radio from "@/components/radio/index.vue"
import RadioGroup from "@/components/radio-group/index.vue"
import DemoBlock from "@/components/demo-block/index.vue"
import CodeBlock from "@/components/code-block/index.vue"

const value = ref("")

const options = [
  { label: "选项1", value: 1 },
  { label: "选项2", value: 2 },
  { label: "选项3", value: 3 }
]

const basicCode = `<RadioGroup v-model="value" :options="options" />`
</script>

<template>
  <div class="radio-demo">
    <!-- 组件说明 -->
    <div class="doc-section">
      <h2>单选框组件</h2>
      <p>在一组备选项中进行单选。</p>
    </div>

    <!-- 基础用法 -->
    <div class="doc-section">
      <h3>基础用法</h3>
      <DemoBlock>
        <template #demo>
          <RadioGroup v-model="value" :options="options" />
          <div class="demo-value">选中值: {{ value }}</div>
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
            <td>绑定值</td>
            <td>string / number</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
            <td>options</td>
            <td>选项数组</td>
            <td>array</td>
            <td>-</td>
            <td>[]</td>
          </tr>
          <tr>
            <td>disabled</td>
            <td>是否禁用</td>
            <td>boolean</td>
            <td>-</td>
            <td>false</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.radio-demo {
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