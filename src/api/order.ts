import request from '@/axios/request'

export const preOrder = (params: { teacherId: string }) => {
  return request.post('/', params)
}
