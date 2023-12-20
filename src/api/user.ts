import request, { IAjaxResponse } from '@/axios/request'
import CatchAPI from '@/shared/decorators/catchAPI'

abstract class UserService {
  @CatchAPI()
  public static async authLogin<T>(params): Promise<IAjaxResponse<T>> {
    const { data } = await request.post('/auth/login', params)

    return data as IAjaxResponse<T>
  }
}

export default UserService
