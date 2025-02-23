<script setup lang="ts">
import { ref } from "vue"
import Modal from "@/components/modal/index.vue"
import Button from "@/components/button/index.vue"
import DemoBlock from "@/components/demo-block/index.vue"
import CodeBlock from "@/components/code-block/index.vue"

const isVisible1 = ref(false)
const isVisible2 = ref(false)

const basicCode = `<Button @click="isVisible = true">打开弹窗</Button>

<Modal
  :visible="isVisible"
  title="提示"
  @confirm="isVisible = false"
  @cancel="isVisible = false"
>
  <div>这是一个模态框的内容</div>
</Modal>`

const closeableCode = `<Button @click="isVisible = true">打开弹窗</Button>

<Modal
  :visible="isVisible"
  show-close
  title="提示"
  @confirm="isVisible = false"
  @cancel="isVisible = false"
>
  <div>这是一个模态框的内容</div>
</Modal>`
</script>

<template>
  <div class="modal-demo">
    <!-- 组件说明 -->
    <div class="doc-section">
      <h2>模态框组件</h2>
      <p>模态对话框。在浮层中显示需要用户处理的内容。</p>
    </div>

    <!-- 基础用法 -->
    <div class="doc-section">
      <h3>基础用法</h3>
      <DemoBlock>
        <template #demo>
          <Button @click="isVisible1 = true">打开弹窗</Button>
          <Modal
            :visible="isVisible1"
            title="提示"
            @confirm="isVisible1 = false"
            @cancel="isVisible1 = false"
          >
            <div>这是一个模态框的内容</div>
          </Modal>
        </template>
        <template #code>
          <CodeBlock :code="basicCode" />
        </template>
      </DemoBlock>
    </div>

    <!-- 显示关闭按钮 -->
    <div class="doc-section">
      <h3>显示关闭按钮</h3>
      <DemoBlock>
        <template #demo>
          <Button @click="isVisible2 = true">打开弹窗</Button>
          <Modal
            :visible="isVisible2"
            show-close
            title="提示"
            @confirm="isVisible2 = false"
            @cancel="isVisible2 = false"
          >
            <div>这是一个模态框的内容</div>
          </Modal>
        </template>
        <template #code>
          <CodeBlock :code="closeableCode" />
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
            <td>是否显示模态框</td>
            <td>boolean</td>
            <td>-</td>
            <td>false</td>
          </tr>
          <tr>
            <td>title</td>
            <td>标题</td>
            <td>string</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
            <td>show-close</td>
            <td>是否显示关闭按钮</td>
            <td>boolean</td>
            <td>-</td>
            <td>false</td>
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
            <td>confirm</td>
            <td>点击确认按钮时触发</td>
            <td>-</td>
          </tr>
          <tr>
            <td>cancel</td>
            <td>点击取消或关闭按钮时触发</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.modal-demo {
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
