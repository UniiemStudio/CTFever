<!--suppress JSUnresolvedReference -->
<script>
import {defineComponent} from 'vue'
import PrimaryContainer from "~/components/tool/PrimaryContainer.vue";
import InteractiveDoubleColumns from "~/components/tool/InteractiveDoubleColumns.vue";
import PrimaryIntroduction from "~/components/tool/PrimaryIntroduction.vue";

import jsonpath from 'jsonpath';
import {codemirror} from 'vue-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/display/placeholder'
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/idea.css';
import {copyTextToClipboard} from "~/libs/common";
// import 'codemirror/theme/darcula.css';

export default defineComponent({
  name: "json-serializer",
  components: {
    codemirror,
    PrimaryIntroduction,
    InteractiveDoubleColumns,
    PrimaryContainer
  },
  head() {
    return {
      title: this.$t("tool.jsonSerializer.title") + " - " + this.$t("app.name"),
      meta: [
        {hid: "description", name: "description", content: this.$t("tool.jsonSerializer.desc")},
      ],
    }
  },
  data() {
    return {
      expressionOptions: [
        {value: 'jsonpath', label: 'JSON Path'},
        {value: 'js', label: 'JS 对象操作', disabled: true},
      ],
      cmOptions: {
        tabSize: 4,
        mode: {
          name: 'javascript',
          json: true
        },
        theme: 'idea',
        lineNumbers: true,
        line: true,
      },
      input_json: '',
      output_json: '',
      expressionType: 'jsonpath',
      expression: '$',
      beautify: true,
      indent: 2,
      references: [
        {
          name: 'JSONPath - XPath for JSON',
          url: 'https://goessner.net/articles/JsonPath/'
        }
      ]
    }
  },
  mounted() {
    const json = this.$route.query.json
    const expression = this.$route.query.expression
    const expressionType = this.$route.query.expressionType
    if (json) {
      this.input_json = Buffer.from(json, 'base64').toString()
    }
    if (expression) {
      this.expression = decodeURIComponent(expression)
    }
    if (expressionType) {
      if (this.expressionOptions.find(item => item.value === expressionType)) {
        this.expressionType = expressionType
      }
    }

    this.processJson()
  },
  methods: {
    processJson() {
      this.$router.replace({
        path: this.$route.fullPath,
        query: {
          ...this.$route.query,
          json: Buffer.from(this.input_json).toString('base64'),
          expression: encodeURIComponent(this.expression),
          expressionType: this.expressionType,
        }
      }).catch(() => {
        // pass
      })
      if (this.expressionType === 'jsonpath') {
        try {
          let result = jsonpath.query(JSON.parse(this.input_json), this.expression)
          if (Array.isArray(result) && result.length === 1) {
            result = result[0]
          }
          this.output_json = JSON.stringify(
            result,
            null,
            this.beautify ? parseInt(this.indent || '0') : null
          )
        } catch (e) {
          this.output_json = e.message
        }
      }
    },
    handleExpressionTypeChange() {
      if (this.expressionType === 'jsonpath') {
        this.expression = '$'
      } else {
        this.expression = 'json'
      }
      this.processJson()
    },
    handleShare() {
      copyTextToClipboard(window.location.href)
      this.$message.success('已复制当前页面地址到剪贴板')
    },
  },
})
</script>

<template>
  <div>
    <div class="mb-2">
      <h2 class="block-title">表达式</h2>
      <div class="flex items-center space-x-2">
        <UniSelect style="width: 120px" :options="expressionOptions" v-model="expressionType"
                   @change="handleExpressionTypeChange"/>
        <UniInput
          id="expression"
          v-model="expression"
          @input="processJson"
          class="w-full" copyable
          :placeholder="expressionType === 'jsonpath' ? 'JSONPath 表达式' : 'JavaScript 对象操作语句'"/>
      </div>
    </div>
    <InteractiveDoubleColumns>
      <template v-slot:left>
        <h2 class="block-title">JSON</h2>
        <codemirror
          v-model="input_json"
          @input="processJson"
          :options="{
            ...cmOptions,
            autofocus: true,
            placeholder: 'JSON goes here...'
          }"
          :autofocus="true"/>
      </template>
      <template v-slot:right>
        <h2 class="block-title">表达式输出</h2>
        <codemirror class="output"
                    v-model="output_json"
                    :options="{
                      ...cmOptions,
                      readOnly: true,
                      placeholder: 'Output goes here...'
                    }"
                    :disabled="true"/>
        <div
          class="h-12 px-4 space-x-2 flex flex-row items-center border border-slate-300 dark:border-slate-700 rounded-md overflow-hidden">
          <div>
            <a-checkbox v-model="beautify" @change="processJson">美化输出</a-checkbox>
          </div>
          <div class="flex flex-row items-center space-x-1">
            <h2>缩进</h2>
            <UniInput id="indent" placeholder="缩进数量" v-model="indent" :disabled="!beautify"
                      @input="processJson" type="number"/>
          </div>
        </div>
      </template>
    </InteractiveDoubleColumns>
    <PrimaryIntroduction title="Json Path" path="intro/jsonpath" :references="references" no-margin/>
  </div>
</template>

<style scoped>
.block-title {
  @apply block text-gray-700 dark:text-slate-300 text-sm font-bold font-['Nunito'] mb-2;
}
</style>

<style>
.CodeMirror {
  @apply h-96 md:h-[calc(100vh-96px-165px-146px)] border border-slate-300 dark:border-slate-700 rounded-md;
}

.output .CodeMirror {
  @apply h-80 md:h-[calc(100vh-96px-165px-146px-64px)] mb-4;
}
</style>
