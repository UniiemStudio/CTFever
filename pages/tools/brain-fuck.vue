<script setup lang="ts">
import type { MonacoEditor } from '#components'
import { useMonaco } from '#imports'
import { languages } from 'monaco-editor'
import { type Callback, executeCallbackly, type Runtime } from '@uniiem/brainfuck'

const { t } = useI18n({ useScope: 'local' })
useSeoMeta({ title: t('title') })

const monaco = useMonaco()

const bf_program = ref('')
const bf_input = ref('')
const bf_runtime_steps = ref<Runtime[]>([{
  memory: new Uint8Array(256).fill(0),
  exited: true,
  input: '',
  output_buffer: '',
  pointer: 0,
}])
const bf_runtime_step = ref(0)
// const bf_memory = ref(new Uint8Array(256).fill(0))

const bf_run_callback: Callback = (runtime) => {
  bf_runtime_steps.value.push({
    ...runtime,
    memory: Uint8Array.from(runtime.memory),
  })
  bf_runtime_step.value++
}

const onRunClick = () => {
  bf_runtime_steps.value = [{
    memory: new Uint8Array(256).fill(0),
    exited: true,
    input: '',
    output_buffer: '',
    pointer: 0,
  }]
  bf_runtime_step.value = 0
  executeCallbackly(bf_program.value, bf_input.value || undefined, bf_run_callback).then(() => {
    onReplayClick()
  })
}

const onReplayClick = () => {
  bf_runtime_step.value = 0
  const interval = setInterval(() => {
    if (bf_runtime_step.value + 1 < bf_runtime_steps.value.length) {
      bf_runtime_step.value++
    } else {
      clearInterval(interval)
    }
  }, 10)
}

onMounted(() => {
  if (monaco) {
    const brainfuckMonarch: languages.IMonarchLanguage = {
      tokenizer: {
        root: [
          ['[\\+\\-]', 'keyword.operator.arithmetic'],
          ['[\\[\\]]', 'keyword.control'],
          ['<|>', 'storage.type'],
          ['\\.|,', 'entity.name.function.io'],
          ['[^+<>\\-\\[\\].,]+', 'comment'],
        ],
      },
    }
    monaco.languages.register({ id: 'brainfuck' })
    monaco.languages.setMonarchTokensProvider('brainfuck', brainfuckMonarch)

    monaco.languages.registerDocumentFormattingEditProvider('brainfuck', {
      provideDocumentFormattingEdits: (model, options, token) => {
        let indent = 2 // 初始缩进为2个空格
        let formattedCode = ''
        const bfCode = model.getValue()
        bfCode.split('').forEach(line => {
          line = line.trim()
          if (!line) return
          const formattedLine = ' '.repeat(indent) + line
          formattedCode += formattedLine + '\n'
          indent = line.includes('[') ? 4 : 2 // 根据 '[' 是否出现来决定下一行的缩进
        })
        // 生成编辑操作
        return [{
          range: monaco.Range.fromPositions(model.getPositionAt(0), model.getPositionAt(model.getLineCount() - 1)),
          text: formattedCode.trim(),
        }]
      },
    })
  }
})
</script>

<template>
  <ToolContainer full-size>
    <div class="p-4 grid grid-cols-1 2xl:grid-cols-2 gap-4">
      <div class="w-full flex flex-col gap-2">
        <div class="flex items-center gap-2">
          <h1>Memory View</h1>
          <div>
            <span>Current operation: {{ bf_runtime_steps[bf_runtime_step]?.operator || 'Done' }}</span>
          </div>
        </div>
        <div class="memory-view">
          <div
            class="memory-view-cell"
            :class="{
              'ptr': bf_runtime_steps[bf_runtime_step]?.pointer === i,
              'non-empty': cell !== 0
            }"
            v-for="(cell, i) in bf_runtime_steps[bf_runtime_step]?.memory"
            :key="`step${bf_runtime_step}-cell${i}`"
            :id="`step${bf_runtime_step}-cell${i}`"
          >
            {{ cell }}
          </div>
        </div>
        <div>
          output: {{ bf_runtime_steps[bf_runtime_step]?.output_buffer }}
        </div>
      </div>
      <div class="w-full flex flex-col gap-2">
        <div>
          <h1>Brainfuck Code</h1>
        </div>
        <div class="overflow-hidden rounded shadow border">
          <ClientOnly>
            <MonacoEditor
              class="w-full h-96"
              v-model="bf_program"
              lang="brainfuck"
            >
              Editor Loading...
            </MonacoEditor>
          </ClientOnly>
        </div>
        <UInput v-model="bf_input" placeholder="Input data"/>
        <div class="flex items-center gap-2">
          <UButton @click="onRunClick">
            Run
          </UButton>
          <UButton @click="bf_runtime_step--">
            Prev
          </UButton>
          <UButton @click="bf_runtime_step++">
            Next
          </UButton>
          <UButton @click="onReplayClick">
            Replay
          </UButton>
        </div>
      </div>
    </div>
  </ToolContainer>
</template>

<style lang="scss" scoped>
.memory-view {
  @apply grid grid-cols-24 gap-1;

  &-cell {
    @apply w-full aspect-[1/1] rounded bg-neutral-100 text-neutral-800 text-opacity-30 flex justify-center items-center;
    @apply text-xs font-mono;

    &.ptr {
      @apply bg-green-200;
    }

    &.non-empty {
      @apply text-opacity-100
    }
  }
}
</style>

<i18n>
en:
  title: Brainfuck Runner

zh:
  title: Brainfuck 运行器
</i18n>