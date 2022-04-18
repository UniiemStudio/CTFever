<template>
  <PrimaryContainer>
    <form class="primary-form">
      <InteractiveBlock>
        <PrimaryArea id="input" v-model="input_code" label="BrainFuck" placeholder="BrainFuck Code..."
                     :rows="10"></PrimaryArea>
      </InteractiveBlock>
      <InteractiveBlock class="flex items-center justify-between">
        <div class="space-x-1">
          <PrimaryButton type="button" @click="run">RUN</PrimaryButton>
        </div>
        <PrimaryButton type="button" danger @click="input_code = ''; output = '';">清空</PrimaryButton>
      </InteractiveBlock>
      <InteractiveBlock>
        <PrimaryPreBlock label="输出" v-if="output">{{ output }}</PrimaryPreBlock>
      </InteractiveBlock>
    </form>
    <PrimaryIntroduction
      title="BrainFuck" :document="intro"
      :references="references">
    </PrimaryIntroduction>
  </PrimaryContainer>
</template>

<script>
import PrimaryContainer from "~/components/tool/PrimaryContainer";
import InteractiveBlock from "~/components/tool/InteractiveBlock";
import PrimaryArea from "~/components/form/PrimaryTextArea";
import PrimaryButton from "~/components/form/PrimaryButton";
import PrimaryPreBlock from "~/components/form/PrimaryPreBlock";

import runBrainFuck from '~/libs/brainfuck';
import PrimaryIntroduction from "~/components/tool/PrimaryIntroduction";

export default {
  name: "brain-fuck",
  components: {PrimaryIntroduction, PrimaryPreBlock, PrimaryButton, PrimaryArea, InteractiveBlock, PrimaryContainer},
  data() {
    return {
      input_code: "",
      output: "",
      references: [
        {name: 'Wikipedia: BrainFuck', url: 'https://zh.wikipedia.org/wiki/Brainfuck'},
        {name: '百度百科: BrainFuck', url: 'https://baike.baidu.com/item/Brainfuck'}
      ],
    };
  },
  async asyncData({$content}) {
    const intro = await $content('intro/brain-fuck').fetch();
    return {
      intro
    }
  },
  methods: {
    run() {
      runBrainFuck(this.input_code)
        .then(res => {
          this.output = res;
        })
        .catch(err => {
          this.output = err;
        });
    },
  },
}
</script>

<style scoped>

</style>
