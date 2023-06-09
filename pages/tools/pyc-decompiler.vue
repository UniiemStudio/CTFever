<template>
  <PrimaryContainer>
    <div class="primary-form">
      <InteractiveBlock class="space-y-4">
        <PrimaryFileUploader @change="fileChanged" :mime-type="['.pyc']"/>
        <UniButton class="w-full" @click="decompile" :disable="loading">{{
            loading ? 'Decompiling...' : 'Decompile'
          }}
        </UniButton>
        <CodeBlock v-show="result !== ''" :label="pycInfo" :code="result" max_height="620px" copyable/>
        <InteractiveDoubleColumns v-show="result !== ''">
          <template v-slot:left>
            <UniButton class="w-full" @click="copy">{{ copiedText }}</UniButton>
          </template>
          <template v-slot:right>
            <UniButton class="w-full" @click="download">下载</UniButton>
          </template>
        </InteractiveDoubleColumns>
      </InteractiveBlock>
    </div>
    <PrimaryIntroduction title="Pyc 反编译" path="intro/pyc-decompiler"/>
  </PrimaryContainer>
</template>

<script>
import PrimaryContainer from "~/components/tool/PrimaryContainer";
import GridWithDoubleColumns from "~/components/form/GridWithDoubleColumns";
import InteractiveBlock from "~/components/tool/InteractiveBlock";
import InteractiveDoubleColumns from "~/components/tool/InteractiveDoubleColumns";
import PrimaryPreBlock from "~/components/form/PrimaryPreBlock";
import CodeBlock from "~/components/widgets/CodeBlock";
import PrimaryIntroduction from "~/components/tool/PrimaryIntroduction.vue";
import PrimaryFileUploader from "~/components/form/PrimaryFileUploader.vue";

export default {
  name: "pyc-decompiler",
  components: {
    PrimaryFileUploader,
    PrimaryIntroduction,
    CodeBlock,
    PrimaryPreBlock,
    InteractiveDoubleColumns, InteractiveBlock, GridWithDoubleColumns, PrimaryContainer
  },
  head() {
    return {
      title: this.$t("tool.pycDecompiler.title") + " - " + this.$t("app.name"),
      meta: [
        {hid: "description", name: "description", content: this.$t("tool.pycDecompiler.desc")},
      ],
    };
  },
  data() {
    return {
      pycFile: '',
      result: '',
      pycInfo: '',
      loading: false,
      copiedText: '复制到加剪贴板'
    };
  },
  methods: {
    fileChanged(files) {
      this.pycFile = files[0];
    },
    async decompile() {
      if (this.pycFile === '') return this.$message.error('请选择文件');
      this.loading = true;
      this.result = '';
      this.$api.tool.pyc.decompile(this.pycFile)
        .then(res => {
          this.pycInfo = res.data.result.original_filename || this.pycFile.name || 'untitled file';
          this.pycInfo += res.data.result.version ? ` (Python ${res.data.result.version})` : ' (unknown version)';
          this.result = res.data.result.output || res.data.message;
        })
        .catch(err => {
          if (err.response) {
            this.$message.error(err.response.data.detail);
          } else {
            this.$message.error(err.toJSON().message);
          }
        })
        .finally(() => this.loading = false);
    },
    copy() {
      navigator.clipboard.writeText(this.result);
      this.copiedText = '已复制到剪贴板';
      setTimeout(() => {
        this.copiedText = '复制到加剪贴板';
      }, 1500);
    },
    download() {
      let blob = new Blob([this.result], {
        type: 'text/plain;charset=utf-8'
      });
      let link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = this.pycFile.name.replace(/\.pyc$/, '.py');
      link.click();
    }
  }
}
</script>

<style scoped>

</style>
