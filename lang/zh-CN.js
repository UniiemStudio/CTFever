export default {
  app: {
    name: 'CTFever',
    title: 'CTFever Toolkit by uniiem',
    edition: {
      snap: '快照版',
      dev: '开发版',
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
      desc: '将文字转换为 Base 系列编码'
    },
    rotSeries: {
      title: 'ROT-N 系列编码',
      desc: '将字母或数字转换为 ROT-N 系列编码'
    },
    morseCode: {
      title: '摩尔斯码',
      desc: '将字母和数字转换为摩尔斯码'
    },
    // Cryptography
    md5: {
      title: 'MD5',
      desc: '计算内容的 md5 校验值'
    },
    sha1: {
      title: 'SHA1',
      desc: '计算内容的 sha1 校验值'
    },
    caesarCipher: {
      title: '凯撒密码',
      desc: '一种利用偏移字母表替换加密的技术'
    },
    railFenceCipher: {
      title: '栅栏密码',
      desc: '明文分组排列成栅栏，然后每组依次排列'
    },
  }
}
