<template>
  <PrimaryContainer>
    <form class="primary-form">
      <!-- TODO: 自定义长短号 -->
      <InteractiveBlock>
        <PrimaryArea id="morse" v-model="input" :label="$t('common.text_original_content').toString()"
                     :rows="10" copyable></PrimaryArea>
      </InteractiveBlock>
      <InteractiveBlock class="flex items-center justify-between">
        <div class="flex items-center space-x-1">
          <UniButton @click="encodeMorse" icon="tabler:arrow-narrow-down">{{
              $t('common.text_encode').toString()
            }}
          </UniButton>
          <UniButton @click="decodeMorse" icon="tabler:arrow-narrow-up">{{
              $t('common.text_decode').toString()
            }}
          </UniButton>
        </div>
        <UniButton danger @click="input = ''; output = '';" icon="tabler:trash">{{
            $t('common.btn_clean').toString()
          }}
        </UniButton>
      </InteractiveBlock>
      <InteractiveBlock>
        <PrimaryArea id="output" v-model="output" :label="$t('common.text_result_content').toString()"
                     placeholder="Morse code" :rows="10" copyable></PrimaryArea>
      </InteractiveBlock>
    </form>
    <PrimaryIntroduction title="摩尔斯电码" path="intro/morse-code" :references="references"/>
  </PrimaryContainer>
</template>

<script>
import PrimaryContainer from "~/components/tool/PrimaryContainer";
import InteractiveBlock from "~/components/tool/InteractiveBlock";
import PrimaryArea from "~/components/form/PrimaryTextArea";

import {decode, encode} from 'xmorse';
import PrimaryIntroduction from "~/components/tool/PrimaryIntroduction";

export default {
  name: "morse-code",
  components: {PrimaryIntroduction, PrimaryArea, InteractiveBlock, PrimaryContainer},
  head() {
    return {
      title: this.$t("tool.morseCode.title") + " - " + this.$t("app.name"),
      meta: [
        {hid: "description", name: "description", content: this.$t("tool.morseCode.desc")},
      ],
    };
  },
  data() {
    return {
      input: "",
      output: "",
      references: [
        {name: '百度百科: 摩尔斯电码', url: 'https://baike.baidu.com/item/%E6%91%A9%E5%B0%94%E6%96%AF%E7%94%B5%E7%A0%81'}
      ]
    };
  },
  methods: {
    encodeMorse() {
      this.output = encode(this.input);
    },
    decodeMorse() {
      this.input = decode(this.output);
    },
  }
}
</script>

<style scoped>

</style>
