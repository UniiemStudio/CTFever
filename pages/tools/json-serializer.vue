<script lang="ts" setup>
import { JSONPath } from 'jsonpath-plus'
import { useMessage } from '~/composables/uni/useMessage';

const { t } = useI18n({ useScope: 'local' })
useSeoMeta({ title: t('title') })

const route = useRoute()
const router = useRouter()
const colorMode = useColorMode()
const message = useMessage()

const inputs = reactive({
  filterType: 'jsonpath',
  filter: '$',
  json: '',
})

const filterResult = ref('')

const expression_options = [
  {
    value: 'jsonpath',
    label: 'JSON Path',
  },
  {
    value: 'jsobject',
    label: 'JS Object',
    disabled: true,
  }
]

const onJsonProcess = (isQuery: boolean = false) => {
  if (inputs.json === '') {
    filterResult.value = ''
    return
  }
  if (inputs.filterType === 'jsonpath') {
    const result = JSONPath({
      path: inputs.filter,
      json: JSON.parse(inputs.json),
    })
    filterResult.value = JSON.stringify(result, null, 2)
  }
  if (!isQuery) {
    router.replace({
      query: {
        ...inputs,
        json: btoa(inputs.json),
      }
    })
  }
}

watch([() => inputs.json, () => inputs.filter], useDebounceFn(() => onJsonProcess(), 500))

const handleQuery = () => {
  for (const key in inputs) {
    if (route.query[key]) {
      if (key === 'json') {
        try {
          inputs.json = JSON.stringify(JSON.parse(atob(route.query[key] as string)), null, 2)
        } catch (error) {
          message.error(t('json_invalid'))
        }
        continue
      }
      (inputs as any)[key] = route.query[key] as string
      onJsonProcess(true)
    }
  }
}

onMounted(handleQuery)
</script>

<template>
  <ToolContainer full-size gapped content-class="pt-4 px-4 md:px-0">
    <TitleField :label="t('filter_expression')">
      <div class="flex items-center gap-2">
        <USelectMenu v-model="inputs.filterType" value-attribute="value" option-attribute="label"
          :options="expression_options" class="flex-1" size="md" />
        <UInput v-model="inputs.filter" class="w-full" size="md" />
      </div>
    </TitleField>
    <div class="flex flex-col md:flex-row gap-4">
      <TitleField :label="t('json')" class="w-full">
        <div class="overflow-hidden rounded-md shadow border dark:border-neutral-700">
          <MonacoEditor v-model="inputs.json" lang="json" class="w-full h-96" :options="{
            theme: colorMode.value === 'dark' ? 'vs-dark' : 'vs',
            smoothScrolling: true,
            cursorSmoothCaretAnimation: 'on',
            minimap: {
              enabled: false
            }
          }" placeholder="test" />
        </div>
      </TitleField>
      <TitleField :label="t('filter_result')" class="w-full">
        <div class="overflow-hidden rounded-md shadow border dark:border-neutral-700">
          <MonacoEditor v-model="filterResult" lang="json" class="w-full h-96" :options="{
            theme: colorMode.value === 'dark' ? 'vs-dark' : 'vs',
            smoothScrolling: true,
            cursorSmoothCaretAnimation: 'on',
            minimap: {
              enabled: false
            },
            readOnly: true
          }" />
        </div>
      </TitleField>
    </div>
  </ToolContainer>
</template>

<style scoped></style>

<i18n lang="yaml">
en:
  title: JSON Serializer
  filter_expression: Filter expression
  json: JSON
  filter_result: Filter Result
  json_invalid: Invalid JSON

zh:
  title: JSON 编辑器
  filter_expression: 筛选表达式
  json: JSON
  filter_result: 筛选结果
  json_invalid: 无效的 JSON
</i18n>
