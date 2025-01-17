import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import { userInfoApi, uploadAvatarApi } from '@/api/user'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: {},
    uploadSuccessMessage: '',
    errorMessage: '',
  }),
  actions: {
    async userInfoReq() {
      try {
        const res = await userInfoApi()
        if (res && res.status == 200) {
          this.userInfo = res.data
        } else {
          ElMessage.error(res.err)
        }
      } catch (error) {
        console.log('error::', error)
      }
    },

    async uploadAvatarReq(formData) {
      try {
        const res = await uploadAvatarApi(formData)

        if (res && res.status === 200) {
          this.uploadSuccessMessage = '头像上传成功'
        } else {
          this.errorMessage = res.err
        }
      } catch (error) {
        this.errorMessage = '头像上传失败，请重试'
      }
    },
    clearMessages() {
      this.uploadSuccessMessage = ''
      this.errorMessage = ''
    },
  },
  getters: {
    getUploadSuccessMessage: (state) => state.uploadSuccessMessage,
    getErrorMessage: (state) => state.errorMessage,
  },
})
