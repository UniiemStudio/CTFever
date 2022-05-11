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

    <!--  Search  -->
    <div class="py-4 text-center md:text-left search-tip" :class="{'show': searchText}">
      <h1 class="text-lg font-bold flex flex-col md:flex-row justify-center md:justify-start items-center space-x-1
                dark:text-slate-300">
        <ion-icon class="text-4xl md:text-xl mb-2 md:mb-0" :name="'search-outline'"></ion-icon>
        <span class="text-lg font-thin"><span class="font-bold">"{{ searchText }}"</span> 的搜索结果</span>
      </h1>
    </div>
    <div class="grid gap-4 grid-cols-1 -mt-2">
      <PrimaryInput id="search-input" key="search-input" placeholder="搜索..." class="search-input" v-model="searchText"/>
    </div>
    <div v-if="searchText" class="mt-6 my-2 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <Tool v-for="(tool, k) in searchResult" :key="k" :tool="tool"/>
    </div>
    <!--  /Search  -->

    <div v-if="favoriteTools.length > 0 && !searchText" class="py-4 text-center md:text-left">
      <h1 class="text-lg font-bold flex flex-col md:flex-row justify-center md:justify-start items-center space-x-1
                dark:text-slate-300">
        <ion-icon class="text-4xl md:text-xl mb-2 md:mb-0" :name="'albums-outline'"></ion-icon>
        <span class="text-lg">{{ $t('page.home.favoriteKit.title') }}</span>
      </h1>
      <p class="text-sm font-thin dark:text-slate-500">{{ $t('page.home.favoriteKit.desc') }}</p>
    </div>
    <div v-if="!searchText" class="my-2 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <Tool v-for="(tool, k) in favoriteTools" :key="k" :tool="tool"/>
    </div>

    <div v-if="!searchText" v-for="(toolkit, k) in $store.state.toolkits" :key="k">
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
import PrimaryInput from "~/components/form/PrimaryInput";

export default {
  name: 'IndexPage',
  components: {PrimaryInput, PrimaryIntroduction},
  computed: {
    favoriteTools() {
      let tools = [];
      this.$store.state.settings.markedTool.forEach(favoriteTool => {
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
      ],
      searchText: '',
      searchResult: [],
    }
  },
  watch: {
    searchText(search) {
      if (search.length > 0) {
        let self = this;
        let retArray = [];
        let results = [];
        this.$store.state.toolkits.forEach(toolkit =>
          retArray.push(toolkit.tools.filter(function (t) {
              return self.$t(t.title).toLowerCase().includes(search.toLowerCase())
                || self.$t(t.description).toLowerCase().includes(search.toLowerCase());
            })
          )
        );
        retArray.filter(t => t.length > 0).forEach(t => results.push(...t));
        this.searchResult = results;
      }
    }
  }
}
</script>

<style>
.search-input > * > input {
  @apply py-3 px-3;
}

.search-tip {
  @apply h-0 opacity-0 scale-y-0 overflow-hidden opacity-0 transition-all duration-300 ease-in-out;
}

.search-tip.show {
  @apply h-auto opacity-100 scale-y-100 opacity-100 mb-2;
}
</style>
