<template>
  <el-main class="layout-main" :style="{ paddingLeft: width }">
    <div style="margin: 24px">
      <transition name="fade" mode="out-in">
        <router-view :key="routeKey"></router-view>
      </transition>
    </div>
  </el-main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

// 获取当前路由
const route = useRoute()

// 创建一个计算属性，当路由变化时 key 也会随之变化
const routeKey = computed(() => route.path)

const props = defineProps<{ width: string }>()
</script>

<style scoped>
/* 确保 el-main 占据剩余空间 */
.layout-main {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  margin-top: 60px;
  margin-bottom: 60px;
  background: #f5f5f5;
}

/* 过渡效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
