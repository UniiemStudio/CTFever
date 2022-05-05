<template>
  <PrimaryContainer>
    <form class="primary-form">
      <InteractiveBlock>
        <PrimaryArea id="input" v-model="input_code" label="JavaScript Code" placeholder="JavaScript code here..."
                     :rows="10"></PrimaryArea>
      </InteractiveBlock>
      <InteractiveBlock class="flex items-center justify-between">
        <div class="space-x-1">
          <PrimaryButton type="button" @click="encode">{{ $t('common.btn_encode').toString() }} ↓</PrimaryButton>
          <a-checkbox v-model:checked="wrapWithEval" class="dark:text-slate-300">用 eval 函数包裹</a-checkbox>
          <!--          <PrimaryButton type="button" @click="decode">解码 ↑</PrimaryButton>-->
        </div>
        <PrimaryButton type="button" danger @click="input_code = ''; output = '';">
          {{ $t('common.btn_clean').toString() }}
        </PrimaryButton>
      </InteractiveBlock>
      <InteractiveBlock>
        <PrimaryArea id="output" v-model="output" label="JSFucked" placeholder="" :rows="10"></PrimaryArea>
      </InteractiveBlock>
    </form>
    <PrimaryIntroduction title="JSFuck" :references="references" :document="intro"/>
  </PrimaryContainer>
</template>

<script>
import PrimaryContainer from "~/components/tool/PrimaryContainer";
import InteractiveBlock from "~/components/tool/InteractiveBlock";
import PrimaryArea from "~/components/form/PrimaryTextArea";
import PrimaryButton from "~/components/form/PrimaryButton";
import PrimaryPreBlock from "~/components/form/PrimaryPreBlock";

import Jsfuck from 'jsfuck';
import PrimaryIntroduction from "~/components/tool/PrimaryIntroduction";

export default {
  name: "jsfuck",
  components: {PrimaryIntroduction, PrimaryPreBlock, PrimaryButton, PrimaryArea, InteractiveBlock, PrimaryContainer},
  head() {
    return {
      title: this.$t("tool.jsFuck.title") + " - " + this.$t("app.name")
    };
  },
  async asyncData({$content}) {
    const intro = await $content('intro/jsfuck').fetch();
    return {
      intro
    }
  },
  data() {
    return {
      input_code: "",
      output: "",
      wrapWithEval: true,
      references: [
        {name: 'Wikipedia: JSFuck', url: 'https://zh.wikipedia.org/wiki/JSFuck'},
        {name: 'JSFuck - Write any JavaScript with 6 Characters: []()!+', url: 'http://www.jsfuck.com/'}
      ]
    };
  },
  methods: {
    encode() {
      this.output = Jsfuck.JSFuck.encode(this.input_code, this.wrapWithEval);
    },
  },
}
</script>

<style scoped>

</style>
