<template>
  <div class="page">
    <header>
      <h1>header</h1>
    </header>
    <main>
      <div class="menus-wrapper">
        <div
          ref="menusRef"
          class="menus"
          :class="{ 'fixed': isFixed }"
        >
          <div
            class="menu"
            v-for="menu in menus"
            :key="menu.name"
          >
            {{ menu.name }}
          </div>
        </div>
        <div
          v-if="isFixed"
          class="menus-placeholder"
        />
      </div>

      <div class="content">
        <h1>content</h1>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue"

const menusRef = ref(null)

const menus = ref([
  {
    name: "home",
    path: "/",
  },
  {
    name: "about",
    path: "/about",
  },
  {
    name: "test",
    path: "/test",
  },
])

const isFixed = ref(false)
let originalTop = 0

const handleScroll = () => {
  if (window.scrollY >= originalTop) {
    isFixed.value = true
  } else {
    isFixed.value = false
  }
}

onMounted(() => {
  const rect = menusRef.value.getBoundingClientRect()
  originalTop = rect.top + window.scrollY

  // 设置占位元素的高度
  document.documentElement.style.setProperty("--menus-height", `${rect.height}px`)

  window.addEventListener("scroll", handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll)
})
</script>

<style scoped>
.menus-wrapper {
  position: relative;
}

.menus {
  display: flex;
  flex-wrap: nowrap;
  background-color: #ccc;
  width: 100%;
}

.menus.fixed {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
}

.menu {
  background-color: #f0f0f0;
  padding: 10px;
  margin: 10px;
}

.content {
  background-color: #f0f0f0;
  padding: 10px;
  margin: 10px;
  height: 1000px;
}

.menus-placeholder {
  height: var(--menus-height);
  width: 100%;
}
</style>

