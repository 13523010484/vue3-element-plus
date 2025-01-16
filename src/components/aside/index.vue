<template>
  <el-aside :width="computedWidth" class="layout-aside">
    <div
      style="width: 48px; height: 48px; line-height: 48px; text-align: center"
      @click="toggleCollapse"
    >
      <el-button :icon="isCollapse ? Expand : Fold" circle></el-button>
    </div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      router
    >
      <el-sub-menu
        v-for="(route, index) in managementRoutes"
        :key="index"
        :index="route.fullPath"
      >
        <template #title>
          <el-icon><component :is="resolveIcon(route.meta.icon)" /></el-icon>
          <span>{{ route.meta.title }}</span>
        </template>
        <el-menu-item
          v-for="(child, childIndex) in route.children"
          :key="childIndex"
          :index="child.fullPath"
        >
          <template #title>{{ child.meta.title }}</template>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script setup lang="ts">
import { ref, computed, resolveComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  Location,
  Document,
  Setting,
  Menu,
  Expand,
  Fold,
  User,
  Check,
  Postcard,
} from '@element-plus/icons-vue';
import { defineEmits } from 'vue';

const isCollapse = ref(false);
const emit = defineEmits(['update:width']);

// 获取当前路由实例
const route = useRoute();
const router = useRouter();

// 计算激活的菜单项索引
const activeIndex = computed(() => route.path);

// 定义一个函数来动态解析图标组件
const resolveIcon = (iconName: string | undefined) => {
  console.log('iconName::', iconName);
  return {
    Location,
    Document,
    Setting,
    Menu,
    Expand,
    Fold,
    User,
    Check,
    Postcard,
  }[iconName];
  // if (!iconName) return Menu;
  // const iconComponent = resolveComponent(iconName);
  // console.log('iconComponent::', iconComponent);
  // if (iconComponent) {
  //   return iconComponent;
  // } else {
  //   console.warn(`未知图标: ${iconName}`);
  //   return Menu; // 默认使用 Menu 图标
  // }
};

// 过滤路由，只保留带有 meta.title 的路由，并计算 fullPath
const filteredRoutes = computed(() => filterRoutes(router.getRoutes()));

function filterRoutes(routes: any[]): any[] {
  return routes
    .filter((route) => route.meta && route.meta.title)
    .map((route) => ({
      ...route,
      fullPath: router.resolve({ name: route.name }).href,
      children:
        route.children?.length > 0 ? filterRoutes(route.children) : undefined,
    }));
}

const managementRoutes = computed(() =>
  filteredRoutes.value.filter(
    (route) => route.children && route.children.length > 0
  )
);

// 切换折叠状态
const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value;
  emit('update:width', isCollapse.value ? '60px' : '220px');
};

// 计算宽度
const computedWidth = computed(() => (isCollapse.value ? '60px' : '220px'));
</script>

<style scoped>
.layout-aside {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  color: #333;
  background-color: #fff;
  transition: width 0.3s;
  box-shadow: 4px 0 8px rgba(0, 0, 0, 0.05);
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 220px;
  min-height: 400px;
}

.el-menu-vertical-demo.el-menu--collapse {
  width: 60px;
}

.el-menu-item.is-active {
  background-color: #e6f7ff !important;
}

.el-sub-menu__title:hover,
.el-menu-item:hover {
  background-color: #e6f7ff !important;
}
</style>
