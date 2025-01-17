import $ajax from '@/utils/ajax'
const uri = '/api'

// 获取用户信息
export async function userInfoApi() {
  return $ajax.get(`${uri}/user/userInfo`)
}

// 上传头像
export async function uploadAvatarApi(params) {
  return $ajax.post(`${uri}/user/uploadAvatar`, params)
}
