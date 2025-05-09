import $ajax, { type ApiResponse } from '@/utils/ajax'
import type { MenuTree } from '@/types/menu'

const uri = '/api'

// 菜单初始化
export async function menuInitApi(payload: MenuTree): Promise<ApiResponse<MenuTree[]>> {
  return $ajax.post<MenuTree[]>(`${uri}/menu/init`, payload)
}

// 菜单查询
export async function menuQueryApi(): Promise<ApiResponse<MenuTree[]>> {
  return $ajax.post<MenuTree[]>(`${uri}/menu/query`)
}
