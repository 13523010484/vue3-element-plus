import $ajax from '@/utils/ajax'
import type { LoginParams } from '@/types/user'

const uri = '/api'

// 登录接口
export async function loginApi(params: LoginParams) {
  return $ajax.post(`${uri}/user/login`, params)
}
