<script setup lang="ts">
import { ref } from "vue"
import Input from "@/components/input/index.vue"
import DemoBlock from "@/components/demo-block/index.vue"
import CodeBlock from "@/components/code-block/index.vue"

const value = ref("")
const password = ref("")
const disabled = ref("")
const clearable = ref("")

// 示例代码字符串
const basicUsageCode = "<Input v-model=\"value\" placeholder=\"请输入内容\" />"

const passwordCode = `<Input
  v-model="password"
  type="password"
  placeholder="请输入密码"
/>`

const disabledCode = `<Input
  v-model="disabled"
  disabled
  placeholder="禁用状态"
/>`

const clearableCode = `<Input
  v-model="clearable"
  clearable
  placeholder="可清除内容"
/>`
</script>

<template>
  <div class="input-demo">
    <!-- 组件说明 -->
    <div class="doc-section">
      <h2>输入框组件</h2>
      <p>基础表单组件，支持 input 和 textarea，并在原生控件基础上进行了功能扩展。</p>
    </div>

    <!-- 基础用法 -->
    <div class="doc-section">
      <h3>基础用法</h3>
      <DemoBlock>
        <template #demo>
          <Input
            v-model="value"
            placeholder="请输入内容"
          />
          <div class="demo-value">
            当前值: {{ value }}
          </div>
        </template>
        <template #code>
          <CodeBlock :code="basicUsageCode" />
        </template>
      </DemoBlock>
    </div>

    <!-- 密码输入框 -->
    <div class="doc-section">
      <h3>密码输入框</h3>
      <DemoBlock>
        <template #demo>
          <Input
            v-model="password"
            type="password"
            placeholder="请输入密码"
          />
        </template>
        <template #code>
          <CodeBlock :code="passwordCode" />
        </template>
      </DemoBlock>
    </div>

    <!-- 禁用状态 -->
    <div class="doc-section">
      <h3>禁用状态</h3>
      <DemoBlock>
        <template #demo>
          <Input
            v-model="disabled"
            disabled
            placeholder="禁用状态"
          />
        </template>
        <template #code>
          <CodeBlock :code="disabledCode" />
        </template>
      </DemoBlock>
    </div>

    <!-- 可清除内容 -->
    <div class="doc-section">
      <h3>可清除内容</h3>
      <DemoBlock>
        <template #demo>
          <Input
            v-model="clearable"
            clearable
            placeholder="可清除内容"
          />
        </template>
        <template #code>
          <CodeBlock :code="clearableCode" />
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
            <td>type</td>
            <td>输入框类型</td>
            <td>string</td>
            <td>text / password</td>
            <td>text</td>
          </tr>
          <tr>
            <td>disabled</td>
            <td>是否禁用</td>
            <td>boolean</td>
            <td>true / false</td>
            <td>false</td>
          </tr>
          <tr>
            <td>clearable</td>
            <td>是否可清除</td>
            <td>boolean</td>
            <td>true / false</td>
            <td>false</td>
          </tr>
          <tr>
            <td>placeholder</td>
            <td>占位文本</td>
            <td>string</td>
            <td>-</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.input-demo {
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