<template>
  <div class="code-block">
    <pre
      ref="codeRef"
      :class="language"
    ><code>{{ code }}</code></pre>
    <button
      class="copy-btn"
      @click="copyCode"
    >
      {{ copied ? "已复制" : "复制代码" }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from "vue"
import hljs from "highlight.js"
import javascript from "highlight.js/lib/languages/javascript"
import typescript from "highlight.js/lib/languages/typescript"
import vue from "highlight.js/lib/languages/xml"
import "highlight.js/styles/github.css"

const props = withDefaults(defineProps<{
  code: string
  language?: string
}>(), {
  language: "vue"
})

const copied = ref(false)
const codeRef = ref<HTMLElement | null>(null)

hljs.registerLanguage("javascript", javascript)
hljs.registerLanguage("typescript", typescript)
hljs.registerLanguage("vue", vue)

hljs.configure({
  ignoreUnescapedHTML: true
})

onMounted(() => {
  watchEffect(() => {
    if (codeRef.value) {
      hljs.highlightElement(codeRef.value)
    }
  })
})

const copyCode = async () => {
  await navigator.clipboard.writeText(props.code)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}
</script>

<style scoped>
.code-block {
  position: relative;
  background: #f5f7fa;
  padding: 16px;
}

pre {
  margin: 0;
  white-space: pre;
  font-family: monospace;
  background: transparent;
}

.copy-btn {
  position: absolute;
  right: 8px;
  top: 8px;
  padding: 4px 8px;
  background: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  cursor: pointer;
}

.copy-btn:hover {
  background: #f5f7fa;
}

pre code {
  display: block;
  overflow-x: auto;
  padding: 1em;
  white-space: pre;
}
</style>