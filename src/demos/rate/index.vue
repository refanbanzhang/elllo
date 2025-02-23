<script setup lang="ts">
import { ref } from "vue"
import Rate from "@/components/rate/index.vue"
import DemoBlock from "@/components/demo-block/index.vue"
import CodeBlock from "@/components/code-block/index.vue"

const value = ref(3)
const disabledValue = ref(3.5)

const basicCode = `<Rate v-model="value" />`

const disabledCode = `<Rate v-model="value" disabled />`
</script>

<template>
  <div class="rate-demo">
    <!-- 组件说明 -->
    <div class="doc-section">
      <h2>评分组件</h2>
      <p>用于对事物进行评级。</p>
    </div>

    <!-- 基础用法 -->
    <div class="doc-section">
      <h3>基础用法</h3>
      <DemoBlock>
        <template #demo>
          <Rate v-model="value" />
          <div class="demo-value">当前评分: {{ value }}</div>
        </template>
        <template #code>
          <CodeBlock :code="basicCode" />
        </template>
      </DemoBlock>
    </div>

    <!-- 禁用状态 -->
    <div class="doc-section">
      <h3>禁用状态</h3>
      <DemoBlock>
        <template #demo>
          <Rate v-model="disabledValue" disabled />
          <div class="demo-value">当前评分: {{ disabledValue }}</div>
        </template>
        <template #code>
          <CodeBlock :code="disabledCode" />
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
            <td>number</td>
            <td>0-5</td>
            <td>0</td>
          </tr>
          <tr>
            <td>disabled</td>
            <td>是否为只读</td>
            <td>boolean</td>
            <td>-</td>
            <td>false</td>
          </tr>
          <tr>
            <td>allow-half</td>
            <td>是否允许半选</td>
            <td>boolean</td>
            <td>-</td>
            <td>true</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.rate-demo {
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