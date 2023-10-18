<script lang="ts" setup>
import { useMessage } from '~/composables/uni/useMessage';

const message = useMessage()

const inputTextOrigin = ref('')
const inputTextEncoded = ref('')

const handleEncode = () => {
  if (!inputTextOrigin.value) {
    message.error('请输入原文')
    return
  }
  inputTextEncoded.value = encodeURIComponent(inputTextOrigin.value)
}

const handleDecode = () => {
  if (!inputTextEncoded.value) {
    message.error('请输入 URL 编码内容')
    return
  }
  inputTextOrigin.value = decodeURIComponent(inputTextEncoded.value)
}

const handleSwap = () => {
  const temp = inputTextOrigin.value
  inputTextOrigin.value = inputTextEncoded.value
  inputTextEncoded.value = temp
}

const handleReset = () => {
  inputTextOrigin.value = ''
  inputTextEncoded.value = ''
}
</script>

<template>
  <ToolContainer>
    <div class="flex flex-col gap-4">
      <UniTextArea class="flex-1" :rows="6" label="原文" v-model="inputTextOrigin" placeholder="未编码的原文" />
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-2 md:gap-4">
          <UniButton size="medium" icon="tabler:arrow-bar-down" @click="handleEncode">编码</UniButton>
          <UniButton size="medium" icon="tabler:arrow-bar-up" @click="handleDecode">解码</UniButton>
        </div>
        <UniButton size="medium" icon="tabler:arrows-down-up" @click="handleSwap"
          class="flex-1 mx-2 md:mx-auto md:flex-initial">交换</UniButton>
        <UniButton size="medium" type="danger" icon="tabler:trash" @click="handleReset"
          :disabled="!inputTextOrigin && !inputTextEncoded">
          清空
        </UniButton>
      </div>
      <UniTextArea class="flex-1" :rows="6" label="编码结果" v-model="inputTextEncoded" placeholder="经过 URL 编码的结果" />
    </div>
  </ToolContainer>
</template>

<style scoped></style>
