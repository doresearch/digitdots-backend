import request, { IAjaxResponse } from '@/axios/request'
import CatchAPI from '@/shared/decorators/catchAPI'

export const preOrder = (params: { teacherId: string }) => {
  return request.post('/', params)
}

export const findByMeetingId = (params: { meetingId: string }) => {
  return request.post('/meeting/findByMeetingId', params)
}
abstract class OrderService {
  @CatchAPI()
  public static async preOrder<T>(params: { meetingId: string; uid: string }): Promise<IAjaxResponse<T>> {
    const { data } = await request.post<T>('/order/createOrder', {
      meeting_id: params.meetingId,
      uid: params.uid,
    })

    return data
  }

  @CatchAPI()
  public static async buy<T>(params: { order_id: string }): Promise<IAjaxResponse<T>> {
    const { data } = await request.post<T>('/order/buy', params)

    return data
  }

  @CatchAPI()
  public static async getOrderDetail<T>(params: { order_id: string }): Promise<IAjaxResponse<T>> {
    const { data } = await request.get<T>('/order/query/detail', params)

    return data
  }

  @CatchAPI()
  public static async getOrders<T>(uid: string): Promise<IAjaxResponse<T>> {
    const { data } = await request.get<T>('/order/query/list', { uid })

    return data
  }
}

export default OrderService
