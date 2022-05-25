<template>
  <div>
    <div
      class="fixed z-20 top-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md transition-shadow flex flex-col items-center h-16"
      :class="{'shadow dark:shadow-slate-800/50 hover:shadow-md': !isToolPage()}"
    >
      <div class="w-full h-16 px-4 container flex justify-between items-center">
        <div>
          <nuxt-link :to="localePath('/')" class="text-lg dark:text-slate-200">
            <div class="w-fit h-full flex flex-row items-center space-x-2.5 ml-1">
              <img src="/icon.svg" class="w-6 h-6" alt="CTFever Logo">
              <span
                :class="{'subtitle-show': isToolPage(), 'cursor-default pointer-events-none': !isToolPage()}"
                class="font-thin cursor-pointer pointer-events-auto transition duration-500 translate-x-2 opacity-0">{{
                  currentToolName
                }}</span>
            </div>
          </nuxt-link>
        </div>
        <div class="space-x-2 dark:text-slate-300">
          <TinyButtonLink v-if="pwaAvailable" @click="installPWA()" class="group">
            <ion-icon class="text-base translate-y-[2px]" name="download-outline"></ion-icon>
            <span>安装 PWA</span>
          </TinyButtonLink>
          <a-dropdown :trigger="['hover']" placement="bottomRight">
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
              <ion-icon class="align-middle text-lg -mt-1" name="language-outline"></ion-icon>
            </a>
            <a-menu slot="overlay" class="dark:bg-slate-800">
              <a-menu-item v-for="(locale, k) in availableLocales" :key="k">
                <nuxt-link
                  class="px-2 py-px"
                  :key="locale.code"
                  :to="switchLocalePath(locale.code)">{{ locale.name }}
                </nuxt-link>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
          <a-dropdown :trigger="['hover']" placement="bottomRight">
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
              <ion-icon class="align-middle text-base -mt-1"
                        :name="currentAppearanceIcon"></ion-icon>
            </a>
            <a-menu slot="overlay" class="dark:bg-slate-800">
              <a-menu-item v-for="(mode, k) in colorModes" :key="k"
                           class="flex flex-row items-center space-x-0.5 dark:text-slate-300"
                           :class="{'dropdown-item-active': $store.state.settings.settings.appearance === mode.code}"
                           @click="switchDarkMode(mode.code)">
                <ion-icon class="align-middle text-lg" :name="mode.icon"></ion-icon>
                <nuxt-link
                  class="px-2 py-px"
                  :class="{'dropdown-item-active': $store.state.settings.settings.appearance === mode.code}"
                  :key="mode.code"
                  :to="switchLocalePath(mode.code)">{{ $t(mode.name) }}
                </nuxt-link>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
          <!-- TODO: CTFever Premium -->
          <!-- <TinyButtonLink :to="localePath('/premium-active')" accent>Premium</TinyButtonLink>-->
        </div>
      </div>
    </div>
    <div
      class="fixed z-10 top-16 w-full h-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md opacity-0 -translate-y-8 transition duration-500 flex flex-col items-center h-16"
      :class="{'shadow dark:shadow-slate-800/50 hover:shadow-md opacity-100 translate-y-0': isToolPage()}"
    >
      <div class="w-full h-full px-4 container flex justify-between items-center border-t border-t-gray-150
                  dark:border-t-slate-700 dark:text-slate-300">
        <div>
          <nuxt-link class="group" :to="localePath('/')">
            <ion-icon
              class="align-middle -mt-1 transition-transform group-hover:-translate-x-1"
              name="arrow-back"/>
            {{ $t('topbar.back') }}
          </nuxt-link>
        </div>
        <div>
          <!--TODO: Rating-->
          <button class="transition-transform active:scale-90" @click="markTool">
            <ion-icon class="align-middle text-lg -mt-1" :name="isMarked ? 'bookmark' : 'bookmark-outline'"></ion-icon>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Btn from "~/components/TinyButtonLink";
import {getToolByRoute, wrapI18nPath2MetaRoute} from "~/libs/common";

export default {
  name: "TopBar",
  components: {Btn},
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    },
    currentPath() {
      return this.$route.path
    },
    markedTools() {
      return this.$store.state.settings.markedTool;
    },
    currentAppearance() {
      return this.$store.state.settings.settings.appearance;
    },
    currentAppearanceIcon() {
      let icon = '';
      switch (this.currentAppearance) {
        case 'light':
          icon = 'sunny-outline';
          break;
        case 'dark':
          icon = 'moon-outline';
          break;
        case 'auto':
          icon = 'contrast-outline';
          break;
      }
      return icon;
    },
  },
  data() {
    return {
      colorModes: [
        {
          code: 'light',
          name: 'topbar.appearance.light',
          icon: 'sunny-outline'
        },
        {
          code: 'dark',
          name: 'topbar.appearance.dark',
          icon: 'moon-outline'
        },
        {
          code: 'auto',
          name: 'topbar.appearance.auto',
          icon: 'desktop-outline'
        }
      ],
      isToolPage: () => /^.*\/tools\/.*/.test(this.$route.path),
      isMarked: false,
      currentToolName: '',
      pwaAvailable: false,
      deferredPrompt: null,
    }
  },
  mounted() {
    const self = this;
    this.$nextTick(() => {
      this.updateMarkStatus(this.currentPath);
      this.updateTitle(this.currentPath);
    });
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      self.pwaAvailable = true;
      this.deferredPrompt = e;
    });
  },
  methods: {
    markTool() {
      this.isMarked = !this.isMarked;
      this.$store.commit('settings/markToolByRoute', {
        route: this.currentPath,
        mark: this.isMarked
      });
      this.$message.success(this.$t(`action.${this.isMarked ? 'marked' : 'unmarked'}`).toString());
    },
    updateMarkStatus(route) {
      this.markedTools.filter(f => f.route === wrapI18nPath2MetaRoute(route)).length > 0 ? this.isMarked = true : this.isMarked = false;
    },
    updateTitle(route) {
      if (this.isToolPage()) {
        this.currentToolName = this.$t(getToolByRoute(route).title);
      }
    },
    switchDarkMode(mode) {
      this.$store.commit('settings/setAppearance', mode);
    },
    installPWA() {
      if (this.pwaAvailable) {
        this.deferredPrompt.prompt();
        this.deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            this.pwaAvailable = false;
            this.$message.success('PWA 已安装');
          } else {
            this.pwaAvailable = true;
            this.$message.error('PWA 安装被拒绝');
          }
          this.deferredPrompt = null;
        });
      }
    },
  },
  watch: {
    currentPath(val) {
      this.updateMarkStatus(val);
      this.updateTitle(val);
    },
  },
}
</script>

<style scoped>
.dropdown-item-active,
.dropdown-item-active > a {
  @apply text-cyan-500 dark:text-cyan-500 !important;
}

.ant-dropdown-menu-item > a,
.ant-dropdown-menu-submenu-title > a {
  @apply dark:text-slate-300;
}

.ant-dropdown-menu-item-active {
  @apply dark:bg-slate-700;
}

.subtitle-show {
  @apply translate-x-0 opacity-100;
}
</style>
