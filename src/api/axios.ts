import axios from 'axios'

export const instance = axios.create({
  baseURL: 'http://localhost:3001/api'
})

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${window.localStorage.getItem('token')}`
  return config
})

instance.interceptors.response.use(
  //auto removing token after expiring from localStorage
  (response) => response,
  (error) => {
    if (error.response.status === 403) {
      window.localStorage.removeItem('token')
    }
    // reject with error if response status is not 403
    return Promise.reject(error)
  }
)
