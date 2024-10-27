<script setup lang="ts">
import {
  parse,
  v1 as uuidv1,
  v3 as uuidv3,
  v4 as uuidv4,
  v5 as uuidv5,
  validate,
  version,
} from 'uuid'

const { t } = useI18n({ useScope: 'local' })
useSeoMeta({ title: t('title') })

const uuids = ref([
  uuidv1(),
  uuidv3(uuidv4(), uuidv4()),
  uuidv4(),
  uuidv5(uuidv4(), uuidv4()),
])
const input = ref('')
const inspect_result = ref<{
  validate: boolean
  version: number
  parsed: ReturnType<typeof parse> | null
} | null>(null)

const refresh = () => {
  uuids.value = [
    uuidv1(),
    uuidv3(uuidv4(), uuidv4()),
    uuidv4(),
    uuidv5(uuidv4(), uuidv4()),
  ]
}

const inspect = () => {
  if (validate(input.value)) {
    inspect_result.value = {
      validate: true,
      version: version(input.value),
      parsed: parse(input.value),
    }
  } else {
    inspect_result.value = {
      validate: false,
      version: -1,
      parsed: null,
    }
  }
}

onMounted(() => {
  console.log(uuids.value);
})
</script>

<template>
  <ToolContainer>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="space-y-1 font-mono">
        <TitleField label="UUID v1">
          <UInput v-model:model-value="uuids[0]" readonly/>
        </TitleField>
        <TitleField label="UUID v3">
          <UInput v-model:model-value="uuids[1]" readonly/>
        </TitleField>
        <TitleField label="UUID v4">
          <UInput v-model:model-value="uuids[2]" readonly/>
        </TitleField>
        <TitleField label="UUID v5">
          <UInput v-model:model-value="uuids[3]" readonly/>
        </TitleField>
        <UButton
          block
          variant="soft"
          class="!mt-3 font-sans uppercase"
          icon="i-tabler-refresh"
          @click="refresh"
        >
          {{ t('refresh') }}
        </UButton>
      </div>
      <div class="space-y-1">
        <TitleField
          :label="t('input')"
          class="relative"
        >
          <UInput
            class="font-mono"
            v-model="input"
            :placeholder="t('input_placeholder')"
          />
          <UButton
            block
            variant="soft"
            class="!mt-3 font-sans uppercase"
            @click="inspect"
            :disabled="!input"
          >
            <template #leading>
              <TablerSpy/>
            </template>
            {{ t('inspect') }}
          </UButton>
          <Transition name="fade">
            <div
              v-if="inspect_result"
              :key="inspect_result.validate + ''"
            >
              <div class="flex justify-between items-center">
                <div
                  class="flex items-center gap-1"
                  :class="inspect_result.validate ? 'text-green-500' : 'text-red-500'"
                >
                  <Icon
                    :name="inspect_result.validate ? 'TablerCheck' : 'TablerX'"
                    class="text-lg"
                  />
                  <span class="-mt-0.5 text-xs font-medium">
                  {{ inspect_result.validate ? t('valid') : t('invalid') }}
                </span>
                </div>
                <div
                  v-if="inspect_result.version !== -1"
                  class="flex items-center gap-1"
                >
                  <Icon
                    name="TablerVersions"
                    class="text-lg"
                  />
                  <span class="-mt-0.5 text-xs font-medium">
                  {{ inspect_result.version }}
                </span>
                </div>
              </div>
              <div
                v-if="inspect_result.parsed"
                class="bg-neutral-100 dark:bg-neutral-900 p-2 rounded-md mt-2"
              >
              <pre
                class="text-xs text-neutral-500 dark:text-neutral-400 break-all text-wrap"
              >{{ inspect_result.parsed }}</pre>
              </div>
            </div>
          </Transition>
        </TitleField>
      </div>
    </div>
  </ToolContainer>
</template>

<style scoped>

</style>

<i18n>
en:
  title: UUID Generator
  refresh: Regenerate
  inspect: Inspect
  valid: Valid
  invalid: Invalid
  input: Input UUID
  input_placeholder: Enter a UUID
zh:
  title: UUID 生成校验
  refresh: 重新生成
  inspect: 检查
  valid: 有效
  invalid: 无效
  input: 输入 UUID
  input_placeholder: 输入一个 UUID
</i18n>
