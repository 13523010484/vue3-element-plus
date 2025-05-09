import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import type { ApiResponse } from '@/types/index'
import type {
  DeptParams,
  DeptInfo,
  DeptAddParams,
  DeptState,
  DeptDetailParams,
  DeptEditParams,
  DeptUserParams,
  DeptUserTable,
  DeptRemoveParams,
  DeptName,
} from '@/types/department'
import type { UserInfo } from '@/types/user'
import {
  departmentQueryApi,
  departmentAddApi,
  departmentDetailApi,
  departmentUpdateApi,
  departmentRemoveApi,
  departmentQueryDeptUserApi,
  departmentDownloadApi,
  departmentDeptNameApi,
} from '@/api/department'

export const useDepartmentStore = defineStore('department', {
  state: (): {
    table: DeptState
    detailData: DeptAddParams
    userTable: DeptUserTable
    deptName: DeptName
  } => ({
    table: {
      total: 0,
      pageSize: 10,
      pageNum: 1,
      tableData: [],
    },
    detailData: {} as DeptAddParams,
    userTable: {
      total: 0,
      pageSize: 10,
      pageNum: 1,
      tableData: [],
    },
    deptName: [],
  }),
  actions: {
    // 部门查询
    async departmentQueryReq(payload: DeptParams): Promise<void> {
      try {
        const res: ApiResponse<{ rows: DeptInfo[]; total: number }> =
          await departmentQueryApi(payload)

        if (res && res.status === 200) {
          ElMessage.success('查询成功。')
          this.table.tableData = res.data.rows || [] // 默认为空数组
          this.table.total = res.data.total || 0 // 默认为 0
        } else {
          ElMessage.error(res.msg || '查询失败') // 显示错误提示
        }
      } catch (e) {
        console.error(e) // 打印错误日志
        ElMessage.error(`发生异常：${e.message || '未知错误'}`) // 显示异常提示
      }
    },

    // 部门新增
    async departmentAddReq(payload: DeptAddParams) {
      try {
        const res = await departmentAddApi(payload)

        if (res && res.status === 200) {
          ElMessage.success(res.msg || '保存成功。')
        } else {
          ElMessage.error(res.msg || '保存失败')
        }
      } catch (e) {
        console.error(e) // 打印错误日志
        ElMessage.error(`发生异常：${e.msg || '未知错误'}`) // 显示异常提示
      }
    },

    // 部门详情
    async departmentDetailReq(payload: DeptDetailParams): Promise<ApiResponse<DeptAddParams>> {
      try {
        const res: ApiResponse<DeptAddParams> = await departmentDetailApi(payload)
        if (res && res.status === 200) {
          this.detailData = res.data
        } else {
          ElMessage.error(res.msg || '查询失败') // 显示错误提示
        }
      } catch (e) {
        console.error(e) // 打印错误日志
        ElMessage.error(`发生异常：${e.message || '未知错误'}`) // 显示异常提示
      }
    },

    // 部门修改
    async departmentUpdateReq(payload: DeptEditParams) {
      try {
        const res = await departmentUpdateApi(payload)
        if (res && res.status === 200) {
          ElMessage.success(res.msg || '修改成功')
        } else {
          ElMessage.error(res.msg || '修改失败')
        }
      } catch (e) {
        console.error(e) // 打印错误日志
        ElMessage.error(`发生异常：${e.msg || '未知错误'}`) // 显示异常提示
      }
    },

    // 部门删除
    async departmentRemoveReq(payload: DeptRemoveParams) {
      try {
        const res = await departmentRemoveApi(payload)
        if (res && res.status === 200) {
          ElMessage.success('删除成功')
        } else {
          ElMessage.error(res.msg || '删除失败')
        }
      } catch (e) {
        console.error(e)
        ElMessage.error(`发生异常：${e.msg || '未知错误'}`)
      }
    },

    // 查询部门用户
    async departmentQueryDeptUserReq(payload: DeptUserParams): Promise<void> {
      try {
        // 调用 API 并确保返回值类型正确
        const res: ApiResponse<{ rows: UserInfo[]; total: number }> =
          await departmentQueryDeptUserApi(payload)

        if (res && res.status === 200) {
          ElMessage.success('查询成功。')
          this.userTable.tableData = res.data.rows || []
          this.userTable.total = res.data.total || 0
        } else {
          ElMessage.error(res.msg)
        }
      } catch (e) {
        console.error(e)
        ElMessage.error(`发生异常：${e.msg}`)
      }
    },

    // 部门下载
    async departmentDownloadReq() {
      await departmentDownloadApi()
    },

    // 部门名称
    async departmentDeptNameReq(): Promise<ApiResponse<DeptName>> {
      try {
        const res = await departmentDeptNameApi()
        if (res && res.status === 200) {
          this.deptName = res.data
        } else {
          ElMessage.error(res.msg || '查询失败')
        }
      } catch (e) {
        console.error(e) // 打印错误日志
        ElMessage.error(`发生异常：${e.message || '未知错误'}`)
      }
    },
  },
  getters: {},
})
