<template>
  <div>
    <div class="space-y-2">
      <div v-for="(tip, k) in tips" :key="'tip' + k"
           class="p-4 bg-transparent rounded-lg border border-gray-200 dark:border-slate-500">
        <p class="font-extrabold mb-2 dark:text-slate-300 font-['Nunito']">{{ $t(tip.title) }}</p>
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
                dark:text-slate-300 font-['Nunito']">
        <ion-icon class="text-4xl md:text-xl mb-2 md:mb-0" :name="'search-outline'"></ion-icon>
        <span class="text-lg font-thin"
              v-html="$t('common.text_search_result').toString().replace('{}', searchText)"
        ></span>
      </h1>
    </div>
    <div class="grid gap-4 grid-cols-1 -mt-2">
      <PrimaryInput id="search-input" key="search-input" :placeholder="`${$t('common.text_search').toString()}...`"
                    class="search-input" v-model="searchText"/>
    </div>
    <div v-if="searchText" class="mt-6 my-2 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <Tool v-for="(tool, k) in searchResult" :key="k" :tool="tool"/>
    </div>
    <!--  /Search  -->

    <!--  Favorites  -->
    <div v-if="favoriteTools.length > 0 && !searchText" class="py-4 text-center md:text-left">
      <h1 class="text-lg font-bold flex flex-col md:flex-row justify-center md:justify-start items-center space-x-1
                dark:text-slate-300 font-['Nunito']">
        <ion-icon class="text-4xl md:text-xl mb-2 md:mb-0" :name="'albums-outline'"></ion-icon>
        <span class="text-lg">{{ $t('page.home.favoriteKit.title') }}</span>
      </h1>
      <p class="text-sm font-thin font-['Nunito'] dark:text-slate-500">{{ $t('page.home.favoriteKit.desc') }}</p>
    </div>
    <TransitionGroup tag="div" name="fav-drag" v-if="!searchText"
                     class="my-2 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <div v-for="(tool, k) in favoriteTools" :key="k" class="inline-block"
           @dragenter="dragenter($event, k)"
           @dragover="dragover($event, k)"
           @dragstart="dragstart($event, k)"
           @dragend="dragend($event, k)"
           draggable="true">
        <Tool :tool="tool" :draggable="false"/>
      </div>
    </TransitionGroup>
    <!--  /Favorites  -->

    <!--  Tool Lists  -->
    <div v-if="!searchText" v-for="(toolkit, k) in $store.state.toolkits" :key="k">
      <div class="py-4 text-center md:text-left">
        <h1 class="text-lg font-bold flex flex-col md:flex-row justify-center md:justify-start items-center space-x-1
                dark:text-slate-300 font-['Nunito']">
          <ion-icon class="text-4xl md:text-xl mb-2 md:mb-0" :name="toolkit.icon || 'albums-outline'"></ion-icon>
          <span class="text-lg">{{ $t(toolkit.title) || toolkit.title }}</span>
          <!-- TODO: Tools count -->
        </h1>
        <p class="text-sm font-thin font-['Nunito'] dark:text-slate-500">
          {{ $t(toolkit.description) || toolkit.description }}</p>
      </div>
      <div class="my-2 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <Tool v-for="(tool, k) in toolkit.tools" :key="k" :tool="tool"/>
      </div>
    </div>
    <!--  /Tool Lists  -->

    <!-- 图例 -->
    <div class="px-2 py-4 text-xs flex flex-row space-x-6 justify-around md:justify-start">
      <div class="flex flex-row items-center space-x-2">
        <BadgeDot class="-mt-1.5" warn/>
        <span class="dark:text-slate-500 font-['Nunito']">{{ $t('common.badge.premium') }}</span>
      </div>
      <div class="flex flex-row items-center space-x-2">
        <BadgeDot class="-mt-1.5" info/>
        <span class="dark:text-slate-500 font-['Nunito']">{{ $t('common.badge.newest') }}</span>
      </div>
      <div class="flex flex-row items-center space-x-2">
        <BadgeDot class="-mt-1.5" ping success/>
        <span class="dark:text-slate-500 font-['Nunito']">{{ $t('common.badge.recommended') }}</span>
      </div>
      <div class="flex flex-row items-center space-x-2">
        <span
          class="badge-beta">BETA</span>
        <span class="dark:text-slate-500 font-['Nunito']">{{ $t('common.badge.beta') }}</span>
      </div>
    </div>
    <!-- /图例 -->
  </div>
</template>

<script>
import PrimaryIntroduction from "~/components/tool/PrimaryIntroduction";
import PrimaryInput from "~/components/form/PrimaryInput";
import BadgeDot from "~/components/tool/BadgeDot";
import Tool from "~/components/tool/Tool";

import {debounce} from 'lodash';

import {getToolByRoute} from '~/libs/common';

export default {
  name: 'IndexPage',
  components: {Tool, BadgeDot, PrimaryInput, PrimaryIntroduction},
  computed: {
    favoriteTools: {
      get() {
        let tools = [];
        this.$store.state.settings.markedTool.forEach(favoriteTool => {
          tools.push(getToolByRoute(favoriteTool.route));
        })
        return tools;
      },
      set(v) {
        this.$store.commit('settings/setMarkedTools', v);
      }
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
      dragIndex: null,
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
        this.searchAnalytics();
      }
    }
  },
  methods: {
    searchAnalytics: debounce(function (keyword, count) {
      console.log('debounce #1');
    }, 1500),
    dragstart(e, i) {
      this.dragIndex = i;
      e.target.firstChild.classList.add('anti-hover');
    },
    dragenter(e, i) {
      e.preventDefault();
      if (this.dragIndex !== i) {
        let origin = this.favoriteTools;
        const source = origin[this.dragIndex];
        origin.splice(this.dragIndex, 1);
        origin.splice(i, 0, source);
        this.$nextTick(() => this.favoriteTools = origin);
        this.dragIndex = i;
      }
    },
    dragover(e, i) {
      e.preventDefault();
    },
    dragend(e, i) {
      e.target.firstChild.classList.remove('anti-hover');
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

.badge-beta {
  @apply text-xs border border-gray-400 text-gray-400 dark:border-slate-400 dark:text-slate-400 font-bold shadow-inner rounded px-0.5 py-0 font-['Nunito'];
}

.fav-drag-move {
  transition: transform 0.3s ease-in-out;
}
</style>
