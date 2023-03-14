<template>
  <PrimaryContainer>
    <InteractiveDoubleColumns>
      <template v-slot:left>
        <InteractiveBlock class="space-y-4">
          <PrimaryInput id="host" label="主机" v-model="host" placeholder="域名或者 IP 地址"/>
          <PrimaryInput id="ports" label="端口范围" v-model="port" placeholder="e.g. 22,25,80-88"/>
          <PrimaryButton class="w-full" @click="scan" :disable="loading">{{ buttonText }}</PrimaryButton>
        </InteractiveBlock>
      </template>
      <template v-slot:right>
        <InteractiveBlock v-if="result.result" class="space-y-2">
          <h1 class="block text-gray-700 dark:text-slate-300 text-sm font-bold font-['Nunito'] mb-2">
            扫描结果
          </h1>
          <ObjectViewer
            no-sort
            :map="{
              'host': '主机',
              'elapsed': '耗时',
              'total': '扫描数',
              'open': '打开的端口'
            }"
            :object="{
              'host': result.result.host,
              'elapsed': `${result.spent}s`,
              'total': result.result.total,
              'open': result.result.open
            }"/>
          <div v-for="(ret, k) in result.result.ports" :key="k"
               class="p-4 rounded-lg border flex justify-between items-center font-['Nunito']">
            <div class="flex flex-col items-start">
              <h1 class="text-2xl font-extrabold">{{ ret.port }}</h1>
              <span class="text-base opacity-40">{{ ret.service }}</span>
            </div>
            <div class="relative">
              <div class="absolute -top-1.5">
                <div :class="{'bg-gray-300': ret.state !== 'open', 'bg-green-400': ret.state === 'open'}"
                     class="absolute w-3 h-3 top-0 right-0 rounded-full"></div>
                <div v-show="ret.state === 'open'"
                     :class="{'bg-gray-300': ret.state !== 'open', 'bg-green-400': ret.state === 'open'}"
                     class="absolute w-3 h-3 top-0 right-0 rounded-full animate-ping"></div>
              </div>
            </div>
          </div>
        </InteractiveBlock>
      </template>
    </InteractiveDoubleColumns>
  </PrimaryContainer>
</template>

<script>
import PrimaryContainer from "~/components/tool/PrimaryContainer";
import InteractiveDoubleColumns from "~/components/tool/InteractiveDoubleColumns";
import InteractiveBlock from "~/components/tool/InteractiveBlock";
import PrimaryInput from "~/components/form/PrimaryInput";
import PrimaryButton from "~/components/form/PrimaryButton";
import PrimaryPreBlock from "~/components/form/PrimaryPreBlock";
import ObjectViewer from "~/components/tool/ObjectViewer";

export default {
  name: "port-scan",
  components: {
    ObjectViewer,
    PrimaryPreBlock,
    PrimaryButton, PrimaryInput, InteractiveBlock, InteractiveDoubleColumns, PrimaryContainer
  },
  head() {
    return {
      title: this.$t("tool.portScan.title") + " - " + this.$t("app.name")
    };
  },
  data() {
    return {
      host: '',
      port: '',
      result: {
        result: null
      },
      loading: false,
      buttonText: '开始扫描',
    };
  },
  methods: {
    scan() {
      if (this.host === '' || this.port === '') return this.$message.error('请输入主机和端口');
      this.loading = true;
      this.result = {}
      this.$api.tool.portScan.scan(this.host, this.port)
        .then(res => {
          this.result = res.data;
          console.log(this.result)
        })
        .catch(err => {
          if (err.response) {
            switch (err.response.status) {
              case 410:
                this.$message.error(err.response.data.error);
                break;
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
      // let formData = new FormData();
      // formData.append('hosts', this.host);
      // formData.append('ports', this.port);
      // this.$axios.post(`https://ctfever-service-gen1.i0x0i.ltd/port-scan`, formData)
      //   .then(res => {
      //     this.result = res.data;
      //   })
      //   .catch(err => {
      //     if (err.response) {
      //       switch (err.response.status) {
      //         case 410:
      //           this.$message.error(err.response.data.error);
      //           break;
      //         case 429:
      //           this.$message.error('Rate limit exceeded.');
      //           break;
      //         default:
      //           this.$message.error(err.response.data.detail || err.response.data.error || 'Unknown error');
      //       }
      //     } else {
      //       this.$message.error(err.toJSON().message);
      //     }
      //   })
      //   .finally(() => this.loading = false);
    }
  },
  watch: {
    loading(val) {
      this.buttonText = val ? '扫描中...' : '开始扫描';
    }
  }
}
</script>

<style scoped>

</style>
