import axios from 'axios'

// 定义 API 响应的通用接口
export interface ApiResponse<T> {
  status: number
  data?: T
  message?: string
}

// 自定义配置类型（可以基于你的需求进行扩展）
export interface CustomAxiosConfig {
  headers?: Record<string, string>
  [key: string]: any // 允许其他任意配置项
}

// 创建 axios 实例
const apiClient = axios.create({
  baseURL: '', // 根据实际情况设置你的 baseURL
  timeout: 10000,
})

// 请求拦截器
apiClient.interceptors.request.use(
  (config: CustomAxiosConfig) => {
    const token = sessionStorage.getItem('token')

    // 如果有 token，则将 token 添加到请求头中
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      }
    }

    if (!(config.data instanceof FormData)) {
      config.headers = {
        ...config.headers,
        'Content-Type': 'application/json',
      }
    }

    return config
  },
  (error) => Promise.reject(error),
)

// 响应拦截器
apiClient.interceptors.response.use(
  (response: any) => response.data as ApiResponse<any>,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = '/login' // 跳转到登录页面
    }
    return Promise.reject(error)
  },
)

// 导出常用的 HTTP 方法
const apiMethods = {
  get<T>(url: string, params?: any): Promise<ApiResponse<T>> {
    // 将 params 包装为 Axios 的配置对象
    const config: CustomAxiosConfig = params ? { params } : {}
    return apiClient.get(url, config).then((response: ApiResponse<T>) => response)
  },
  post<T>(url: string, data?: any, config?: CustomAxiosConfig): Promise<ApiResponse<T>> {
    return apiClient.post(url, data, config).then((response: ApiResponse<T>) => response)
  },
  put<T>(url: string, data?: any, config?: CustomAxiosConfig): Promise<ApiResponse<T>> {
    return apiClient.put(url, data, config).then((response: ApiResponse<T>) => response)
  },
  delete<T>(url: string, config?: CustomAxiosConfig): Promise<ApiResponse<T>> {
    return apiClient.delete(url, config).then((response: ApiResponse<T>) => response)
  },
}

export default apiMethods
