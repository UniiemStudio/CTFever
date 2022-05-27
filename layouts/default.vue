<template>
  <div class="antialiased dark:bg-slate-900">
    <TopBar ref="topbar" @switchDrawer="switchDrawer"/>
    <div class="container mx-auto p-4 pt-20 min-h-screen overscroll-none"
         :class="{'pt-28': isToolPage(), 'pt-20': !isToolPage()}">
      <Nuxt/>
      <div
        class="fixed md:mt-4 left-0 md:left-auto top-24 right-0 md:right-4 bottom-0 md:bottom-4 md:rounded-lg w-full md:w-64
               bg-gray-50/75 backdrop-blur-md border border-gray-300/75
               transition-transform ease-in-out p-2 space-y-2 overflow-y-auto overflow-x-hidden"
        :class="{'translate-x-0': isDrawerOpen && isToolPage(), 'translate-x-[120%]': !isDrawerOpen || !isToolPage()}">
        <div v-for="(toolkit, k) in $store.state.toolkits"
             :key="k" class="space-y-2">
          <h1 class="text-base font-bold font-['Nunito']">{{ $t(toolkit.title) || toolkit.title }}</h1>
          <!-- TODO: 此处列表不显示标签 -->
          <Tool class="border-gray-300"
                :ref="tool.route === wrapI18nPath2MetaRoute(currentPath) ? 'activeMenuItem' : null"
                :class="{'shadow-inner border-gray-500': tool.route === wrapI18nPath2MetaRoute(currentPath)}"
                v-for="(tool, k) in toolkit.tools.filter(t => !t.disabled)" :key="k" :tool="tool"/>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Tool from "~/components/tool/Tool";
import {wrapI18nPath2MetaRoute} from '~/libs/common';

export default {
  name: "index",
  components: {Tool},
  computed: {
    currentAppearance() {
      return this.$store.state.settings.settings.appearance;
    },
    currentPath() {
      return this.$route.path
    },
  },
  data() {
    return {
      toolPageJudgeReg: /^.*\/tools\/.*/,
      isToolPage: () => this.toolPageJudgeReg.test(this.$route.path),
      isDrawerOpen: false,
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
  },
  watch: {
    currentAppearance(val) {
      this.setAppearance(val);
    },
    currentPath() {
      if (this.isToolPage() === false && this.isDrawerOpen === true) {
        this.switchDrawer(false);
        this.$refs.topbar.isDrawerOpen = false;
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
    },
    wrapI18nPath2MetaRoute(path) {
      return wrapI18nPath2MetaRoute(path);
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
