import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import type { ApiResponse } from '@/types/index'
import type { LoginParams } from '@/types/user'
import { loginApi } from '@/api/user'
import { useMenuStore } from './menu'

export const useLoginStore = defineStore('login', {
  actions: {
    async loginReq(payload: LoginParams) {
      try {
        const res = await loginApi(payload)
        if (res.status === 200) {
          sessionStorage.setItem('token', res.data.token)
          return res
        } else {
          ElMessage.error(res.msg)
        }
      } catch (e) {
        console.error('Login request failed:', e)
      }
    },
  },
})
