<template>
  <PrimaryContainer>
    <InteractiveBlock>
      <PrimaryArea id="morse" v-model="input" :label="$t('common.text_original_content').toString()"
                   :rows="10" copyable></PrimaryArea>
    </InteractiveBlock>
    <InteractiveBlock class="flex items-center justify-between">
      <div class="flex items-center space-x-1">
        <UniButton @click="encode" icon="tabler:arrow-narrow-down">{{ $t('common.text_encode').toString() }}</UniButton>
        <UniButton @click="decode" icon="tabler:arrow-narrow-up">{{ $t('common.text_decode').toString() }}</UniButton>
      </div>
      <UniButton danger @click="input = ''; output = '';" icon="tabler:trash">{{
          $t('common.btn_clean').toString()
        }}
      </UniButton>
    </InteractiveBlock>
    <InteractiveBlock>
      <PrimaryArea id="output" v-model="output" :label="$t('common.text_result_content').toString()"
                   placeholder="UTF8 Code" :rows="10" copyable></PrimaryArea>
    </InteractiveBlock>
  </PrimaryContainer>
</template>

<script>
import PrimaryContainer from "~/components/tool/PrimaryContainer";
import InteractiveBlock from "~/components/tool/InteractiveBlock";
import PrimaryArea from "~/components/form/PrimaryTextArea";

import UTF8Translate from '~/libs/utf8-util';

export default {
  name: "utf8-conversion",
  components: {PrimaryArea, InteractiveBlock, PrimaryContainer},
  head() {
    return {
      title: this.$t("tool.utf8Conversion.title") + " - " + this.$t("app.name"),
      meta: [
        {hid: "description", name: "description", content: this.$t("tool.utf8Conversion.desc")},
      ],
    };
  },
  data() {
    return {
      input: '',
      output: '',
    }
  },
  methods: {
    encode() {
      // this.output = encodeURIComponent(this.input);
      this.output = UTF8Translate.Encode(this.input);
    },
    decode() {
      // this.input = decodeURIComponent(this.output);
      this.input = UTF8Translate.Decode(this.output);
    },
  },
}
</script>

<style scoped>

</style>
