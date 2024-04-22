export default defineI18nConfig(() => ({
  fallbackLocale: 'en',
  messages: {
    en: {
      component: {
        topSubBar: {
          back: 'Back',
          favorite: {
            success: 'Marked',
            removed: 'Unmarked',
          },
        },
        commandPlatte: {
          placeholder: 'Search tools, commands or settings...',
          empty: {
            label: 'Nothing here',
            queryLabel: 'Nothing found...',
          },
          groups: {
            common: 'Common',
            category: 'Categories',
            tag: 'Tags',
            tool: 'Tools',
            link: 'Links',
          },
        },
      },
      app: {
        tags: {
          charactersProcessing: {
            label: 'Characters',
            description: 'Various processing of characters and strings',
          },
          generator: {
            label: 'Generator',
            description: 'Various generators',
          },
          socialEngineering: {
            label: 'Social Engineering',
            description: 'Social engineering tools',
          },
          classicalCiphers: {
            label: 'Classical Ciphers',
            description: 'Classic ciphers and encryption methods',
          },
        },
        toolkit: {
          encoding: {
            label: 'Encoding',
            description: 'Tools for encoding and decoding',
          },
          cryptology: {
            label: 'Cryptology',
            description: 'Cryptology and algorithm tools',
          },
          misc: {
            label: 'Misc',
            description: 'Miscellaneous tools',
          },
        },
        tool: {
          ascii: {
            label: 'ASCII',
            description: 'String and ASCII code conversion',
          },
          urlEncoding: {
            label: 'URL Encoding',
            description: 'URL encoding and decoding',
          },
          base64: {
            label: 'Base64 Encoding',
            description: 'Base64/Base32 encoding and decoding',
          },
          utf8Conversion: {
            label: 'UTF8 Encoding',
            description: 'UTF-8 encoding and decoding',
          },
          socialEngineeringDictGen: {
            label: 'Social Engineering Dict Generator',
            description: 'Generate social engineering dictionary',
          },
          caesar: {
            label: 'Caesar Cipher',
            description: 'A substitution cipher that shifts letters in a message to make it unreadable if intercepted',
          },
        },
      },
    },
    zh: {
      component: {
        topSubBar: {
          back: '返回',
          favorite: {
            success: '已收藏',
            removed: '已移出收藏',
          },
        },
        commandPlatte: {
          placeholder: '搜索工具、命令、设置...',
          empty: {
            label: '没有数据',
            queryLabel: '什么都找不到...',
          },
          groups: {
            common: '通用',
            category: '分类',
            tag: '标签',
            tool: '工具',
            link: '链接',
          },
        },
      },
      app: {
        tags: {
          charactersProcessing: {
            label: '字符处理',
            description: '字符和字符串的各种处理',
          },
          generator: {
            label: '生成器',
            description: '各种生成器',
          },
          socialEngineering: {
            label: '社工',
            description: '社会工程学工具',
          },
          classicalCiphers: {
            label: '古典密码',
            description: '古典密码和加密方法',
          },
        },
        toolkit: {
          encoding: {
            label: '编码工具',
            description: '编码和解码工具',
          },
          cryptology: {
            label: '密码学',
            description: '密码学和算法工具',
          },
          misc: {
            label: '杂项',
            description: '各种奇奇怪怪的工具',
          },
        },
        tool: {
          ascii: {
            label: 'ASCII',
            description: '字符串与 ASCII 码转换',
          },
          urlEncoding: {
            label: 'URL 编码',
            description: 'URL 编码和解码',
          },
          base64: {
            label: 'Base64 编码',
            description: 'Base64 和 Base32 的编码和解码',
          },
          utf8Conversion: {
            label: 'UTF8 编码',
            description: 'UTF-8 编码和解码',
          },
          socialEngineeringDictGen: {
            label: '社工字典生成器',
            description: '利用一些信息生成密码字典',
          },
          caesar: {
            label: '凯撒密码',
            description: '一种替换密码，通过将消息中的字母移位来使其在拦截时无法读取',
          },
        },
      },
    },
  },
}))