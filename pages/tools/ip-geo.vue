<template>
  <PrimaryContainer>
    <InteractiveBlock class="space-y-4">
      <PrimaryInput label="IP" id="ip" v-model="ip" placeholder="Leave blank for Local"/>
      <PrimaryButton class="w-full" @click="query" :disable="isLoading">
        {{ isLoading ? 'LOADING...' : 'QUERY' }}
      </PrimaryButton>
    </InteractiveBlock>
    <InteractiveBlock>
      <ObjectViewer :object="info" :map="map" tip="数据来自 ip.sb"/>
    </InteractiveBlock>
  </PrimaryContainer>
</template>

<script>
import PrimaryContainer from "~/components/tool/PrimaryContainer";
import InteractiveBlock from "~/components/tool/InteractiveBlock";
import PrimaryInput from "~/components/form/PrimaryInput";
import PrimaryButton from "~/components/form/PrimaryButton";
import PrimaryArea from "~/components/form/PrimaryTextArea";
import ObjectViewer from "~/components/tool/ObjectViewer";

export default {
  name: "ip-geo",
  components: {ObjectViewer, PrimaryArea, PrimaryButton, PrimaryInput, InteractiveBlock, PrimaryContainer},
  head() {
    return {
      title: this.$t("tool.ipAttribution.title") + " - " + this.$t("app.name"),
      meta: [
        {hid: "description", name: "description", content: this.$t("tool.ipAttribution.desc")},
      ],
    };
  },
  data() {
    return {
      ip: "",
      info: null,
      isLoading: false,
      map: {
        'ip': 'IP',
        'country_code': '国家代码',
        'country': '国家',
        'region_code': '行政区代码',
        'region': '行政区',
        'city': '城市',
        'postal_code': '邮政编码',
        'continent_code': '大陆(洲)代码',
        'latitude': '纬度',
        'longitude': '经度',
        'organization': '组织',
        'timezone': '时区',
        'asn': '自治系统编号',
        'asn_organization': '自治系统组织',
        'isp': '服务商(ISP)',
        'offset': 'Offset'
      }
    };
  },
  methods: {
    query() {
      this.info = null;
      this.isLoading = true;
      this.$nuxt.$loading.start();
      this.$axios.get("https://api.ip.sb/geoip/" + this.ip)
        .then(response => {
          this.info = response.data;
        })
        .finally(() => {
          this.isLoading = false;
          this.$nuxt.$loading.finish();
        });
    }
  }
}
</script>

<style scoped>

</style>
