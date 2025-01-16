<template>
  <el-footer
    class="layout-footer"
    :style="{
      width: `calc(100vw - ${width})`,
    }"
  >
    Footer
  </el-footer>
</template>

<script setup lang="ts">
const props = defineProps<{ width: string }>();
</script>

<style scoped>
.layout-footer {
  position: fixed;
  bottom: 0;
  right: 0;
  width: calc(100% - 220px);
  z-index: 1000;
  color: #333;
  text-align: center;
  line-height: 60px;
  background-color: #fff;
  box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.05);
}
</style>
