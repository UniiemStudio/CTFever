export default defineI18nConfig(() => ({
    fallbackLocale: 'en',
    messages: {
        en: {
            component: {
                topSubBar: {
                    back: 'Back',
                    favorite: {
                        success: 'Marked',
                        removed: 'Unmarked'
                    }
                },
                commandPlatte: {
                    placeholder: 'Search tools, commands or settings...',
                    empty: {
                        label: 'Nothing here',
                        queryLabel: 'Nothing found...'
                    },
                    groups: {
                        category: 'Categories',
                        tool: 'Tools',
                        link: 'Links'
                    }
                }
            },
            app: {
                title: 'CTFever',
                titleTemplate: '{title} - @:app.title',
                tags: {
                    charactersProcessing: {
                        label: 'Characters',
                        description: 'Various processing of characters and strings'
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
                    base64: {
                        label: 'Base64 Encoding',
                        description: 'Base64 encoding and decoding'
                    },
                }
            },
        },
        zh: {
            component: {
                topSubBar: {
                    back: '返回',
                    favorite: {
                        success: '已收藏',
                        removed: '已移出收藏'
                    }
                },
                commandPlatte: {
                    placeholder: '搜索工具、命令、设置...',
                    empty: {
                        label: '没有数据',
                        queryLabel: '什么都找不到...'
                    },
                    groups: {
                        category: '分类',
                        tool: '工具',
                        link: '链接'
                    }
                }
            },
            app: {
                title: 'CTFever',
                titleTemplate: '{title} - @:app.title',
                tags: {
                    charactersProcessing: {
                        label: '字符处理',
                        description: '字符和字符串的各种处理'
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
                    base64: {
                        label: 'Base64 编码',
                        description: 'Base64 编码和解码'
                    },
                }
            },
        },
    }
}))