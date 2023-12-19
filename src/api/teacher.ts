import request from '@/axios/request'

export const searchClassByTeacherId = (params: { teacherId: string }) => {
  return request.post('/meeting/searchByTeacherId', params)
}