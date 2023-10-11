export default defineI18nConfig(() => ({
    messages: {
        en: {
            component: {
                commandPlatte: {
                    placeholder: 'Search tools, commands or settings...',
                    empty: {
                        label: 'Nothing here',
                        queryLabel: 'Nothing found...'
                    }
                }
            },
            app: {
                title: 'CTFever',
                titleTemplate: '{title} - @:app.title',
                tags: {
                    encoding: {
                        label: 'Encoding',
                        description: 'Text and character encoding and decoding'
                    }
                },
                toolkit: {
                    encoding: {
                        label: 'Encoding',
                        description: 'Tools for encoding and decoding'
                    },
                    cryptology: {
                        label: 'Cryptology',
                        description: 'Cryptology and algorithm tools'
                    }
                },
                tool: {
                    ascii: {
                        label: 'ASCII',
                        description: 'String and ASCII code conversion'
                    },
                    urlEncoding: {
                        label: 'URL Encoding',
                        description: 'URL encoding and decoding'
                    },
                    uuidGenerator: {
                        label: 'UUID',
                        description: 'Generate and validate UUID'
                    },
                }
            },
        },
        zh: {
            component: {
                commandPlatte: {
                    placeholder: '搜索工具、命令、设置...',
                    empty: {
                        label: '没有数据',
                        queryLabel: '什么都找不到...'
                    }
                }
            },
            app: {
                title: 'CTFever',
                titleTemplate: '{title} - @:app.title',
                tags: {
                    encoding: {
                        label: '编码',
                        description: '文本和字符编码和解码'
                    }
                },
                toolkit: {
                    encoding: {
                        label: '编码工具',
                        description: '编码和解码工具'
                    },
                    cryptology: {
                        label: '密码学',
                        description: '密码学和算法工具'
                    }
                },
                tool: {
                    ascii: {
                        label: 'ASCII',
                        description: '字符串与 ASCII 码转换'
                    },
                    urlEncoding: {
                        label: 'URL 编码',
                        description: 'URL 编码和解码'
                    },
                    uuidGenerator: {
                        label: 'UUID',
                        description: '生成及校验各种版本 UUID'
                    },
                }
            },
        },
    }
}))