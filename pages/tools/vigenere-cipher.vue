<script setup lang="ts">
import { encrypt, decrypt } from '@uniiem/vigenere-cipher'
import TitleField from '~/components/TitleField.vue'

const { t } = useI18n({ useScope: 'local' })

useSeoMeta({ title: t('title') })

const input = ref('')
const output = ref('')
const mode = ref('encrypt')
const key = ref('')

watchEffect(() => {
  if (input.value) input.value = input.value.toUpperCase()
  if (key.value) {
    key.value = key.value.toUpperCase()
    if (mode.value === 'encrypt') {
      output.value = encrypt(input.value, key.value)
    } else {
      output.value = decrypt(input.value, key.value)
    }
  } else {
    output.value = ''
  }
})
</script>

<template>
  <ToolContainer>
    <div class="flex flex-col gap-4">

      <TitleField :label="t('input.label')">
        <UTextarea
          size="md"
          :placeholder="t('input.placeholder')"
          v-model="input"
          autofocus
        />
      </TitleField>

      <div class="flex justify-between items-center flex-wrap gap-2">
        <div class="flex items-center gap-2">
          <USelectMenu
            size="md"
            v-model="mode"
            :options="[
              { label: t('encrypt'), value: 'encrypt', icon: 'i-tabler-lock' },
              { label: t('decrypt'), value: 'decrypt', icon: 'i-tabler-lock-open' },
            ]"
            option-attribute="label"
            value-attribute="value"
            :leading-icon="mode === 'encrypt' ? 'i-tabler-lock' : 'i-tabler-lock-open'"
          />
          <UTooltip :text="t('key')">
            <UInput
              size="md"
              :placeholder="t('key')"
              icon="i-tabler-password"
              v-model="key"
            />
          </UTooltip>
        </div>
      </div>

      <TitleField :label="t('output.label')">
        <UTextarea
          size="md"
          :placeholder="t('output.placeholder')"
          v-model="output"
        />
      </TitleField>

    </div>
    <IntroDocument/>
  </ToolContainer>
</template>

<i18n>
en:
  title: Vigènere Cipher
  input:
    label: Input
    placeholder: Text to be encrypted or decrypted
  output:
    label: Output
    placeholder: Result text
  key: Key
  encrypt: Encrypt
  decrypt: Decrypt

zh:
  title: 维吉尼亚密码
  input:
    label: 输入
    placeholder: 待加密或解密的文本
  output:
    label: 输出
    placeholder: 加密或解密后的文本
  key: 密钥
  encrypt: 加密
  decrypt: 解密
</i18n>