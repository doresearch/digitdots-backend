import { defineStore } from 'pinia'

interface UserState {
  isLogin: boolean
  account: string
  role: 0 | 1 | 2 | 3
  fname: string
  lname: string
  address: string
  invite_code: string
  invited_by_code: string
}

export const useUserStore = defineStore('app', {
  state: (): UserState => ({
    isLogin: false,
    account: '',
    role: 0,
    fname: '',
    lname: '',
    address: '',
    invite_code: '',
    invited_by_code: '',
  }),
  actions: {
    getUserInfo() {
      //
    },
  },
})
