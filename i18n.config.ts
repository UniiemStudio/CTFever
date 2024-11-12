export default defineI18nConfig(() => ({
  fallbackLocale: "en",
  fallbackWarn: false,
  messages: {
    en: {
      component: {
        topSubBar: {
          back: "Back",
          share: {
            success: "Copied link",
          },
          favorite: {
            success: "Marked",
            removed: "Unmarked",
          },
        },
        commandPlatte: {
          placeholder: "Search tools, commands or settings...",
          empty: {
            label: "Nothing here",
            queryLabel: "Nothing found...",
          },
          groups: {
            common: "Common",
            category: "Categories",
            tag: "Tags",
            tool: "Tools",
            link: "Links",
          },
        },
      },
      app: {
        tags: {
          crypto: {
            label: "Crypto",
            description: "Cryptology and algorithm",
          },
          web: {
            label: "Web",
            description: "Web security and development",
          },
          binary: {
            label: "Binary",
            description: "Binary exploitation and reverse engineering",
          },
          reverse: {
            label: "Reverse",
            description: "Reverse engineering and analysis",
          },
          forensics: {
            label: "Forensics",
            description: "Digital forensics and investigation",
          },
          general: {
            label: "General",
            description: "General purpose tools",
          },
          misc: {
            label: "Misc",
            description: "Miscellaneous tools",
          },
        },
        toolkit: {
          encoding: {
            label: "Encoding",
            description: "Tools for encoding and decoding",
          },
          crypto: {
            label: "Cryptology",
            description: "Cryptology and algorithm tools",
          },
          converter: {
            label: "Converter",
            description: "Data conversion and calculation tools",
          },
          network: {
            label: "Network",
            description: "Network and protocol tools",
          },
          misc: {
            label: "Misc",
            description: "Miscellaneous tools",
          },
        },
        tool: {
          ascii: {
            label: "ASCII",
            description: "String and ASCII code conversion",
          },
          urlEncoding: {
            label: "URL Encoding",
            description: "URL encoding and decoding",
          },
          base64: {
            label: "Base64 Encoding",
            description: "Base64/Base32 encoding and decoding",
          },
          rot13: {
            label: "ROT13 Encoding",
            description: "ROT13 encoding, a simple form of Caesar cipher",
          },
          utf8Conversion: {
            label: "UTF8 Encoding",
            description: "UTF-8 encoding and decoding",
          },
          socialEngineeringDictGen: {
            label: "Social Engineering Dict Generator",
            description: "Generate social engineering dictionary",
          },
          caesar: {
            label: "Caesar Cipher",
            description:
              "A substitution cipher that shifts letters in a message to make it unreadable if intercepted",
          },
          vigenereCipher: {
            label: "Vigenere Cipher",
            description:
              "A method of encrypting alphabetic text by using a simple form of polyalphabetic substitution",
          },
          digestCalculation: {
            label: "Digest Calculation",
            description:
              "Calculate hash values of message like MD5, SHA1, SHA256, SHA512, etc.",
          },
          uuid: {
            label: "UUID",
            description: "UUID generation and validation tool",
          },
          zeroWidthSteganography: {
            label: "Zero-Width Steganography",
            description:
              "Hide information in plain text using zero-width character encoding",
          },
          brainFuck: {
            label: "Brain Fuck",
            description:
              "BrainFuck is a programming language that is a variant of the esoteric programming language Fuck",
          },
          zipPseudoEncryption: {
            label: "Zip Pseudo-encryption",
            description: "Check if a Zip archive is pseudo-encrypted",
          },
          ip2int: {
            label: "IP to Int Convert",
            description:
              "Conversion between dotted decimal IP address and decimal integer",
          },
        },
      },
    },
    zh: {
      component: {
        topSubBar: {
          back: "返回",
          share: {
            success: "已复制链接",
          },
          favorite: {
            success: "已收藏",
            removed: "已移出收藏",
          },
        },
        commandPlatte: {
          placeholder: "搜索工具、命令、设置...",
          empty: {
            label: "没有数据",
            queryLabel: "什么都找不到...",
          },
          groups: {
            common: "通用",
            category: "分类",
            tag: "标签",
            tool: "工具",
            link: "链接",
          },
        },
      },
      app: {
        tags: {
          crypto: {
            label: "密码学",
            description: "密码学和算法工具",
          },
          web: {
            label: "Web",
            description: "网络安全和开发",
          },
          binary: {
            label: "二进制",
            description: "二进制分析和逆向工程",
          },
          reverse: {
            label: "逆向",
            description: "逆向工程和审计",
          },
          forensics: {
            label: "取证",
            description: "数字取证",
          },
          general: {
            label: "通用",
            description: "通用工具",
          },
          misc: {
            label: "杂项",
            description: "杂项工具",
          },
        },
        toolkit: {
          encoding: {
            label: "编码工具",
            description: "编码和解码工具",
          },
          crypto: {
            label: "密码学",
            description: "密码学和算法工具",
          },
          converter: {
            label: "转换器",
            description: "数据转换和换算工具",
          },
          network: {
            label: "网络",
            description: "网络相关工具",
          },
          misc: {
            label: "杂项",
            description: "各种奇奇怪怪的工具",
          },
        },
        tool: {
          ascii: {
            label: "ASCII",
            description: "字符串与 ASCII 码转换",
          },
          urlEncoding: {
            label: "URL 编码",
            description: "URL 编码和解码",
          },
          base64: {
            label: "Base64 编码",
            description: "Base64 和 Base32 的编码和解码",
          },
          rot13: {
            label: "ROT13 编码",
            description: "ROT13 编码，一种凯撒密码的简单形式",
          },
          utf8Conversion: {
            label: "UTF8 编码",
            description: "UTF-8 编码和解码",
          },
          socialEngineeringDictGen: {
            label: "社工字典生成器",
            description: "利用一些信息生成密码字典",
          },
          caesar: {
            label: "凯撒密码",
            description:
              "一种替换密码，通过将消息中的字母移位来使其在拦截时无法读取",
          },
          vigenereCipher: {
            label: "维吉尼亚密码",
            description: "一种通过使用简单的多表替换的方法来加密字母文本",
          },
          digestCalculation: {
            label: "消息摘要计算",
            description: "计算信息的 MD5、SHA1、SHA256、SHA512 等哈希值",
          },
          uuid: {
            label: "UUID",
            description: "UUID 生成及校验解析工具",
          },
          zeroWidthSteganography: {
            label: "零宽字符隐写",
            description: "使用零宽字符编码隐藏信息到明文中",
          },
          brainFuck: {
            label: "Brain Fuck",
            description: "一种由8个操作符组成的极小化编程语言",
          },
          zipPseudoEncryption: {
            label: "Zip 伪加密",
            description: "检测一个 Zip 压缩包是否经过了伪加密",
          },
          ip2int: {
            label: "IP 地址与整数转换",
            description: "点分十进制 IP 地址与十进制整数转换",
          },
        },
      },
    },
  },
}));
