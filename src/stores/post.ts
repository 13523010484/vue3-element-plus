import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import type { ApiResponse } from '@/types/index'
import type {
  PostParams,
  PostInfo,
  PostAddParams,
  PostState,
  PostDetailParams,
  PostEditParams,
  PostUserParams,
  PostUserTable,
  PostRemoveParams,
  PostNameList,
  PostAuthParams,
  PostAuthData,
} from '@/types/post'
import type { UserInfo } from '@/types/user'
import {
  postQueryApi,
  postAddApi,
  postDetailApi,
  postUpdateApi,
  postRemoveApi,
  postQueryPostUserApi,
  postDownloadApi,
  postNameApi,
  queryPostAuthApi,
} from '@/api/post'

export const usePostStore = defineStore('post', {
  state: (): {
    table: PostState
    detailData: PostAddParams
    userTable: PostUserTable
    postList: PostNameList[]
    authList: PostAuthData[]
  } => ({
    table: {
      total: 0,
      pageSize: 10,
      pageNum: 1,
      tableData: [],
    },
    detailData: {} as PostAddParams,
    userTable: {
      total: 0,
      pageSize: 10,
      pageNum: 1,
      tableData: [],
    },
    postList: [],
    authList: [],
  }),
  actions: {
    // 岗位查询
    async postQueryReq(payload: PostParams): Promise<void> {
      try {
        const res: ApiResponse<{ rows: PostInfo[]; total: number }> = await postQueryApi(payload)

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

    // 岗位新增
    async postAddReq(payload: PostAddParams) {
      try {
        const res = await postAddApi(payload)

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

    // 岗位详情
    async postDetailReq(payload: PostDetailParams): Promise<ApiResponse<PostAddParams>> {
      try {
        const res: ApiResponse<PostAddParams> = await postDetailApi(payload)
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

    // 岗位修改
    async postUpdateReq(payload: PostEditParams) {
      try {
        const res = await postUpdateApi(payload)
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

    // 岗位删除
    async postRemoveReq(payload: PostRemoveParams) {
      try {
        const res = await postRemoveApi(payload)
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

    // 查询岗位用户
    async postQueryPostUserReq(payload: PostUserParams): Promise<void> {
      try {
        // 调用 API 并确保返回值类型正确
        const res: ApiResponse<{ rows: UserInfo[]; total: number }> =
          await postQueryPostUserApi(payload)

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

    // 岗位下载
    async postDownloadReq() {
      await postDownloadApi()
    },

    // 岗位名称
    async postNameReq(): Promise<void> {
      try {
        const res = await postNameApi()
        if (res && res.status === 200) {
          this.postList = res.data
        } else {
          ElMessage.error(res.msg)
        }
      } catch (e) {
        console.error(e)
        ElMessage.error(`发生异常：${e.msg}`)
      }
    },

    // 查询岗位下的权限数据
    async queryPostAuthReq(payload: PostAuthParams): Promise<void> {
      try {
        const res = await queryPostAuthApi(payload)
        if (res && res.status === 200) {
          this.authList = res.data
        } else {
          ElMessage.error(res.msg)
        }
      } catch (e) {
        console.error(e)
        ElMessage.error(`发生异常：${e.msg}`)
      }
    },
  },
  getters: {},
})
