<script setup lang="ts">
import { onMounted, onUnmounted } from "vue"
import { push, pop, getTopPopupId } from "@/composables/use-popup-stack"

type Props = {
  visible: boolean
}

defineProps<Props>()

const emit = defineEmits(["close"])
const popupId = push()

const escKeydown = (e: KeyboardEvent) => {
  if (getTopPopupId() !== popupId) {
    return
  }

  if (e.key === "Escape") {
    emit("close")
  }
}

onMounted(() => {
  window.addEventListener("keydown", escKeydown)
})

onUnmounted(() => {
  pop()
  window.removeEventListener("keydown", escKeydown)
})
</script>

<template>
  <div
    class="popup"
    v-if="visible"
  >
    <slot />
  </div>
</template>

<style lang="less" scoped>
.popup {
  position: fixed;
  inset: 0;
}
</style>
