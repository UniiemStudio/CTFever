<script setup lang="ts">
import { type CheckResult, detectZipPseudoEncryption } from '@uniiem/zip-pseudo-encryption'

const { t } = useI18n({ useScope: 'local' })
useSeoMeta({ title: t('title') })

const dayjs = useDayjs()
const selected_file = ref<File | null>(null)
const detect_result = ref<CheckResult | ''>('')

watchEffect(async () => {
  if (selected_file.value) {
    detect_result.value = await detectZipPseudoEncryption(selected_file.value)
  }
})

const status2icon = (stat: CheckResult) => {
  switch (stat) {
    case 'normal':
      return 'TablerFileZip'
    case 'encrypted':
      return 'TablerFileCertificate'
    case 'pseudo':
      return 'TablerSpy'
    case 'broken':
      return 'TablerFileBroken'
    default:
      return 'TablerFileTypeZip'
  }
}

const status2color = (stat: CheckResult) => {
  switch (stat) {
    case 'normal':
      return 'text-green-500'
    case 'encrypted':
      return 'text-yellow-500'
    case 'pseudo':
      return 'text-red-500'
    case 'broken':
      return 'text-neutral-500'
    default:
      return 'text-neutral-500'
  }
}

const onIncomeFiles = (files: File[]) => {
  selected_file.value = files[0]
}
</script>

<template>
  <ToolContainer>
    <div class="grid grid-cols-2 md:grid-cols-1 gap-4">
      <div class="w-full h-fit">
        <UniFileDnD
          accept="application/zip,application/x-zip-compressed"
          @change="onIncomeFiles"
        />
      </div>
      <div class="w-full h-fit p-2 border border-neutral-200 dark:border-neutral-700 rounded-md">
        <div
          v-if="!selected_file"
          class="p-2 flex justify-between items-center rounded-md bg-neutral-100"
        >
          <p class="text-sm">{{ t('select_file') }}</p>
        </div>
        <div
          v-if="detect_result"
          class="p-2 mb-2 flex justify-between items-center rounded-md bg-neutral-100 dark:bg-neutral-900"
        >
          <Icon
            :name="status2icon(detect_result!)"
            :class="status2color(detect_result!)"
            class="text-3xl"
          />
          <div class="flex flex-col items-end">
            <div
              class="text-sm font-medium"
              :class="status2color(detect_result!)"
            >
              {{ t(`result.${ detect_result }`) }}
            </div>
            <p class="text-xs text-neutral-500">{{ t(`desc.${ detect_result }`) }}</p>
          </div>
        </div>
        <table v-if="selected_file">
          <tr>
            <td>{{ t('file_name') }}</td>
            <td>{{ selected_file?.name }}</td>
          </tr>
          <tr>
            <td>{{ t('size') }}</td>
            <td>
              {{ selected_file?.size }}
              <span class="text-xs">{{ t('bytes') }}</span>
            </td>
          </tr>
          <tr>
            <td>{{ t('last_modified') }}</td>
            <td>
              {{ dayjs(selected_file?.lastModified).format('YYYY-MM-DD HH:mm:ss') }}
            </td>
          </tr>
        </table>
      </div>
    </div>
  </ToolContainer>
</template>

<style scoped>
table {
  @apply w-full table-auto border-collapse text-xs font-sans;
}

td {
  @apply p-2 border-b border-neutral-200 dark:border-neutral-700;

  &:first-child {
    @apply font-medium;
  }

  &:last-child {
    @apply text-right;
  }
}

tr:last-child td {
  @apply border-b-0;
}
</style>

<i18n>
en:
  title: Zip Pseudo Encryption
  select_file: Select a Zip File
  file_name: File Name
  size: Size
  bytes: bytes
  last_modified: Last Modified
  result:
    normal: Normal
    encrypted: Encrypted
    pseudo: Pseudo Encrypted
    broken: Broken
  desc:
    normal: Can be extracted directly
    encrypted: Can be extracted with password
    pseudo: Cannot be extracted by normal means
    broken: File is broken or cannot be recognized
zh:
  title: Zip 伪加密
  select_file: 请选择 Zip 文件
  file_name: 文件名
  size: 大小
  bytes: 字节
  last_modified: 最后修改
  result:
    normal: 一般
    encrypted: 加密
    pseudo: 伪加密
    broken: 损坏
  desc:
    normal: 可直接解压
    encrypted: 可使用密码解压
    pseudo: 无法通过常规手段解压
    broken: 文件损坏或无法识别
</i18n>
