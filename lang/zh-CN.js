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
      desc: '在 ASCII 和 字符串之间转换'
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
      desc: '明文分组排列成栅栏，然后每组依次排列组成密文'
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
      desc: '一个实验性的串口调试工具'
    },
    crc: {
      title: 'CRC',
      desc: '循环冗余校验码，用于校验文件、网络数据等数据的完整性'
    },
    temperatureConversion: {
      title: '温度换算',
      desc: '将温度转换为多种单位'
    },
  }
}
