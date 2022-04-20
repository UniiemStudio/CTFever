<template>
  <div>
    <div class="space-y-2">
      <div v-for="(tip, k) in tips" :key="'tip' + k" class="p-4 bg-white rounded-lg border border-gray-200">
        <p class="font-bold mb-2">{{ tip.title }}</p>
        <p class="mb-2">{{ tip.content }}</p>
        <div class="flex flex-col" v-if="tip.references">
          <a v-for="(ref, k) in tip.references" :key="'ref' + k" class="group text-blue-500 w-fit"
             :href="ref.url" target="_blank">
            {{ ref.name }}
            <ion-icon class="align-middle -mt-0.5 transition-transform group-hover:translate-x-1"
                      name="arrow-forward-outline"/>
          </a>
        </div>
      </div>
    </div>
    <div v-for="(toolkit, k) in $store.state.toolkits" :key="k">
      <div class="py-4 text-center md:text-left">
        <h1 class="text-lg font-bold flex flex-col md:flex-row justify-center md:justify-start items-center space-x-1">
          <ion-icon class="text-4xl md:text-xl mb-2 md:mb-0" :name="toolkit.icon || 'albums-outline'"></ion-icon>
          <span class="text-lg">{{ $t(toolkit.title) || toolkit.title }}</span>
          <!-- TODO: Tools count -->
        </h1>
        <p class="text-sm font-thin">{{ $t(toolkit.description) || toolkit.description }}</p>
      </div>
      <div class="my-2 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <Tool v-for="(tool, k) in toolkit.tools" :key="k" :tool="tool"/>
      </div>
    </div>
  </div>
</template>

<script>
import PrimaryIntroduction from "~/components/tool/PrimaryIntroduction";

export default {
  name: 'IndexPage',
  components: {PrimaryIntroduction},
  data() {
    return {
      tips: [
        {
          title: '欢迎来到 CTFever',
          content: '这是为 CTF 发烧者准备的的工具套件，助你过关斩将、攻克难关。第一个版本已经基本完毕，我们目前正在着手高级功能的开发，敬请期待',
          references: [
            {name: 'GitHub Repository', url: 'https://github.com/UniiemStudio/CTFever'}
          ]
        },
        {
          title: '招募翻译',
          content: '我们正在招募 i18n 团队，没有薪资，问就是学生，没钱。',
          references: [
            {name: 'Telegram 群组', url: 'https://t.me/boxmoe'}
          ]
        },
      ]
    }
  }
}
</script>
