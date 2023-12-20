import { UserService } from '@/api'
import { defineStore } from 'pinia'

export type User = {
  uid: string
  account: string
  role: 0 | 1 | 2 | 3
  fname: string
  lname: string
  address: string
  invite_code: string
}

interface UserState extends User {
  isLogin: boolean
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    isLogin: false,
    uid: '',
    account: '',
    role: 0,
    fname: '',
    lname: '',
    address: '',
    invite_code: '',
  }),
  actions: {
    async getUserInfo() {
      const { result } = await UserService.getUserData<User>()
      if (result) {
        this.$patch({ ...result, isLogin: true })
      }
    },
  },
})
