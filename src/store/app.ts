import { defineStore } from 'pinia'

interface AppState {
  isShowDevicePanel: boolean
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    isShowDevicePanel: false,
  }),
  actions: {
    openNestPanel() {
      this.isShowDevicePanel = false
    },
    openDevicePanel() {
      this.isShowDevicePanel = true
    },
  },
})
