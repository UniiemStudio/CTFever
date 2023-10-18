<script lang="ts" setup>
import { useMessage } from '~/composables/uni/useMessage';

const { t } = useI18n({
  useScope: 'local'
})
const message = useMessage()

const inputTextOrigin = ref('')
const inputTextEncoded = ref('')

const handleEncode = () => {
  if (!inputTextOrigin.value) {
    message.error(t('error.require_origin'))
    return
  }
  inputTextEncoded.value = encodeURIComponent(inputTextOrigin.value)
}

const handleDecode = () => {
  if (!inputTextEncoded.value) {
    message.error(t('error.require_encoded'))
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
      <UniTextArea class="flex-1" :rows="6" :label="t('input.origin.label')" :placeholder="t('input.origin.placeholder')"
        v-model="inputTextOrigin" />
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-2 md:gap-4">
          <UniButton size="medium" icon="tabler:arrow-bar-down" @click="handleEncode">
            {{ t('encode') }}
          </UniButton>
          <UniButton size="medium" icon="tabler:arrow-bar-up" @click="handleDecode">
            {{ t('decode') }}
          </UniButton>
        </div>
        <UniButton size="medium" icon="tabler:arrows-down-up" @click="handleSwap"
          class="flex-1 mx-2 md:mx-auto md:flex-initial">
          {{ t('swap') }}
        </UniButton>
        <UniButton size="medium" type="danger" icon="tabler:trash" @click="handleReset"
          :disabled="!inputTextOrigin && !inputTextEncoded">
          {{ t('reset') }}
        </UniButton>
      </div>
      <UniTextArea class="flex-1" :rows="6" :label="t('input.encoded.label')"
        :placeholder="t('input.encoded.placeholder')" v-model="inputTextEncoded" />
    </div>
  </ToolContainer>
</template>

<style scoped></style>

<i18n lang="yaml">
en:
  encode: Encode
  decode: Decode
  swap: Swap
  reset: Reset
  input:
    origin:
      label: Origin Text
      placeholder: Unencoded text
    encoded:
      label: Encoded Text
      placeholder: URL encoded text
  error:
    require_origin: Please enter the origin text
    require_encoded: Please enter the encoded text
zh:
  encode: 编码
  decode: 解码
  swap: 交换
  reset: 清空
  input:
    origin:
      label: 原始文本
      placeholder: 未编码的文本
    encoded:
      label: 编码文本
      placeholder: 经过 URL 编码的文本
  error:
    require_origin: 请输入原始文本
    require_encoded: 请输入 URL 编码文本
</i18n>
