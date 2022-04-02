<template>
  <div
    class="fixed top-0 h-16 w-full bg-white backdrop-blur-sm shadow hover:shadow-md transition-shadow flex justify-center">
    <div class="w-full h-full px-4 container flex justify-between items-center">
      <div>
        <nuxt-link :to="localePath('/')" class="text-lg font-bold">CTFever</nuxt-link>
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
</template>

<script>
import Btn from "~/components/TinyButtonLink";

export default {
  name: "TopBar",
  components: {Btn},
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    }
  }
}
</script>

<style scoped>

</style>
