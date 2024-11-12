<script lang="ts" setup>
import {utf8Encode, utf8Decode} from '~/libs/encoding/utf8'

const { t } = useI18n({ useScope: 'local' })
useSeoMeta({ title: t('title') })

const inputs = reactive({
  input: '',
  output: '',
})

const onEncode = () => {
  inputs.output = utf8Encode(inputs.input)
}

const onDecode = () => {
  inputs.output = utf8Decode(inputs.input)
}

const onReset = () => {
  inputs.input = ''
  inputs.output = ''
}
</script>

<template>
  <ToolContainer>
    <div class="flex flex-col gap-4">
      <TitleField :label="t('input')">
        <UTextarea v-model="inputs.input" :rows="6" :placeholder="t('input_placeholder')" />
      </TitleField>
      <div class="flex justify-between items-end gap-2">
        <div class="flex items-center gap-2">
          <UButton @click="onEncode">{{ t('btn_encode') }}</UButton>
          <UButton @click="onDecode">{{ t('btn_decode') }}</UButton>
        </div>
        <UButton @click="onReset" icon="tabler:refresh" color="red" variant="soft">{{ t('btn_reset') }}</UButton>
      </div>
      <TitleField :label="t('output')">
        <UTextarea v-model="inputs.output" :rows="6" :placeholder="t('output_placeholder')" readonly />
      </TitleField>
    </div>
  </ToolContainer>
</template>

<style scoped></style>

<i18n lang="yaml">
en:
  title: UTF-8 Conversion
  input: Input
  input_placeholder: Enter the text to encode or decode
  output: Output
  output_placeholder: The result will be displayed here
  btn_encode: Encode
  btn_decode: Decode
  btn_reset: Reset

zh:
  title: UTF-8 转换
  input: 输入
  input_placeholder: 输入要编码或解码的文本，例如 &#x4F60;&#x597D;&#x4E16;&#x754C;
  output: 输出
  output_placeholder: 结果将显示在这里
  btn_encode: 编码
  btn_decode: 解码
  btn_reset: 重置
</i18n>
