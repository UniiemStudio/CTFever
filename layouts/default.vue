<template>
  <div class="antialiased dark:bg-slate-900">
    <TopBar ref="topbar" @switchDrawer="switchDrawer"/>
    <div class="container mx-auto p-4 pt-20 min-h-screen overscroll-none"
         :class="{'pt-28': isToolPage(), 'pt-20': !isToolPage()}">
      <Nuxt/>
      <div
        class="fixed md:mt-4 left-0 md:left-auto top-24 right-0 md:right-4 bottom-0 md:bottom-4 md:rounded-lg w-full md:w-64
               bg-gray-50/75 backdrop-blur-md border border-gray-300/75 scroll-smooth z-50
               transition-transform ease-in-out p-2 space-y-2 overflow-y-auto overflow-x-hidden
               dark:bg-slate-800/75 dark:border-slate-600/75 duration-600"
        :class="{'translate-x-0': isDrawerOpen && isToolPage(), 'translate-x-[120%]': !isDrawerOpen || !isToolPage()}">
        <div v-for="(toolkit, k) in $store.state.toolkits"
             :key="k" class="space-y-2">
          <div class="flex flex-row items-center justify-between">
            <div class="flex items-center space-x-1 w-max">
              <ion-icon class="text-base dark:text-slate-300" :name="toolkit.icon || 'albums-outline'"></ion-icon>
              <h1 class="text-base font-bold font-['Nunito'] dark:text-slate-300 w-fit">{{
                  $t(toolkit.title) || toolkit.title
                }}</h1>
            </div>
            <hr class="pl-2 px-8 dark:border-slate-700"/>
          </div>
          <!-- TODO: 此处列表不显示标签 -->
          <Tool class="border-gray-300"
                :ref="tool.route === wrapI18nPath2MetaRoute(currentPath) ? 'activeMenuItem' : null"
                :class="{'shadow-inner border-gray-600': tool.route === wrapI18nPath2MetaRoute(currentPath)}"
                v-for="(tool, k) in toolkit.tools.filter(t => !t.disabled)" :key="k" :tool="tool"/>
        </div>
      </div>
    </div>
    <Footer/>
    <!-- Global Search -->
    <div
      class="fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center
                backdrop-blur-md pointer-events-none opacity-0 backdrop-transparent font-['Nunito'] transition-all duration-500"
      :class="{'bg-white/30 opacity-100 pointer-events-auto': isGlobalSearchOpen}">
      <div class="">
        <PrimaryInput id="global-search-input" key="global-search-input" v-model="globalSearchText"
                      placeholder="Type to search..." class="global-search-input-field" label="Search" autofocus large/>
      </div>
    </div>

  </div>
</template>

<script>
import Tool from "~/components/tool/Tool";
import {wrapI18nPath2MetaRoute} from '~/libs/common';

import Mousetrap from 'mousetrap';
import PrimaryInput from "~/components/form/PrimaryInput";

export default {
  name: "index",
  components: {PrimaryInput, Tool},
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
    }
  },
  async mounted() {
    this.setAppearance(this.currentAppearance);
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (this.currentAppearance === 'auto') this.setAppearance(e.matches ? 'dark' : 'light');
    });
    /*
    * Check update
    */
    const workbox = await window.$workbox;
    if (workbox) {
      workbox.addEventListener('activating', (event) => {
        if (event.isUpdate) {
          console.log('New version available');
        } else {
          console.log('No update available');
        }
      });
    } else {
      console.log('Workbox not found');
    }

    const self = this;
    Mousetrap.bind('shift shift', function () {
      self.isGlobalSearchOpen = !self.isGlobalSearchOpen;
      console.log('double-shift');
    });
    Mousetrap.bind('up up down down left right left right b a enter', function () {
      console.log('todo 😂');
    });
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
    }
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
