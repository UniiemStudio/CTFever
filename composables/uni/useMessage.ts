import type { MessageApi } from "~/components/uni/Message/type"

export const useMessage = () => {
  const message = inject<MessageApi>('uni-message')
  if (!message) {
    throw new Error('No outer message-provider found!')
  }
  return message
}