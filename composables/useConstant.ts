import { defineStore } from "pinia";

export const useConstant = defineStore('ctfever_stuff', () => {
    const tags = Object.freeze<{ [key: string]: Tag }>({
        Encoding: {
            key: 'encoding',
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
                    tags: [tags.Encoding]
                },
                {
                    key: 'urlEncoding',
                    route: '/tools/url-encoding',
                    tags: [tags.Encoding]
                },
            ]
        },
        {
            key: 'cryptology',
            icon: 'i-solar-password-linear',
            tools: [
                {
                    key: 'uuidGenerator',
                    route: '/tools/uuid-generator',
                    tags: [tags.Encoding]
                },
            ]
        }
    ])
    const favorites = ref<Tool[]>([])
    const recent = ref<Tool[]>([])

    const getToolByPath = (path: string) => {
        return toolkits.value.flatMap(t => t.tools).find(t => t.route === path)
    }

    const getToolByKey = (key: string) => {
        return toolkits.value.flatMap(t => t.tools).find(t => t.key === key)
    }

    const addFavorite = (tool: Tool) => {
        if (favorites.value.includes(tool)) return
        favorites.value.push(tool)
    }

    const removeFavorite = (tool: Tool) => {
        const index = favorites.value.indexOf(tool)
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