<template>
  <PrimaryContainer>
    <InteractiveBlock class="space-y-4">
      <PrimaryInput id="pycFile" type="file" @change="fileChanged"/>
      <PrimaryButton class="w-full" @click="decompile" :disable="loading">{{
          loading ? 'Decompiling...' : 'Decompile'
        }}
      </PrimaryButton>
      <CodeBlock v-show="result !== ''" :label="pycInfo" :code="result" copyable/>
      <InteractiveDoubleColumns v-show="result !== ''">
        <template v-slot:left>
          <PrimaryButton class="w-full" @click="copy">{{ copiedText }}</PrimaryButton>
        </template>
        <template v-slot:right>
          <PrimaryButton class="w-full" @click="download">下载</PrimaryButton>
        </template>
      </InteractiveDoubleColumns>
    </InteractiveBlock>
  </PrimaryContainer>
</template>

<script>
import PrimaryContainer from "~/components/tool/PrimaryContainer";
import GridWithDoubleColumns from "~/components/form/GridWithDoubleColumns";
import InteractiveBlock from "~/components/tool/InteractiveBlock";
import PrimaryInput from "~/components/form/PrimaryInput";
import InteractiveDoubleColumns from "~/components/tool/InteractiveDoubleColumns";
import PrimaryPreBlock from "~/components/form/PrimaryPreBlock";
import PrimaryButton from "~/components/form/PrimaryButton";
import CodeBlock from "~/components/widgets/CodeBlock";

export default {
  name: "pyc-decompiler",
  components: {
    CodeBlock,
    PrimaryButton,
    PrimaryPreBlock,
    InteractiveDoubleColumns, PrimaryInput, InteractiveBlock, GridWithDoubleColumns, PrimaryContainer
  },
  head() {
    return {
      title: this.$t("tool.pycDecompiler.title") + " - " + this.$t("app.name")
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
    fileChanged(e) {
      this.pycFile = e.target.files[0];
    },
    decompile() {
      if (this.pycFile === '') return this.$message.error('请选择文件');
      this.loading = true;
      this.result = '';
      let formData = new FormData();
      formData.append('pyc_file', this.pycFile);
      // const self = this;
      this.$axios.post(`https://ctfever-service-gen1.i0x0i.ltd/pyc-dc`, formData)
        .then(res => {
          this.pycInfo = res.data.origin_filename || this.pycFile.name || 'untitled file';
          this.pycInfo += res.data.py_version_string ? ` (${res.data.py_version_string})` : ' (unknown version)';
          this.result = res.data.output || res.data.decompiled || res.data.message;
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
