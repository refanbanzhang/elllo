<script setup lang="ts">
import { ref } from "vue"
import Button from "@/components/button/index.vue"
import Picker from "@/components/picker/index.vue"
import DemoBlock from "@/components/demo-block/index.vue"
import CodeBlock from "@/components/code-block/index.vue"

const value = ref("")
const visible = ref(false)

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
      },
      {
        label: "深圳市",
        value: "shenzhen",
        children: [
          {
            label: "南山区",
            value: "nanshan",
            children: [
              { label: "南山街道", value: "nanshanjiedao" },
              { label: "南头街道", value: "nantoujiedao" }
            ]
          },
          {
            label: "福田区",
            value: "futian",
            children: [
              { label: "福田街道", value: "futianjiedao" },
              { label: "华强北街道", value: "huaqiangbeijiedao" }
            ]
          }
        ]
      }
    ]
  },
  {
    label: "湖南省",
    value: "hunan",
    children: [
      {
        label: "长沙市", value: "changsha", children: [
          { label: "芙蓉区", value: "furong" },
          { label: "天心区", value: "tianxin" }
        ]
      },
      {
        label: "株洲市", value: "zhuzhou", children: [
          { label: "荷塘区", value: "hetang" },
          { label: "芦淞区", value: "lusong" }
        ]
      }
    ]
  },
  {
    label: "北京市",
    value: "beijing",
    children: [
      { label: "东城区", value: "dongcheng" },
      { label: "西城区", value: "xicheng" }
    ]
  }
]

const basicCode = `<Button @click="visible = true">打开选择器</Button>

<Picker
  v-model="value"
  :visible="visible"
  :options="options"
  title="请选择"
  @close="visible = false"
/>`
</script>

<template>
  <div class="picker-demo">
    <!-- 组件说明 -->
    <div class="doc-section">
      <h2>移动端选择器</h2>
      <p>移动端使用的选择器组件,支持单列、多列、级联等多种形式。</p>
    </div>

    <!-- 基础用法 -->
    <div class="doc-section">
      <h3>基础用法</h3>
      <DemoBlock>
        <template #demo>
          <Button @click="visible = true">打开选择器</Button>
          <Picker
            v-model="value"
            :visible="visible"
            :options="options"
            title="请选择"
            @close="visible = false"
          />
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
            <td>选中项的值</td>
            <td>string / number / array</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
            <td>visible</td>
            <td>是否显示选择器</td>
            <td>boolean</td>
            <td>-</td>
            <td>false</td>
          </tr>
          <tr>
            <td>options</td>
            <td>选项数据</td>
            <td>array</td>
            <td>-</td>
            <td>[]</td>
          </tr>
          <tr>
            <td>title</td>
            <td>选择器标题</td>
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
.picker-demo {
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