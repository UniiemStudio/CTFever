<template>
  <div class="flex flex-col relative items-center justify-center w-full h-fit border-2 border-dashed rounded-lg
           transition duration-300 input-transition cursor-pointer
           border-slate-300 hover:border-blue-400 dark:border-slate-600 dark:hover:border-blue-400
           dark:bg-slate-800 dark:text-slate-300 "
       :class="{
          'disabled:text-gray-300 disabled:dark:text-slate-500 disabled:bg-gray-50': disable,
          'py-4 px-3 text-xl': large,
          'border-blue-400 dark:border-blue-400 bg-blue-50 dark:bg-blue-400/10 dark:text-blue-400 shadow-inner': dragOver,
          'border-red-400 dark:border-red-400 bg-red-50 dark:bg-red-400/10': invalidMIME
        }"
       @click="$refs.input_file.click()"
       @dragover.prevent="dragOver = true"
       @dragleave.prevent="dragOver = false"
       @drop.prevent="dragOver = false; handleFiles($event.dataTransfer.files, true)">
    <input type="file" class="hidden" :disabled="disable" ref="input_file"
           @change="handleFiles($event.target.files)" :multiple="multiple" :accept="accept"/>
    <div class="flex flex-col h-40 justify-center items-center space-y-1 mt-4 transition-all">
      <div :class="{'animate-pulse': dragOver}">
        <Icon :icon="invalidMIME ? 'tabler:file-alert' : 'tabler:cloud-upload'" class="text-4xl"/>
      </div>
      <span v-if="invalidMIME" class="text-sm text-gray-400 dark:text-slate-400">无效的文件类型</span>
      <span v-else class="text-sm text-gray-400 dark:text-slate-400">{{ label }}</span>
    </div>
    <span class="w-full h-0 flex flex-row items-center justify-center font-bold
                 border-t-2 border-gray-200 dark:border-slate-600 opacity-0
                 text-xs text-gray-400 dark:text-slate-400 transition-all duration-500"
          :class="{'h-auto p-1 opacity-100': files}">
      <span class="flex flex-row items-center space-x-0.5">
        <Icon :icon="multiple ? 'tabler:files' : 'tabler:file'" class="text-sm"/>
        <span class="text-inherit">{{
            multiple ? `&nbsp;${files && files.length} 个文件` : `${files && files[0].name}`
          }}</span>
      </span>
    </span>
  </div>
</template>

<script>
import {Icon} from "@iconify/vue2";

export default {
  name: "PrimaryFileUploader",
  components: {Icon},
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
    },
    // mineType 属性，支持的文件类型，传递字符串或数组，如：'image/png' 或 ['image/png', 'image/jpeg']
    mimeType: {
      type: [String, Array],
      default: null
    }
  },
  data() {
    return {
      dragOver: false,
      files: null,
      invalidMIME: false,
    }
  },
  computed: {
    accept() {
      if (this.mimeType) {
        if (typeof this.mimeType === 'string') {
          return this.mimeType;
        } else if (Array.isArray(this.mimeType)) {
          return this.mimeType.join(',');
        }
      }
      return '*/*';
    }
  },
  methods: {
    handleFiles(files, drag = false) {
      if (drag) {
        const validFiles = [];
        for (let i = 0; i < files.length; i++) {
          if (this.mimeType) {
            if (typeof this.mimeType === 'string') {
              if (files[i].type.includes(this.mimeType) || files[i].name.includes(this.mimeType)) {
                validFiles.push(files[i]);
              }
            } else if (Array.isArray(this.mimeType)) {
              this.mimeType.forEach(mime => {
                if (files[i].type.includes(mime) || files[i].name.includes(mime)) {
                  validFiles.push(files[i]);
                }
              })
            }
          } else {
            validFiles.push(files[i]);
          }
        }
        if (validFiles.length === 0) {
          this.invalidMIME = true;
          setTimeout(() => {
            this.invalidMIME = false;
          }, 1500);
          return;
        }
      }
      if (files.length === 0) return;
      this.files = files;
      this.$emit('change', files);
    },
  }
}
</script>

<style scoped>

</style>
