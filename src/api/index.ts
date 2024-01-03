import request from '@/axios/request'
import UserService from './user'
import OrderService from './order'

export const registerUser = (params: any) => {
  return request.post('/user/create', params)
}

export const getUploadToken = (params: any) => {
  return request.post('/oss/getToken', params)
}

export { UserService, OrderService }
