<script setup lang="ts">
import type { MonacoEditor } from '#components'
import { useMonaco } from '#imports'
import { languages } from 'monaco-editor'
import { type Callback, executeCallbackly, type Runtime } from '@uniiem/brainfuck'

const { t } = useI18n({ useScope: 'local' })
useSeoMeta({ title: t('title') })

const monaco = useMonaco()

const run = ref(false)
const pause = ref(false)

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
  pause.value = false
  executeCallbackly(bf_program.value, bf_input.value || undefined, bf_run_callback).then(() => {
    onReplayClick()
  })
}

const onReplayClick = () => {
  bf_runtime_step.value = 0
  run.value = true
  const interval = setInterval(() => {
    if (pause.value) return
    if (!run.value) {
      clearInterval(interval)
      return
    }
    if (bf_runtime_step.value + 1 < bf_runtime_steps.value.length) {
      bf_runtime_step.value++
    } else {
      run.value = false
      clearInterval(interval)
    }
  }, 0)
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
        <div class="flex justify-between items-center gap-2">
          <h1 class="font-medium">{{ t('memory_view') }}</h1>
          <div class="text-sm font-bold">
            {{ bf_runtime_steps[bf_runtime_step]?.operator || 'Done' }}
          </div>
        </div>
        <div class="memory-view">
          <div
            class="memory-view-cell"
            :class="{
              'ptr': bf_runtime_steps[bf_runtime_step]?.pointer === i,
              'read': bf_runtime_steps[bf_runtime_step]?.operator === '.',
              'write': bf_runtime_steps[bf_runtime_step]?.operator === ',',
              'non-empty': cell !== 0
            }"
            v-for="(cell, i) in bf_runtime_steps[bf_runtime_step]?.memory"
            :key="`step${bf_runtime_step}-cell${i}`"
            :id="`step${bf_runtime_step}-cell${i}`"
          >
            {{ cell }}
          </div>
        </div>
        <div class="flex-1 flex flex-col gap-1">
          <h1 class="font-medium">{{ t('output') }}</h1>
          <div class="h-[228px] overflow-hidden overflow-y-auto px-3 py-1.5 border">
            <pre class="text-wrap break-all">{{ bf_runtime_steps[bf_runtime_step]?.output_buffer }}</pre>
          </div>
        </div>
      </div>
      <div class="w-full flex flex-col gap-2">
        <div>
          <h1 class="font-medium">Brainfuck Code</h1>
        </div>
        <div class="overflow-hidden rounded-md shadow border">
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
        <UInput v-model="bf_input" :placeholder="t('input')"/>
        <div class="flex items-center gap-2">
          <UButton
            @click="() => {
              !run ? onRunClick() : (() => pause = !pause)()
            }"
            :icon="run ? (pause ? 'i-tabler-reorder' : 'i-tabler-player-pause') : 'i-tabler-player-play'"
          >
            {{ run ? (pause ? t('resume') : t('pause')) : t('run') }}
          </UButton>
          <UButton
            @click="bf_runtime_step--"
            v-if="run && pause"
            variant="soft"
            icon="i-tabler-arrow-left-circle"
          >
            {{ t('prev') }}
          </UButton>
          <UButton
            @click="bf_runtime_step++"
            v-if="run && pause"
            variant="soft"
            trailing-icon="i-tabler-arrow-right-circle"
          >
            {{ t('next') }}
          </UButton>
          <UButton @click="run = false" v-if="run" color="red" variant="soft" icon="i-tabler-browser-x">
            {{ t('abort') }}
          </UButton>
        </div>
      </div>
    </div>
  </ToolContainer>
</template>

<style lang="scss" scoped>
.memory-view {
  @apply grid grid-cols-16 md:grid-cols-32 border-[.5px];
  @apply dark:border-neutral-800;

  &-cell {
    @apply w-full aspect-[1/1] bg-neutral-100 even:bg-opacity-50 text-neutral-800 text-opacity-30 flex justify-center items-center;
    @apply text-xs font-mono border-[.5px] relative;
    @apply dark:bg-neutral-900 dark:even:bg-opacity-50 dark:border-neutral-800 dark:text-neutral-500 dark:text-opacity-30;

    &.ptr {
      @apply bg-primary-500/30 border-primary text-primary;
    }

    &.ptr.read,
    &.ptr.write {
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        border: 4px solid transparent;
        @apply border-t-blue-500;
      }
    }

    &.ptr.read {
      @apply bg-blue-500/30 border-primary border-t-blue-500 text-blue-500 font-bold;

      &::before {
        @apply border-t-blue-500;
      }
    }

    &.ptr.write {
      @apply bg-green-500/30 border-primary border-t-green-500 text-green-500 font-bold;

      &::before {
        @apply border-t-green-500;
      }
    }

    &.ptr::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      border: 4px solid transparent;
      border-bottom-color: currentColor;
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
  memory_view: Memory View
  input: Input
  output: Output
  run: Run
  pause: Pause
  resume: Resume
  abort: Abort
  prev: Prev
  next: Next

zh:
  title: Brainfuck 运行器
  memory_view: 内存视图
  input: 输入
  output: 输出
  run: 运行
  pause: 暂停
  resume: 恢复
  abort: 中止
  prev: 上一步
  next: 下一步
</i18n>