import request from '@/axios/request'

export const registerUser = (params: any) => {
  return request.post('/user/create', params)
}

export const loginUser = (params: any) => {
  return request.post('/auth/login', params)
}
