<template>
  <div class="switch-demo">
    <!-- 组件说明 -->
    <div class="doc-section">
      <h2>开关组件</h2>
      <p>表示两种相互对立的状态间的切换，多用于触发「开/关」。</p>
    </div>

    <!-- 基础用法 -->
    <div class="doc-section">
      <h3>基础用法</h3>
      <DemoBlock>
        <template #demo>
          <Switch v-model="isOn" />
          <div class="demo-value">开关状态: {{ isOn ? "开" : "关" }}</div>
        </template>
        <template #code>
          <CodeBlock :code="basicCode" />
        </template>
      </DemoBlock>
    </div>

    <!-- 自定义颜色 -->
    <div class="doc-section">
      <h3>自定义颜色</h3>
      <DemoBlock>
        <template #demo>
          <Switch
            v-model="isCustomColor"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
          <div class="demo-value">开关状态: {{ isCustomColor ? "开" : "关" }}</div>
        </template>
        <template #code>
          <CodeBlock :code="customColorCode" />
        </template>
      </DemoBlock>
    </div>

    <!-- 禁用状态 -->
    <div class="doc-section">
      <h3>禁用状态</h3>
      <DemoBlock>
        <template #demo>
          <Switch v-model="isDisabled" disabled />
          <div class="demo-value">开关状态: {{ isDisabled ? "开" : "关" }}</div>
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
            <td>boolean</td>
            <td>true / false</td>
            <td>false</td>
          </tr>
          <tr>
            <td>disabled</td>
            <td>是否禁用</td>
            <td>boolean</td>
            <td>-</td>
            <td>false</td>
          </tr>
          <tr>
            <td>active-color</td>
            <td>打开时的背景色</td>
            <td>string</td>
            <td>-</td>
            <td>#409eff</td>
          </tr>
          <tr>
            <td>inactive-color</td>
            <td>关闭时的背景色</td>
            <td>string</td>
            <td>-</td>
            <td>#dcdfe6</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import Switch from "@/components/switch/index.vue"
import DemoBlock from "@/components/demo-block/index.vue"
import CodeBlock from "@/components/code-block/index.vue"

const isOn = ref(false)
const isCustomColor = ref(true)
const isDisabled = ref(false)

const basicCode = `<Switch v-model="isOn" />`

const customColorCode = `<Switch
  v-model="isCustomColor"
  active-color="#13ce66"
  inactive-color="#ff4949"
/>`

const disabledCode = `<Switch v-model="isDisabled" disabled />`
</script>

<style scoped>
.switch-demo {
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