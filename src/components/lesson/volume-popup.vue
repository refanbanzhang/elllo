<script setup lang="ts">
import IconMinClose from "@/assets/volume1.svg"
import IconMediumClose from "@/assets/volume2.svg"
import IconMaxClose from "@/assets/volume3.svg"

import Popup from "@/components/popup/index.vue"
import Slider from "@/components/slider/index.vue"
import playerStore from "@/stores/player"

interface Props {
  visible: boolean
}

defineProps<Props>()
const emit = defineEmits(["close"])

const { volume, setVolume } = playerStore

const onClose = () => {
  emit("close")
}

const onChange = (value: number) => {
  setVolume(value)
}
</script>

<template>
  <Popup
    :visible="visible"
    @close="onClose"
  >
    <div class="volume">
      <div class="volume-group">
        <IconMinClose class="volume-icon" v-if="volume <= 30" />
        <IconMediumClose class="volume-icon" v-else-if="volume <= 60" />
        <IconMaxClose class="volume-icon" v-else />
      </div>
      <Slider
        :value="volume"
        @change="onChange"
      />
      <div class="volume-close" @click="onClose">close</div>
    </div>
  </Popup>
</template>

<style lang="less" scoped>
.volume {
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: auto;
  height: 100%;
  padding: 20px;
  color: #fff;
  background: #000;
}

.volume-close {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
  color: #fff;
  font-size: 18px;
  background: #000;
}

.volume-group {
  display: flex;
  justify-content: center;
  align-items: center;
}

.volume-icon {
  width: 25px;
  height: 25px;
  fill: currentColor;
}
</style>