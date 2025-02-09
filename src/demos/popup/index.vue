<script setup>
import { ref } from 'vue'
import Button from '@/components/button/index.vue'
import Popup from '@/components/popup/index.vue'

const visible = ref(false)
const bottomVisible = ref(false)
</script>

<template>
  <div class='popup-demo'>
    <h3>基础弹窗</h3>
    <Button @click='visible = true'>打开弹窗</Button>
    <Popup :visible="visible" @close='visible = false'>
      <div style='padding: 20px'>
        这是一个基础弹窗
        <Button @click='visible = false'>关闭</Button>
      </div>
    </Popup>

    <h3>底部弹窗</h3>
    <Button @click='bottomVisible = true'>打开底部弹窗</Button>
    <Popup
      :visible='bottomVisible'
      position='bottom'

      @close='bottomVisible = false'
    >
      <div style='padding: 20px'>
        这是一个底部弹窗
        <Button @click='bottomVisible = false'>关闭</Button>
      </div>
    </Popup>
  </div>
</template>