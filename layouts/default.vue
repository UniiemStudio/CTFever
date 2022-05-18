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
    currentAppearance() {
      return this.$store.state.settings.settings.appearance;
    }
  },
  mounted() {
    this.setAppearance(this.currentAppearance);
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (this.currentAppearance === 'auto') this.setAppearance(e.matches ? 'dark' : 'light');
    });
  },
  watch: {
    currentAppearance(newVal) {
      this.setAppearance(newVal);
    }
  },
  methods: {
    setAppearance(darkMode) {
      switch (darkMode) {
        case 'auto':
          if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.$el.ownerDocument.documentElement.classList.add('dark');
          } else {
            this.$el.ownerDocument.documentElement.classList.remove('dark');
          }
          break;
        case 'dark':
          this.$el.ownerDocument.documentElement.classList.add('dark');
          break;
        case 'light':
          this.$el.ownerDocument.documentElement.classList.remove('dark');
          break;
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
.nuxt-progress {
  @apply bg-gray-800 dark:bg-cyan-500;
}

.primary-form {
  @apply bg-transparent rounded lg:px-8 lg:pt-6;
}

::-webkit-scrollbar {
  /*滚动条整体*/
  width: 4px;
  height: 4px;
  border-radius: 5px;
}

::-webkit-scrollbar-track {
  @apply bg-gray-100 dark:bg-slate-700;
}

:hover::-webkit-scrollbar-track {
  /* ignore */
}

::-webkit-scrollbar-thumb {
  /*滚动条里面的滑块*/
  border-radius: 10px;
  @apply bg-gray-300 dark:bg-slate-500;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-400;
}

::-webkit-scrollbar-corner {
  border: none;
  background: transparent;
}

@media (prefers-color-scheme: dark) {
  html[class*="dark"] {
    @apply bg-slate-900;
  }
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
