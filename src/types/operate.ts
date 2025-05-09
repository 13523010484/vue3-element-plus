export interface OperateUserInfo {
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

export interface OperateUserState {
  total: number
  pageSize: number
  pageNum: number
  tableData: OperateUserInfo[]
}

export interface OperateUserQuery {
  operCode?: string
  operName?: string
  operStatus?: number
}

export interface OperateUserAddParams {
  deptId: number
  operCode: string
  operName: string
  office?: string
  mobile?: string
  operType?: number
  operStatus?: number
  remark?: string
}

export interface OperateUserUpdateParams extends OperateUserAddParams {
  operId: number
}

export interface OperateUserDetailParams {
  operId: number
}

export interface OperateUserDetailState extends OperateUserAddParams {
  operId: number
}

export interface OperateUserRemoveParams extends OperateUserDetailParams {}

export interface OperateUserResetPwdParams extends OperateUserDetailParams {}
