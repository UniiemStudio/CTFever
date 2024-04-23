<script setup lang="ts">
import TitleField from '~/components/TitleField.vue'
import { decode, encode } from '@uniiem/caesar'

const { t } = useI18n({
  useScope: 'local',
})

useSeoMeta({
  title: t('title'),
})

const input = ref('')
const output = ref('')
const mode = ref('encrypt')
const offset = ref(3)

watchEffect(() => {
  if (mode.value === 'encrypt') {
    output.value = encode(input.value, offset.value)
  } else {
    output.value = decode(input.value, offset.value)
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
          <UTooltip :text="t('offset')">
            <UInput
              size="md"
              :placeholder="t('offset')"
              icon="i-tabler-arrow-move-left"
              v-model="offset"
              type="number"
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

    <IntroDocument
      :references="[
        {
          title: 'Wikipedia: 凯撒密码',
          url: 'https://zh.wikipedia.org/wiki/%E5%87%AF%E6%92%92%E5%AF%86%E7%A0%81'
        },
        {
          title: 'CTF Wiki: 单表代换加密',
          url: 'https://ctf-wiki.org/crypto/classical/monoalphabetic/#_3'
        }
      ]"
    />

  </ToolContainer>
</template>

<i18n>
en:
  title: Caesar Cipher
  input:
    label: Input
    placeholder: Text to be processed
  output:
    label: Output
    placeholder: Output text
  offset: Offset
  encrypt: Encrypt
  decrypt: Decrypt

zh:
  title: 凯撒密码
  input:
    label: 输入
    placeholder: 需要处理的文本
  output:
    label: 输出
    placeholder: 输出文本
  offset: 偏移量
  encrypt: 加密
  decrypt: 解密
</i18n>