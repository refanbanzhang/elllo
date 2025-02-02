<script setup lang="ts">
import { ref, watch,onUnmounted } from "vue"
import { push, pop, getTopPopupId } from "@/composables/use-popup-stack"

type Props = {
  visible: boolean
  position?: "top" | "bottom"
  closeOnOverlayClick?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits(["close"])
const popupId = ref<string | null>(null)

const close = () => {
  emit("close")
}

const onEscKeydown = (e: KeyboardEvent) => {
  if (getTopPopupId() !== popupId.value) {
    return
  }

  if (e.key === "Escape") {
    close()
  }
}

const initializePopup = () => {
  popupId.value = push()
  window.addEventListener("keydown", onEscKeydown)
}

const cleanupPopup = () => {
  if (popupId.value === null) {
    return
  }

  pop()
  window.removeEventListener("keydown", onEscKeydown)
  popupId.value = null
}

watch(() => props.visible, (value) => {
  if (value) {
    initializePopup()
  } else {
    cleanupPopup()
  }
}, { immediate: true })

onUnmounted(() => {
  cleanupPopup()
})
</script>

<template>
  <div
    class="popup"
    v-if="visible"
    @click="closeOnOverlayClick && close()"
  >
    <div
      class="popup__content"
      :class="{ top: position === 'top', bottom: position === 'bottom' }"
    >
      <slot />
    </div>
  </div>
</template>

<style lang="less" scoped>
.popup {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: var(--index-popup);
  background: rgba(0, 0, 0, 0.5);
}

.popup__content {
  background: #fff;
  height: 100%;

  &.top {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: auto;
    height: auto;
    padding: 15px;
    border-radius: 10px 10px 0 0;
  }

  &.bottom {
    position: absolute;
    top: auto;
    left: 0;
    right: 0;
    bottom: 0;
    height: auto;
    padding: 15px;
    border-radius: 10px 10px 0 0;
  }
}
</style>