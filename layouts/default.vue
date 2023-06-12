<template>
  <div class="flex-col min-h-screen antialiased dark:bg-slate-900 flex">
    <script async src="https://analytics.uniiem.com/script.js"
            data-website-id="6426a9b9-ff68-4701-967a-546d0574b5e4"></script>
    <TopBar ref="topbar" @switchDrawer="switchDrawer"/>
    <div class="container mx-auto p-4 pt-20 overscroll-none"
         :class="{'pt-28': isToolPage(), 'pt-20': !isToolPage()}">
      <Nuxt/>
      <div
        class="fixed md:mt-4 left-0 md:left-auto top-24 right-0 md:right-4 bottom-0 md:bottom-4 md:rounded-lg w-full md:w-64
               bg-gray-50/75 backdrop-blur-md border border-gray-300/75 scroll-smooth z-50
               transition-transform ease-in-out p-2 space-y-2 overflow-hidden overflow-y-scroll
               dark:bg-slate-800/75 dark:border-slate-600/75 duration-600 shadow-xl"
        :class="{'translate-x-0': isDrawerOpen && isToolPage(), 'translate-x-[120%]': !isDrawerOpen || !isToolPage()}">
        <div v-for="(toolkit, k) in $store.state.toolkits"
             :key="k" class="space-y-2">
          <div class="flex flex-row items-center justify-between">
            <div class="flex items-center space-x-1 w-max">
              <Icon :icon="toolkit.icon || 'tabler:archive'" class="text-base dark:text-slate-300"/>
              <h1 class="text-base font-bold font-['Nunito'] dark:text-slate-300 w-fit">{{
                  $t(toolkit.title) || toolkit.title
                }}</h1>
            </div>
            <hr class="pl-2 px-8 dark:border-slate-700"/>
          </div>
          <!-- TODO: 此处列表不显示标签 -->
          <Tool class="border-gray-300"
                :ref="tool.route === wrapI18nPath2MetaRoute(currentPath) ? 'activeMenuItem' : null"
                :class="{'shadow-inner border-sky-500 ring-1 ring-sky-400': tool.route === wrapI18nPath2MetaRoute(currentPath)}"
                v-for="(tool, k) in toolkit.tools.filter(t => !t.disabled)" :key="k" :tool="tool"/>
        </div>
      </div>
    </div>
    <Footer/>
    <!-- Global Search -->
    <div
      class="fixed top-0 left-0 right-0 bottom-0 z-30 flex justify-center items-center
                backdrop-blur-md pointer-events-none opacity-0 backdrop-transparent font-['Nunito'] transition-all duration-500"
      :class="{'bg-white/30 opacity-100 pointer-events-auto': isGlobalSearchOpen}">
      <button
        class="fixed flex justify-center items-center left-10 top-10 px-2 py-1 border-2 border-gray-300 rounded space-x-1"
        @click="isGlobalSearchOpen=false">
        <Icon icon="ion:close-outline" class="text-lg"/>
        <span class="font-['Nunito'] font-bold">ESC</span>
      </button>
      <div class="">
        <PrimaryInput id="global-search-input" key="global-search-input" v-model="globalSearchText"
                      placeholder="Type to search..." class="global-search-input-field" label="Search" autofocus large/>
      </div>
    </div>
    <!-- Release Notes -->
    <div
      class="fixed top-0 left-0 right-0 bottom-0 z-40 flex justify-center items-center
                pointer-events-none opacity-0 font-['Nunito'] transition-all duration-500"
      :class="{'bg-black/10 backdrop-blur-sm opacity-100 pointer-events-auto': releases_dialog}">
      <!-- backdrop-blur-2xl -->
      <div class="w-full h-full md:w-1/2 lg:w-2/3 md:h-2/3 transition-all duration-500 scale-95 opacity-0 ease-in-out
                  border border-slate-300 bg-white shadow-lg rounded-none md:rounded-lg flex flex-col justify-around
                  dark:border-slate-500 dark:bg-slate-800"
           :class="{'scale-100 opacity-100': releases_dialog}">
        <div class="flex justify-between items-center m-4">
          <div>
            <h1 class="flex items-center space-x-1 text-xl dark:text-slate-50">
              <Icon icon="tabler:versions" class="-mt-0.5"/>
              <span class="font-normal">更新日志</span>
            </h1>
            <p class="dark:text-slate-300">距上次使用发布了 {{ releases.length }} 次更新</p>
          </div>
          <div>
            <!-- actions -->
          </div>
        </div>
        <hr class="dark:border-slate-500"/>
        <div class="p-4 h-full overflow-y-scroll">
          <div v-for="(release, i) in releases" :key="i" class="flex flex-col space-y-2 mt-2 first-of-type:mt-0">
            <div class="flex flex-col justify-center">
              <h1 class="text-xl font-extrabold flex items-center space-x-1 dark:text-slate-50">
                <span>{{ release.version }}</span>
                <span v-if="release.title" class="text-sm text-blue-400">@</span>
                <span v-if="release.title" class="font-normal">{{ release.title }}</span>
              </h1>
              <p class="text-sm text-gray-500 flex items-center space-x-1 dark:text-slate-500">
                <Icon icon="tabler:calendar-time" class="-mt-0.5"/>
                <span>{{ new Date(release.timestamp * 1000).toLocaleString() }}</span>
              </p>
            </div>
            <div v-if="release.content" class="pt-2 dark:text-slate-300">
              <p>{{ release.content }}</p>
            </div>
            <div class="flex flex-col space-y-2 pt-2">
              <div v-for="(change, i) in release.changes" :key="i" v-if="release.changes && release.changes.length > 0"
                   class="flex flex-row items-center justify-center space-x-2">
                <div class="w-6 h-6 flex justify-center items-center rounded-full bg-gray-100 dark:bg-slate-700">
                  <Icon :icon="change.type ? release_icon[change.type] : 'tabler:check'"
                        class="text-base dark:text-slate-300"/>
                </div>
                <div class="flex-1 dark:text-slate-300">
                  <p class="text-sm break-all">{{ change.content || '没有更新描述' }}</p>
                </div>
              </div>
            </div>
            <hr class="dark:border-slate-500"/>
          </div>

        </div>
        <hr class="dark:border-slate-500"/>
        <div class="p-4 flex justify-end">
          <button class="flex items-center space-x-1 text-sm font-bold text-gray-500 hover:text-gray-700
                         transition-colors duration-300 dark:text-slate-300 dark:hover:text-slate-50"
                  @click="releaseConfirm">
            <Icon icon="tabler:thumb-up" class="text-lg -mt-0.5"/>
            <span>{{ releaseConfirmButton[Math.floor(Math.random() * releaseConfirmButton.length)] }}</span>
          </button>
        </div>
      </div>
    </div>
    <v-dialog :clickToClose="false" :shiftX="0.5" :shiftY="0.5"></v-dialog>
  </div>
</template>

<script>
import Tool from "~/components/tool/Tool";
import {wrapI18nPath2MetaRoute} from '~/libs/common';

import Mousetrap from 'mousetrap';
import PrimaryInput from "~/components/form/PrimaryInput";
import {Icon} from "@iconify/vue2";

export default {
  name: "index",
  components: {Icon, PrimaryInput, Tool},
  computed: {
    currentAppearance() {
      return this.$store.state.settings.settings.appearance;
    },
    currentPath() {
      return this.$route.path
    },
    isMobile() {
      return this.$device.isMobile;
    }
  },
  data() {
    return {
      toolPageJudgeReg: /^.*\/tools\/.*/,
      isToolPage: () => this.toolPageJudgeReg.test(this.$route.path),
      isDrawerOpen: false,
      isGlobalSearchOpen: false,
      globalSearchText: '',
      release_icon: {
        'add': 'tabler:plus',
        'remove': 'tabler:minus',
        'enchant': 'tabler:rocket',
        'enchanted': 'tabler:rocket',
        'fix': 'tabler:bandage'
      },
      releaseConfirmButton: ['干得漂亮', '资瓷', '好样的', 'Good Job!', 'Nice!', 'Nice Job!'],
      releases: [
        // {
        //   timestamp: 1778496400,
        //   version: '0.0.0',
        //   title: '润了',
        //   content: '我们跑路了',
        //   changes: [
        //     {
        //       type: 'remove',
        //       content: '移除了全部内容'
        //     },
        //     {
        //       type: 'fix',
        //       content: '修复需要维护这个项目的问题'
        //     }
        //   ]
        // },
      ],
      releases_dialog: false,
    }
  },
  mounted: async function () {
    this.setAppearance(this.currentAppearance);
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (this.currentAppearance === 'auto') this.setAppearance(e.matches ? 'dark' : 'light');
    });
    /*
    * Check update
    */
    const workbox = await window.$workbox;
    if (workbox) {
      workbox.addEventListener('installed', (event) => {
        if (event.isUpdate) {
          this.$modal.show('dialog', {
            title: '发现新版本',
            text: '距上次使用以来发布了新的版本，刷新页面来加载新版本',
            buttons: [
              {
                title: '稍后',
                handler: () => {
                  this.$modal.hide('dialog')
                }
              },
              {
                title: '重新加载',
                default: true,
                handler: () => {
                  window.location.reload()
                }
              },
            ]
          });
        } else {
          console.log('No update available');
        }
      });
    } else {
      console.log('Workbox not found');
    }

    // let toast = this.$toasted.show("发现新版本", {
    //   theme: "outline",
    //   position: "top-right",
    //   duration : null,
    //   action : [
    //     {
    //       text : '重新加载',
    //       onClick : (e, toastObject) => {
    //         toastObject.goAway(0);
    //       }
    //     },
    //     {
    //       text : '稍后',
    //       push : {
    //         name : 'somewhere',
    //         dontClose : true
    //       }
    //     }
    //   ]
    // });

    const self = this;
    Mousetrap.bind('shift shift', function () {
      self.isGlobalSearchOpen = !self.isGlobalSearchOpen;
      console.log('double-shift');
    });
    Mousetrap.bind('esc', function () {
      if (self.isGlobalSearchOpen) self.isGlobalSearchOpen = false;
    });

    let easterEggInput = [];
    const handleEasterEgg = () => {
      if (easterEggInput.length === 11) {
        if (easterEggInput.join('') === 'uuddlrlrbae') {
          console.log('todo 😂');
          easterEggInput = [];
        } else {
          easterEggInput.shift();
        }
      }
    }
    Mousetrap.bind('up', function () {
      easterEggInput.push('u');
      handleEasterEgg();
    });
    Mousetrap.bind('down', function () {
      easterEggInput.push('d');
      handleEasterEgg();
    });
    Mousetrap.bind('left', function () {
      easterEggInput.push('l');
      handleEasterEgg();
    });
    Mousetrap.bind('right', function () {
      easterEggInput.push('r');
      handleEasterEgg();
    });
    Mousetrap.bind('b', function () {
      easterEggInput.push('b');
      handleEasterEgg();
    });
    Mousetrap.bind('a', function () {
      easterEggInput.push('a');
      handleEasterEgg();
    });
    Mousetrap.bind('enter', function () {
      easterEggInput.push('e');
      handleEasterEgg();
    });
    this.$api.releases.releases_behind(this.$store.state.settings.latest | 0)
      .then(res => {
        this.releases = res.data.result;
        if (this.releases && this.releases.length > 0) {
          let localVersionTimestamp = this.$store.state.settings.latest;
          if (localVersionTimestamp < this.releases[0].timestamp) {
            this.releases_dialog = true;
            // this.$store.commit('settings/setLatest', this.releases[0].timestamp);
          }
        }
      })
      .catch(err => {
        // pass
      })
  },
  watch: {
    currentAppearance(val) {
      this.setAppearance(val);
    },
    currentPath: function () {
      if (this.isToolPage() === false && this.isDrawerOpen === true) {
        this.switchDrawer(false);
        this.$refs.topbar.isDrawerOpen = false;
      } else if (this.isMobile && this.isToolPage() && this.isDrawerOpen) {
        setTimeout(() => {
          this.switchDrawer(false);
          this.$refs.topbar.isDrawerOpen = false;
        }, 150);
      }
    }
  },
  methods: {
    setAppearance(darkMode) {
      switch (darkMode) {
        case 'auto':
          if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.$el.ownerDocument.documentElement.classList.add('dark');
          } else {
            this.$el.ownerDocument.documentElement.classList.remove('dark');
          }
          break;
        case 'dark':
          this.$el.ownerDocument.documentElement.classList.add('dark');
          break;
        case 'light':
          this.$el.ownerDocument.documentElement.classList.remove('dark');
          break;
      }
    },
    switchDrawer(e) {
      this.isDrawerOpen = e;
      if (this.isDrawerOpen) this.scrollDrawerToActive(300);
    },
    wrapI18nPath2MetaRoute(path) {
      return wrapI18nPath2MetaRoute(path);
    },
    scrollDrawerToActive(delay) {
      setTimeout(() => {
        this.$nextTick(() => {
          this.$refs.activeMenuItem[0].$el.scrollIntoView({
            block: 'start',
          });
        });
      }, delay ? delay : 0);
    },
    releaseConfirm() {
      this.releases_dialog = false;
      this.$store.commit('settings/setLatest', this.releases[0].timestamp);
    },
  },
}
</script>

<style>
/*
Global Styles
*/
.nuxt-progress {
  @apply bg-gray-800 dark:bg-cyan-500;
}

.primary-form {
  @apply bg-transparent rounded lg:px-8 lg:pt-6;
}

::-webkit-scrollbar {
  /*滚动条整体*/
  width: 4px;
  height: 4px;
  border-radius: 5px;
}

::-webkit-scrollbar-track {
  @apply bg-gray-100 dark:bg-slate-700;
}

:hover::-webkit-scrollbar-track {
  /* ignore */
}

::-webkit-scrollbar-thumb {
  /*滚动条里面的滑块*/
  border-radius: 10px;
  @apply bg-gray-300 dark:bg-slate-500;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-400;
}

::-webkit-scrollbar-corner {
  border: none;
  background: transparent;
}

@media (prefers-color-scheme: dark) {
  html[class*="dark"] {
    @apply bg-slate-900;
  }
}

/* transitions */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.page-enter,
.page-leave-to {
  opacity: 0;
  transform: scale(0.99);
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: opacity 0.15s ease-in-out, transform 0.15s ease-in-out;
}

.slide-left-enter {
  opacity: 0;
  transform: translate3d(10px, 0, 0);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translate3d(-10px, 0, 0);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-active {
  opacity: 0;
}
</style>
