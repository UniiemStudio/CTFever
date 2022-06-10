<template>
  <PrimaryContainer>
    <InteractiveBlock class="space-y-4">
      <PrimaryInput id="file" type="file" @change="fileChanged"/>
      <PrimaryButton class="w-full" @click="extract" :disable="loading">{{
          loading ? 'Extracting...' : 'Extract'
        }}
      </PrimaryButton>
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
              Artifacts
            </th>
          </tr>
          </thead>
          <tbody class="bg-gray-100 dark:bg-slate-800">
          <tr v-for="(artifact, k) in result.downloads ? result.downloads.artifacts : []" :key="k">
            <td class="border-b border-slate-200 dark:border-slate-700 p-4 py-1 text-slate-500 dark:text-slate-400">
              <a :href="`https://ctfever-service-gen1.i0x0i.ltd${artifact}`"
                 class="visited:text-slate-300 dark:visited:text-slate-500"
                 target="_blank">{{ artifact.toString().split('/').at(-1) }}</a>
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
import PrimaryInput from "~/components/form/PrimaryInput";
import PrimaryButton from "~/components/form/PrimaryButton";
import CodeBlock from "~/components/widgets/CodeBlock";
import InteractiveDoubleColumns from "~/components/tool/InteractiveDoubleColumns";

export default {
  name: "bin-extractor",
  components: {InteractiveDoubleColumns, CodeBlock, PrimaryButton, PrimaryInput, InteractiveBlock, PrimaryContainer},
  head() {
    return {
      title: this.$t("tool.binExtract.title") + " - " + this.$t("app.name")
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
    fileChanged(e) {
      this.file = e.target.files[0];
    },
    extract() {
      if (this.file === '') return this.$message.error('请选择文件');
      this.loading = true;
      this.result = '';
      let formData = new FormData();
      formData.append('file', this.file);
      // const self = this;
      this.$axios.post(`https://ctfever-service-gen1.i0x0i.ltd/binwalk`, formData)
        .then(res => {
          if (res.data.available) {
            this.result = res.data;
          } else {
            this.$message.warn('没有扫描到任何 signature')
          }
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
  }
}
</script>

<style scoped>

</style>
