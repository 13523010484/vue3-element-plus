import type { UserInfo } from '@/types/user'

export interface PostParams {
  postName?: string
  memCode?: number
  postStatus?: number
  pageSize: number
  pageNum: number
}

export interface PostInfo {
  postId: number
  postName: string
  parentPostId?: number | null
  menuId?: string | null
  memCode?: string | null
  remark?: string | null
  inputTime?: string
  updateTime?: string
  PostStatus?: string
  inputOperName?: string | null
  updateOperName?: string | null
  updateTm?: string | null
  reviewOperName?: string | null
  reviewTm?: string | null
}

export interface PostAddParams {
  postName: string
  remark?: string
  authRight: Array<{ btnId: number; menuId: number }>
  reviewRight: Array<{ btnId: number; menuId: number }>
}

export interface PostEditParams extends PostAddParams {
  postId: number
}

export interface PostState {
  total: number
  pageSize: number
  pageNum: number
  tableData: PostInfo[]
}

export interface PostDetailParams {
  postId: number
}

export interface PostUserParams {
  postId: number
}

export interface PostUserTable {
  total: number
  pageSize: number
  pageNum: number
  tableData: UserInfo[]
}

export interface PostRemoveParams {
  postId: number
}

export interface PostNameList {
  postId: number
  postName: string
}

export interface PostAuthParams {
  postIds: string[]
}

export interface PostAuthData {
  btnId: number
  btnCode: string
  btnName: string
  menuId: number
  menuName: string
}
