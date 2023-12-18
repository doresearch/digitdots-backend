/* eslint-disable*/
/***
 * 请求工具类
 */

import axios, { AxiosResponse } from 'axios'
import qs from 'qs'
import { ElNotification as Notification } from 'element-plus'

export interface IAjaxResponse<T> {
  code: number | null
  data: T | null
  message: string | null
  [key: string]: any
}

function callLogin() {
  // TODO:
}

// 创建 axios 实例
const service = axios.create({
  timeout: 10000, // 请求超时时间
  withCredentials: true, // 设置cross跨域 并设置访问权限 允许跨域携带cookie信息
})

service.interceptors.request.use(
  config => {
    config.baseURL = import.meta.env.VITE_API_URL
    // let token = ''
    // if (config.url !== '/login') {
    //   token = localStorage.getItem('token')
    //   config.headers.Authorization = token
    // }
    return config
  },
  error => {
    // 请求错误处理
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    if (response.data.code !== 200) {
      Notification.closeAll()
      Notification({
        title: 'Request error',
        message: response.data.message,
        type: 'error',
        duration: 5 * 1000,
      })

      if (response.data.code === 401) {
        callLogin()
      }
      return response
    }

    return response
  },
  error => {
    Notification.closeAll()
    Notification({
      title: 'Request error',
      message: 'Error status: ' + error.response.status,
      type: 'error',
      duration: 5 * 1000,
    })

    return error.response
  }
)

const request = {
  /**
   * Get查询方法
   * @template T
   * @param {string} url
   * @param {*} [params={}]
   * @param {number} [time=10000]
   * @return {*}  {Promise<AxiosResponse<IAjaxResponse<T>>>}
   */
  get<T>(url, params = {}, time = 10000): Promise<AxiosResponse<IAjaxResponse<T>>> {
    return new Promise((resolve, reject) => {
      service
        .get(url, {
          params: params,
          timeout: time,
        })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  /**
   * Post请求,formData方式进行传参
   * @template T
   * @param {string} url
   * @param {*} [data={}]
   * @param {number} [time=10000]
   * @return {*}  {Promise<AxiosResponse<IAjaxResponse<T>>>}
   */
  post<T>(url, data = {}, time = 10000): Promise<AxiosResponse<IAjaxResponse<T>>> {
    const sendObject = {
      url: url,
      method: 'post',
      data: qs.stringify(data),
      timeout: time,
    }
    return service(sendObject)
  },

  /**
   * Post请求，请求参数放在body中进行传递
   * @template T
   * @param {string} url
   * @param {*} [data={}]
   * @param {number} [time=10000]
   * @return {*}  {Promise<AxiosResponse<IAjaxResponse<T>>>}
   */
  bodyPost<T>(url, data = {}, time = 10000): Promise<AxiosResponse<IAjaxResponse<T>>> {
    const sendObject = {
      url: url,
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(data),
      timeout: time,
    }
    return service(sendObject)
  },
}

export default request