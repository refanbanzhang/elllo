<template>
  <div class="demo-nav">
    <h2>Demo 导航</h2>
    <nav>
      <router-link
        v-for="route in demoRoutes"
        :key="route.path"
        :to="route.path"
        class="nav-item"
      >
        {{ route.name }}
      </router-link>
    </nav>
  </div>
</template>

<script setup>
const demoRoutes = [
  { path: '/demos/button', name: '按钮示例' },
  { path: '/demos/cascader', name: '级联选择器' },
  { path: '/demos/checkbox', name: '复选框' },
  { path: '/demos/date-picker', name: '日期选择器' },
  { path: '/demos/form', name: '表单示例' },
  { path: '/demos/input', name: '输入框' },
  { path: '/demos/picker', name: '移动端选择器' },
  { path: '/demos/popup', name: '弹窗' },
  { path: '/demos/progress-bar', name: '进度条' },
  { path: '/demos/radio', name: '单选框' },
  { path: '/demos/rate', name: '评分' },
  { path: '/demos/slider', name: '滑块' },
  { path: '/demos/spinner', name: '加载动画' },
  { path: '/demos/switch', name: '开关' },
  { path: '/demos/tabs', name: '标签页' },
  { path: '/demos/toast', name: '提示框' }
]
</script>

<style scoped>
.demo-nav {
  padding: 20px;
}

h2 {
  color: #333;
  margin-bottom: 20px;
}

.nav-item {
  display: block;
  padding: 12px 20px;
  margin-bottom: 10px;
  background-color: #f5f5f5;
  color: #333;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-item:hover {
  background-color: #e0e0e0;
}

.nav-item.router-link-active {
  background-color: #409eff;
  color: white;
}
</style>
