<template>
  <div class="antialiased">
    <TopBar/>
    <div class="container mx-auto p-4 pt-20"
         :class="{'pt-28': isToolPage(), 'pt-20': !isToolPage()}">
      <Nuxt/>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
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
