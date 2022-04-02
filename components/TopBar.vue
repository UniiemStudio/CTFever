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
            <span class="font-thin">{{ $t('app.edition.snap') }}</span>
          </nuxt-link>
        </div>
        <div>
          <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
              {{ $t('topbar.langTip') }}
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
          <TinyButtonLink class="ml-1" :to="localePath('/login')">{{ $t('topbar.login') }}</TinyButtonLink>
          <TinyButtonLink class="ml-1" :to="localePath('/signup')" accent>{{ $t('topbar.signup') }}</TinyButtonLink>
        </div>
      </div>
    </div>
    <div
      class="fixed z-0 top-16 w-full h-8 bg-white backdrop-blur-sm opacity-0 -translate-y-8 transition duration-500 flex flex-col items-center h-16"
      :class="{'shadow hover:shadow-md opacity-100 translate-y-0': isToolPage()}"
    >
      <div
        class="w-full h-full px-4 container flex justify-between items-center border-t border-t-gray-150"
      >
        <div>
          <nuxt-link :to="localePath('/')">← 返回</nuxt-link>
        </div>
        <div>
          <button>⭐</button>
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
  },
  data() {
    return {
      isToolPage() {
        return this.$route.path.startsWith("/tool")
      },
    }
  },
}
</script>

<style scoped>

</style>
