type StringSignatureDetector = (s: string) => StringSignature | null

type StringSignature = {
  signature: string
  description: string
}