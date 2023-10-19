export const stringSignatureDetectors: {
  [key: string]: StringSignatureDetector
} = {
  'jwt': (s) => {
    const regex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/
    if (regex.test(s)) return {
      signature: 'jwt',
      description: 'A Json-Web-Token'
    }
    return null
  },
  'base64': (s) => {
    const regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/
    if (regex.test(s)) return {
        signature: 'base64',
        description: 'A Base64 string'
      }
    return null;
  },
}
export type StringSignatureType = keyof typeof stringSignatureDetectors;

export const stringSignatureDetect = (str: string, exclude: StringSignatureType[] = []): StringSignature[] => {
  const result: StringSignature[] = []
  for (const key in stringSignatureDetectors) {
    if (exclude.includes(key as StringSignatureType)) continue;
    const detector = stringSignatureDetectors[key]
    const signature = detector(str)
    if (signature) result.push(signature)
  }
  return result
}
