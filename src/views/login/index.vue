<template>
  <div class="login-container">
    <el-card class="login-wrap">
      <template #header>
        <div class="card-header" style="text-align: center">
          <span>登录</span>
        </div>
      </template>

      <!-- 登录表单 -->
      <el-form :model="form" :rules="rules" ref="loginFormRef" label-width="auto">
        <el-form-item label="用户名" prop="operCode">
          <el-input v-model="form.operCode" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="form.password"
            show-password
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
      </el-form>

      <!-- 提交按钮 -->
      <div class="button-container">
        <el-button type="primary" @click="submitForm" class="large-button"> 登录 </el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useLoginStore } from '@/stores/login'
import { FormInstance, ElMessage } from 'element-plus'

// 使用 login store
const loginStore = useLoginStore()

// 获取 router 实例
const router = useRouter()

// 初始化表单数据
interface LoginForm {
  operCode: string
  password: string
}

const form = reactive<LoginForm>({
  operCode: '001',
  password: '123456',
})

const rules = reactive({
  operCode: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
})

// 获取表单实例
const loginFormRef = ref<FormInstance>()

// 提交表单
const submitForm = async () => {
  if (!loginFormRef.value) return

  loginFormRef.value.validate(async (valid) => {
    if (valid) {
      const res = await loginStore.loginReq(form)
      if (res&&res.status==200) {
        router.push('/')
      }
    } else {
      ElMessage.warning('请填写所有必填项')
      return false
    }
  })
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-wrap {
  width: 450px;
  padding: 20px;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 24px;
}

.large-button {
  width: 100%;
  padding: 15px;
  font-size: 18px;
}
</style>
