import request from '@/axios/request'
import UserService from './user'

export const registerUser = (params: any) => {
  return request.post('/user/create', params)
}

export { UserService }
