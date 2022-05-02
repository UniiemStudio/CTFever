// 生成加密表
const genVigenereCipherTable = () => {
  let res = []
  const CharCodeA = 'A'.charCodeAt(0);
  for (let i = 0; i < 26; i++) {
    let resOneLine = []
    for (let j = 0; j < 26; j++) {
      let charRes = String.fromCharCode(CharCodeA + (i + j) % 26);
      resOneLine = [...resOneLine, charRes]
    }
    res = [...res, resOneLine]
  }
  return res
}

const vigenereCipherTable = genVigenereCipherTable()

// 原文 + 密钥 => 密文
const encryptVigenere = (values, key) => {
  let res = ''
  key = key.toUpperCase().replace(/[^A-Z]/, '')
  let keyLen = key.length
  values = values.toUpperCase()
  let count = 0
  for (const v of values) {
    let resOne = ''
    // 非字母不加密
    if (!/[A-Z]/.test(v)) {
      res += v
      continue
    }
    // v行 key[i]列
    let i = v.charCodeAt(0) - 'A'.charCodeAt(0);
    let j = key[count % keyLen].charCodeAt(0) - 'A'.charCodeAt(0);
    resOne = vigenereCipherTable[i][j]
    res += resOne
    count++
  }
  return res
}
// 密文 + 密钥 => 原文
// 本质是求密码表第几行所对应第字
const decryptVigenere = (values, key) => {
  let res = ''
  key = key.toUpperCase().replace(/[^A-Z]/, '')
  let keyLen = key.length
  values = values.toUpperCase()
  let count = 0
  for (const v of values) {
    // 非字母不加密
    if (!/[A-Z]/.test(v)) {
      res += v
      continue
    }
    let j = key[count % keyLen].charCodeAt(0) - 'A'.charCodeAt(0);
    // 本质是求第几行
    for (let i = 0; i < 26; i++) {
      if (vigenereCipherTable[i][j] === v) {
        res += String.fromCharCode(i + 'A'.charCodeAt(0));
      }
    }
    count++
  }
  return res
}

// let a = encryptVigenere('a;ba', '1b') // b;cb  key只有字母部分有效，value非字母部分不加密
// let b = decryptVigenere('b;cb', '1b') // a;ba
module.exports = {encryptVigenere, decryptVigenere}
