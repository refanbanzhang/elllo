<script setup>
import { ref } from "vue"
import Modal from "@/components/modal/index.vue"
import Button from "@/components/button/index.vue"

const isVisible1 = ref(false)
const isVisible2 = ref(false)
</script>

<template>
  <div class="modal-demo">
    <h3>基础用法</h3>
    <Button @click="isVisible1 = true">
      打开弹窗
    </Button>

    <Modal
      :visible="isVisible1"
      title="提示"
      @confirm="isVisible1 = false"
      @cancel="isVisible1 = false"
    >
      <div>这是一个模态框的内容</div>
    </Modal>

    <h3>显示关闭按钮</h3>
    <Button @click="isVisible2 = true">
      打开弹窗
    </Button>

    <Modal
      :visible="isVisible2"
      show-close
      title="提示"
      @confirm="isVisible2 = false"
      @cancel="isVisible2 = false"
    >
      <div>这是一个模态框的内容</div>
    </Modal>
  </div>
</template>

<style scoped>
.modal-demo {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

h3 {
  margin: 0;
}
</style>
