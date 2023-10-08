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
            icon: 'i-solar-lock-password-bold-duotone',
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

    return {
        toolkits,
        favorites,
        recent,
    }
})