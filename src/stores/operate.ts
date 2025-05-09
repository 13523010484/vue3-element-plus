import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import type { ApiResponse } from '@/types/index'
import type {
  OperateUserState,
  OperateUserQuery,
  OperateUserAddParams,
  OperateUserUpdateParams,
  OperateUserDetailParams,
  OperateUserDetailState,
  OperateUserRemoveParams,
  OperateUserResetPwdParams,
  OperateUserInfo,
} from '@/types/operate'
import {
  operateQueryApi,
  operateAddApi,
  operateUpdateApi,
  operateDetailApi,
  operateRemoveApi,
  operateResetPasswordApi,
  operateDownloadApi,
} from '@/api/operate'

export const useOperateStore = defineStore('operate', {
  state: (): {
    table: OperateUserState
    detailData: OperateUserDetailState
  } => ({
    table: {
      total: 0,
      pageSize: 10,
      pageNum: 1,
      tableData: [],
    },
    detailData: {} as OperateUserDetailState,
  }),
  actions: {
    // 部门操作员查询
    async operateQueryReq(payload: OperateUserQuery): Promise<void> {
      try {
        const res: ApiResponse<{ rows: OperateUserInfo[]; total: number }> =
          await operateQueryApi(payload)

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

    // 部门操作员新增
    async operateAddReq(payload: OperateUserAddParams): Promise<void> {
      try {
        const res = await operateAddApi(payload)

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

    // 部门操作员修改
    async operateUpdateReq(payload: OperateUserUpdateParams): Promise<void> {
      try {
        const res = await operateUpdateApi(payload)

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

    // 部门操作员详情
    async operateDetailReq(
      payload: OperateUserDetailParams,
    ): Promise<ApiResponse<OperateUserDetailState>> {
      try {
        const res: ApiResponse<OperateUserDetailState> = await operateDetailApi(payload)
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

    // 部门操作员删除
    async operateRemoveReq(payload: OperateUserRemoveParams): Promise<void> {
      try {
        const res = await operateRemoveApi(payload)

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

    // 部门操作员密码重置
    async operateResetPasswordReq(payload: OperateUserResetPwdParams): Promise<void> {
      try {
        const res = await operateResetPasswordApi(payload)

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

    // 部门操作员下载
    async operateDownloadReq() {
      await operateDownloadApi()
    },
  },
  getters: {},
})
