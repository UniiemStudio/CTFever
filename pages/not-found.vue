<template>
  <div class="w-full h-full flex flex-col justify-center items-center md:justify-start md:items-start">
    <h1 class="text-2xl font-bold">{{ $t('page.notFound.title') }}</h1>
    <p class="mt-4">{{ $t('page.notFound.message') }}</p>
    <TinyButtonLink class="mt-4" :to="localePath('/')">{{ $t('page.notFound.btn') }}</TinyButtonLink>
  </div>
</template>

<script>
import TinyButtonLink from "~/components/TinyButtonLink";

export default {
  name: "not-found",
  components: {TinyButtonLink},
  head() {
    return {
      title: this.$t("page.notFound.title")
    }
  }
}
</script>

<style scoped>

</style>
