<template>
  <div class="w-full h-full flex flex-col justify-center items-center md:justify-start md:items-start">
    <div class="flex flex-col md:flex-row justify-items-center text-center md:text-left">
      <ion-icon class="text-6xl mx-auto" name="alert-circle-outline"></ion-icon>
      <div class="flex flex-col justify-center ml-0 md:ml-2">
        <h1 class="text-2xl font-bold">{{ $t('page.notFound.title') }}</h1>
        <p v-if="from !== '/'">{{ from }}</p>
      </div>
    </div>
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
  },
  data() {
    return {
      from: null
    }
  },
  mounted() {
    this.from = this.$route.query.missing || '/';
  },
}
</script>

<style scoped>

</style>
