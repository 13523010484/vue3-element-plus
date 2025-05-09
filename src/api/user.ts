import $ajax, { type ApiResponse, type CustomAxiosConfig } from '@/utils/ajax'
import type { LoginParams, UserInfo, BindPostParams } from '@/types/user'

const uri = '/api'

// 登录接口
export async function loginApi(params: LoginParams) {
  return $ajax.post(`${uri}/user/login`, params)
}

// 获取用户信息
export async function userInfoApi(): Promise<ApiResponse<UserInfo>> {
  return $ajax.get(`${uri}/user/userInfo`)
}

// 上传头像
export async function uploadAvatarApi(formData: FormData): Promise<ApiResponse<{ url: string }>> {
  const config: CustomAxiosConfig = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }
  return $ajax.post(`${uri}/user/uploadAvatar`, formData, config)
}

// 用户绑定岗位
export async function userBindPostApi(params: BindPostParams): Promise<void> {
  return $ajax.post<BindPostParams>(`${uri}/user/bindPost`, params)
}
