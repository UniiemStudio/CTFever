<template>
  <PrimaryContainer>
    <InteractiveBlock class="space-y-4">
      <PrimaryFileUploader @change="fileChanged"/>
      <UniButton class="w-full" @click="extract" :disable="loading">{{
          loading ? 'Extracting...' : 'Extract'
        }}
      </UniButton>
      <div v-show="result" class="rounded-t-lg overflow-hidden">
        <table class="border-collapse table-auto w-full text-sm">
          <thead class="bg-gray-200 dark:bg-slate-700">
          <tr>
            <th
              class="border-b dark:border-slate-600 font-medium p-4 pb-3 text-slate-500 dark:text-slate-300 text-left">
              Offset(Decimal)
            </th>
            <th
              class="border-b dark:border-slate-600 font-medium p-4 pb-3 pl-4 text-slate-500 dark:text-slate-300 text-left">
              Offset(Hex)
            </th>
            <th
              class="border-b dark:border-slate-600 font-medium p-4 pb-3 pl-4 text-slate-500 dark:text-slate-300 text-left">
              Description
            </th>
          </tr>
          </thead>
          <tbody class="bg-gray-100 dark:bg-slate-800">
          <tr v-for="(signature, k) in result.signature" :key="k">
            <td class="border-b border-slate-200 dark:border-slate-700 p-2 pl-4 text-slate-500 dark:text-slate-400">
              {{ signature.offset }}
            </td>
            <td class="border-b border-slate-200 dark:border-slate-700 p-2 pl-4 text-slate-500 dark:text-slate-400">
              {{ parseInt(signature.offset).toString(16).toUpperCase() }}
            </td>
            <td class="border-b border-slate-200 dark:border-slate-700 p-2 pl-4 text-slate-500 dark:text-slate-400">
              {{ signature.description }}
            </td>
          </tr>
          </tbody>
        </table>
        <table class="border-collapse table-auto w-full text-sm">
          <thead class="bg-gray-200 dark:bg-slate-700">
          <tr>
            <th
              class="border-b dark:border-slate-600 font-medium p-4 pb-3 text-slate-500 dark:text-slate-300 text-left">
              Artifacts (Click to download)
            </th>
          </tr>
          </thead>
          <tbody class="bg-gray-100 dark:bg-slate-800">
          <tr v-for="(artifact, k) in result.downloads ? result.downloads.artifacts : []" :key="k">
            <td class="border-b border-slate-200 dark:border-slate-700 p-4 py-1 text-slate-500 dark:text-slate-400">
              <button @click="openDownload(result.downloads.artifact_id, artifact)"
                      class="visited:text-slate-300 dark:visited:text-slate-500">
                <a>{{ artifact.toString().split('/').at(-1) }}</a>
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </InteractiveBlock>
  </PrimaryContainer>
</template>

<script>
import PrimaryContainer from "~/components/tool/PrimaryContainer";
import InteractiveBlock from "~/components/tool/InteractiveBlock";
import CodeBlock from "~/components/widgets/CodeBlock";
import InteractiveDoubleColumns from "~/components/tool/InteractiveDoubleColumns";
import PrimaryFileUploader from "~/components/form/PrimaryFileUploader.vue";

export default {
  name: "bin-extractor",
  components: {
    PrimaryFileUploader,
    InteractiveDoubleColumns, CodeBlock, InteractiveBlock, PrimaryContainer
  },
  head() {
    return {
      title: this.$t("tool.binExtract.title") + " - " + this.$t("app.name"),
      meta: [
        {hid: "description", name: "description", content: this.$t("tool.binExtract.desc")},
      ],
    };
  },
  data() {
    return {
      file: '',
      result: '',
      loading: false,
    }
  },
  methods: {
    fileChanged(files) {
      this.file = files[0];
    },
    extract() {
      if (this.file === '') return this.$message.error('请选择文件');
      this.loading = true;
      this.result = '';
      this.$api.tool.binwalk.scan(this.file)
        .then(res => {
          if (res.data.result.available) {
            this.result = res.data.result;
          } else {
            this.$message.warn('没有扫描到任何 signature')
          }
        })
        .catch(err => {
          if (err.response) {
            switch (err.response.status) {
              case 429:
                this.$message.error('Rate limit exceeded.');
                break;
              default:
                this.$message.error(err.response.data.detail || err.response.data.error || 'Unknown error');
            }
          } else {
            this.$message.error(err.toJSON().message);
          }
        })
        .finally(() => this.loading = false);
    },
    openDownload(artifact_id, filename) {
      this.$message.info('正在下载产物...');
      this.$api.tool.binwalk.artifact(artifact_id, filename)
        .then(res => {
          const blob = new Blob([res.data], {type: 'application/octet-stream'});
          const downloadElement = document.createElement('a');
          const href = window.URL.createObjectURL(blob);
          downloadElement.href = href;
          downloadElement.download = filename;
          document.body.appendChild(downloadElement);
          downloadElement.click();
          document.body.removeChild(downloadElement);
          window.URL.revokeObjectURL(href);
        })
        .catch(err => {
          if (err.response) {
            switch (err.response.status) {
              case 429:
                this.$message.error('Rate limit exceeded.');
                break;
              default:
                this.$message.error(err.response.data.detail || err.response.data.error || 'Unknown error');
            }
          } else {
            this.$message.error(err.toJSON().message);
          }
        });
    }
  }
}
</script>

<style scoped>

</style>
