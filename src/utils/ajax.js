import axios from 'axios';

// 创建 axios 实例
const apiClient = axios.create({
  baseURL: '',
  timeout: 10000, // 请求超时时间
});

// 请求拦截器
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    if (!(config.data instanceof FormData)) {
      config.headers['Content-Type'] = 'application/json';
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器
apiClient.interceptors.response.use(
  (response) => response.data, // 直接返回响应的数据部分
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = '/login'; // 跳转到登录页面
    }
    return Promise.reject(error);
  }
);

// 导出常用的 HTTP 方法
export default {
  get(url, config) {
    return apiClient.get(url, config);
  },
  post(url, data, config) {
    return apiClient.post(url, data, config);
  },
  put(url, data, config) {
    return apiClient.put(url, data, config);
  },
  delete(url, config) {
    return apiClient.delete(url, config);
  },
};
