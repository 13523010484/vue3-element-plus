import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import type { ApiResponse } from '@/types/index'
import type { UserInfo, BindPostParams } from '@/types/user'
import { userInfoApi, uploadAvatarApi, userBindPostApi } from '@/api/user'

export const useUserStore = defineStore('user', {
  state: (): {
    userInfo: Partial<UserInfo>
    uploadSuccessMessage: string
    errorMessage: string
  } => ({
    userInfo: {},
    uploadSuccessMessage: '',
    errorMessage: '',
  }),
  actions: {
    async userInfoReq(): Promise<void> {
      try {
        const res: ApiResponse<UserInfo> = await userInfoApi()
        if (res.status === 200) {
          this.userInfo = res.data || {}
          console.log('this::', this, 'this.userInfo::', this.userInfo)
        } else {
          ElMessage.error(res.message || '获取用户信息失败')
        }
      } catch (error) {
        console.error('Error fetching user info:', error)
        ElMessage.error('获取用户信息失败，请重试')
      }
    },

    async uploadAvatarReq(formData: FormData): Promise<ApiResponse<{ url: string }>> {
      try {
        const res: ApiResponse<{ url: string }> = await uploadAvatarApi(formData)
        if (res.status == 200) {
          ElMessage.success('上传成功。')
          return res
        } else {
          ElMessage.error(res.msg)
        }
      } catch (error) {
        console.error('Error uploading avatar:', error)
      }
    },

    // 用户绑定岗位
    async userBindPostReq(payload: BindPostParams): Promise<void> {
      try {
        const res = await userBindPostApi(payload)
        if (res.status === 200) {
          ElMessage.success('绑定成功。')
        } else {
          ElMessage.error(res.msg)
        }
      } catch (error) {
        console.error('Error fetching user info:', error)
        ElMessage.error('绑定失败，请重试。')
      }
    },

    clearMessages(): void {
      this.uploadSuccessMessage = ''
      this.errorMessage = ''
    },
  },
  getters: {
    getUploadSuccessMessage: (state) => state.uploadSuccessMessage,
    getErrorMessage: (state) => state.errorMessage,
  },
})
