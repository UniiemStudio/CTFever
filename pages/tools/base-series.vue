<template>
  <PrimaryContainer>
    <form class="primary-form">
      <InteractiveBlock>
        <UniSelect :options="options" v-model="method" :label="$t('common.text_type').toString()"/>
      </InteractiveBlock>
      <InteractiveBlock>
        <PrimaryArea id="input" v-model="input" :label="$t('common.text_decoded').toString()" :rows="10"
                     copyable></PrimaryArea>
      </InteractiveBlock>
      <InteractiveBlock class="flex items-center justify-between">
        <div class="flex flex-row items-center space-x-1">
          <UniButton @click="encode" icon="tabler:arrow-narrow-up">{{ $t('common.btn_encode') }}</UniButton>
          <UniButton @click="decode" icon="tabler:arrow-narrow-down">{{ $t('common.btn_decode') }}</UniButton>
        </div>
        <UniButton danger @click="input = ''; output = '';" icon="tabler:trash">
          {{ $t('common.btn_clean') }}
        </UniButton>
      </InteractiveBlock>
      <InteractiveBlock>
        <PrimaryArea id="output" v-model="output" :label="$t('common.text_encoded').toString()"
                     :rows="10" copyable></PrimaryArea>
      </InteractiveBlock>
    </form>
  </PrimaryContainer>
</template>

<script>
import PrimaryContainer from "~/components/tool/PrimaryContainer";
import InteractiveBlock from "~/components/tool/InteractiveBlock";
import PrimaryArea from "~/components/form/PrimaryTextArea";
import InteractiveDoubleColumns from "~/components/tool/InteractiveDoubleColumns";

import * as base64 from "hi-base64";
import * as base32 from "hi-base32";
import {Icon} from "@iconify/vue2";

export default {
  name: "base-series",
  components: {
    Icon,
    InteractiveDoubleColumns,
    PrimaryArea,
    InteractiveBlock,
    PrimaryContainer
  },
  head() {
    return {
      title: this.$t("tool.baseSeries.title") + " - " + this.$t("app.name"),
      meta: [
        {hid: "description", name: "description", content: this.$t("tool.baseSeries.desc")},
      ],
    };
  },
  methods: {
    encode() {
      this.output = this.method === "base64" ? base64.encode(this.input) : base32.encode(this.input);
    },
    decode() {
      this.input = this.method === "base64" ? base64.decode(this.output) : base32.decode(this.output);
    }
  },
  data() {
    return {
      input: "",
      output: "",
      method: "base64",
      options: [
        {
          label: "Base64",
          value: "base64"
        },
        {
          label: "Base32",
          value: "base32"
        }
      ]
    };
  },
}
</script>

<style scoped>

</style>
