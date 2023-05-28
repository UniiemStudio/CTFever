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
                :class="{'subtitle-show': isToolPage() || isTagPage(), 'cursor-default pointer-events-none': !(isToolPage() || isTagPage())}"
                class="font-medium cursor-pointer pointer-events-auto transition duration-500 translate-x-2 opacity-0">{{
                  getTagName ?? currentToolName
                }}</span>
            </div>
          </nuxt-link>
        </div>
        <div class="space-x-2 dark:text-slate-300">
          <TinyButtonLink v-if="pwaAvailable" :clk="installPWA" class="group inline-flex flex-row justify-center gap-1">
            <Icon icon="tabler:download" class="text-base inline -translate-y-[2px]"/>
            <span>{{ $t('topbar.install_pwa') }}</span>
          </TinyButtonLink>
          <a-dropdown :trigger="['hover']" placement="bottomRight">
            <span class="ant-dropdown-link cursor-pointer" @click="e => e.preventDefault()">
              <Icon icon="prime:language" class="text-xl inline -mt-1 pointer-events-none"/>
            </span>
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
          <!--          <a-dropdown :trigger="['hover']" placement="bottomRight">-->
          <!--            <span class="ant-dropdown-link cursor-pointer" @click="e => e.preventDefault()">-->
          <!--              <Icon :icon="currentAppearanceIcon" class="text-lg inline -mt-1 pointer-events-none transition"/>-->
          <!--            </span>-->
          <!--            <a-menu slot="overlay" class="dark:bg-slate-800">-->
          <!--              <a-menu-item v-for="(mode, k) in colorModes" :key="k"-->
          <!--                           class="flex flex-row items-center space-x-0.5 dark:text-slate-300"-->
          <!--                           :class="{'dropdown-item-active': $store.state.settings.settings.appearance === mode.code}"-->
          <!--                           @click="switchDarkMode(mode.code)">-->
          <!--                <Icon :icon="mode.icon" class="text-lg inline"/>-->
          <!--                <nuxt-link-->
          <!--                  class="px-2 py-px"-->
          <!--                  :class="{'dropdown-item-active': $store.state.settings.settings.appearance === mode.code}"-->
          <!--                  :key="mode.code"-->
          <!--                  :to="switchLocalePath(mode.code)">{{ $t(mode.name) }}-->
          <!--                </nuxt-link>-->
          <!--              </a-menu-item>-->
          <!--            </a-menu>-->
          <!--          </a-dropdown>-->
          <nuxt-link :to="localePath('/settings')">
            <Icon icon="tabler:settings-2" class="text-lg inline -mt-1 pointer-events-none"/>
          </nuxt-link>
          <!-- TODO: CTFever Premium -->
          <!-- <TinyButtonLink :to="localePath('/premium-active')" accent>Premium</TinyButtonLink> -->
        </div>
      </div>
    </div>
    <div
      class="fixed z-10 top-16 w-full h-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md opacity-0 -translate-y-8 transition duration-500 flex flex-col items-center"
      :class="{'shadow dark:shadow-slate-800/50 hover:shadow-md opacity-100 translate-y-0': isToolPage()}"
    >
      <div class="w-full h-full px-4 container flex justify-between items-center border-t border-t-gray-150
                  dark:border-t-slate-700 dark:text-slate-300">
        <div class="space-x-2">
          <nuxt-link class="group flex flex-row items-center gap-1" :to="localePath('/')">
            <Icon icon="tabler:square-rounded-chevron-left"
                  class="text-lg inline transition-transform"/>
            {{ $t('topbar.back') }}
          </nuxt-link>
        </div>
        <div class="space-x-2 flex flex-row">
          <!--TODO: Rating-->
          <TinyButtonLink :class="{'opacity-100 pointer-events-auto': currentTool.shareable}" :clk="shareHandler"
                          class="flex flex-row justify-center transition opacity-0 pointer-events-none" accent>
            <Icon icon="tabler:share-3" class="text-base inline -translate-y-[2px] transition"/>
            <span class="transition">{{ $t('topbar.share') }}</span>
          </TinyButtonLink>
          <button class="transition-transform active:scale-90 group" @click="markTool">
            <Icon :icon="isMarked ? 'tabler:bookmark-filled' : 'tabler:bookmark-plus'"
                  class="text-xl transition group-hover:text-amber-300"/>
          </button>
          <button :class="{'bg-gray-100 dark:bg-slate-700': isDrawerOpen}"
                  class="transition-transform active:scale-90 rounded flex flex-row justify-center space-x-1 px-1 py-0.5"
                  @click="isDrawerOpen = !isDrawerOpen">
            <Icon :icon="`tabler:${isDrawerOpen ? 'layout-sidebar-right-collapse' : 'menu-2'}`"
                  class="text-lg transition"/>
            <span class="text-xs transition" :class="{'hidden': !isDrawerOpen}">
              {{ $t('topbar.drawer_collapse') }}
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TinyButtonLink from "~/components/TinyButtonLink";
import {copyTextToClipboard, getToolByRoute, wrapI18nPath2MetaRoute} from "~/libs/common";
import {Icon} from "@iconify/vue2";
import PrimaryButton from "~/components/form/PrimaryButton.vue";

export default {
  name: "TopBar",
  components: {PrimaryButton, Icon, TinyButtonLink},
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    },
    currentPath() {
      return this.$route.path
    },
    currentTool() {
      return getToolByRoute(this.currentPath);
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
          icon = this.colorModes[0].icon;
          break;
        case 'dark':
          icon = this.colorModes[1].icon;
          break;
        case 'auto':
          icon = this.colorModes[2].icon;
          break;
      }
      return icon;
    },
    getTagName() {
      return this.isTagPage() ? this.$t(`tags.${this.$route.params.tag}`) : null;
    },
  },
  data() {
    return {
      colorModes: [
        {
          code: 'light',
          name: 'topbar.appearance.light',
          icon: 'line-md:moon-alt-to-sunny-outline-loop-transition'
        },
        {
          code: 'dark',
          name: 'topbar.appearance.dark',
          icon: 'line-md:sunny-outline-to-moon-alt-loop-transition'
        },
        {
          code: 'auto',
          name: 'topbar.appearance.auto',
          icon: 'tabler:device-desktop-cog'
        }
      ],
      isToolPage: () => /^.*\/tools\/.*/.test(this.currentPath),
      isTagPage: () => /^.*\/tag\/.*/.test(this.currentPath),
      isMarked: false,
      currentToolName: '',
      pwaAvailable: false,
      deferredPrompt: null,
      isDrawerOpen: false,
    }
  },
  mounted() {
    const self = this;
    this.$nextTick(() => {
      this.updateMarkStatus(this.currentPath);
      this.updateTitle(this.currentPath);
    });
    window.addEventListener('beforeinstallprompt', (e) => {
      // e.preventDefault();
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
      if (this.isTagPage()) {
        this.currentToolName = this.getTagName;
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
          }
          this.deferredPrompt = null;
        });
      }
    },
    shareHandler() {
      copyTextToClipboard(window.location.href);
      this.$message.success(
        this.$t('action.copied_with_state').toString().replace('{}', this.$t('topbar.share_link').toString())
      );
    },
  },
  watch: {
    currentPath(val) {
      this.updateMarkStatus(val);
      this.updateTitle(val);
    },
    isDrawerOpen(val) {
      this.$emit('switchDrawer', val);
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
