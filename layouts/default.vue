<template>
  <div class="antialiased dark:bg-slate-900">
    <TopBar/>
    <div class="container mx-auto p-4 pt-20 min-h-screen overscroll-none"
         :class="{'pt-28': isToolPage(), 'pt-20': !isToolPage()}">
      <Nuxt/>
    </div>
    <Footer/>
  </div>
</template>

<script>
export default {
  name: "index",
  computed: {
    currentDarkMode() {
      return this.$store.state.settings.settings.darkMode;
    }
  },
  mounted() {
    this.toggleDarkMode(this.currentDarkMode);
  },
  watch: {
    currentDarkMode(newVal) {
      this.toggleDarkMode(newVal);
    }
  },
  methods: {
    toggleDarkMode(darkMode) {
      if (darkMode) {
        this.$el.ownerDocument.documentElement.classList.add('dark');
      } else {
        this.$el.ownerDocument.documentElement.classList.remove('dark');
      }
    }
  },
  data() {
    return {
      toolPageJudgeReg: /^.*\/tools\/.*/,
      isToolPage: () => this.toolPageJudgeReg.test(this.$route.path),
    }
  },
}
</script>

<style>
/*
Global Styles
*/

.primary-form {
  @apply bg-transparent rounded lg:px-8 lg:pt-6;
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
