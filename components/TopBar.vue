<template>
  <div>
    <div
      class="fixed z-10 top-0 w-full bg-white backdrop-blur-sm transition-shadow flex flex-col items-center h-16"
      :class="{'shadow hover:shadow-md': !isToolPage()}"
    >
      <div class="w-full h-16 px-4 container flex justify-between items-center">
        <div>
          <nuxt-link :to="localePath('/')" class="text-lg font-bold">
            CTFever
            <span class="font-thin">{{ $t('app.subtitle') }}</span>
          </nuxt-link>
        </div>
        <div class="space-x-1">
          <!--          TODO: Dark mode toggle-->
          <!--          <button>-->
          <!--            <ion-icon class="align-middle text-base -mt-1" name="sunny-outline"></ion-icon>-->
          <!--          </button>-->
          <a-dropdown :trigger="['hover']" placement="bottomRight">
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
              <ion-icon class="align-middle text-lg -mt-1" name="language-outline"></ion-icon>
            </a>
            <a-menu slot="overlay">
              <a-menu-item v-for="(locale, k) in availableLocales" :key="k">
                <nuxt-link
                  class="px-2 py-px"
                  :key="locale.code"
                  :to="switchLocalePath(locale.code)">{{ locale.name }}
                </nuxt-link>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
          <!--          <TinyButtonLink :to="localePath('/premium-active')" accent>Premium</TinyButtonLink>-->
        </div>
      </div>
    </div>
    <div
      class="fixed z-0 top-16 w-full h-8 bg-white backdrop-blur-sm opacity-0 -translate-y-8 transition duration-500 flex flex-col items-center h-16"
      :class="{'shadow hover:shadow-md opacity-100 translate-y-0': isToolPage()}"
    >
      <div class="w-full h-full px-4 container flex justify-between items-center border-t border-t-gray-150">
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
    }
  },
  mounted() {
    this.$nextTick(() => {
      console.log(this.currentPath);
      this.updateMarkStatus(this.currentPath);
    });
  },
  data() {
    return {
      isToolPage: () => /^.*\/tools\/.*/.test(this.$route.path),
      isMarked: false,
    }
  },
  methods: {
    markTool() {
      this.isMarked = !this.isMarked;
      this.$store.commit('settings/FAVORITE_TOOL', {
        route: this.currentPath,
        mark: this.isMarked
      });
      this.$message.success(this.isMarked ? '已收藏' : '已取消收藏');
    },
    updateMarkStatus(route) {
      this.favoriteTools.filter(f => f.route === route).length > 0 ? this.isMarked = true : this.isMarked = false;
    }
  },
  watch: {
    currentPath(val) {
      this.updateMarkStatus(val);
      console.log('is favorite', val, this.isMarked);
    },
  },
}
</script>

<style scoped>

</style>
