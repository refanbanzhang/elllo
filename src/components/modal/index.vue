<script setup lang="ts">
import { onMounted, onUnmounted } from "vue"
import IconClose from "@/assets/close.svg"

const props = defineProps<{
  visible: boolean
  title?: string
  width?: string | number
  showClose?: boolean
  closeOnClickOverlay?: boolean
}>()

const emit = defineEmits<{
  close: []
  confirm: []
  cancel: []
}>()

const onClose = () => {
  emit("cancel")
}

const onConfirm = () => {
  emit("confirm")
}

const onClickOverlay = () => {
  if (props.closeOnClickOverlay) {
    onClose()
  }
}

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === "Escape" && props.visible) {
    onClose()
  }
}

onMounted(() => {
  window.addEventListener("keydown", onKeydown)
})

onUnmounted(() => {
  window.removeEventListener("keydown", onKeydown)
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="visible"
      class="modal-container"
    >
      <div
        class="modal-overlay"
        @click="onClickOverlay"
      />
      <div
        class="modal"
        :style="{ width: typeof width === 'number' ? `${width}px` : width }"
      >
        <div class="modal-header">
          <h3 class="modal-title">
            {{ title }}
          </h3>
          <IconClose
            v-if="showClose"
            class="modal-close"
            @click="onClose"
          />
        </div>
        <div class="modal-body">
          <slot />
        </div>
        <div
          class="modal-footer"
        >
          <slot name="footer">
            <button
              class="modal-btn cancel"
              @click="onClose"
            >
              取消
            </button>
            <button
              class="modal-btn confirm"
              @click="onConfirm"
            >
              确定
            </button>
          </slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style lang="less" scoped>
.modal-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
}

.modal {
  position: relative;
  width: 420px;
  margin: 0 auto;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid #dcdfe6;
}

.modal-title {
  margin: 0;
  font-size: 18px;
  line-height: 1;
  color: #303133;
}

.modal-close {
  width: 20px;
  height: 20px;
  cursor: pointer;
  fill: #909399;
  transition: fill 0.2s;

  &:hover {
    fill: #409eff;
  }
}

.modal-body {
  padding: 20px;
  font-size: 14px;
  line-height: 1.5;
  color: #606266;
}

.modal-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 20px;
  border-top: 1px solid #dcdfe6;
}

.modal-btn {
  padding: 9px 15px;
  font-size: 12px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  background: #fff;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: #409eff;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
  }

  &.confirm {
    margin-left: 10px;
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;

    &:hover {
      background: #66b1ff;
      border-color: #66b1ff;
      color: #fff;
    }
  }
}
</style> 