// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    keyword: "",
    online: false,
    user: {},
  }),

  actions: {
    login() {
      this.online = true;
    },
    logout() {
      this.online = false;
    },
  },
})
