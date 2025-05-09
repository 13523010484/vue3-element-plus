import $ajax, { type ApiResponse } from '@/utils/ajax'
import { download } from '@/utils/utils'
import type {
  DeptParams,
  DeptInfo,
  DeptAddParams,
  DeptDetailParams,
  DeptEditParams,
  DeptUserParams,
  DeptUserTable,
  DeptRemoveParams,
  DeptName,
} from '@/types/department'

const uri = '/api'

// 部门查询
export async function departmentQueryApi(params: DeptParams): Promise<ApiResponse<DeptInfo>> {
  return $ajax.post<DeptParams>(`${uri}/department/query`, params)
}

// 部门新增
export async function departmentAddApi(params: DeptAddParams): Promise<ApiResponse> {
  return $ajax.post<DeptAddParams>(`${uri}/department/add`, params)
}

// 部门详情
export async function departmentDetailApi(
  params: DeptDetailParams,
): Promise<ApiResponse<DeptAddParams>> {
  return $ajax.get<DeptDetailParams>(`${uri}/department/detail`, params)
}

// 部门修改
export async function departmentUpdateApi(params: DeptEditParams): Promise<ApiResponse> {
  return $ajax.post<DeptEditParams>(`${uri}/department/update`, params)
}

// 部门删除
export async function departmentRemoveApi(params: DeptRemoveParams): Promise<ApiResponse> {
  return $ajax.post<DeptRemoveParams>(`${uri}/department/remove`, params)
}

// 查询部门下的用户
export async function departmentQueryDeptUserApi(
  params: DeptUserParams,
): Promise<ApiResponse<DeptUserTable>> {
  return $ajax.post<DeptUserParams>(`${uri}/department/queryDeptUser`, params)
}

// 部门下载
export async function departmentDownloadApi() {
  return download(`${uri}/department/download`)
}

// 查询部门名称
export async function departmentDeptNameApi(): Promise<ApiResponse<DeptName>> {
  return $ajax.get<DeptUserParams>(`${uri}/department/deptName`)
}
