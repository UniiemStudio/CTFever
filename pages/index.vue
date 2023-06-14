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
            <Icon icon="ion:arrow-forward-outline"
                  class="inline -mt-0.5 transition-transform group-hover:translate-x-1"/>
          </a>
        </div>
      </div>
    </div>

    <!--  Search  -->
    <div class="text-center md:text-left search-tip" :class="{'show': searchText}">
      <h1 class="text-lg font-bold flex flex-col md:flex-row justify-center md:justify-start items-center space-x-1
                dark:text-slate-300 font-['Nunito']">
        <Icon v-if="searchText" icon="line-md:search-twotone" class="text-4xl md:text-2xl mb-2 md:mb-0"
              h-flip="true"/>
        <span class="text-lg font-medium"
              v-html="$t('common.text_search_result').toString().replace('{}', searchText)"
        ></span>
      </h1>
    </div>
    <div v-if="isMobile" class="mt-6">
      <div class="grid gap-4 grid-cols-1">
        <UniInput :placeholder="`${$t('common.text_search').toString()}`" ref="searchInput"
                  class="search-input" input-class="py-3 px-3" v-model="searchText" hotkey="ctrl+k"/>
      </div>
    </div>
    <div v-if="searchText"
         class="mt-6 md:mt-0 my-2 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <Tool v-for="(tool, k) in searchResult" :key="k" :tool="tool"
            @contextmenu.prevent.native="handleRightClick($event, tool)"/>
    </div>
    <div v-if="searchText && searchResult.length <= 0"
         class="w-full flex flex-col justify-center items-center rounded-lg bg-slate-100 dark:bg-slate-800 dark:text-slate-500 p-4">
      <Icon icon="line-md:question-circle" class="text-4xl"/>
      <p class="text-base mt-2">没有相关结果</p>
    </div>
    <!--  /Search  -->

    <!--  Favorites  -->
    <div v-if="favoriteTools.length > 0 && !searchText" class="py-4 text-center md:text-left mt-0 md:mt-4">
      <h1 class="text-lg font-bold flex flex-col md:flex-row justify-center md:justify-start items-center space-x-1
                dark:text-slate-300 font-['Nunito']">
        <Icon icon="tabler:bookmarks" class="text-4xl md:text-xl mb-2 md:mb-0"/>
        <span class="text-lg">{{ $t('page.home.favoriteKit.title') }}</span>
      </h1>
      <p class="text-sm font-normal font-['Nunito'] dark:text-slate-500">{{ $t('page.home.favoriteKit.desc') }}</p>
    </div>
    <TransitionGroup tag="div" name="fav-drag" v-if="!searchText"
                     class="mb-2 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <div v-for="(tool, k) in favoriteTools" :key="k" class="inline-block"
           @dragenter="dragenter($event, k)"
           @dragover="dragover($event, k)"
           @dragstart="dragstart($event, k)"
           @dragend="dragend($event, k)"
           draggable="true">
        <Tool :tool="tool" :draggable="false" @contextmenu.prevent.native="handleRightClick($event, tool)"/>
      </div>
    </TransitionGroup>
    <!--  /Favorites  -->

    <!--  Tool Lists  -->
    <div v-if="!searchText" v-for="(toolkit, k) in $store.state.toolkits" :key="k">
      <div class="py-4 text-center md:text-left mt-0 md:mt-4">
        <h1 class="text-lg font-bold flex flex-col md:flex-row justify-center md:justify-start items-center space-x-1
                dark:text-slate-300 font-['Nunito']">
          <Icon :icon="toolkit.icon || 'tabler:archive'" class="text-4xl md:text-xl mb-2 md:mb-0"/>
          <span class="text-lg">{{ $t(toolkit.title) || toolkit.title }}</span>
          <!-- TODO: Tools count -->
        </h1>
        <p class="text-sm font-normal font-['Nunito'] dark:text-slate-500">
          {{ $t(toolkit.description) || toolkit.description }}</p>
      </div>
      <div class="mb-2 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <Tool v-for="(tool, k) in toolkit.tools" :key="k" :tool="tool"
              @contextmenu.prevent.native="handleRightClick($event, tool)"/>
      </div>
    </div>
    <!--  /Tool Lists  -->

    <!-- 图例 -->
    <div class="px-2 py-4 text-xs flex flex-row flex-wrap gap-x-4 gap-y-2 justify-start">
      <div class="flex flex-row items-center space-x-1">
        <BadgeDot warn/>
        <span class="dark:text-slate-500 font-['Nunito']">{{ $t('common.badge.premium') }}</span>
      </div>
      <div class="flex flex-row items-center space-x-1">
        <BadgeDot info/>
        <span class="dark:text-slate-500 font-['Nunito']">{{ $t('common.badge.newest') }}</span>
      </div>
      <div class="flex flex-row items-center space-x-1">
        <BadgeDot ping success/>
        <span class="dark:text-slate-500 font-['Nunito']">{{ $t('common.badge.recommended') }}</span>
      </div>
      <div class="flex flex-row items-center space-x-1">
        <span class="badge-beta">BETA</span>
        <span class="dark:text-slate-500 font-['Nunito']">{{ $t('common.badge.beta') }}</span>
      </div>
      <div class="flex flex-row items-center space-x-1">
        <div class="badge-warning-line"></div>
        <span class="dark:text-slate-500 font-['Nunito']">监修中</span>
      </div>
    </div>
    <!-- /图例 -->

    <!-- 上下文菜单 -->
    <div class="fixed p-1 rounded-lg shadow-lg bg-white/80 dark:bg-slate-700/80 dark:text-slate-400 transition-opacity opacity-0
                flex flex-col border border-slate-300 dark:border-slate-600 pointer-events-none backdrop-blur-md"
         style="z-index: 999; min-width: 160px;" :class="{'opacity-100 pointer-events-auto': contextMenu.show}"
         :style="{'top': `${contextMenu.position.y}px`, 'left': `${contextMenu.position.x}px`}">
      <div class="flex flex-row items-center p-2 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer
                  transition-colors duration-300"
           @click="handleContextMenuClick('open')">
        <Icon icon="tabler:external-link" class="text-xl"/>
        <span class="ml-2">{{ $t('context_menu.external_link') }}</span>
      </div>
      <div class="mx-2 my-0.5 h-[1px] bg-gray-200 dark:bg-slate-600"></div>
      <div class="flex flex-row items-center p-2 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer
                  transition-colors duration-500"
           @click="handleContextMenuClick('favorite')">
        <Icon :icon="contextMenu.favorite ? 'tabler:star-filled' : 'tabler:star'" class="text-xl"/>
        <span class="ml-2">
          {{ contextMenu.favorite ? $t('context_menu.mark_remove') : $t('context_menu.mark_add') }}
        </span>
      </div>
      <div class="flex flex-row items-center p-2 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer
                  transition-colors duration-500"
           @click="handleContextMenuClick('copy')">
        <Icon icon="tabler:link" class="text-xl"/>
        <span class="ml-2">{{ $t('context_menu.copy') }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import PrimaryIntroduction from "~/components/tool/PrimaryIntroduction";
import PrimaryInput from "~/components/form/PrimaryInput";
import BadgeDot from "~/components/tool/BadgeDot";
import Tool from "~/components/tool/Tool";

import {debounce} from 'lodash';

import {copyTextToClipboard, getToolByRoute} from '~/libs/common';
import {Icon} from "@iconify/vue2";

export default {
  name: 'IndexPage',
  components: {Icon, Tool, BadgeDot, PrimaryInput, PrimaryIntroduction},
  head() {
    return {
      meta: [
        {
          hid: "description",
          name: "description",
          content: '免费的超赞 CTF 工具箱。为所有人准备的工具箱，包含pyc反编译、binwalk、端口扫描、Zip伪加密检测，以及多种加密、编码、Json编辑器和各种实用工具。'
        },
      ],
    }
  },
  computed: {
    isMobile() {
      return this.$device.isMobile;
    },
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
    queryText() {
      return (this.$route.query && this.$route.query.q) || '';
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
      contextMenu: {
        show: false,
        route: null,
        favorite: false,
        tool: null,
        position: {
          x: 0,
          y: 0
        }
      },
      searchText: '',
      searchResult: [],
      dragIndex: null,
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.searchText = this.queryText;
    });
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
        this.searchAnalytics(search, results.length);
      }
    },
    queryText(val) {
      this.searchText = val;
    },
    contextMenu: {
      handler: function (val) {
        if (val.show) {
          this.$nextTick(() => {
            document.body.addEventListener("click", this.closeContextMenu);
          })
        } else {
          document.body.removeEventListener("click", this.closeContextMenu);
        }
      },
      deep: true
    }
  },
  methods: {
    searchAnalytics: debounce(function (keyword, count) {
      console.log(`Search: ${keyword} (${count})`);
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
    },
    handleRightClick(e, tool) {
      e.preventDefault();
      if (this.contextMenu.show) this.contextMenu.show = false;
      this.contextMenu.show = true;
      this.contextMenu.tool = tool;
      this.contextMenu.favorite = this.favoriteTools.some(favoriteTool => favoriteTool.route === tool.route);
      this.contextMenu.position.x = e.clientX;
      this.contextMenu.position.y = e.clientY;
    },
    handleContextMenuClick(type) {
      switch (type) {
        case 'open':
          window.open(this.contextMenu.tool.route, '_blank')
          break;
        case 'favorite':
          this.$store.commit('settings/markToolByRoute', {
            route: this.contextMenu.tool.route,
            mark: !this.contextMenu.favorite
          });
          this.$message.success(
            !this.contextMenu.favorite ?
              this.$t('action.marked').toString() :
              this.$t('action.unmarked').toString()
          );
          break;
        case 'copy':
          copyTextToClipboard(window.location.origin + this.contextMenu.tool.route);
          this.$message.success(this.$t('action.copied').toString());
          break;
      }
      this.contextMenu.show = false;
    },
    closeContextMenu(e) {
      e.preventDefault();
      this.contextMenu.show = false;
    }
  },
}
</script>

<style>
.search-tip {
  @apply h-0 scale-y-0 overflow-hidden opacity-0 transition-all duration-300 ease-in-out;
}

.search-tip.show {
  @apply h-auto opacity-100 scale-y-100 py-4;
}

.badge-beta {
  @apply text-xs border border-gray-400 text-gray-400 dark:border-slate-400 dark:text-slate-400 font-bold shadow-inner rounded px-0.5 py-0 font-['Nunito'];
}

.badge-warning-line {
  @apply border border-gray-400 text-gray-400 dark:border-slate-400 dark:text-slate-400 font-bold shadow-inner rounded w-8 h-4;
  background: repeating-linear-gradient(
    45deg,
    rgba(255, 204, 0, .3),
    rgba(255, 204, 0, .3) 5px,
    rgba(0, 0, 0, .3) 5px,
    rgba(0, 0, 0, .3) 10px,
    rgba(255, 204, 0, .3) 10px
  );
}

.fav-drag-move {
  transition: transform 0.3s ease-in-out;
}
</style>
