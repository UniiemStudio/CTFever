export type Message = {
  id: string
  content: string
  type: MessageType
  duration?: number
}

export type MessageType = 'success' | 'warning' | 'error' | 'info'

export type MessageProviderApi = {
  destroy: (id: string) => void
}

export type MessageApi = {
  info: (content: string, duration?: number) => void
  success: (content: string, duration?: number) => void
  warning: (content: string, duration?: number) => void
  error: (content: string, duration?: number) => void
  destroyAll: () => void
}