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

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s;
}

.page-enter,
.page-leave-to {
  opacity: 0;
}

.slide-bottom-enter-active,
.slide-bottom-leave-active {
  transition: opacity 0.15s ease-in-out, transform 0.15s ease-in-out;
}

.slide-bottom-enter {
  opacity: 0;
  transform: translate3d(10px, 0, 0);
}

.slide-bottom-leave-to {
  opacity: 0;
  transform: translate3d(-10px, 0, 0);
}
</style>
