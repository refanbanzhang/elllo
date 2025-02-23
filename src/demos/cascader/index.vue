<script setup lang="ts">
import { ref } from "vue"
import Cascader from "@/components/cascader/index.vue"
import DemoBlock from "@/components/demo-block/index.vue"
import CodeBlock from "@/components/code-block/index.vue"

const value = ref([])

const options = [
  {
    label: "广东省",
    value: "guangdong",
    children: [
      {
        label: "广州市",
        value: "guangzhou",
        children: [
          { label: "天河区", value: "tianhe" },
          { label: "越秀区", value: "yuexiu" }
        ]
      }
    ]
  },
  {
    label: "浙江省", 
    value: "zhejiang",
    children: [
      {
        label: "杭州市",
        value: "hangzhou",
        children: [
          { label: "西湖区", value: "xihu" },
          { label: "上城区", value: "shangcheng" }
        ]
      }
    ]
  }
]

const basicUsageCode = `<Cascader
  v-model="value"
  :options="options"
  placeholder="请选择地区"
/>`
</script>

<template>
  <div class="cascader-demo">
    <!-- 组件说明 -->
    <div class="doc-section">
      <h2>级联选择器</h2>
      <p>当一个数据集合有清晰的层级结构时,可通过级联选择器逐级查看并选择。</p>
    </div>

    <!-- 基础用法 -->
    <div class="doc-section">
      <h3>基础用法</h3>
      <DemoBlock>
        <template #demo>
          <Cascader
            v-model="value"
            :options="options"
            placeholder="请选择地区"
          />
          <div class="demo-value">
            选中值: {{ value }}
          </div>
        </template>
        <template #code>
          <CodeBlock :code="basicUsageCode" />
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
            <td>value / v-model</td>
            <td>选中项绑定值</td>
            <td>array</td>
            <td>-</td>
            <td>[]</td>
          </tr>
          <tr>
            <td>options</td>
            <td>可选项数据源</td>
            <td>array</td>
            <td>-</td>
            <td>[]</td>
          </tr>
          <tr>
            <td>placeholder</td>
            <td>输入框占位文本</td>
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
.cascader-demo {
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