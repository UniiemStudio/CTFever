import { defineStore, skipHydrate } from "pinia";

export const useConstant = defineStore('ctfever_stuff', () => {
    const tags = Object.freeze<{ [key: string]: Tag }>({
        charsProcess: {
            key: 'charactersProcessing',
        },
    })
    const toolkits = ref<Toolkit[]>([
        {
            key: 'encoding',
            icon: 'i-solar-code-line-duotone',
            tools: [
                {
                    key: 'ascii',
                    route: '/tools/ascii',
                    tags: [tags.charsProcess]
                },
                {
                    key: 'urlEncoding',
                    route: '/tools/url-encoding',
                    tags: [tags.charsProcess]
                },
                {
                    key: 'base64',
                    route: '/tools/base64',
                    tags: [tags.charsProcess]
                },
            ]
        },
    ])
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
        toolkits,
        favorites,
        recent,
        getToolByPath,
        getToolByKey,
        addFavorite,
        addRecent,
        removeFavorite,
        removeRecent
    }
}, {
    persist: {
        storage: persistedState.localStorage,
        paths: [
            'favorites',
            'recent'
        ]
    }
})