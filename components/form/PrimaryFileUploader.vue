<template>
  <div class="flex flex-col relative items-center justify-center w-full h-fit border-2 border-dashed rounded-lg
           transition duration-300 input-transition cursor-pointer
           border-slate-300 hover:border-blue-400 dark:border-slate-600 dark:hover:border-blue-400
           dark:bg-slate-800 dark:text-slate-300 "
       :class="{
          'disabled:text-gray-300 disabled:dark:text-slate-500 disabled:bg-gray-50': disable,
          'py-4 px-3 text-xl': large,
          'border-blue-400 dark:border-blue-400 bg-blue-50 dark:bg-blue-400/10 dark:text-blue-400': dragOver,
        }"
       @click="$refs.input_file.click()"
       @dragover.prevent="dragOver = true"
       @dragleave.prevent="dragOver = false"
       @drop.prevent="dragOver = false; handleFiles($event.dataTransfer.files)">
    <input type="file" class="hidden" :disabled="disable" ref="input_file"
           @change="handleFiles($event.target.files)" :multiple="multiple"/>
    <div class="flex flex-col h-40 justify-center items-center space-y-1 mt-4 transition-all">
      <div :class="{'animate-pulse': dragOver}">
        <ion-icon class="text-4xl" name="cloud-upload-outline"></ion-icon>
      </div>
      <span class="text-sm text-gray-400 dark:text-slate-400">{{ label }}</span>
    </div>
    <span class="w-full h-0 flex flex-row items-center justify-center font-bold
                 border-t-2 border-gray-200 dark:border-slate-600 opacity-0
                 text-xs text-gray-400 dark:text-slate-400 transition-all duration-500"
          :class="{'h-auto p-1 opacity-100': files}">
      <span class="flex flex-row items-center space-x-0.5">
        <ion-icon class="text-sm" :name="multiple ? 'file-tray-full-outline' : 'attach-outline'"></ion-icon>
        <span class="text-inherit">{{
            multiple ? `&nbsp;${files && files.length} 个文件` : `${files && files[0].name}`
          }}</span>
      </span>
    </span>
  </div>
</template>

<script>
export default {
  name: "PrimaryFileUploader",
  props: {
    label: {
      type: String,
      default: '拖放或点击上传文件'
    },
    large: {
      type: Boolean,
      default: false
    },
    disable: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dragOver: false,
      files: null
    }
  },
  methods: {
    handleFiles(files) {
      if (files.length === 0) return;
      this.files = files;
      this.$emit('change', files);
    }
  }
}
</script>

<style scoped>

</style>
