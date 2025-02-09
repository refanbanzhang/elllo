<script setup lang="ts">
import { ref } from 'vue'
import { Form, FormItem } from '@/components/form'
import Input from '@/components/input/index.vue'
import Cascader from '@/components/cascader/index.vue'
import Button from '@/components/button/index.vue'
import Switch from '@/components/switch/index.vue'
import Radio from '@/components/radio/index.vue'
import RadioGroup from '@/components/radio-group/index.vue'
import Checkbox from '@/components/checkbox/index.vue'
import CheckboxGroup from '@/components/checkbox-group/index.vue'
import Rate from '@/components/rate/index.vue'
import DatePicker from '@/components/datePicker/index.vue'
import Picker from '@/components/picker/index.vue'

const form = ref(null)
const formData = ref({
  username: '',
  password: '',
  cascader: [],
  switch: false,
  radio: '',
  checkboxGroup: [],
  rate: 0,
  date: new Date(),
  gender: []
})


const rules = {
  username: [
    { required: true, message: '请输入用户名' }
  ],
  password: [
    { required: true, message: '请输入密码' }
  ],
  cascader: [
    { required: true, message: '请选择地址' }
  ],
  radio: [
    { required: true, message: '请选择性别' }
  ],
  rate: [
    { required: true, message: '请评分' },
    { validator: (value) => value > 0, message: '评分必须大于0' }
  ],
  date: [
    { required: true, message: '请选择日期' }
  ],
  switch: [
    { required: true, message: '请选择开启通知' }
  ],
  checkboxGroup: [
    { required: true, message: '请选择爱好' }
  ],
  gender: [
    { required: true, message: '请选择性别' }
  ]
}


const addressData = ref([
  {
    label: '北京',
    value: 'beijing',
    children: [
      {
        label: '朝阳区',
        value: 'chaoyang'
      }
    ]
  },
  {
    label: '上海',
    value: 'shanghai',
    children: [
      {
        label: '浦东新区',
        value: 'pudong'
      }
    ]
  },
  {
    label: '广州',
    value: 'guangzhou'
  }
])

const pickerOptions = [
  { label: '男', value: 'male' },
  { label: '女', value: 'female' }
]

const onSubmit = async () => {
  const valid = await form.value.validate()

  if (valid) {
    console.log('提交成功:', formData.value)
  }
}

const onReset = () => {
  form.value.resetFields()
}

const radioOptions = [
  { label: '男', value: 'male' },
  { label: '女', value: 'female' }
]

const checkboxOptions = [
  { label: '阅读', value: 'reading' },
  { label: '游戏', value: 'gaming' },
  { label: '运动', value: 'sports' }
]

const pickerVisible = ref(false)
</script>

<template>
  <div class='form-demo'>
    <Form ref='form' :model='formData' :rules='rules'>
      <FormItem prop='username' label='用户名'>
        <Input v-model='formData.username' />
      </FormItem>
      <FormItem prop='password' label='密码'>
        <Input v-model='formData.password' type='password' />
      </FormItem>
      <FormItem prop='cascader' label='地址'>
        <Cascader v-model='formData.cascader' :options='addressData' />
      </FormItem>
      <FormItem prop='switch' label='开启通知'>
        <Switch v-model='formData.switch' />
      </FormItem>
      <FormItem prop='radio' label='性别'>
        <RadioGroup
          v-model='formData.radio'
          :options='radioOptions'
        />
      </FormItem>
      <FormItem prop='checkboxGroup' label='爱好'>
        <CheckboxGroup
          v-model='formData.checkboxGroup'
          :options='checkboxOptions'
        />
      </FormItem>
      <FormItem prop='rate' label='评分'>
        <Rate v-model='formData.rate' />
      </FormItem>
      <FormItem prop='date' label='日期'>
        <DatePicker v-model='formData.date' />
      </FormItem>
      <FormItem prop='gender' label='选择器'>
        <Button @click='pickerVisible = true'>选择</Button>
        <Picker :visible="pickerVisible" @close='pickerVisible = false' v-model='formData.gender' :options='pickerOptions' />
      </FormItem>
      <FormItem>
        <Button @click='onSubmit'>提交</Button>
        <Button @click='onReset' type='secondary'>重置</Button>
      </FormItem>
    </Form>
    <div class='form-preview'>

      表单数据: {{ formData }}
    </div>
  </div>
</template>

<style lang='less' scoped>
.form-demo {
  padding: 20px;
}

.form-preview {
  margin-top: 20px;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 14px;
}
</style>