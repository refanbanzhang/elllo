<script setup lang="ts">
import { ref } from "vue"
import Button from "@/components/button/index.vue"
import Popup from "@/components/popup/index.vue"
import DemoBlock from "@/components/demo-block/index.vue"
import CodeBlock from "@/components/code-block/index.vue"

const visible = ref(false)
const bottomVisible = ref(false)

const basicCode = `<Button @click="visible = true">打开弹窗</Button>

<Popup :visible="visible" @close="visible = false">
  <div style="padding: 20px">
    这是一个基础弹窗
    <Button @click="visible = false">关闭</Button>
  </div>
</Popup>`

const bottomCode = `<Button @click="bottomVisible = true">打开底部弹窗</Button>

<Popup
  :visible="bottomVisible"
  position="bottom"
  @close="bottomVisible = false"
>
  <div style="padding: 20px">
    这是一个底部弹窗
    <Button @click="bottomVisible = false">关闭</Button>
  </div>
</Popup>`
</script>

<template>
  <div class="popup-demo">
    <!-- 组件说明 -->
    <div class="doc-section">
      <h2>弹出层组件</h2>
      <p>弹出层容器，用于展示弹窗、信息提示等内容，支持多个方向。</p>
    </div>

    <!-- 基础用法 -->
    <div class="doc-section">
      <h3>基础用法</h3>
      <DemoBlock>
        <template #demo>
          <Button @click="visible = true">打开弹窗</Button>
          <Popup :visible="visible" @close="visible = false">
            <div style="padding: 20px">
              这是一个基础弹窗
              <Button @click="visible = false">关闭</Button>
            </div>
          </Popup>
        </template>
        <template #code>
          <CodeBlock :code="basicCode" />
        </template>
      </DemoBlock>
    </div>

    <!-- 底部弹出 -->
    <div class="doc-section">
      <h3>底部弹出</h3>
      <DemoBlock>
        <template #demo>
          <Button @click="bottomVisible = true">打开底部弹窗</Button>
          <Popup
            :visible="bottomVisible"
            position="bottom"
            @close="bottomVisible = false"
          >
            <div style="padding: 20px">
              这是一个底部弹窗
              <Button @click="bottomVisible = false">关闭</Button>
            </div>
          </Popup>
        </template>
        <template #code>
          <CodeBlock :code="bottomCode" />
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
            <td>visible</td>
            <td>是否显示弹出层</td>
            <td>boolean</td>
            <td>-</td>
            <td>false</td>
          </tr>
          <tr>
            <td>position</td>
            <td>弹出位置</td>
            <td>string</td>
            <td>top / right / bottom / left</td>
            <td>center</td>
          </tr>
          <tr>
            <td>overlay</td>
            <td>是否显示遮罩层</td>
            <td>boolean</td>
            <td>-</td>
            <td>true</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 事件说明 -->
    <div class="doc-section">
      <h3>事件说明</h3>
      <table class="props-table">
        <thead>
          <tr>
            <th>事件名</th>
            <th>说明</th>
            <th>回调参数</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>close</td>
            <td>关闭弹出层时触发</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.popup-demo {
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