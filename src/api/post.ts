import $ajax, { type ApiResponse } from '@/utils/ajax'
import { download } from '@/utils/utils'
import type {
  PostParams,
  PostInfo,
  PostAddParams,
  PostDetailParams,
  PostEditParams,
  PostUserParams,
  PostUserTable,
  PostRemoveParams,
  PostNameList,
  PostAuthParams,
  PostAuthData,
} from '@/types/post'

const uri = '/api'

// 岗位查询
export async function postQueryApi(params: PostParams): Promise<ApiResponse<PostInfo>> {
  return $ajax.post<PostParams>(`${uri}/post/query`, params)
}

// 岗位新增
export async function postAddApi(params: PostAddParams): Promise<ApiResponse> {
  return $ajax.post<PostAddParams>(`${uri}/post/add`, params)
}

// 岗位详情
export async function postDetailApi(params: PostDetailParams): Promise<ApiResponse<PostAddParams>> {
  return $ajax.get<PostDetailParams>(`${uri}/post/detail`, params)
}

// 岗位修改
export async function postUpdateApi(params: PostEditParams): Promise<ApiResponse> {
  return $ajax.post<PostEditParams>(`${uri}/post/update`, params)
}

// 岗位删除
export async function postRemoveApi(params: PostRemoveParams): Promise<ApiResponse> {
  return $ajax.post<PostRemoveParams>(`${uri}/post/remove`, params)
}

// 查询岗位下的用户
export async function postQueryPostUserApi(
  params: PostUserParams,
): Promise<ApiResponse<PostUserTable>> {
  return $ajax.post<PostUserParams>(`${uri}/post/queryPostUser`, params)
}

// 岗位下载
export async function postDownloadApi() {
  return download(`${uri}/post/download`)
}

// 查询所有岗位
export async function postNameApi(): Promise<ApiResponse<PostNameList>> {
  return $ajax.post(`${uri}/post/postName`)
}

// 查询岗位下的所有权限数据
export async function queryPostAuthApi(
  params: PostAuthParams,
): Promise<ApiResponse<PostAuthData[]>> {
  return $ajax.post<PostAuthParams>(`${uri}/post/queryPostAuth`, params)
}
