<template>
  <div>
    <h1 v-show="label" class="text-gray-700 text-sm font-bold font-['Nunito'] mb-2 dark:text-slate-300">{{ label }}</h1>
    <pre class="hljs p-4 rounded-lg overflow-y-scroll" :style="max_height ? {maxHeight: max_height} : {}"><code
      v-html="renderedCode"></code></pre>
  </div>
</template>

<script>
import hljs from "highlight.js";
import 'highlight.js/styles/github-dark-dimmed.css';

export default {
  name: "CodeBlock",
  props: {
    language: {
      type: String,
      default: "auto"
    },
    code: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: null
    },
    copyable: {
      type: Boolean,
      default: false
    },
    max_height: {
      type: String,
      default: "none"
    }
  },
  data() {
    return {
      renderedCode: '',
    };
  },
  watch: {
    code() {
      this.rerender();
    }
  },
  methods: {
    rerender() {
      let code = this.code;
      this.renderedCode = this.language === 'auto' ? hljs.highlightAuto(code).value : hljs.highlight(this.language, code).value;
    }
  }
}
</script>

<style scoped>

</style>
