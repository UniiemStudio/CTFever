export const stringSignatureDetectors: {
  [key: string]: StringSignatureDetector
} = {
  'jwt': (s) => {
    const regex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/
    if (regex.test(s)) return {
      signature: 'jwt',
      description: 'Json Web Token',
    }
    return null
  },
  'base64': (s) => {
    const regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/
    if (regex.test(s)) return {
      signature: 'base64',
      description: 'Base64 encoded',
    }
    return null
  },
  'md5': (s) => {
    const regex = /^[a-f0-9]{32}$/i
    if (regex.test(s)) return {
      signature: 'md5',
      description: 'MD5 hash',
    }
    return null
  },
  'url-encoded': (s) => {
    const regex = /%[0-9a-f]{2}/i
    if (regex.test(s)) return {
      signature: 'url-encoded',
      description: 'URL encoded',
    }
    return null
  },
  'json': (s) => {
    try {
      JSON.parse(s)
      return {
        signature: 'json',
        description: 'JSON',
      }
    } catch (e) {
      return null
    }
  },
  'uuid': (s) => {
    const regex = /^[a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i
    if (regex.test(s)) return {
      signature: 'uuid',
      description: 'UUID',
    }
    return null
  },
}

export type StringSignatureType = keyof typeof stringSignatureDetectors;

export const stringSignatureDetect = (str: string, exclude: StringSignatureType[] = []): StringSignature[] => {
  const result: StringSignature[] = []
  for (const key in stringSignatureDetectors) {
    if (exclude.includes(key as StringSignatureType)) continue
    const detector = stringSignatureDetectors[key]
    const signature = detector(str)
    if (signature) result.push(signature)
  }
  return result
}
