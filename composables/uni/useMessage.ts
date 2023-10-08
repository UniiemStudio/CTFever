import { MessageApi } from "~/types/uni/uni"

export const useMessage = () => {
  const message = inject<MessageApi>('uni-message')
  if (!message) {
    throw new Error('No outer message-provider found!')
  }
  return message
}