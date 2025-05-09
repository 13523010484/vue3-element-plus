import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import type { ApiResponse } from '@/types/index'
import type {
  AdminUserState,
  AdminUserQuery,
  AdminUserAddParams,
  AdminUserUpdateParams,
  AdminUserDetailParams,
  AdminUserDetailState,
  AdminUserRemoveParams,
  AdminUserResetPwdParams,
} from '@/types/admin'
import {
  adminQueryApi,
  adminAddApi,
  adminUpdateApi,
  adminDetailApi,
  adminRemoveApi,
  adminResetPasswordApi,
  adminDownloadApi,
} from '@/api/admin'

export const useAdminStore = defineStore('admin', {
  state: (): {
    table: AdminUserState
    detailData: AdminUserDetailState
  } => ({
    table: {
      total: 0,
      pageSize: 10,
      pageNum: 1,
      tableData: [],
    },
    detailData: {} as AdminUserDetailState,
  }),
  actions: {
    // 部门管理员查询
    async adminQueryReq(payload: AdminUserQuery): Promise<void> {
      try {
        const res: ApiResponse<{ rows: AdminUserInfo[]; total: number }> =
          await adminQueryApi(payload)

        if (res && res.status === 200) {
          ElMessage.success('查询成功。')
          this.table.tableData = res.data.rows || []
          this.table.total = res.data.total || 0
        } else {
          ElMessage.error(res.msg || '查询失败')
        }
      } catch (e) {
        console.error(e)
        ElMessage.error(`发生异常：${e.message || '未知错误'}`)
      }
    },

    // 部门管理员新增
    async adminAddReq(payload: AdminUserAddParams): Promise<void> {
      try {
        const res = await adminAddApi(payload)

        if (res && res.status === 200) {
          ElMessage.success('新增成功。')
        } else {
          ElMessage.error(res.msg || '保存失败')
        }
      } catch (e) {
        console.error(e)
        ElMessage.error(`发生异常：${e.message || '未知错误'}`)
      }
    },

    // 部门管理员修改
    async adminUpdateReq(payload: AdminUserUpdateParams): Promise<void> {
      try {
        const res = await adminUpdateApi(payload)

        if (res && res.status === 200) {
          ElMessage.success('修改成功。')
        } else {
          ElMessage.error(res.msg || '修改失败')
        }
      } catch (e) {
        console.error(e)
        ElMessage.error(`发生异常：${e.message || '未知错误'}`)
      }
    },

    // 部门管理员详情
    async adminDetailReq(
      payload: AdminUserDetailParams,
    ): Promise<ApiResponse<AdminUserDetailState>> {
      try {
        const res: ApiResponse<AdminUserDetailState> = await adminDetailApi(payload)
        if (res && res.status === 200) {
          this.detailData = res.data
        } else {
          ElMessage.error(res.msg || '查询失败')
        }
      } catch (e) {
        console.error(e)
        ElMessage.error(`发生异常：${e.message || '未知错误'}`)
      }
    },

    // 部门管理员删除
    async adminRemoveReq(payload: AdminUserRemoveParams): Promise<void> {
      try {
        const res = await adminRemoveApi(payload)

        if (res && res.status === 200) {
          ElMessage.success('删除成功。')
        } else {
          ElMessage.error(res.msg || '删除失败')
        }
      } catch (e) {
        console.error(e)
        ElMessage.error(`发生异常：${e.message || '未知错误'}`)
      }
    },

    // 部门管理员密码重置
    async adminResetPasswordReq(payload: AdminUserResetPwdParams): Promise<void> {
      try {
        const res = await adminResetPasswordApi(payload)

        if (res && res.status === 200) {
          ElMessage.success('重置成功。')
        } else {
          ElMessage.error(res.msg || '重置失败')
        }
      } catch (e) {
        console.error(e)
        ElMessage.error(`发生异常：${e.message || '未知错误'}`)
      }
    },

    // 部门管理员下载
    async adminDownloadReq() {
      await adminDownloadApi()
    },
  },
  getters: {},
})
