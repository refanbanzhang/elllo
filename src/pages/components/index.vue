<script setup lang="ts">
import { ref, reactive } from "vue"
import Input from "@/components/input/index.vue"
import Button from "@/components/button/index.vue"
import Slider from "@/components/slider/index.vue"
import Picker from "@/components/picker/index.vue"
import { Form, FormItem } from "@/components/form"
import type { FormInstance, FormItemRule } from "@/components/form/types"

const formRef = ref<FormInstance>()
const formData = reactive({
  username: "",
  password: "",
  age: 0
})

const rules: FormItemRule = {
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { validator: (value: string) => value.length >= 3, message: "用户名至少3个字符", trigger: "blur" }
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { validator: (value: string) => value.length >= 6, message: "密码至少6个字符", trigger: "blur" }
  ],
  age: [
    { required: true, message: "请输入年龄", trigger: "blur" },
    { validator: (value: number) => value >= 50, message: "年龄至少50岁", trigger: "blur" }
  ]
}

const handleSubmit = async () => {
  if (!formRef.value) {
    return
  }

  const valid = await formRef.value.validate()
  if (valid) {
    console.log("表单验证通过", formData)
  }
}

type Option = {
  label: string
  value: number
}

const volumeValue = ref(30)
const pickerVisible = ref(false)

const options: Option[] =  [
  {
    label: '选项1',
    value: 1,
  },
  {
    label: '选项2',
    value: 2,
  },
  {
    label: '选项3',
    value: 3,
  },
]

const onPickerChange = (value: string) => {
  console.log(value)
}
</script>

<template>
  <div class="page">
    <h2>Form</h2>
    formData: {{ formData }}
    <Form
      ref="formRef"
      :rules="rules"
      :model="formData"
    >
      <FormItem label="用户名" prop="username">
        <Input v-model="formData.username" />
      </FormItem>
      <FormItem label="密码" prop="password">
        <Input type="password" v-model="formData.password" />
      </FormItem>
      <FormItem label="年龄" prop="age">
        <Slider
          v-model="formData.age"
        />
      </FormItem>
      <Button @click="handleSubmit">提交</Button>
    </Form>

    <h2>Picker</h2>
    <Button @click="pickerVisible = true">打开</Button>
    <Picker
      :visible="pickerVisible"
      :value="1"
      :options="options"
      @close="pickerVisible = false"
      @change="onPickerChange"
    />

    <h2>Slider</h2>
    volumeValue: {{ volumeValue }}
    <Slider
      v-model="volumeValue"
    />

    <h2>Button</h2>
    type:
    <Button type="primary">按钮</Button>
    <Button type="secondary">按钮</Button>
    <Button type="success">按钮</Button>
    <Button type="warning">按钮</Button>
    <Button type="danger">按钮</Button>
    <br>
    size:
    <Button type="primary" size="small">按钮</Button>
    <Button type="secondary" size="medium">按钮</Button>
    <Button type="success" size="large">按钮</Button>
    <br>
    loading:
    <Button type="primary" loading>按钮</Button>
    <br>
    icon:
    <Button type="primary">
      icon
      按钮
    </Button>
    <br>
    disabled:
    <Button type="primary" disabled>按钮</Button>
  </div>
</template>

<style lang="less" scoped>
.page {
  padding: 20px;
}
</style>
