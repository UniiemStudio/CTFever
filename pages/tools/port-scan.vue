<template>
  <PrimaryContainer>
    <InteractiveDoubleColumns>
      <template v-slot:left>
        <InteractiveBlock class="space-y-4">
          <PrimaryInput id="host" label="主机" v-model="host" placeholder="域名或者 IP 地址"/>
          <PrimaryInput id="ports" label="端口范围" v-model="port" placeholder="e.g. 22,25,80-88"/>
          <PrimaryButton class="w-full" @click="scan">开始扫描</PrimaryButton>
        </InteractiveBlock>
      </template>
      <template v-slot:right>
        <InteractiveBlock>
          <PrimaryPreBlock label="扫描结果">
            {{ result }}
          </PrimaryPreBlock>
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

export default {
  name: "port-scan",
  components: {
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
      result: ''
    };
  },
  methods: {
    scan() {
      let formData = new FormData();
      formData.append('host', this.host);
      formData.append('port', this.port);
      this.$axios.post(`http://47.94.109.77:9580/scan`, formData).then(res => {
        this.result = res.data;
      });
    }
  }
}
</script>

<style scoped>

</style>
