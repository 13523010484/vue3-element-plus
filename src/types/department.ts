import type { UserInfo } from '@/types/user'

export interface DeptParams {
  deptName?: string
  memCode?: number
  deptStatus?: number
  pageSize: number
  pageNum: number
}

export interface DeptInfo {
  deptId: number
  deptName: string
  parentDeptId?: number | null
  menuId?: string | null
  memCode?: string | null
  remark?: string | null
  inputTime?: string
  updateTime?: string
  deptStatus?: string
  inputOperName?: string | null
  updateOperName?: string | null
  updateTm?: string | null
  reviewOperName?: string | null
  reviewTm?: string | null
}

export interface DeptAddParams {
  deptName: string
  remark?: string
  authRight: Array<{ btnId: number; menuId: number }>
  reviewRight: Array<{ btnId: number; menuId: number }>
}

export interface DeptEditParams extends DeptAddParams {
  deptId: number
}

export interface DeptState {
  total: number
  pageSize: number
  pageNum: number
  tableData: DeptInfo[]
}

export interface DeptDetailParams {
  deptId: number
}

export interface DeptUserParams {
  deptId: number
}

export interface DeptUserTable {
  total: number
  pageSize: number
  pageNum: number
  tableData: UserInfo[]
}

export interface DeptRemoveParams {
  deptId: number
}

export interface DeptName {
  deptId: number
  deptName: string
}
