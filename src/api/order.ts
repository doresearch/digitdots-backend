import request, { IAjaxResponse } from '@/axios/request'
import CatchAPI from '@/shared/decorators/catchAPI'

export const preOrder = (params: { teacherId: string }) => {
  return request.post('/', params)
}

abstract class OrderService {
  @CatchAPI()
  public static async preOrder<T>(params: { meeting_id: string; uid: string }): Promise<IAjaxResponse<T>> {
    const { data } = await request.post<T>('/order/createOrder', params)

    return data
  }

  @CatchAPI()
  public static async buy<T>(params: { order_id: string }): Promise<IAjaxResponse<T>> {
    const { data } = await request.post<T>('/order/buy', params)

    return data
  }

  @CatchAPI()
  public static async getOrderDetail<T>(params: { order_id: string }): Promise<IAjaxResponse<T>> {
    const { data } = await request.post<T>('/query/detail', params)

    return data
  }

  @CatchAPI()
  public static async getOrders<T>(): Promise<IAjaxResponse<T>> {
    const { data } = await request.get<T>('/query/list')

    return data
  }
}

export default OrderService
