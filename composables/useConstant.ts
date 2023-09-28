import {defineStore} from "pinia";

export const useConstant = defineStore('ctfever_stuff', () => {
    const toolkits = ref<Toolkit[]>([
        {
            title: '编码和解码',
            description: '常见数据编码和解码',
            icon: 'i-solar-box-linear',
            tools: [
                {
                    label: 'ASCII',
                    description: '',
                    route: '/tool/ascii'
                },
                {
                    label: 'Base64',
                    description: '',
                    route: '/tool/base-64'
                },
            ]
        },
        {
            title: '加密',
            description: '加密解密',
            icon: 'i-solar-inbox-line-bold',
            tools: [
                {
                    label: 'GGG',
                    description: '',
                    route: '/tool/ascii'
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