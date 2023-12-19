import request from '@/axios/request'

export const registerUser = (params: any) => {
  return request.post('/api/user/create', params)
}
