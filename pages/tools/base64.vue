<script lang="ts" setup>
import { useMessage } from '~/composables/uni/useMessage';
import base32 from '~/libs/encoding/base32';
import { stringSignatureDetect } from '~/libs/misc/stringSignatureDetect';

const message = useMessage()
const { t } = useI18n({
  useScope: 'local'
})

const encodingType = ref('base64')
const inputDecoded = ref('')
const inputEncoded = ref('')

/**
 * Todo: 2023年10月18日 重新实现 base64 函数库，不再使用 atob & btoa
 */
const handleEncode = () => {
  try {
    if (encodingType.value === 'base64') {
      inputEncoded.value = btoa(inputDecoded.value)
    } else if (encodingType.value === 'base32') {
      inputEncoded.value = base32.encode(inputDecoded.value)
    }
  } catch (e: any) {
    message.error(e.message)
  }
}

const handleDecode = () => {
  try {
    if (encodingType.value === 'base64') {
      inputDecoded.value = atob(inputEncoded.value)
    } else if (encodingType.value === 'base32') {
      inputDecoded.value = base32.decode(inputEncoded.value)
    }
  } catch (e: any) {
    message.error(e.message)
  }
}
</script>

<template>
  <ToolContainer>
    <div class="flex flex-col gap-4">
      <UniTextArea v-model="inputDecoded" :min-rows="6" :label="t('decoded.label')"
        :placeholder="t('decoded.placeholder', { base: encodingType })" />
      <div class="flex justify-between items-end gap-2">
        <UniSelect class="flex-1" :items="[
          { label: 'Base64', value: 'base64' },
          { label: 'Base32', value: 'base32' },
        ]" v-model="encodingType" :label="t('encoding')" />
        <div class="flex justify-end gap-2 flex-1">
          <UniButton icon="tabler:arrow-bar-down" @click="handleEncode">
            {{ t('encode') }}
          </UniButton>
          <UniButton icon="tabler:arrow-bar-up" @click="handleDecode">
            {{ t('decode') }}
          </UniButton>
        </div>
      </div>
      <UniTextArea v-model="inputEncoded" :min-rows="6" :label="encodingType"
        :placeholder="t('encoded.placeholder', { base: encodingType })" />
    </div>
  </ToolContainer>
</template>

<style scoped></style>

<i18n lang="yaml">
en:
  encode: Encode
  decode: Decode
  encoding: Encoding
  decoded:
    label: Decoded Text
    placeholder: The original text that has not been {base} encoded
  encoded:
    label: Encoded Text
    placeholder: Text encoded by {base}
zh:
  encode: 编码
  decode: 解码
  encoding: 编码方式
  decoded:
    label: 未编码文本
    placeholder: 未进行 {base} 编码的原始文本
  encoded:
    label: 已编码文本
    placeholder: 经过 {base} 编码的文本
</i18n>
