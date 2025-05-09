export interface LoginParams {
  operCode?: string
  password?: string
}

export interface UserInfo {
  operId: string
  operType?: string
  operCode?: string
  operName?: string
  deptId?: string
  avatar?: string
  mobile?: string
}

export interface BindPostParams {
  operId: number
  postIds: string[]
}
