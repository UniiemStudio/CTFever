import { defineStore } from 'pinia'
import {rawTags, rawToolkits} from '~/config/meta'

export const useConstant = defineStore('ctfever_stuff', () => {
  const tags = Object.freeze<{ [key: string]: Tag }>(rawTags)
  const toolkits = ref<Toolkit[]>(rawToolkits);
  const favorites = ref<Tool[]>([])
  const recent = ref<Tool[]>([])

  const getToolByPath = (path: string) => {
    return toolkits.value.flatMap(t => t.tools).find(t => t.route === path)
  }

  const getToolByKey = (key: string) => {
    return toolkits.value.flatMap(t => t.tools).find(t => t.key === key)
  }

  const isFavorited = (key: string) => {
    return !!favorites.value.find(t => t.key === key)
  }

  const addFavorite = (tool: Tool) => {
    if (isFavorited(tool.key)) return
    favorites.value.push(tool)
  }

  const removeFavorite = (key: string) => {
    const index = favorites.value.findIndex(t => t.key === key)
    if (index === -1) return
    favorites.value.splice(index, 1)
  }

  const addRecent = (tool: Tool) => {
    if (recent.value.includes(tool)) return
    recent.value.push(tool)
  }

  const removeRecent = (tool: Tool) => {
    const index = recent.value.indexOf(tool)
    if (index === -1) return
    recent.value.splice(index, 1)
  }

  return {
    tags,
    toolkits,
    favorites,
    recent,
    getToolByPath,
    getToolByKey,
    addFavorite,
    addRecent,
    removeFavorite,
    removeRecent,
  }
}, {
  persist: {
    storage: persistedState.localStorage,
    pick: ['favorites', 'recent']
  },
})