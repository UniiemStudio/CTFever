<template>
  <PrimaryContainer>
    <InteractiveBlock>
      <PrimaryArea id="input" v-model="input" :label="$t('common.text_plain').toString()" :rows="10"
                   copyable></PrimaryArea>
    </InteractiveBlock>
    <InteractiveBlock class="flex items-center justify-between">
      <div class="space-x-1">
        <UniButton @click="encode" icon="tabler:arrow-narrow-down">{{ $t('common.btn_encrypt') }}</UniButton>
        <UniButton @click="decode" icon="tabler:arrow-narrow-up">{{ $t('common.btn_decrypt') }}</UniButton>
      </div>
      <UniButton danger @click="input = ''; output = '';" icon="tabler:trash">{{
          $t('common.btn_clean')
        }}
      </UniButton>
    </InteractiveBlock>
    <InteractiveBlock>
      <PrimaryArea id="output" v-model="output" :label="$t('common.text_cipher').toString()"
                   :rows="10" copyable></PrimaryArea>
    </InteractiveBlock>
  </PrimaryContainer>
</template>

<script>
import PrimaryContainer from "~/components/tool/PrimaryContainer";
import InteractiveBlock from "~/components/tool/InteractiveBlock";
import PrimaryArea from "~/components/form/PrimaryTextArea";

import {coreValuesDecode, coreValuesEncode} from '~/libs/coreValuesCipher';

export default {
  name: "core-values-cipher",
  components: {PrimaryArea, InteractiveBlock, PrimaryContainer},
  head() {
    return {
      title: this.$t("tool.coreValues.title") + " - " + this.$t("app.name"),
      meta: [
        {hid: "description", name: "description", content: this.$t("tool.coreValues.desc")},
      ],
    };
  },
  data() {
    return {
      input: "",
      output: "",
    }
  },
  methods: {
    encode() {
      this.output = coreValuesEncode(this.input);
    },
    decode() {
      this.input = coreValuesDecode(this.output);
    }
  },
}
</script>

<style scoped>

</style>
