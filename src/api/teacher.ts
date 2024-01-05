import request, { IAjaxResponse } from '@/axios/request'

export const searchClassByTeacherId = (params: { teacherId: string }) => {
  return request.post('/meeting/searchByTeacherId', params)
}

export const searchClassByTeacherIds = (params: { teacherIds: string[] }) => {
  return request.post('/meeting/searchByTeacherIds', params)
}

export const saveOrders = (params: { teacherId: string }) => {
  return request.post('/meeting/saveOrders', params)
}

export const delMeeting = (params: { meetingId: string }) => {
  return request.post('/meeting/delete', params)
}

export const getAllTeacher = (): Promise<IAjaxResponse<any>> => {
  return request.post('/user/getAllTeacher')
}

export const getReview = (params): Promise<IAjaxResponse<any>> => {
  return request.get('/meeting/getReview', params)
}

export const passReview = (params): Promise<IAjaxResponse<any>> => {
  return request.post('/meeting/passReview', params)
}
