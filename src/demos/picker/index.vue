<script setup>
import { ref } from 'vue'
import Button from '@/components/button/index.vue'
import Picker from '@/components/picker/index.vue'

const value = ref('')
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
</script>

<template>
  <div class='m-picker-demo'>
    <h3>移动端选择器</h3>
    <Button @click='visible = true'> 打开选择器 </Button>
    <Picker :visible='visible' v-model='value' :options='options' title='请选择' @close="visible = false" />
    <div>选中值: {{ value }}</div>
  </div>
</template>