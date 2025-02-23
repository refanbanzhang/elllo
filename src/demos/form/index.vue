<script setup lang="ts">
import { ref } from "vue"
import { Form, FormItem } from "@/components/form"
import Input from "@/components/input/index.vue"
import Cascader from "@/components/cascader/index.vue"
import Button from "@/components/button/index.vue"
import Switch from "@/components/switch/index.vue"
import RadioGroup from "@/components/radio-group/index.vue"
import CheckboxGroup from "@/components/checkbox-group/index.vue"
import Rate from "@/components/rate/index.vue"
import DatePicker from "@/components/datePicker/index.vue"
import Picker from "@/components/picker/index.vue"
import DemoBlock from "@/components/demo-block/index.vue"
import CodeBlock from "@/components/code-block/index.vue"

const form = ref(null)
const formData = ref({
  username: "",
  password: "",
  cascader: [],
  switch: false,
  radio: "",
  checkboxGroup: [],
  rate: 0,
  date: new Date(),
  gender: []
})

const rules = {
  username: [
    { required: true, message: "请输入用户名" }
  ],
  password: [
    { required: true, message: "请输入密码" }
  ],
  cascader: [
    { required: true, message: "请选择地址" }
  ],
  radio: [
    { required: true, message: "请选择性别" }
  ],
  rate: [
    { required: true, message: "请评分" },
    { validator: (value: number) => value > 0, message: "评分必须大于0" }
  ],
  date: [
    { required: true, message: "请选择日期" }
  ],
  switch: [
    { required: true, message: "请选择开启通知" }
  ],
  checkboxGroup: [
    { required: true, message: "请选择爱好" }
  ],
  gender: [
    { required: true, message: "请选择性别" }
  ]
}

const addressData = [
  {
    label: "北京",
    value: "beijing",
    children: [
      {
        label: "朝阳区",
        value: "chaoyang"
      }
    ]
  },
  {
    label: "上海",
    value: "shanghai",
    children: [
      {
        label: "浦东新区",
        value: "pudong"
      }
    ]
  }
]

const radioOptions = [
  { label: "男", value: "male" },
  { label: "女", value: "female" }
]

const checkboxOptions = [
  { label: "阅读", value: "reading" },
  { label: "游戏", value: "gaming" },
  { label: "运动", value: "sports" }
]

const pickerOptions = [
  { label: "男", value: "male" },
  { label: "女", value: "female" },
  { label: "其他", value: "other" }
]

const pickerVisible = ref(false)

const onSubmit = async () => {
  const valid = await form.value?.validate()
  if (valid) {
    console.log("提交成功:", formData.value)
  }
}

const onReset = () => {
  form.value?.resetFields()
}

const basicCode = `<Form
  ref="form"
  :model="formData"
  :rules="rules"
>
  <FormItem
    prop="username"
    label="用户名"
  >
    <Input v-model="formData.username" />
  </FormItem>

  <FormItem
    prop="password"
    label="密码"
  >
    <Input type="password" v-model="formData.password" />
  </FormItem>

  <FormItem>
    <Button @click="onSubmit">提交</Button>
    <Button @click="onReset" type="secondary">重置</Button>
  </FormItem>
</Form>`

const validateCode = `const rules = {
  username: [
    { required: true, message: "请输入用户名" }
  ],
  password: [
    { required: true, message: "请输入密码" }
  ]
}`
</script>

<template>
  <div class="form-demo">
    <!-- 组件说明 -->
    <div class="doc-section">
      <h2>表单组件</h2>
      <p>用于创建具有数据收集、校验和提交功能的表单。</p>
    </div>

    <!-- 基础用法 -->
    <div class="doc-section">
      <h3>基础用法</h3>
      <DemoBlock>
        <template #demo>
          <Form
            ref="form"
            :model="formData"
            :rules="rules"
          >
            <FormItem
              prop="username"
              label="用户名"
            >
              <Input v-model="formData.username" />
            </FormItem>

            <FormItem
              prop="password"
              label="密码"
            >
              <Input
                v-model="formData.password"
                type="password"
              />
            </FormItem>

            <FormItem>
              <Button @click="onSubmit">提交</Button>
              <Button
                @click="onReset"
                type="secondary"
              >
                重置
              </Button>
            </FormItem>
          </Form>
        </template>
        <template #code>
          <CodeBlock :code="basicCode" />
        </template>
      </DemoBlock>
    </div>

    <!-- 表单验证 -->
    <div class="doc-section">
      <h3>表单验证</h3>
      <DemoBlock>
        <template #demo>
          <Form
            ref="form"
            :model="formData"
            :rules="rules"
          >
            <FormItem
              prop="cascader"
              label="地址"
            >
              <Cascader
                v-model="formData.cascader"
                :options="addressData"
              />
            </FormItem>

            <FormItem
              prop="radio"
              label="性别"
            >
              <RadioGroup
                v-model="formData.radio"
                :options="radioOptions"
              />
            </FormItem>

            <FormItem
              prop="checkboxGroup"
              label="爱好"
            >
              <CheckboxGroup
                v-model="formData.checkboxGroup"
                :options="checkboxOptions"
              />
            </FormItem>

            <FormItem
              prop="rate"
              label="评分"
            >
              <Rate v-model="formData.rate" />
            </FormItem>
          </Form>
        </template>
        <template #code>
          <CodeBlock :code="validateCode" />
        </template>
      </DemoBlock>
    </div>

    <!-- 属性说明 -->
    <div class="doc-section">
      <h3>Form 属性</h3>
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
            <td>model</td>
            <td>表单数据对象</td>
            <td>object</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
            <td>rules</td>
            <td>表单验证规则</td>
            <td>object</td>
            <td>-</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="doc-section">
      <h3>FormItem 属性</h3>
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
            <td>prop</td>
            <td>表单域字段</td>
            <td>string</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
            <td>label</td>
            <td>标签文本</td>
            <td>string</td>
            <td>-</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="doc-section">
      <h3>Form 方法</h3>
      <table class="props-table">
        <thead>
          <tr>
            <th>方法名</th>
            <th>说明</th>
            <th>参数</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>validate</td>
            <td>对整个表单进行校验</td>
            <td>-</td>
          </tr>
          <tr>
            <td>resetFields</td>
            <td>重置表单</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.form-demo {
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