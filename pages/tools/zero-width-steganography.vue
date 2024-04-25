<script setup lang="ts">
import {
  decodeBinary,
  decodeText,
  encodeBinary,
  encodeText,
  setCharSet,
  ZW_CHARACTERS,
  type ZWSCharSet,
} from '@uniiem/zws'

const { t } = useI18n({ useScope: 'local' })
useSeoMeta({
  title: t('title'),
})

type Mode = 'text' | 'binary'

const mode = ref<Mode>('text')
const zws_charset = ref<ZWSCharSet>(['\u200c', '\u200d', '\u202c', '\ufeff'])
const originalText = ref('')
const hiddenText = ref('')
const hiddenBinary = ref<Uint8Array>(new Uint8Array())
const steganographyText = ref('')
const decodedHiddenFile = ref<Uint8Array>(new Uint8Array())

const encode = () => {
  if (mode.value === 'text') {
    steganographyText.value = encodeText(originalText.value, hiddenText.value)
  } else {
    steganographyText.value = encodeBinary(originalText.value, hiddenBinary.value)
  }
}

const decode = () => {
  if (mode.value === 'text') {
    const decoded = decodeText(steganographyText.value)
    originalText.value = decoded.original
    hiddenText.value = decoded.hidden
  } else {
    const decoded = decodeBinary(steganographyText.value)
    originalText.value = decoded.original
    hiddenBinary.value = decoded.hidden
    decodedHiddenFile.value = decoded.hidden
  }
}

const downloadAsFile = (text: string) => {
  const blob = new Blob([text], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'hidden.txt'
  a.click()
  URL.revokeObjectURL(url)
}

const downloadBinAsFile = (bin: Uint8Array) => {
  const blob = new Blob([bin], { type: 'application/octet-binary' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'hidden_file'
  a.click()
  URL.revokeObjectURL(url)
}

const onDownloadAsFile = () => {
  downloadAsFile(steganographyText.value)
}

const onFileChange = (e: FileList) => {
  const file = e[0]
  const reader = new FileReader()
  reader.onload = () => {
    hiddenBinary.value = new Uint8Array(reader.result as ArrayBuffer)
  }
  reader.readAsArrayBuffer(file)
}

const onReadFromFileClick = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.txt'
  input.onchange = (e) => {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        steganographyText.value = reader.result as string
      }
      reader.readAsText(file)
    }
  }
  input.click()
}

watch(mode, () => {
  hiddenText.value = ''
  steganographyText.value = ''
  hiddenBinary.value = new Uint8Array()
})

watchEffect(() => {
  if (zws_charset.value.length > 2) {
    setCharSet(zws_charset.value)
  }
})
</script>

<template>
  <ToolContainer gapped>
    <div class="flex items-center gap-2">
      <USelectMenu
        :leading-icon="mode === 'text' ? 'i-tabler-file-type-txt' : 'i-tabler-binary'"
        v-model="mode"
        :options="[
          { label: t('text'), value: 'text', icon: 'i-tabler-file-type-txt' },
          { label: t('binary'), value: 'binary', icon: 'i-tabler-binary' },
        ]"
        option-attribute="label"
        value-attribute="value"
      />
      <USelectMenu
        multiple
        leading-icon="i-tabler-alphabet-latin"
        class="flex-1 md:w-72 md:flex-initial whitespace-nowrap"
        v-model="zws_charset"
        :options="ZW_CHARACTERS.map((char) => ({ label: char.label, value: char.character }))"
        :placeholder="t('charsets')"
        option-attribute="label"
        value-attribute="value"
      >
        <template #label>
          <span>
            {{
              `${ t('charsets') } ${ zws_charset.length > 0 ? t('charsets_label', { selected: zws_charset.length }) : '' }`
            }}
          </span>
        </template>
        <template #option="{option}">
          <span class="text-ellipsis text-xs overflow-hidden whitespace-nowrap">
            <span class="pr-1 text-xs font-mono font-black opacity-80 text-primary">
              U+{{ option.value.charCodeAt(0).toString(16).toUpperCase() }}
            </span>
            {{ option.label }}
          </span>
        </template>
      </USelectMenu>
    </div>
    <div class="flex flex-col md:flex-row justify-start md:items-center gap-4 md:gap-8">
      <div class="flex flex-col flex-1 gap-2">
        <TitleField :label="t('original')">
          <UTextarea v-model="originalText" :rows="6"/>
        </TitleField>
        <TitleField :label="t(mode === 'text' ? 'hidden' : 'hidden_file')">
          <UTextarea
            v-if="mode === 'text'"
            v-model="hiddenText"
            :rows="6"
          />
          <div class="flex items-center gap-2" v-else>
            <UInput
              type="file"
              @change="onFileChange"
            />
            <UButton
              :color="!steganographyText || !decodedHiddenFile.length ? 'white' : 'primary'"
              icon="i-tabler-download"
              :disabled="!steganographyText || !decodedHiddenFile.length"
              @click="downloadBinAsFile(decodedHiddenFile)"
            >
              {{ t('download_file') }}
            </UButton>
          </div>
        </TitleField>
      </div>
      <div class="flex flex-row md:flex-col justify-center gap-2">
        <UButton
          color="primary"
          variant="soft"
          class="flex-1"
          icon="i-tabler-arrow-right"
          @click="encode"
        >
          {{ t('encode') }}
        </UButton>
        <UButton
          color="primary"
          variant="soft"
          class="flex-1"
          icon="i-tabler-arrow-left"
          @click="decode"
        >
          {{ t('decode') }}
        </UButton>
      </div>
      <div class="flex flex-col flex-1 gap-2">
        <TitleField
          :label="`${t('stego')} ${steganographyText && t('stego_length', {length: steganographyText.length})}`">
          <UTextarea v-model="steganographyText" :rows="mode === 'text' ? 12 : 7"/>
        </TitleField>
        <div class="flex items-center gap-2">
          <UButton
            class="flex-1"
            color="primary"
            variant="soft"
            icon="i-tabler-file-upload"
            @click="onReadFromFileClick"
          >
            {{ t('load_from_txt') }}
          </UButton>
          <UButton
            class="flex-1"
            color="white"
            icon="i-tabler-download"
            :disabled="!steganographyText"
            @click="onDownloadAsFile"
          >
            {{ t('download') }}
          </UButton>
        </div>
      </div>
    </div>
  </ToolContainer>
</template>

<i18n>
en:
  title: Zero Width Steganography
  encode: Encode
  decode: Decode
  text: Text Mode
  binary: Binary Mode
  charsets: Charsets
  charsets_label: ({selected} selected)
  original: Original Text
  hidden: Hidden Text
  hidden_file: Hidden File
  stego: Steganography Text
  stego_length: ({length} bytes)
  download: Download as File
  download_file: Download File
  load_from_txt: Load From .txt File

zh:
  title: 零宽字符隐写
  encode: 编码
  decode: 解码
  text: 文本模式
  binary: 二进制模式
  charsets: 字符集
  charsets_label: (已选 {selected} 个)
  original: 原始文本
  hidden: 隐藏文本
  hidden_file: 隐藏文件
  stego: 隐写文本
  stego_length: (共 {length} 字节)
  download: 下载为文件
  download_file: 下载文件
  load_from_txt: 从 .txt 文件读取
</i18n>