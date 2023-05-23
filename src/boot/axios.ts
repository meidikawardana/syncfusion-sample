import { createHttp } from '@konnec/vue-eloquent'
import axios, { AxiosInstance } from 'axios'
import axiosRetry from 'axios-retry'
import { boot } from 'quasar/wrappers'
import { LocalStorage } from 'quasar'

const http: AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: process.env.API,
})

const authStorage = JSON.parse(<string>LocalStorage.getItem('Auth'))
http.defaults.headers.common.Authorization = `Bearer ${authStorage?.token}`
axiosRetry(http, { retries: 2 })

export default boot(({ app }) => {
  app.config.globalProperties.$http = http
  createHttp({
    httpClient: http,
    apiPrefix: 'api/v1',
  })
})

export { http }
