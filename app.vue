<script lang="ts" setup>
import { isTauri } from '@tauri-apps/api/core';
import { onOpenUrl } from '@tauri-apps/plugin-deep-link';
import { type } from '@tauri-apps/plugin-os';
import { ask, message } from '@tauri-apps/plugin-dialog';
import { storeToRefs } from 'pinia'
import { TrayIcon, type TrayIconOptions } from '@tauri-apps/api/tray';
import { defaultWindowIcon } from '@tauri-apps/api/app';
import { Menu } from '@tauri-apps/api/menu';
import { window } from '@tauri-apps/api';
import { Window } from '@tauri-apps/api/window';

const page_loaded = ref(false)

const route = useRoute()
const router = useRouter()
const routeBaseName = useRouteBaseName()
const { currentPageTitle } = storeToRefs(useGlobalState())
const { toolkits } = storeToRefs(useConstant())
const { createI18nToolkitKey, createI18nToolKey } = useI18nKey()
const { t } = useI18n({
  useScope: 'local',
})

// cross-platform
if (isTauri()) {
  const osType = type()

  // if the app is running on mobile, we don't need to init system tray
  if (osType !== 'android' && osType !== 'ios') {
    const mainWindow = (await window.getAllWindows()).find(w => w.label === 'main')

    // handle close event
    mainWindow?.onCloseRequested((event) => {
      mainWindow.hide()
      event.preventDefault()
    })

    // util functions
    const showMainWindow = async () => {
      if (mainWindow) {
        mainWindow.show()
        if ((await mainWindow.isMinimized()))
          mainWindow.unminimize()
        if (!(await mainWindow.isFocused()))
          mainWindow.setFocus()
      } else {
        await message('主窗口未找到，请重启应用', {
          title: '程序异常',
          kind: 'error',
        });
      }
    }

    // menu for system tray
    const menu = await Menu.new({
      items: [
        {
          id: 'show',
          text: t('tray.show'),
          action: () => {
            showMainWindow()
          }
        },
        {
          item: 'Separator'
        },
        // add toolkits to the system tray
        ...toolkits.value.map((toolkit) => ({
          id: toolkit.key,
          text: t(createI18nToolkitKey(toolkit.key).label),
          items: toolkit.tools.map((tool) => ({
            id: tool.key,
            text: t(createI18nToolKey(tool.key).label),
            action: () => {
              showMainWindow()
              router.push({
                path: tool.route,
              })
            }
          }))
        })),
        {
          item: 'Separator'
        },
        {
          id: 'quit',
          text: t('tray.quit'),
          action: async () => {
            const answer = await ask(t('tray.quit-confirm'), {
              title: '退出 CTFever',
              kind: 'info',
              okLabel: '确定',
              cancelLabel: '取消',
            });
            if (answer) {
              mainWindow?.destroy()
            }
          }
        },
      ]
    })

    // system tray options
    const trayOptions: TrayIconOptions = {
      menu,
      id: 'ctfever',
      menuOnLeftClick: false,
      icon: await defaultWindowIcon() || undefined,
      tooltip: 'CTFever',
      action: (event) => {
        switch (event.type) {
          case 'DoubleClick':
            showMainWindow()
            break
        }
      }
    }

    // create system tray
    await TrayIcon.new(trayOptions)
  }

  // handle deep linking
  await onOpenUrl((urls) => {
    if (urls.length === 0) {
      return
    }
    const uri = new URL(urls[0])
    // check if the path is invalid
    const isValidPath = router.getRoutes().some((route) => {
      if (route.path === uri.pathname.replace('//', '/')) {
        return true
      }
    })

    if (!isValidPath) {
      console.warn(`Invalid path: ${uri.pathname} with query: ${uri.searchParams.toString()} ignored`);
      return
    }
    router.replace({
      path: uri.pathname.replace('//', '/'),
      query: Object.fromEntries(uri.searchParams),
    })
  });
}
// end

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

<i18n lang="yaml">
en:
  tray:
    show: Open CTFever
    tools: Tools
    quit: Quit
    quit-confirm: Are you sure you want to quit CTFever?
zh:
  tray:
    show: 显示主窗口
    tools: 工具
    quit: 退出
    quit-confirm: 确定要退出 CTFever 吗？
</i18n>
