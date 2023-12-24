import request from '@/axios/request'

export const preOrder = (params: { teacherId: string }) => {
  return request.post('/', params)
}

export const findByMeetingId = (params: { meetingId: string }) => {
  return request.post('/meeting/findByMeetingId', params)
}
