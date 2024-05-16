<script setup lang="ts">
const emit = defineEmits(['change'])
const props = defineProps({
  placeholder: {
    type: String,
    default: '点击或拖拽文件到此处',
  },
  placeholderDragover: {
    type: String,
    default: '松开选择文件',
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  accept: {
    type: String,
    default: '',
  },
})

const inputRef = ref<HTMLInputElement | null>(null)
const dragover = ref(false)

// const selectedFiles = ref<FileList | null>(null)
const selectedFiles = ref<File[]>([])

const onIncomeFiles = (files?: FileList | null) => {
  if (files && files.length > 0) {
    let wantedFiles = Array.from(files).filter(file => {
      if (props.accept) {
        const accept = props.accept.split(',').map(type => type.trim())
        console.log(accept, file.type)
        return accept.includes(file.type)
      }
      return true
    })
    if (wantedFiles.length === 0) {
      console.error('no acceptable file')
      return
    }
    selectedFiles.value = props.multiple ? wantedFiles : [wantedFiles[0]]
    emit('change', files)
  }
}
</script>

<template>
  <div
    class="w-full h-44 relative rounded-md border-2 border-dashed border-neutral-200 dark:border-neutral-800
           bg-inherit cursor-pointer select-none transition duration-200
           hover:border-primary-300 dark:hover:border-primary-800 overflow-hidden"
    :class="{
      'bg-neutral-300 dark:bg-neutral-900 border-primary-300 dark:border-primary-800 shadow-inner': dragover,
    }"
    @click="inputRef?.click()"
    @dragover.prevent="dragover = true"
    @dragleave.prevent="dragover = false"
    @drop.prevent="$event => {
      dragover = false
      if (!$event.dataTransfer?.files) return
      onIncomeFiles($event.dataTransfer?.files)
    }"
  >
    <input
      ref="inputRef"
      type="file"
      class="hidden"
      :accept="accept"
      :multiple="multiple"
      @change="onIncomeFiles(inputRef?.files)"
    />
    <!--      @change="onIncomeFiles(($event.target as HTMLInputElement)?.files)"-->
    <!--    />-->
    <div
      class="w-full h-full flex flex-col justify-center items-center gap-2 transition-all"
      :class="{
        'pb-6': selectedFiles.length > 0
      }"
    >
      <Icon
        :name="dragover ? 'tabler:drag-drop' : 'tabler:upload'"
        class="text-4xl text-neutral-400 dark:text-neutral-500"
      />
      <p class="text-xs font-medium text-neutral-500 dark:text-neutral-400">
        {{ dragover ? 'Release to Select' : 'Click or Drag Files here' }}
      </p>
    </div>
    <div
      v-if="selectedFiles.length > 0"
      class="absolute inset-x-0 bottom-0 pl-2 pr-0.5 py-0.5 flex justify-between items-center bg-neutral-100 border-t"
    >
      <div class="flex-1 pr-4 overflow-hidden flex items-center gap-1">
        <Icon :name="selectedFiles.length === 1 ? 'tabler:file' : 'tabler:files'"
              class="text-neutral-500 dark:text-neutral-400"/>
        <p
          class="text-2xs font-medium overflow-hidden text-ellipsis whitespace-nowrap"
          :title="selectedFiles.slice(0, 3).map(file => file.name).join(', ')"
        >
          {{ selectedFiles.slice(0, 3).map(file => file.name).join(', ') }}
        </p>
      </div>
      <div>
        <UButton
          size="xs"
          color="red"
          variant="ghost"
          square
          @click.stop="() => {
            selectedFiles = []
            inputRef!.value = ''
          }"
        >
          <Icon name="tabler:trash"/>
        </UButton>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>