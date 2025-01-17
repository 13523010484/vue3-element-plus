<template>
  <div class="layout">
    <el-container class="full-height">
      <el-container class="content-container">
        <Aside :width="sideBarWidth" @update:width="sideBarWidth = $event" />
        <el-container>
          <Header :width="sideBarWidth" />
          <Main :width="sideBarWidth" :height="mainHeight" />
          <Footer :width="sideBarWidth" />
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Header from '@/components/header/index.vue'
import Aside from '@/components/aside/index.vue'
import Main from '@/components/main/index.vue'
import Footer from '@/components/footer/index.vue'

const sideBarWidth = ref('220px')
const headerHeight = ref('60px') // 假设 Header 的高度为 60px
const footerHeight = ref('60px') // 假设 Footer 的高度为 60px

// 计算 Main 的高度
const mainHeight = computed(() => {
  return `calc(100vh - ${headerHeight.value} - ${footerHeight.value})`
})
</script>

<style scoped>
/* 确保 html 和 body 高度为 100% */
html,
body {
  height: 100%;
  margin: 0;
}

.layout {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.full-height {
  height: 100%;
}

.content-container {
  display: flex;
  flex: 1; /* 使 content-container 占据剩余空间 */
  overflow: hidden; /* 防止内容溢出 */
}

.el-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
}

.Main {
  flex: 1;
  overflow: auto;
}
</style>
