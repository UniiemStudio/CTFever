import { defineStore } from "pinia";

export const useGlobalState = defineStore('ctfever_global_state', () => {
  const isOnToolPage = ref(false)
  const currentPageTitle = ref('')

  return {
    isOnToolPage,
    currentPageTitle
  }
})