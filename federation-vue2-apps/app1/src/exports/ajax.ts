import axios, { AxiosInstance } from 'axios'

const ajax: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器 —— app1 专属
ajax.interceptors.request.use(
  config => {
    console.log('[app1] request:', config.url)
    return config
  },
  error => Promise.reject(error)
)

// 响应拦截器 —— app1 专属
ajax.interceptors.response.use(
  response => {
    console.log('[app1] response:', response.config.url)
    return response
  },
  error => {
    console.error('[app1] response error:', error.config?.url)
    return Promise.reject(error)
  }
)

export default ajax
