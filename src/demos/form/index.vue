<script setup>
import { ref } from 'vue'
import { Form, FormItem } from '@/components/form'
import Input from '@/components/input/index.vue'

const formData = ref({
  username: '',
  password: ''
})

const rules = {
  username: [
    { required: true, message: '请输入用户名' }
  ],
  password: [
    { required: true, message: '请输入密码' }
  ]
}

const form = ref()

const onSubmit = async () => {
  const valid = await form.value.validate()
  if (valid) {
    console.log('提交成功:', formData.value)
  }
}

const onReset = () => {
  form.value.resetFields()
}
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
      <FormItem>
        <button @click='onSubmit'>提交</button>
        <button @click='onReset'>重置</button>
      </FormItem>
    </Form>
  </div>
</template>