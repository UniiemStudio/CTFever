export default {
  app: {
    name: 'CTFever',
    title: 'CTFever Toolkit by uniiem',
    subtitle: '工具套件',
    tip: {
      title: '欢迎来到 CTFever',
      content: '这是为 CTF 发烧者准备的的工具套件，助你过关斩将、攻克难关。第一个版本已经开发完毕，我们目前正在着手高级功能的开发，敬请期待。欢迎给我们的开源仓库 star、pr。同时我们正在招募 i18n 团队，欢迎加入我们！',
    }
  },
  topbar: {
    login: '登陆',
    signup: '创建账号',
    back: '返回',
    appearance: {
      light: '亮色',
      dark: '暗色',
      auto: '自动'
    },
  },
  action: {
    marked: '已收藏',
    unmarked: '已移出收藏'
  },
  common: {
    radix: {
      bin: '二进制',
      oct: '八进制',
      dec: '十进制',
      hex: '十六进制'
    },
    btn_encode: '编码',
    btn_decode: '解码',
    btn_encrypt: '加密',
    btn_decrypt: '解密',
    btn_execute: '执行',
    btn_calculate: '计算',
    btn_run: '运行',
    btn_swap: '交换',
    btn_backspace: '← 退格',
    btn_clean: '清空',
    btn_validate: '校验',
    btn_parse: '格式化',
    btn_version: '版本',
    btn_generate: '生成',
    text_encode: '编码',
    text_decode: '解码',
    text_encoded: '已编码内容',
    text_decoded: '已解码内容',
    text_plain: '原文',
    text_cipher: '密文',
    text_original_content: '原始内容',
    text_result_content: '结果',
    text_input: '输入',
    text_output: '输出',
    text_secret: '密钥',
    text_algorithm: '算法',
    text_offset: '偏移量',
    text_mode: '模式',
    text_type: '类型',
    text_radix: '进制',
    text_string: '字符串',
  },
  page: {
    home: {
      favoriteKit: {
        title: '收藏夹',
        desc: '收藏的常用工具集'
      },
    },
    notFound: {
      title: '未找到页面',
      message: '探索的精神可贵，但很遗憾这里什么都没有 :(',
      btn: '回到首页',
      btnPrevious: '返回',
    },
  },
  toolkit: {
    EaD: {
      title: '编码和解码',
      desc: '常见数据编码和解码',
    },
    cryptography: {
      title: '密码学',
      desc: '常见密码学算法工具包'
    },
    programRelated: {
      title: '程序相关',
      desc: '代码混淆、反编译等工具'
    },
    networkTool: {
      title: '网络工具',
      desc: '常用网络工具套件'
    },
    dataConversion: {
      title: '数据转换',
      desc: '各种数据转换工具包'
    },
    misc: {
      title: '杂项',
      desc: '通用型的工具套件'
    },
  },
  tool: {
    // EaD
    ascii: {
      title: 'ASCII',
      desc: '在 ASCII 和 字符串之间转换',
      continuity: '连续(自动识别可打印字符)',
      split: '逗号分隔'
    },
    urlEncoding: {
      title: 'URL 编码',
      desc: 'URL 编码和解码'
    },
    baseSeries: {
      title: 'Base 系列编码',
      desc: '将字符转换为 Base 系列编码'
    },
    rotSeries: {
      title: 'ROT-13 编码',
      desc: '简易的替换式密码，是凯撒密码的一种变体'
    },
    morseCode: {
      title: '摩尔斯码',
      desc: '将字母和数字转换为摩尔斯码'
    },
    // Cryptography
    uuid: {
      title: 'UUID',
      desc: '验证和生成各种版本的 UUID'
    },
    messageDigest: {
      title: '消息摘要计算',
      desc: '计算内容的消息摘要，如 MD5、SHA1、SHA256 等'
    },
    caesarCipher: {
      title: '凯撒密码',
      desc: '一种利用偏移字母表替换加密的技术'
    },
    railFenceCipher: {
      title: '栅栏密码',
      desc: '明文分组排列成栅栏，然后每组依次排列组成密文',
      rows: '栏数'
    },
    pigpen: {
      title: '猪圈密码',
      desc: '又称共济会密码，一种简单的替换式密码'
    },
    vigenereCipher: {
      title: '维吉尼亚密码',
      desc: '在凯撒密码基础上产生的一种加密方法'
    },
    // Network Tool
    ipAttribution: {
      title: 'IP 地址归属',
      desc: '查询 IP 地址归属地和 ISP 信息'
    },
    // Data Conversion
    radixConversion: {
      title: '进制转换',
      desc: '将输入数字转换为不同进制的输出'
    },
    timeStamp: {
      title: '时间戳转换',
      desc: '将 UNIX 时间戳转换为任何格式'
    },
    // Program Related
    pycDecompiler: {
      title: 'Pyc 反编译',
      desc: '在线反编译 pyc 并审阅代码'
    },
    jsFuck: {
      title: 'JSFuck',
      desc: '源于 BrainFuck，用于混淆 JavaScript 代码'
    },
    brainFuck: {
      title: 'BrainFuck',
      desc: '一种极小化的计算机语言'
    },
    // Misc
    serialTool: {
      title: '串口调试器',
      desc: '一个实验性的串口调试工具',
      baud: '波特率',
      status: '状态',
      resend: '定时发送',
      resendDelay: '自动发送延时',
      autoEOL: '自动发送换行',
      connected: '已连接',
      disconnected: '已断开',
      open: '打开串口',
      close: '关闭串口',
      tip: {
        unknown: '未知错误',
        opened: '串口已打开',
        closed: '串口已关闭'
      }
    },
    crc: {
      title: 'CRC',
      desc: '循环冗余校验码，用于校验文件、网络数据等数据的完整性',
      crcModel: '校验模型',
      inputMode: '输入模式',
      checksum_result: '校验计算结果'
    },
    temperatureConversion: {
      title: '温度换算',
      desc: '将温度转换为多种单位'
    },
  },
  tags: {
    encodingAndDecoding: '字符编码',
    generator: '产生器',
    hash: '杂凑',
    encryptionAndDecryption: '加密算法',
    conversion: '数据处理',
    decompiler: '反编译',
    obfuscation: '混淆',
    complier: '编译器',
    utility: '调试工具',
    check: '校验'
  }
}
