<template>
  <PrimaryContainer>
    <form class="primary-form">
      <InteractiveBlock>
        <PrimaryArea label="输入" v-model="input" id="input"/>
      </InteractiveBlock>
      <InteractiveDoubleColumns>
        <template v-slot:left>
          <PrimaryInput id="offset" label="偏移量" v-model="offset" type="number" min="1" max="26"/>
        </template>
        <template v-slot:right>
          <PrimarySelector id="mode" label="模式" v-model="mode" :options="modeOptions"/>
        </template>
      </InteractiveDoubleColumns>
      <InteractiveBlock class="flex items-center justify-between">
        <div class="space-x-1">
          <PrimaryButton type="button" @click="exec">执行</PrimaryButton>
        </div>
        <PrimaryButton type="button" danger @click="input = ''; output = '';">清空</PrimaryButton>
      </InteractiveBlock>
      <InteractiveBlock>
        <PrimaryArea label="输出" v-model="output" id="output"/>
      </InteractiveBlock>
    </form>
    <PrimaryIntroduction title="凯撒密码" :document="intro" :references="references"/>
  </PrimaryContainer>
</template>

<script>
import PrimaryContainer from "~/components/tool/PrimaryContainer";
import InteractiveBlock from "~/components/tool/InteractiveBlock";
import PrimaryInput from "~/components/form/PrimaryInput";
import PrimaryArea from "~/components/form/PrimaryTextArea";
import InteractiveDoubleColumns from "~/components/tool/InteractiveDoubleColumns";
import PrimarySelector from "~/components/form/PrimarySelector";
import PrimaryButton from "~/components/form/PrimaryButton";

import ceasarCipher from '~/libs/ceasarCipher';
import PrimaryIntroduction from "~/components/tool/PrimaryIntroduction";

export default {
  name: "caesar-cipher",
  components: {
    PrimaryIntroduction,
    PrimaryButton,
    PrimarySelector,
    InteractiveDoubleColumns,
    PrimaryArea,
    PrimaryInput,
    InteractiveBlock,
    PrimaryContainer
  },
  head() {
    return {
      title: this.$t("tool.caesarCipher.title") + " - " + this.$t("app.name")
    };
  },
  async asyncData({$content}) {
    const intro = await $content(`intro/ceasar-cipher`).fetch();
    return {
      intro
    }
  },
  data() {
    return {
      input: "",
      output: "",
      offset: 3,
      mode: "encode",
      modeOptions: [
        {
          label: "加密",
          value: "encode"
        },
        {
          label: "解密",
          value: "decode"
        }
      ],
      references: [
        {
          name: "Wikipedia: 凯撒密码",
          url: "https://zh.wikipedia.org/wiki/%E5%87%AF%E6%92%92%E5%AF%86%E7%A0%81"
        }
      ]
    }
  },
  methods: {
    exec() {
      this.output = this.mode === "encode" ? ceasarCipher.encode(this.input, this.offset) : ceasarCipher.decode(this.input, this.offset);
    }
  },
  watch: {
    offset: {
      handler(val) {
        this.$nextTick(() => {
          if (val < 1) {
            this.$data.offset = 1;
          }
          if (val > 25) {
            this.$data.offset = 25;
          }
        });
      }
    }
  }
}
</script>

<style scoped>

</style>
