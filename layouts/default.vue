<template>
  <div class="antialiased">
    <TopBar/>
    <div class="container mx-auto p-4 pt-20 min-h-screen"
         :class="{'pt-28': isToolPage(), 'pt-20': !isToolPage()}">
      <Nuxt/>
    </div>
    <Footer/>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      toolPageReg: /^.*\/tools\/.*/,
      isToolPage: () => this.toolPageReg.test(this.$route.path),
    }
  },
}
</script>

<style>
/*
Global Styles
*/

.primary-form {
  @apply bg-white rounded lg:px-8 lg:pt-6;
}

/* transitions */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.page-enter,
.page-leave-to {
  opacity: 0;
  transform: scale(0.99);
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: opacity 0.15s ease-in-out, transform 0.15s ease-in-out;
}

.slide-left-enter {
  opacity: 0;
  transform: translate3d(10px, 0, 0);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translate3d(-10px, 0, 0);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-active {
  opacity: 0;
}
</style>
