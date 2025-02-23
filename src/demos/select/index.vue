<script setup lang="ts">
import { ref } from "vue"
import Select from "@/components/select/index.vue"
import DemoBlock from "@/components/demo-block/index.vue"
import CodeBlock from "@/components/code-block/index.vue"

const value = ref("2")
const disabledValue = ref("")

const options = [
  { label: "选项1", value: "1" },
  { label: "选项2", value: "2" },
  { label: "选项3", value: "3", disabled: true },
  { label: "选项4", value: "4" }
]

const basicCode = `<Select
  v-model="value"
  :options="options"
  placeholder="请选择"
/>`

const disabledCode = `<Select
  v-model="value"
  :options="options"
  disabled
  placeholder="禁用状态"
/>`
</script>

<template>
  <div class="select-demo">
    <!-- 组件说明 -->
    <div class="doc-section">
      <h2>选择器组件</h2>
      <p>当选项过多时，使用下拉菜单展示并选择内容。</p>
    </div>

    <!-- 基础用法 -->
    <div class="doc-section">
      <h3>基础用法</h3>
      <DemoBlock>
        <template #demo>
          <Select
            v-model="value"
            :options="options"
            placeholder="请选择"
          />
          <div class="demo-value">选中值: {{ value }}</div>
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
          <Select
            v-model="disabledValue"
            :options="options"
            disabled
            placeholder="禁用状态"
          />
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
          <tr>
            <td>placeholder</td>
            <td>占位文本</td>
            <td>string</td>
            <td>-</td>
            <td>请选择</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.select-demo {
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
