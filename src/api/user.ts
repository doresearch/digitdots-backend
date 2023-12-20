import request, { IAjaxResponse } from '@/axios/request'
import CatchAPI from '@/shared/decorators/catchAPI'

abstract class UserService {
  @CatchAPI()
  public static async authLogin<T>(params): Promise<IAjaxResponse<T>> {
    const { data } = await request.post<T>('/auth/login', params)

    return data
  }

  @CatchAPI()
  public static async getUserData<T>(): Promise<IAjaxResponse<T>> {
    const { data } = await request.get<T>('/user/info')

    return data
  }
}

export default UserService
