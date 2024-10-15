<script lang="ts" setup>
import { isTauri } from '@tauri-apps/api/core';
import { onOpenUrl, register } from '@tauri-apps/plugin-deep-link';
import { storeToRefs } from 'pinia'

// cross-platform
if(isTauri()) {
  register('ctfever')

  await onOpenUrl((urls) => {
    console.log('deep link:', urls);
  });
}
// end

const page_loaded = ref(false)

const route = useRoute()
const router = useRouter()
const routeBaseName = useRouteBaseName()
const { currentPageTitle } = storeToRefs(useGlobalState())

useHead({
  titleTemplate(title) {
    currentPageTitle.value = title || 'CTFever'
    return title
      ? `${title} ${routeBaseName(route)?.startsWith('tool') ? '-' : '::'} CTFever`
      : 'CTFever'
  },
})

useSeoMeta({
  viewport() {
    return 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
  },
})

onMounted(() => {
  page_loaded.value = true
})
</script>

<template>
  <UniMessageProvider :max="5">
    <NuxtLayout>
      <div
        class="fixed inset-0 font-sans flex flex-col gap-6 justify-center items-center bg-white dark:bg-neutral-900 z-[999999]"
        v-if="!page_loaded && !isTauri()">
        <div class="sk-folding-cube">
          <div class="sk-cube1 sk-cube"></div>
          <div class="sk-cube2 sk-cube"></div>
          <div class="sk-cube4 sk-cube"></div>
          <div class="sk-cube3 sk-cube"></div>
        </div>
        <div>
          <h1 class="loading-text-indicator">CTFever loading...</h1>
        </div>
      </div>
      <NuxtLoadingIndicator />
      <NuxtPage />
    </NuxtLayout>
  </UniMessageProvider>
</template>

<style scoped>
.loading-text-indicator {
  @apply font-sans text-neutral-800 dark:text-neutral-200;
  font-size: 14px;
  animation: loading-text 2s infinite;
}

@keyframes loading-text {
  0% {
    opacity: .3;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: .3;
  }
}

.sk-folding-cube {
  margin: 20px auto;
  width: 40px;
  height: 40px;
  position: relative;
  transform: rotateZ(45deg);
}

.sk-folding-cube .sk-cube {
  float: left;
  width: 50%;
  height: 50%;
  position: relative;
  transform: scale(1.1);
}

.sk-folding-cube .sk-cube:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #333;
  -webkit-animation: sk-foldCubeAngle 2.4s infinite linear both;
  animation: sk-foldCubeAngle 2.4s infinite linear both;
  transform-origin: 100% 100%;
}

.sk-folding-cube .sk-cube2 {
  transform: scale(1.1) rotateZ(90deg);
}

.sk-folding-cube .sk-cube3 {
  transform: scale(1.1) rotateZ(180deg);
}

.sk-folding-cube .sk-cube4 {
  transform: scale(1.1) rotateZ(270deg);
}

.sk-folding-cube .sk-cube2:before {
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
}

.sk-folding-cube .sk-cube3:before {
  -webkit-animation-delay: 0.6s;
  animation-delay: 0.6s;
}

.sk-folding-cube .sk-cube4:before {
  -webkit-animation-delay: 0.9s;
  animation-delay: 0.9s;
}

@-webkit-keyframes sk-foldCubeAngle {

  0%,
  10% {
    transform: perspective(140px) rotateX(-180deg);
    opacity: 0;
  }

  25%,
  75% {
    transform: perspective(140px) rotateX(0deg);
    opacity: 1;
  }

  90%,
  100% {
    transform: perspective(140px) rotateY(180deg);
    opacity: 0;
  }
}

@keyframes sk-foldCubeAngle {

  0%,
  10% {
    transform: perspective(140px) rotateX(-180deg);
    opacity: 0;
  }

  25%,
  75% {
    transform: perspective(140px) rotateX(0deg);
    opacity: 1;
  }

  90%,
  100% {
    transform: perspective(140px) rotateY(180deg);
    opacity: 0;
  }
}
</style>
