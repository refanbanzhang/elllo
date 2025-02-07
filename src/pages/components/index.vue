<script setup lang="ts">
import { ref, reactive } from "vue"
import Input from "@/components/input/index.vue"
import Button from "@/components/button/index.vue"
import Slider from "@/components/slider/index.vue"
import Picker from "@/components/picker/index.vue"
import { Form, FormItem } from "@/components/form"
import type { FormInstance, FormItemRule } from "@/components/form/types"
import Switch from "@/components/switch/index.vue"
import Checkbox from "@/components/checkbox/index.vue"
import CheckboxGroup from "@/components/checkbox-group/index.vue"
import RadioGroup from "@/components/radio-group/index.vue"
import Rate from '@/components/rate/index.vue'
import Cascader from '@/components/cascader/index.vue'

const formRef = ref<FormInstance>()
const formData = reactive({
  username: "",
  password: "",
  age: 0,
  gender: [],
  agree: false,
  hobbies: [ 1, 2 ],
  fruit: null,
  rating: 1,
  address: [],
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
    { validator: (value: number) => value >= 50, message: "年龄至少50岁", trigger: "change" }
  ],
  gender: [
    { required: true, message: "请选择性别", trigger: "change" },
    { validator: (value: number) => value >= 0 && value <= 1, message: "性别选择错误", trigger: "change" }
  ],
  agree: [
    { required: true, message: "请同意用户协议", trigger: "change" }
  ],
  hobbies: [
    { required: true, message: "请选择爱好", trigger: "change" }
  ],
  fruit: [
    { required: true, message: "请选择喜欢的水果", trigger: "change" }
  ],
  rating: [
    { required: true, message: '请评分', trigger: 'change' },
    { validator: (value: number) => value >= 3, message: '评分不能低于3分', trigger: 'change' }
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
  children?: Option[]
}

const volumeValue = ref(30)
const pickerVisible = ref(false)

const options: Option[] =  [
  {
    label: '深圳',
    value: 1,
    children: [
      {
        label: '南山区',
        value: 11,
        children: [
          {
            label: '南山街道',
            value: 111,
          },
          {
            label: '南山街道2',
            value: 112,
          },
        ]
      },
      {
        label: '福田区',
        value: 12,
      },
    ]
  },
  {
    label: '选项2',
    value: 2,
  },
  {
    label: '选项3',
    value: 3,
  },
  {
    label: '选项4',
    value: 4,
  },
  {
    label: '选项5',
    value: 5,
  },
  {
    label: '选项6',
    value: 6,
  },
  {
    label: '选项7',
    value: 7,
  },
  {
    label: '选项8',
    value: 8,
  },
  {
    label: '选项9',
    value: 9,
  },
  {
    label: '选项10',
    value: 10,
  },
]

const selectedValue = ref([])

const handleChange = (val: any) => {
  console.log('选中值:', val)
}

const addressOptions = [
  {
    label: '选项1',
    value: 1,
    children: [
      {
        label: '选项1-1',
        value: 11,
        children: [
          {
            label: '选项1-1-1',
            value: 111,
            children: [
              {
                label: '选项1-1-1-1',
                value: 1111,
              },
              {
                label: '选项1-1-1-2',
                value: 1112,
              },
              {
                label: '选项1-1-1-3',
                value: 1113,
              },
              {
                label: '选项1-1-1-4',
                value: 1114,
              },
              {
                label: '选项1-1-1-5',
                value: 1115,
              },
            ]
          },
        ]
      },
    ]
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
        <Slider v-model="formData.age" />
      </FormItem>
      <FormItem label="性别" prop="gender" @click="pickerVisible = true">
        {{ formData.gender }}
        <Picker
          v-model="formData.gender"
          :visible="pickerVisible"
          :options="options"
          closeOnOverlayClick
          @close="pickerVisible = false"
        />
      </FormItem>
      <FormItem label="是否同意" prop="agree">
        <Switch v-model="formData.agree" />
      </FormItem>
      <FormItem label="是否同意" prop="agree">
        <Checkbox v-model="formData.agree" />
      </FormItem>
      <FormItem label="爱好" prop="hobbies">
        <CheckboxGroup
          v-model="formData.hobbies"
          :options="options"
        />
      </FormItem>
      <FormItem label="喜欢的水果" prop="fruit">
        <RadioGroup
          v-model="formData.fruit"
          :options="options"
        />
      </FormItem>
      <FormItem label="评分" prop="rating">
        <Rate v-model="formData.rating" />
      </FormItem>
      <FormItem label="地址" prop="address">
        <Cascader
          v-model='formData.address'
          :options='addressOptions'
          @change='handleChange'
        />
      </FormItem>
      <Button @click="handleSubmit">提交</Button>
    </Form>


    <h2>Picker</h2>
    <!-- <Button @click="pickerVisible = true">打开</Button> -->
    <!-- <Picker
      :visible="pickerVisible"
      :model-value="1"
      :options="options"
      @close="pickerVisible = false"
      @update:model-value="onPickerChange"
    /> -->

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

    <h2>Cascader</h2>
    <Cascader
      v-model='selectedValue'
      :options='options'
      @change='handleChange'
    />
  </div>
</template>

<style lang="less" scoped>
.page {
  padding: 20px;
}
</style>
