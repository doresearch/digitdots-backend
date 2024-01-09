import request from '@/axios/request'

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

export const getAllTeacher = () => {
  return request.post('/user/getAllTeacher')
}

export const getReview = params => {
  return request.get('/meeting/getReview', params)
}

export const passReview = params => {
  return request.post('/meeting/passReview', params)
}
