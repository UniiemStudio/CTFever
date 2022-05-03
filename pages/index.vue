<template>
  <div>
    <div class="space-y-2">
      <div v-for="(tip, k) in tips" :key="'tip' + k"
           class="p-4 bg-transparent rounded-lg border border-gray-200 dark:border-slate-500">
        <p class="font-bold mb-2 dark:text-slate-300">{{ $t(tip.title) }}</p>
        <p class="mb-2 dark:text-slate-500">{{ $t(tip.content) }}</p>
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

    <div v-if="favoriteTools.length > 0" class="py-4 text-center md:text-left">
      <h1 class="text-lg font-bold flex flex-col md:flex-row justify-center md:justify-start items-center space-x-1
                dark:text-slate-300">
        <ion-icon class="text-4xl md:text-xl mb-2 md:mb-0" :name="'albums-outline'"></ion-icon>
        <span class="text-lg">{{ $t('page.home.favoriteKit.title') }}</span>
      </h1>
      <p class="text-sm font-thin dark:text-slate-500">{{ $t('page.home.favoriteKit.desc') }}</p>
    </div>
    <div class="my-2 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <Tool v-for="(tool, k) in favoriteTools" :key="k" :tool="tool"/>
    </div>

    <div v-for="(toolkit, k) in $store.state.toolkits" :key="k">
      <div class="py-4 text-center md:text-left">
        <h1 class="text-lg font-bold flex flex-col md:flex-row justify-center md:justify-start items-center space-x-1
                dark:text-slate-300">
          <ion-icon class="text-4xl md:text-xl mb-2 md:mb-0" :name="toolkit.icon || 'albums-outline'"></ion-icon>
          <span class="text-lg">{{ $t(toolkit.title) || toolkit.title }}</span>
          <!-- TODO: Tools count -->
        </h1>
        <p class="text-sm font-thin dark:text-slate-500">{{ $t(toolkit.description) || toolkit.description }}</p>
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
  computed: {
    favoriteTools() {
      let tools = [];
      this.$store.state.settings.favoriteTools.forEach(favoriteTool => {
        tools.push(this.getToolByRoute(favoriteTool.route));
      })
      return tools;
    },
  },
  methods: {
    getToolByRoute(route) {
      let tools = [];
      this.$store.state.toolkits.forEach(toolkit => tools.push(toolkit.tools.filter(t => t.route === route)));
      return tools.filter(t => t.length > 0)[0][0];
    },
  },
  data() {
    return {
      tips: [
        {
          title: 'app.tip.title',
          content: 'app.tip.content',
          references: [
            {name: 'GitHub Repository', url: 'https://github.com/UniiemStudio/CTFever'},
            {name: 'Telegram', url: 'https://t.me/boxmoe'}
          ]
        },
      ]
    }
  }
}
</script>
