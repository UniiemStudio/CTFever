import { defineStore } from "pinia";

export const useGlobalState = defineStore('ctfever_global_state', () => {
  const isOnToolPage = ref(false)
  const currentTool = ref<Tool>() // use this when isOnToolPage is true
  const currentPageTitle = ref('')

  return {
    isOnToolPage,
    currentTool,
    currentPageTitle
  }
})