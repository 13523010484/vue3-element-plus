import $ajax, { type ApiResponse } from '@/utils/ajax'
import { download } from '@/utils/utils'
import type {
  OperateUserState,
  OperateUserQuery,
  OperateUserAddParams,
  OperateUserUpdateParams,
  OperateUserDetailParams,
  OperateUserDetailState,
  OperateUserRemoveParams,
  OperateUserResetPwdParams,
} from '@/types/operate.ts'

const uri = '/api'

// 部门操作员查询
export async function operateQueryApi(
  params: OperateUserQuery,
): Promise<ApiResponse<OperateUserState>> {
  return $ajax.post<OperateUserQuery>(`${uri}/user/operateQuery`, params)
}

// 部门操作员新增
export async function operateAddApi(params: OperateUserAddParams): Promise<ApiResponse<void>> {
  return $ajax.post<OperateUserAddParams>(`${uri}/user/operateAdd`, params)
}

// 部门操作员修改
export async function operateUpdateApi(
  params: OperateUserUpdateParams,
): Promise<ApiResponse<void>> {
  return $ajax.post<OperateUserUpdateParams>(`${uri}/user/operateUpdate`, params)
}

// 部门操作员详情
export async function operateDetailApi(
  params: OperateUserDetailParams,
): Promise<ApiResponse<OperateUserDetailState>> {
  return $ajax.get<OperateUserDetailParams>(`${uri}/user/operateDetail`, params)
}

// 部门操作员删除
export async function operateRemoveApi(
  params: OperateUserRemoveParams,
): Promise<ApiResponse<void>> {
  return $ajax.post<OperateUserRemoveParams>(`${uri}/user/operateRemove`, params)
}

// 部门操作员下载
export async function operateDownloadApi(): Promise<ApiResponse<void>> {
  return download(`${uri}/user/operateDownload`)
}

// 部门操作员密码重置
export async function operateResetPasswordApi(
  params: OperateUserResetPwdParams,
): Promise<ApiResponse<void>> {
  return $ajax.post<OperateUserResetPwdParams>(`${uri}/user/operateResetPassword`, params)
}
