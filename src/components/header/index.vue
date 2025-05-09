<template>
  <el-header
    class="layout-header"
    style="display: flex; justify-content: space-between"
    :style="{ width: `calc(100vw - ${props.width})` }"
  >
    <el-tabs v-model="activeName" class="tabs-wrap">
      <el-tab-pane label="系统1" name="first">系统1</el-tab-pane>
      <el-tab-pane label="系统2" name="second">系统2</el-tab-pane>
    </el-tabs>
    <el-dropdown @command="handleCommand">
      <el-avatar
        shape="circle"
        :size="50"
        :src="`http://localhost:3000${userInfo.avatar}`"
        style="cursor: pointer"
      />
      <template #dropdown>
        <el-dropdown-menu style="width: 200px">
          <el-dropdown-item>
            <div style="display: flex; align-items: center">
              <el-avatar
                shape="circle"
                :size="40"
                :src="`http://localhost:3000${userInfo.avatar}`"
                style="margin-right: 24px"
              />
              <span>{{ userInfo.operCode }}</span>
            </div>
          </el-dropdown-item>
          <el-dropdown-item command="setPassword">
            <el-icon><User /></el-icon>
            设置密码
          </el-dropdown-item>
          <el-dropdown-item command="logout">
            <el-icon><SwitchButton /></el-icon>
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-header>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'
import { User, SwitchButton } from '@element-plus/icons-vue'

// 获取父组件传递的宽度属性
const props = defineProps<{ width: string }>()

const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

// 使用 user store
const userStore = useUserStore()

// 计算属性获取用户信息
const userInfo = computed(() => userStore.userInfo)

// 默认头像URL
const defaultAvatar = ref<string>(
  'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
)

// 初始化时加载用户信息
onMounted(async () => {
  await userStore.userInfoReq()
})

// 处理下拉菜单命令
const handleCommand = (command: string) => {
  if (command === 'setPassword') {
    setPassword()
  } else if (command === 'logout') {
    logout()
  }
}

// 设置密码逻辑（可以根据需要修改）
const setPassword = () => {
  ElMessage.info('设置密码功能暂未实现')
  // 这里可以跳转到设置密码页面或弹出设置密码对话框
}

// 退出登录逻辑
const logout = () => {
  // 清除用户信息并跳转到登录页面
  userStore.$reset() // 重置 store 状态
  ElMessage.success('已退出登录')
  sessionStorage.removeItem('token')
  // 跳转到登录页面或其他操作
  window.location.href = '/login' // 示例跳转到登录页面
}
</script>

<style scoped>
.layout-header {
  position: fixed;
  top: 0;
  right: 0;
  width: calc(100% - 220px); /* 默认宽度 */
  z-index: 1000;
  color: #333;
  text-align: center;
  line-height: 60px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

/* 可选：调整头像的位置和样式 */
.el-avatar {
  margin-right: 20px; /* 根据需要调整间距 */
}
</style>
