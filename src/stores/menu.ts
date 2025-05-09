import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import type { ApiResponse, MenuTree } from '@/types/index'
import { menuInitApi, menuQueryApi } from '@/api/menu'

export const useMenuStore = defineStore('menu', {
  state: (): { menuTree: MenuTree | null } => ({
    menuTree: null, // 初始化为null或空对象
  }),
  actions: {
    async menuInitReq(payload: MenuTree): Promise<void> {
      try {
        const res: ApiResponse<MenuTree[]> = await menuInitApi(payload)
        if (res && res.status === 200) {
          ElMessage.success('初始化成功~')
        } else {
          ElMessage.error(res.message || '登录失败')
        }
      } catch (e) {
        console.log(e)
        ElMessage.error('初始化请求失败，请稍后再试')
      }
    },

    async menuQueryReq(): Promise<void> {
      try {
        const res = await menuQueryApi()
        if (res && res.status === 200) {
          this.menuTree = res.data as MenuTree
        } else {
          ElMessage.error(res.message || '菜单加载失败')
        }
      } catch (e) {
        console.error('Error in menuQueryReq:', e)
        ElMessage.error('菜单加载请求失败，请稍后再试')
      }
    },
  },
  getters: {
    getMenuTree(state): MenuTree | null {
      return state.menuTree
    },
  },
})
