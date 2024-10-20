<script setup lang="ts">
import "@material/web/tabs/tabs"
import "@material/web/tabs/primary-tab"
import { useRouter } from "vue-router"

const router = useRouter()
</script>

<template>
  <div class="container">
    <div>
      <md-tabs>
        <md-primary-tab
          :active="router.currentRoute.value.path === '/'"
          @click="router.push('/')"
        >
          elllo
        </md-primary-tab>
        <md-primary-tab
          :active="router.currentRoute.value.path === '/youtube'"
          @click="router.push('/youtube')"
        >
          youtube
        </md-primary-tab>
      </md-tabs>
    </div>
    <RouterView class="content" />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.content {
  overflow: auto;
}
</style>
