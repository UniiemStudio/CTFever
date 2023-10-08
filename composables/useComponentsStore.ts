import { defineStore } from "pinia";

const useComponentsStore = defineStore('components_store', () => {
  const messages = ref([])

  return {
    messages
  }
})