import axios from 'axios'

/**
 * 封装下载文件的方法
 * @param url - 下载接口地址
 * @param params - 请求参数 (可选)
 */
export const download = async (url: string, params?: Record<string, any>): Promise<void> => {
  try {
    // 获取 token
    const token = sessionStorage.getItem('token')

    // 检查是否有 token
    if (!token) {
      console.error('没有权限下载：缺少 token')
      alert('您没有权限下载此文件，请先登录！')
      return // 终止方法执行
    }

    // 配置请求头和参数
    const config: object = {
      responseType: 'blob', // 确保返回的是二进制数据
      headers: {
        Authorization: `Bearer ${token}`, // 添加 token 到请求头
      },
      params, // 添加请求参数
    }

    // 发起请求
    const response = await axios.get(url, config)

    // 获取文件名（优先使用后端返回的 Content-Disposition）
    const contentDisposition = response.headers['content-disposition']
    let fileName = 'download' // 默认文件名
    if (contentDisposition) {
      const match = contentDisposition.match(/filename="?([^"]+)"?/)
      if (match && match[1]) {
        fileName = decodeURIComponent(match[1]) // 解码文件名
      }
    }

    // 创建 Blob 对象
    const blob = new Blob([response.data])

    // 创建下载链接
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = fileName // 设置下载文件名
    link.click()

    // 释放资源
    URL.revokeObjectURL(link.href)
  } catch (error) {
    console.error('文件下载失败:', error)
    alert('文件下载失败，请稍后再试！')
  }
}
