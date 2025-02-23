<script setup lang="ts">
import { ref } from "vue"
import DatePicker from "@/components/datePicker/index.vue"
import DemoBlock from "@/components/demo-block/index.vue"
import CodeBlock from "@/components/code-block/index.vue"

const date = ref(new Date())
const dateRange = ref([])

const singleCode = `<DatePicker v-model="date" />`

const rangeCode = `<DatePicker 
  v-model="dateRange" 
  is-range 
/>`
</script>

<template>
  <div class="date-picker-demo">
    <!-- 组件说明 -->
    <div class="doc-section">
      <h2>日期选择器</h2>
      <p>用于选择或输入日期。</p>
    </div>

    <!-- 基础用法 -->
    <div class="doc-section">
      <h3>基础用法</h3>
      <DemoBlock>
        <template #demo>
          <DatePicker v-model="date" />
          <div class="demo-value">选中日期: {{ date }}</div>
        </template>
        <template #code>
          <CodeBlock :code="singleCode" />
        </template>
      </DemoBlock>
    </div>

    <!-- 日期范围 -->
    <div class="doc-section">
      <h3>日期范围</h3>
      <DemoBlock>
        <template #demo>
          <DatePicker v-model="dateRange" is-range />
          <div class="demo-value">选中范围: {{ dateRange }}</div>
        </template>
        <template #code>
          <CodeBlock :code="rangeCode" />
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
            <td>Date / Array</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
            <td>is-range</td>
            <td>是否为范围选择</td>
            <td>boolean</td>
            <td>-</td>
            <td>false</td>
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
.date-picker-demo {
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