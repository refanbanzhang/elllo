<script setup lang="ts">
interface SwitchProps {
  modelValue: boolean
  activeColor?: string
  inactiveColor?: string
  disabled?: boolean
  loading?: boolean
  size?: "small" | "default" | "large"
}

const props = withDefaults(defineProps<SwitchProps>(), {
  modelValue: false,
  activeColor: "#409EFF",
  inactiveColor: "#DCDFE6",
  disabled: false,
  loading: false,
  size: "default"
})

const emit = defineEmits<{
  "update:modelValue": [value: boolean]
}>()

const toggle = () => {
  if (props.disabled || props.loading) return
  emit("update:modelValue", !props.modelValue)
}
</script>

<template>
  <div
    class="switch"
    :class="[
      `switch--${size}`,
      {
        'is-checked': modelValue,
        'is-disabled': disabled,
        'is-loading': loading
      }
    ]"
    :style="{
      backgroundColor: modelValue ? activeColor : inactiveColor
    }"
    @click="toggle"
  >
    <span class="switch-core">
      <span
        v-if="loading"
        class="switch-loading"
      />
    </span>
  </div>
</template>

<style lang="less" scoped>
.switch {
  position: relative;
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.3s;

  .switch-core {
    position: absolute;
    left: 2px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #fff;
    transition: all 0.3s;
  }

  &.is-checked {
    .switch-core {
      left: 22px;
    }
  }

  &.is-disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &.switch--small {
    width: 32px;
    height: 16px;
    .switch-core {
      width: 12px;
      height: 12px;
    }
    &.is-checked .switch-core {
      left: 18px;
    }
  }

  &.switch--default {
    width: 40px;
    height: 20px;
    .switch-core {
      width: 16px;
      height: 16px;
    }
    &.is-checked .switch-core {
      left: 22px;
    }
  }

  &.switch--large {
    width: 48px;
    height: 24px;
    .switch-core {
      width: 20px;
      height: 20px;
    }
    &.is-checked .switch-core {
      left: 26px;
    }
  }
}

.switch-loading {
  display: inline-block;
  width: 8px;
  height: 8px;
  border: 2px solid transparent;
  border-top-color: currentColor;
  border-radius: 50%;
  animation: switch-loading 1s infinite linear;
}

@keyframes switch-loading {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
