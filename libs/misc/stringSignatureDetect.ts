export const stringSignatureDetectors: {
  [key: string]: StringSignatureDetector
} = {
  'jwt': (s) => {
    const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/
    if (jwtRegex.test(s)) return {
      signature: 'jwt',
      description: 'The Json-Web-Token'
    }
    return null
  }
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
