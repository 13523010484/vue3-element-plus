import $ajax, { type ApiResponse } from '@/utils/ajax'
import { download } from '@/utils/utils'
import type {
  AdminUserState,
  AdminUserQuery,
  AdminUserAddParams,
  AdminUserUpdateParams,
  AdminUserDetailParams,
  AdminUserDetailState,
  AdminUserRemoveParams,
  AdminUserResetPwdParams,
} from '@/types/admin.ts'

const uri = '/api'

// 部门管理员查询
export async function adminQueryApi(params: AdminUserQuery): Promise<ApiResponse<AdminUserState>> {
  return $ajax.post<AdminUserQuery>(`${uri}/user/adminQuery`, params)
}

// 部门管理员新增
export async function adminAddApi(params: AdminUserAddParams): Promise<ApiResponse<void>> {
  return $ajax.post<AdminUserAddParams>(`${uri}/user/adminAdd`, params)
}

// 部门管理员修改
export async function adminUpdateApi(params: AdminUserUpdateParams): Promise<ApiResponse<void>> {
  return $ajax.post<AdminUserUpdateParams>(`${uri}/user/adminUpdate`, params)
}

// 部门管理员详情
export async function adminDetailApi(
  params: AdminUserDetailParams,
): Promise<ApiResponse<AdminUserDetailState>> {
  return $ajax.get<AdminUserDetailParams>(`${uri}/user/adminDetail`, params)
}

// 部门管理员删除
export async function adminRemoveApi(params: AdminUserRemoveParams): Promise<ApiResponse<void>> {
  return $ajax.post<AdminUserRemoveParams>(`${uri}/user/adminRemove`, params)
}

// 部门管理员下载
export async function adminDownloadApi(): Promise<ApiResponse<void>> {
  return download(`${uri}/user/adminDownload`)
}

// 部门管理员密码重置
export async function adminResetPasswordApi(
  params: AdminUserResetPwdParams,
): Promise<ApiResponse<void>> {
  return $ajax.post<AdminUserResetPwdParams>(`${uri}/user/adminResetPassword`, params)
}
