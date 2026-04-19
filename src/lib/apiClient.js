import axios from 'axios'

export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || 'https://sampurna-backend.vercel.app'
).replace(/\/$/, '')

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    Accept: 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  config.headers = config.headers || {}
  config.headers.Accept = config.headers.Accept || 'application/json'

  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
)

export const isApiError = axios.isAxiosError

export default apiClient
