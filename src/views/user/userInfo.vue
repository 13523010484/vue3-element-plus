<template>
  <el-card style="max-width: 600px; margin: 12px auto">
    <template #header>
      <div class="card-header" style="text-align: left">
        <span>修改用户信息</span>
      </div>
    </template>

    <el-form ref="ruleFormRef" :model="form">
      <el-form-item label="操作用户名">
        <el-input v-model="form.operName"></el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="上传头像">
        <el-upload
          ref="uploadRef"
          :auto-upload="false"
          :on-change="handleAvatarChange"
          :show-file-list="false"
          class="upload-avatar-wrapper"
        >
          <img v-if="form.avatar" :src="form.avatar" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
    </el-form>

    <template #footer>
      <div style="text-align: right">
        <!-- 提交按钮 -->
        <el-button type="primary" @click="submitForm"> 提交 </el-button>
      </div>
    </template>
  </el-card>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { FormInstance } from 'element-plus'

// 使用 user store
const userStore = useUserStore()

// 初始化表单数据
interface Form {
  operName: string
  password: string
  avatar: string | null
}

const form = reactive<Form>({
  operName: '',
  password: '',
  avatar: null,
})

const ruleFormRef = ref<FormInstance>()

let selectedFile: File | null = null

// 处理头像选择
const handleAvatarChange = (file: any) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    form.avatar = e.target?.result as string // 更新本地显示的头像
  }
  reader.readAsDataURL(file.raw)
  selectedFile = file.raw // 保存文件对象用于后续上传
}

// 获取上传组件实例
const uploadRef = ref<any>(null)

// 提交表单方法
const submitForm = async () => {
  if (!selectedFile) {
    ElMessage.error('请选择要上传的头像')
    return
  }

  try {
    const formData = new FormData()
    formData.append('operName', form.operName)
    formData.append('password', form.password)
    formData.append('avatar', selectedFile)

    const res = await userStore.uploadAvatarReq(formData)

    if (res && res.status === 200) {
      ElMessage.success('上传成功。')
      Object.assign(form, {
        operName: '',
        password: '',
        avatar: null,
      })
      selectedFile = null
      uploadRef.value?.clearFiles()
      ruleFormRef.value?.resetFields()
      userStore.clearMessages()
    }
  } catch (error) {
    userStore.clearMessages()
  }
}
</script>

<style scoped>
/* 样式部分保持不变 */
.upload-avatar-wrapper {
  width: 178px;
  height: 178px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.upload-avatar-wrapper:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
