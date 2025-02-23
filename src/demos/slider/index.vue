<script setup lang="ts">
import { ref } from "vue"
import Slider from "@/components/slider/index.vue"
import DemoBlock from "@/components/demo-block/index.vue"
import CodeBlock from "@/components/code-block/index.vue"

const value = ref(50)
const rangeValue = ref([20, 80])
const disabledValue = ref(30)

const basicCode = `<Slider v-model="value" />`

const rangeCode = `<Slider v-model="rangeValue" range />`

const disabledCode = `<Slider v-model="value" disabled />`
</script>

<template>
  <div class="slider-demo">
    <!-- 组件说明 -->
    <div class="doc-section">
      <h2>滑块组件</h2>
      <p>通过拖动滑块在一个固定区间内进行选择。</p>
    </div>

    <!-- 基础用法 -->
    <div class="doc-section">
      <h3>基础用法</h3>
      <DemoBlock>
        <template #demo>
          <Slider v-model="value" />
          <div class="demo-value">当前值: {{ value }}</div>
        </template>
        <template #code>
          <CodeBlock :code="basicCode" />
        </template>
      </DemoBlock>
    </div>

    <!-- 范围选择 -->
    <div class="doc-section">
      <h3>范围选择</h3>
      <DemoBlock>
        <template #demo>
          <Slider v-model="rangeValue" range />
          <div class="demo-value">当前范围: {{ rangeValue }}</div>
        </template>
        <template #code>
          <CodeBlock :code="rangeCode" />
        </template>
      </DemoBlock>
    </div>

    <!-- 禁用状态 -->
    <div class="doc-section">
      <h3>禁用状态</h3>
      <DemoBlock>
        <template #demo>
          <Slider v-model="disabledValue" disabled />
          <div class="demo-value">当前值: {{ disabledValue }}</div>
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
            <td>number / array</td>
            <td>-</td>
            <td>0</td>
          </tr>
          <tr>
            <td>min</td>
            <td>最小值</td>
            <td>number</td>
            <td>-</td>
            <td>0</td>
          </tr>
          <tr>
            <td>max</td>
            <td>最大值</td>
            <td>number</td>
            <td>-</td>
            <td>100</td>
          </tr>
          <tr>
            <td>step</td>
            <td>步长</td>
            <td>number</td>
            <td>-</td>
            <td>1</td>
          </tr>
          <tr>
            <td>range</td>
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
.slider-demo {
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