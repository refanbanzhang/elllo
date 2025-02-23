<template>
  <div class="button-demo">
    <!-- 组件说明 -->
    <div class="doc-section">
      <h2>按钮组件</h2>
      <p>常用的操作按钮，提供多种类型、状态供配置。</p>
    </div>

    <!-- 基础用法展示 -->
    <div class="doc-section">
      <h3>基础用法</h3>
      <DemoBlock>
        <template #demo>
          <div class="demo-buttons">
            <Button>默认按钮</Button>
            <Button type="primary">
              主要按钮
            </Button>
            <Button type="success">
              成功按钮
            </Button>
            <Button type="warning">
              警告按钮
            </Button>
            <Button type="danger">
              危险按钮
            </Button>
            <Button type="info">
              信息按钮
            </Button>
          </div>
        </template>
        <template #code>
          <CodeBlock :code="basicUsageCode" />
        </template>
      </DemoBlock>
    </div>

    <!-- 禁用状态 -->
    <div class="doc-section">
      <h3>禁用状态</h3>
      <DemoBlock>
        <template #demo>
          <div class="demo-buttons">
            <Button disabled>
              默认按钮
            </Button>
            <Button
              type="primary"
              disabled
            >
              主要按钮
            </Button>
            <Button
              type="success"
              disabled
            >
              成功按钮
            </Button>
            <Button
              type="warning"
              disabled
            >
              警告按钮
            </Button>
            <Button
              type="danger"
              disabled
            >
              危险按钮
            </Button>
            <Button
              type="info"
              disabled
            >
              信息按钮
            </Button>
          </div>
        </template>
        <template #code>
          <CodeBlock :code="disabledCode" />
        </template>
      </DemoBlock>
    </div>

    <!-- 图标按钮 -->
    <div class="doc-section">
      <h3>图标按钮</h3>
      <DemoBlock>
        <template #demo>
          <div class="demo-buttons">
            <Button icon="search">
              搜索
            </Button>
            <Button
              type="primary"
              icon="edit"
            >
              编辑
            </Button>
            <Button
              type="success"
              icon="check"
            >
              确认
            </Button>
            <Button
              type="warning"
              icon="star"
            >
              收藏
            </Button>
            <Button
              icon="delete"
              type="danger"
            >
              删除
            </Button>
            <Button icon="share">
              分享
            </Button>
          </div>
        </template>
        <template #code>
          <CodeBlock :code="iconCode" />
        </template>
      </DemoBlock>
    </div>

    <!-- 按钮尺寸 -->
    <div class="doc-section">
      <h3>按钮尺寸</h3>
      <DemoBlock>
        <template #demo>
          <div class="demo-buttons">
            <Button
              size="large"
              type="primary"
            >
              大型按钮
            </Button>
            <Button type="primary">
              默认按钮
            </Button>
            <Button
              size="small"
              type="primary"
            >
              小型按钮
            </Button>
          </div>
        </template>
        <template #code>
          <CodeBlock :code="sizeCode" />
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
            <td>按钮类型</td>
            <td>string</td>
            <td>primary / success / warning / danger / info</td>
            <td>-</td>
          </tr>
          <tr>
            <td>disabled</td>
            <td>是否禁用</td>
            <td>boolean</td>
            <td>true / false</td>
            <td>false</td>
          </tr>
          <tr>
            <td>icon</td>
            <td>图标类名</td>
            <td>string</td>
            <td>参考图标库</td>
            <td>-</td>
          </tr>
          <tr>
            <td>size</td>
            <td>按钮尺寸</td>
            <td>string</td>
            <td>large / default / small / mini</td>
            <td>default</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "@/components/button/index.vue"
import DemoBlock from "@/components/demo-block/index.vue"
import CodeBlock from "@/components/code-block/index.vue"

const basicUsageCode = `<Button>默认按钮</Button>
<Button type="primary">主要按钮</Button>
<Button type="success">成功按钮</Button>
<Button type="warning">警告按钮</Button>
<Button type="danger">危险按钮</Button>
<Button type="info">信息按钮</Button>`

const disabledCode = `<Button disabled>默认按钮</Button>
<Button type="primary" disabled>主要按钮</Button>
<Button type="success" disabled>成功按钮</Button>
<Button type="warning" disabled>警告按钮</Button>
<Button type="danger" disabled>危险按钮</Button>
<Button type="info" disabled>信息按钮</Button>`

const iconCode = `<Button icon="search">搜索</Button>
<Button type="primary" icon="edit">编辑</Button>
<Button type="success" icon="check">确认</Button>
<Button type="warning" icon="star">收藏</Button>
<Button icon="delete" type="danger">删除</Button>
<Button icon="share">分享</Button>`

const sizeCode = `<Button size="large" type="primary">大型按钮</Button>
<Button type="primary">默认按钮</Button>
<Button size="small" type="primary">小型按钮</Button>`
</script>

<style scoped>
.button-demo {
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

.demo-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
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
