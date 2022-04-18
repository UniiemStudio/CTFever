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
        <!--        <PrimaryArea id="output" v-model="output" label="输出" placeholder="Output..." :rows="10" disable></PrimaryArea>-->
        <PrimaryPreBlock label="输出" v-if="output">{{ output }}</PrimaryPreBlock>
      </InteractiveBlock>
    </form>
  </PrimaryContainer>
</template>

<script>
import PrimaryContainer from "~/components/tool/PrimaryContainer";
import InteractiveBlock from "~/components/tool/InteractiveBlock";
import PrimaryArea from "~/components/form/PrimaryTextArea";
import PrimaryButton from "~/components/form/PrimaryButton";
import PrimaryPreBlock from "~/components/form/PrimaryPreBlock";

import runBrainFuck from '~/libs/brainfuck';

export default {
  name: "brain-fuck",
  components: {PrimaryPreBlock, PrimaryButton, PrimaryArea, InteractiveBlock, PrimaryContainer},
  data() {
    return {
      input_code: "",
      output: "",
    };
  },
  methods: {
    run() {
      this.output = runBrainFuck(this.input_code);
    },
  },
}
</script>

<style scoped>

</style>
