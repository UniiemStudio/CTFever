<template>
  <div>
    <div
      class="fixed z-10 top-0 w-full bg-white dark:bg-slate-900 backdrop-blur-sm transition-shadow flex flex-col items-center h-16"
      :class="{'shadow dark:shadow-slate-800/50 hover:shadow-md': !isToolPage()}"
    >
      <div class="w-full h-16 px-4 container flex justify-between items-center">
        <div>
          <nuxt-link :to="localePath('/')" class="text-lg font-bold dark:text-slate-100">
            CTFever
            <span class="font-thin dark:text-slate-200">{{ $t('app.subtitle') }}</span>
          </nuxt-link>
        </div>
        <div class="space-x-2 dark:text-slate-300">
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
                        :name="currentDarkModeIcon"></ion-icon>
            </a>
            <a-menu slot="overlay" class="dark:bg-slate-800">
              <a-menu-item v-for="(mode, k) in colorModes" :key="k"
                           class="flex flex-row items-center space-x-0.5 dark:text-slate-300"
                           :class="{'dropdown-item-active': $store.state.settings.settings.darkMode === mode.code}"
                           @click="switchDarkMode(mode.code)">
                <ion-icon class="align-middle text-lg" :name="mode.icon"></ion-icon>
                <nuxt-link
                  class="px-2 py-px"
                  :class="{'dropdown-item-active': $store.state.settings.settings.darkMode === mode.code}"
                  :key="mode.code"
                  :to="switchLocalePath(mode.code)">{{ $t(mode.name) }}
                </nuxt-link>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
          <!--          <a @click="toggleDarkMode">-->
          <!--            <ion-icon class="align-middle text-base -mt-1"-->
          <!--                      :name="this.currentDarkMode ? 'moon-outline' : 'sunny-outline'"></ion-icon>-->
          <!--          </a>-->
          <!-- TODO: CTFever Premium -->
          <!-- <TinyButtonLink :to="localePath('/premium-active')" accent>Premium</TinyButtonLink>-->
        </div>
      </div>
    </div>
    <div
      class="fixed z-0 top-16 w-full h-8 bg-white dark:bg-slate-900 backdrop-blur-sm opacity-0 -translate-y-8 transition duration-500 flex flex-col items-center h-16"
      :class="{'shadow dark:shadow-slate-800/50 hover:shadow-md opacity-100 translate-y-0': isToolPage()}"
    >
      <div class="w-full h-full px-4 container flex justify-between items-center border-t border-t-gray-150
                  dark:border-t-slate-700 dark:text-slate-300">
        <div>
          <nuxt-link class="group" :to="localePath('/')">
            <ion-icon
              class="align-middle -mt-1 transition-transform group-hover:-translate-x-1"
              name="arrow-back"/>
            返回
          </nuxt-link>
        </div>
        <div>
          <!--TODO: 评分-->
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
    favoriteTools() {
      return this.$store.state.settings.favoriteTools;
    },
    currentDarkMode() {
      return this.$store.state.settings.settings.darkMode;
    },
    currentDarkModeIcon() {
      let icon = '';
      switch (this.currentDarkMode) {
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
  mounted() {
    this.$nextTick(() => {
      this.updateMarkStatus(this.currentPath);
    });
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
    }
  },
  methods: {
    markTool() {
      this.isMarked = !this.isMarked;
      this.$store.commit('settings/FAVORITE_TOOL', {
        route: `/${this.currentPath.split('/').slice(-2).join('/')}`,
        mark: this.isMarked
      });
      this.$message.success(this.isMarked ? '已收藏' : '已取消收藏');
    },
    updateMarkStatus(route) {
      this.favoriteTools.filter(f => f.route === route).length > 0 ? this.isMarked = true : this.isMarked = false;
    },
    switchDarkMode(mode) {
      this.$store.commit('settings/setDarkMode', mode);
    }
  },
  watch: {
    currentPath(val) {
      this.updateMarkStatus(val);
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
</style>
