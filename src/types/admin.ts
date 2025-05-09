export interface AdminUserInfo {
  operId: number
  operCode: string
  operName: string
  deptId: number
  officeTel?: string
  mobile?: string
  remark?: string
  operStatus: number
  operType: number
  inputOperName: string
  updateOperName: string
  avatar?: string
  inputTm: string
  updateTm: string
}

export interface AdminUserState {
  total: number
  pageSize: number
  pageNum: number
  tableData: AdminUserInfo[]
}

export interface AdminUserQuery {
  operCode?: string
  operName?: string
  operStatus?: number
}

export interface AdminUserAddParams {
  deptId: number
  operCode: string
  operName: string
  office?: string
  mobile?: string
  operType?: number
  operStatus?: number
  remark?: string
}

export interface AdminUserUpdateParams extends AdminUserAddParams {
  operId: number
}

export interface AdminUserDetailParams {
  operId: number
}

export interface AdminUserDetailState extends AdminUserAddParams {
  operId: number
}

export interface AdminUserRemoveParams extends AdminUserDetailParams {}

export interface AdminUserResetPwdParams extends AdminUserDetailParams {}
