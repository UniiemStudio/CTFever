<template>
  <PrimaryContainer>
    <form class="primary-form">
      <InteractiveBlock>
        <PrimaryArea id="input" v-model="input_code" label="BrainFuck"
                     placeholder="BrainFuck Code..."
                     :rows="10" copyable></PrimaryArea>
        <PrimaryInput id="inputs" v-model="arg" :label="$t('common.text_input').toString()"
                      placeholder="Input..."></PrimaryInput>
      </InteractiveBlock>
      <InteractiveBlock>
        <div class="flex overflow-x-auto snap-x gap-4 py-1 snap-mandatory">
          <div v-for="(snip, k) in snippets" :key="k" @click="input_code = snip.code; arg = snip.arg ? snip.arg : ''"
               class="snap-start shrink-0 w-10/12 md:w-8/12 lg:w-4/12 min-h-20 rounded-lg border border-gray-200 shadow
                      bg-white p-2 cursor-pointer
                      dark:bg-slate-800 dark:border-slate-600">
            <h1 class="font-bold mb-1 dark:text-slate-300">{{ snip.title }}</h1>
            <p class="break-all leading-none font-mono dark:text-slate-500">
              {{ snip.code }}
            </p>
          </div>
        </div>
      </InteractiveBlock>
      <InteractiveBlock class="flex items-center justify-between">
        <div class="space-x-1">
          <PrimaryButton type="button" @click="run">{{ $t('common.btn_run') }}</PrimaryButton>
        </div>
        <PrimaryButton type="button" danger @click="input_code = ''; output = '';">
          {{ $t('common.btn_clean') }}
        </PrimaryButton>
      </InteractiveBlock>
      <InteractiveBlock>
        <PrimaryPreBlock label="输出" v-if="output">{{ output }}</PrimaryPreBlock>
      </InteractiveBlock>
    </form>
    <PrimaryIntroduction
      title="BrainFuck" path="intro/brain-fuck"
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
import PrimaryInput from "~/components/form/PrimaryInput";

export default {
  name: "brain-fuck",
  components: {
    PrimaryInput,
    PrimaryIntroduction, PrimaryPreBlock, PrimaryButton, PrimaryArea, InteractiveBlock, PrimaryContainer
  },
  head() {
    return {
      title: this.$t("tool.brainFuck.title") + " - " + this.$t("app.name")
    };
  },
  data() {
    return {
      input_code: "",
      arg: "",
      output: "",
      references: [
        {name: 'Wikipedia: BrainFuck', url: 'https://zh.wikipedia.org/wiki/Brainfuck'},
        {name: '百度百科: BrainFuck', url: 'https://baike.baidu.com/item/Brainfuck'}
      ],
      snippets: [
        {
          title: 'Hello World',
          code: `++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.+++.------.--------.>+.>.`
        },
        {
          title: '冒泡排序',
          code: `>>,[>>,]<<[[<<]>>>>[<<[>+<<+>-]>>[>+<<<<[->]>[<]>>-]<<<[[-]>>[>+<-]>>[<<<+>>>-]]>>[[<+>-]>>]<]<<[>>+<<-]<<]>>>>[.>>]`,
          arg: '57912'
        },
        {
          title: '插入排序',
          code: `>>+>,[<[[>>+<<-]>[<<+<[->>+[<]]>>>[>]<<-]<<<]>>[<<+>>-]<[>+<-]>[>>]<,]<<<[<+<]>[>.>]`,
          arg: '211028'
        },
        {
          title: '0 到 10000 的完全平方数',
          code: `++++[>+++++<-]>[<+++++>-]+<+[>[>+>+<<-]++>>[<<+>>-]>>>[-]++>[-]+>>>+[[-]++++++>>>]<<<[[<++++++++<++>>-]+<.<[>----<-]<]<<[>>>>>[>>>[-]+++++++++<[>-<-]+++++++++>[-[<->-]+[<<<]]<[>+<-]>]<<-]<<-]`
        },
        {
          title: '输出所有 ASCII 字符',
          code: `.+[.+]`
        },
      ]
    };
  },
  methods: {
    run() {
      this.output = 'running...';
      runBrainFuck(this.input_code, this.arg)
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
