<script setup lang="ts">
import { md5 } from 'js-md5'
import { sha1 } from 'js-sha1'
import { sha224, sha256 } from 'js-sha256'
import { sha384, sha512, sha512_224, sha512_256 } from 'js-sha512'

const { t } = useI18n({ useScope: 'local' })
useSeoMeta({ title: t('title') })

const input = ref('')
</script>

<template>
  <ToolContainer>
    <TitleField :label="t('input')">
      <UTextarea
        :rows="8"
        v-model="input"
        :placeholder="t('input_placeholder')"
      />
    </TitleField>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 font-mono">
      <TitleField :label="t('md5')">
        <UTextarea
          :rows="2"
          :value="input ? md5(input) : ''"
          readonly
        />
      </TitleField>
      <TitleField :label="t('sha1')">
        <UTextarea
          :rows="2"
          :value="input ? sha1(input) : ''"
          readonly
        />
      </TitleField>
      <TitleField :label="t('sha224')">
        <UTextarea
          :rows="2"
          :value="input ? sha224(input) : ''"
          readonly
        />
      </TitleField>
      <TitleField :label="t('sha256')">
        <UTextarea
          :rows="2"
          :value="input ? sha256(input) : ''"
          readonly
        />
      </TitleField>
      <TitleField :label="t('sha384')">
        <UTextarea
          :rows="2"
          :value="input ? sha384(input) : ''"
          readonly
        />
      </TitleField>
      <TitleField :label="t('sha512')">
        <UTextarea
          :rows="2"
          :value="input ? sha512(input) : ''"
          readonly
        />
      </TitleField>
      <TitleField :label="t('sha512_224')">
        <UTextarea
          :rows="2"
          :value="input ? sha512_224(input) : ''"
          readonly
        />
      </TitleField>
      <TitleField :label="t('sha512_256')">
        <UTextarea
          :rows="2"
          :value="input ? sha512_256(input) : ''"
          readonly
        />
      </TitleField>
    </div>
  </ToolContainer>
</template>

<style scoped>

</style>

<i18n>
en:
  title: Message Digest Calculation
  md5: MD5
  sha1: SHA-1
  sha224: SHA-224
  sha256: SHA-256
  sha384: SHA-384
  sha512: SHA-512
  sha512_224: SHA-512/224
  sha512_256: SHA-512/256
  input: Input
  input_placeholder: Enter the text to calculate the message digest
zh:
  title: 摘要计算
  md5: MD5
  sha1: SHA-1
  sha224: SHA-224
  sha256: SHA-256
  sha384: SHA-384
  sha512: SHA-512
  sha512_224: SHA-512/224
  sha512_256: SHA-512/256
  input: 输入
  input_placeholder: 输入需要计算摘要的文本
</i18n>
