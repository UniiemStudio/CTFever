export default {
  app: {
    name: 'CTFever',
    title: 'CTFever Toolkit by uniiem',
    subtitle: '工具套件',
    edition: {
      snap: '快照版',
    }
  },
  topbar: {
    login: '登陆',
    signup: '创建账号',
    langTip: '语言',
  },
  page: {
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
    dataConversion: {
      title: '数据转换',
      desc: '各种数据转换工具包'
    },
    codeObfuscation: {
      title: '代码混淆',
      desc: '各式代码混淆方式和工具'
    },
    misc: {
      title: '杂项',
      desc: '通用性强的工具套件'
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
    // Data Conversion
    radixConversion: {
      title: '进制转换',
      desc: '将输入数字转换为不同进制的输出'
    },
    // Code Obfuscation
    jsFuck: {
      title: 'JSFuck',
      desc: '源于 BrainFuck，用于混淆 JavaScript 代码'
    },
    brainFuck: {
      title: 'BrainFuck',
      desc: '一种极小化的计算机语言'
    },
    // Misc
    crc: {
      title: 'CRC',
      desc: '循环冗余校验码，用于校验文件、网络数据等数据的完整性'
    },
  }
}
