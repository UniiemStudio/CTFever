<script lang="ts" setup>
import { type InferType, object, string } from 'yup'
import { useMessage } from '~/composables/uni/useMessage'
import type { FormSubmitEvent } from '#ui/types'
import type { LocaleObject } from '@nuxtjs/i18n'
import type { RouteLocationRaw } from 'vue-router'

const route = useRoute()
const router = useRouter()
const message = useMessage()
const runtimeConfig = useRuntimeConfig()
const localeRoute = useLocaleRoute()
const switchLocalePath = useSwitchLocalePath()
const { locale, locales } = useI18n()
const { t } = useI18n({
  useScope: 'local',
})

const colorMode = useColorMode()
const isDark = computed({
  get () {
    return colorMode.value === 'dark'
  },
  set () {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})
const signatureColor = computed(() => (isDark.value ? '#cbcbcb' : '#505050'))

useSeoMeta({
  title: t('title'),
})

const modal = reactive({
  login: false,
  register: false,
})

const loading = ref(false)

const schema = object({
  username: string().required('Username is required'),
  password: string()
  .min(6, 'Must be at least 6 characters')
  .required('Password is required'),
})

type Schema = InferType<typeof schema>

const state = reactive({
  username: undefined,
  password: undefined,
})

const onSubmit = async (e: FormSubmitEvent<Schema>) => {
  loading.value = true
  useFetch(`${ runtimeConfig.public.apiBase }/v1/users/login`, {
    method: 'POST',
    body: e.data,
    watch: false,
  }).then(res => {
    console.log(res.data.value)
    // @ts-ignore
    message.success(`user[${ res.data.value?.data?.token }] logged in!`)
    loading.value = false
  }).catch(e => {
    message.error(e.message)
    loading.value = false
  })
}

const colorModeOptions = [
  {
    value: 'light',
    label: t('appearance.color_mode.mode.light'),
    icon: 'line-md:moon-alt-to-sunny-outline-loop-transition',
  },
  {
    value: 'dark',
    label: t('appearance.color_mode.mode.dark'),
    icon: 'line-md:sunny-outline-to-moon-alt-loop-transition',
  },
  {
    value: 'system',
    label: t('appearance.color_mode.mode.auto'),
    icon: 'tabler:device-desktop-cog',
  },
]

interface ExtendedLocaleObject extends LocaleObject {
  icon: string
}

const localeOptions = locales.value.map(locale => {
  locale = locale as ExtendedLocaleObject
  return {
    value: locale.code,
    label: locale.name as string,
    icon: locale.icon,
  }
})

const handleLocaleSelect = (lc: string) => {
  router.replace(switchLocalePath(lc))
}

const selectedLocale = ref(locale.value as string)
watch(selectedLocale, handleLocaleSelect)

const select = ref(false)

const handleLogin = () => {
  router.push(localeRoute({
    name: 'user-login',
    query: {
      redirect: route.fullPath,
    },
  }) as RouteLocationRaw)
}
</script>

<template>
  <ToolContainer>

    <AppSettingsArea :title="t('appearance.label')" icon="tabler:layout">
      <AppSettingsItem :title="t('appearance.language.label')">
        <UniSelect :items="localeOptions" v-model="selectedLocale" size="sm"/>
      </AppSettingsItem>
      <AppSettingsItem :title="t('appearance.color_mode.label')">
        <UniSelect :items="colorModeOptions" v-model="$colorMode.preference" size="sm"/>
      </AppSettingsItem>
    </AppSettingsArea>

    <div class="w-full flex flex-col justify-center items-center my-8 opacity-30">
      <svg style="transform: translate3d(0, 0, 0);" class="w-28 aspect-[13/5]" viewBox="0 0 512 200"
           xmlns="http://www.w3.org/2000/svg">
        <path id="signaturePath"
              d="m 396.51068,112.70518 q 0.77346,-0.25782 2.32036,-0.25782 4.38291,0 4.38291,5.672 0,3.09381 -1.418,5.28527 -1.28909,2.06254 -4.12509,2.57818 -11.73072,2.19145 -23.07471,4.89854 l -0.38672,3.09381 q -3.60946,25.39508 -14.43781,37.51252 -10.69945,12.24636 -26.81307,12.24636 -10.69945,0 -16.62926,-5.28527 -5.80091,-5.15636 -5.80091,-13.27763 0,-13.53544 12.11745,-24.10598 12.11744,-10.57054 36.73906,-18.69181 l 2.57818,-18.17616 q 0.51564,-3.09382 1.28909,-8.25018 -6.05872,15.98472 -15.46908,23.84816 -9.41036,7.86345 -21.01217,7.86345 -11.08617,0 -16.88707,-6.70326 -5.80091,-6.83218 -5.80091,-17.53163 0,-4.769631 1.03127,-10.441626 1.03128,-5.800905 3.22273,-15.597989 1.93363,-8.894721 2.836,-14.17999 1.03127,-5.285268 1.03127,-9.410356 0,-6.187632 -4.76963,-6.187632 -3.73837,0 -8.89473,3.738361 -5.02745,3.609452 -10.69944,11.215082 -1.80473,2.449271 -3.99618,2.449271 -1.80473,0 -3.22273,-1.675817 -1.28909,-1.804726 -1.28909,-3.996179 0,-3.996178 3.60946,-9.023629 13.14871,-18.04726 30.80925,-18.04726 7.86344,0 12.24635,4.769633 4.51182,4.769633 4.51182,14.051081 0,6.703268 -1.28909,13.793262 -1.16019,6.961086 -3.60946,17.789442 -1.5469,6.44545 -2.32036,10.441629 -0.77345,3.867269 -0.77345,6.445449 0,6.574358 2.32036,9.410358 2.32036,2.836 8.12127,2.836 6.96108,0 14.17999,-7.60563 7.34781,-7.734544 13.14871,-23.332532 5.92982,-15.597989 8.508,-38.157063 0.64454,-5.671996 2.9649,-7.992358 2.32037,-2.449271 6.70327,-2.449271 9.02363,0 9.02363,9.02363 0,1.546908 -0.12891,2.449271 -2.70709,19.20744 -5.02745,34.67652 -1.28909,9.281448 -2.836,19.078531 -1.41799,9.797082 -2.83599,19.851982 9.41035,-2.57818 19.85198,-4.64072 z m -39.05942,23.20362 q -31.19598,10.82836 -31.19598,26.29743 0,3.60946 2.19145,5.92982 2.32036,2.44927 6.44545,2.44927 17.91835,0 22.43017,-33.77416 z m 53.36836,-62.907591 q -5.41417,0 -8.12126,-2.449271 -2.70709,-2.57818 -2.70709,-7.089995 0,-4.511815 3.48054,-7.476721 3.60945,-3.093816 8.89472,-3.093816 4.76963,0 7.73454,2.320362 2.96491,2.320362 2.96491,6.574358 0,5.15636 -3.35164,8.250176 -3.35163,2.964907 -8.89472,2.964907 z m -1.03127,69.224131 q -8.37908,0 -12.24635,-5.92981 -3.73836,-5.92982 -3.73836,-15.7269 0,-5.80091 1.41799,-14.82454 1.54691,-9.152535 3.86727,-17.015983 1.16019,-4.125088 3.09382,-5.671996 1.93364,-1.546908 6.18763,-1.546908 6.57436,0 6.57436,4.382906 0,3.222725 -2.44927,14.953441 -3.09382,14.17999 -3.09382,19.20744 0,3.86727 1.03128,5.92982 1.03127,2.06254 3.48054,2.06254 2.32036,0 5.8009,-3.22272 3.48055,-3.22273 9.28145,-10.18381 1.54691,-1.80473 3.48054,-1.80473 1.67582,0 2.57818,1.54691 1.03128,1.5469 1.03128,4.25399 0,5.15636 -2.44927,7.99236 -12.762,15.59799 -23.84817,15.59799 z m 25.00837,0 q -4.89854,0 -6.96108,-5.15636 -1.93364,-5.15636 -1.93364,-16.50035 0,-16.75817 4.76963,-31.840523 1.16019,-3.738361 3.73837,-5.414178 2.70708,-1.804726 7.47672,-1.804726 2.57818,0 3.60945,0.644545 1.03127,0.644545 1.03127,2.449271 0,2.062544 -1.93363,9.281448 -1.28909,5.156359 -2.06255,9.023633 -0.77345,3.86727 -1.28909,9.53926 4.254,-11.08617 9.53927,-18.047257 5.28527,-6.961086 10.31272,-9.925993 5.15636,-2.964907 9.41035,-2.964907 8.37909,0 8.37909,8.379085 0,5.027451 -2.836,18.176172 -2.44927,11.21508 -2.44927,14.82453 0,5.15636 3.73836,5.15636 2.57818,0 6.05872,-3.09382 3.60946,-3.22272 9.53927,-10.31271 1.54691,-1.80473 3.48054,-1.80473 1.67582,0 2.57818,1.54691 1.03127,1.5469 1.03127,4.25399 0,5.15636 -2.44927,7.99236 -5.54308,6.83218 -11.98853,11.21508 -6.31654,4.38291 -14.43781,4.38291 -6.57436,0 -9.92599,-3.73836 -3.35164,-3.86727 -3.35164,-11.08617 0,-3.60946 1.80473,-12.8909 1.67582,-8.12127 1.67582,-11.21509 0,-2.06254 -1.418,-2.06254 -1.67582,0 -4.76964,4.38291 -2.9649,4.25399 -6.18763,11.34399 -3.09381,7.08999 -5.02745,14.95344 -1.418,6.05872 -3.35163,8.25018 -1.80473,2.06254 -5.80091,2.06254 z m -185.7578,0 q -7.60563,0 -13.01981,-3.73836 -5.28527,-3.86727 -7.99236,-10.0549 -2.70709,-6.18763 -2.70709,-13.27763 0,-9.79708 3.60946,-17.402714 3.73836,-7.734539 10.0549,-11.988536 6.31654,-4.382906 14.17999,-4.382906 7.60563,0 13.01981,3.86727 5.41417,3.738361 8.12126,9.925993 2.70709,6.187633 2.70709,13.277623 0,9.79709 -3.73836,17.53163 -3.73836,7.60563 -10.18381,11.98853 -6.31654,4.254 -14.05108,4.254 z m 1.418,-13.92217 q 4.3829,0 7.34781,-4.76963 3.09382,-4.76964 3.09382,-13.92218 0,-7.08999 -2.57818,-10.699443 -2.57818,-3.609451 -6.18763,-3.609451 -4.64073,0 -7.73454,4.769634 -2.96491,4.64072 -2.96491,13.92217 0,7.34781 2.57818,10.82836 2.57818,3.48054 6.44545,3.48054 z M 115.87598,34.586328 q 3.99618,0.773454 5.92981,2.707089 2.06254,1.933635 2.06254,4.511815 0,4.253997 -2.44927,6.187632 -2.32036,1.933635 -7.47672,1.546908 -11.60181,-0.902363 -18.176167,-1.160181 -6.44545,-0.386727 -17.015988,-0.515636 -4.769633,23.719255 -8.765812,47.696329 -1.417999,8.765816 -2.964907,20.367616 -1.546908,11.47291 -2.062543,18.5629 -0.257818,3.73836 -3.093816,5.80091 -2.835998,1.93363 -6.832177,1.93363 -4.253997,0 -6.574359,-2.06254 -2.320362,-2.06255 -2.320362,-5.41418 0,-3.09382 0.902363,-10.18381 1.031272,-7.21891 2.320362,-15.08235 1.417999,-7.86345 2.191453,-13.664358 1.417999,-9.797084 3.222725,-19.465259 1.804726,-9.668175 3.609452,-18.305077 0.386727,-1.933635 0.902363,-4.382906 0.515636,-2.57818 1.160181,-5.671996 -12.633082,0.386727 -19.851986,2.062544 -7.218904,1.675817 -10.31272,4.769633 -2.964906,2.964907 -2.964906,7.734539 0,4.382906 2.578179,8.379085 0.515636,0.902363 0.515636,1.933635 0,2.449271 -2.964906,4.640724 -2.835998,2.062544 -5.929814,2.062544 -2.191453,0 -3.609452,-1.28909 -2.57818,-2.191453 -4.253997,-6.187632 -1.675817,-4.125088 -1.675817,-9.281448 0,-10.957264 7.089995,-17.531623 7.218904,-6.703268 21.78562,-9.797084 14.695626,-3.093816 37.641427,-3.093816 14.17999,0 22.559073,0.515636 8.508,0.515636 14.82454,1.675817 z m 0.64452,38.414881 q -5.41418,0 -8.12127,-2.449271 -2.70709,-2.57818 -2.70709,-7.089995 0,-4.511815 3.48054,-7.476721 3.60946,-3.093816 8.89473,-3.093816 4.76963,0 7.73454,2.320362 2.9649,2.320362 2.9649,6.574358 0,5.15636 -3.35163,8.250176 -3.35164,2.964907 -8.89472,2.964907 z m -1.03127,69.224131 q -8.37909,0 -12.24636,-5.92981 -3.73836,-5.92982 -3.73836,-15.7269 0,-5.80091 1.418,-14.82454 1.54691,-9.152535 3.86727,-17.015983 1.16018,-4.125088 3.09381,-5.671996 1.93364,-1.546908 6.18764,-1.546908 6.57436,0 6.57436,4.382906 0,3.222725 -2.44928,14.953441 -3.09381,14.17999 -3.09381,19.20744 0,3.86727 1.03127,5.92982 1.03127,2.06254 3.48054,2.06254 2.32037,0 5.80091,-3.22272 3.48054,-3.22273 9.28145,-10.18381 1.5469,-1.80473 3.48054,-1.80473 1.67582,0 2.57818,1.54691 1.03127,1.5469 1.03127,4.25399 0,5.15636 -2.44927,7.99236 -12.76199,15.59799 -23.84816,15.59799 z m 25.00837,0 q -4.89854,0 -6.96108,-5.15636 -1.93364,-5.15636 -1.93364,-16.50035 0,-16.75817 4.76964,-31.840523 1.16018,-3.738361 3.73836,-5.414178 2.70709,-1.804726 7.47672,-1.804726 2.57818,0 3.60945,0.644545 1.03127,0.644545 1.03127,2.449271 0,2.062544 -1.93363,9.281448 -1.28909,5.156359 -2.06255,9.023633 -0.77345,3.73836 -1.28909,9.41035 3.48055,-10.0549 8.25018,-17.015984 4.89854,-6.961086 9.92599,-10.31272 5.15636,-3.480543 9.66818,-3.480543 4.51181,0 6.31654,2.062544 1.93363,2.062544 1.93363,6.316541 0,4.125088 -2.44927,14.953442 -1.03127,4.64073 -1.418,6.96109 6.44545,-15.85581 14.3089,-23.074713 7.86345,-7.218904 14.69563,-7.218904 8.37908,0 8.37908,8.379085 0,5.027451 -2.836,18.176172 -2.44927,11.21508 -2.44927,14.82453 0,5.15636 3.73836,5.15636 2.57818,0 6.05873,-3.09382 3.60945,-3.22272 9.53926,-10.31271 1.54691,-1.80473 3.48055,-1.80473 1.67581,0 2.57818,1.54691 1.03127,1.5469 1.03127,4.25399 0,5.15636 -2.44927,7.99236 -5.54309,6.83218 -11.98854,11.21508 -6.31654,4.38291 -14.43781,4.38291 -6.57436,0 -9.92599,-3.73836 -3.35163,-3.86727 -3.35163,-11.08617 0,-3.60946 1.80472,-12.8909 1.67582,-8.12127 1.67582,-11.21509 0,-2.06254 -1.418,-2.06254 -1.67582,0 -4.76963,4.38291 -3.09382,4.25399 -6.18763,11.34399 -3.09382,7.08999 -5.02746,14.95344 -1.41799,6.18763 -3.35163,8.25018 -1.80473,2.06254 -5.92981,2.06254 -4.254,0 -6.44545,-3.99618 -2.06255,-4.12509 -2.06255,-9.92599 0,-4.89854 1.28909,-14.17999 1.03127,-8.25018 1.03127,-10.82836 0,-2.06254 -1.41799,-2.06254 -1.93364,0 -4.89855,4.64072 -2.9649,4.64073 -5.8009,11.85963 -2.70709,7.2189 -4.38291,14.17999 -1.418,6.05872 -3.35163,8.25018 -1.80473,2.06254 -5.80091,2.06254 z"
              stroke-width="2" :stroke="signatureColor"/>
      </svg>
      <span class="text-2xs font-medium">PRESENTS</span>
    </div>

    <UModal v-model="modal.login">
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              登陆 CTFever
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                     @click="modal.login = false"/>
          </div>
        </template>

        <UForm class="space-y-2" :schema="schema" :state="state" @submit="onSubmit">
          <UFormGroup name="username">
            <!-- <UInput :disabled="loading" v-model="state.username" placeholder="用户名" size="xl" /> -->
            <UniInput :disabled="loading" v-model="state.username" placeholder="用户名"/>
          </UFormGroup>
          <UFormGroup name="password">
            <!-- <UInput :disabled="loading" v-model="state.password" type="password" placeholder="密码" size="xl" /> -->
            <UniInput :disabled="loading" v-model="state.password" type="password" placeholder="密码"/>
          </UFormGroup>
          <UniButton block :loading="loading" attr-type="submit">
            登陆
          </UniButton>
        </UForm>

      </UCard>
    </UModal>
  </ToolContainer>
</template>

<style scoped>
#signaturePath {
  stroke-dasharray: 2400;
  stroke-dashoffset: 2400;
  fill: transparent;
  animation: drawSignature 8s ease-in-out infinite;
}

@keyframes drawSignature {
  0% {
    stroke-dashoffset: 2400;
  }

  15% {
    fill: transparent;
  }

  35%,
  75% {
    stroke-dashoffset: 0;
    fill: v-bind(signatureColor);
  }

  90%,
  100% {
    stroke-dashoffset: 2400;
    fill: transparent;
  }
}
</style>

<i18n lang="yaml">
en:
  title: Preferences
  appearance:
    label: Appearance
    language:
      label: Language
    color_mode:
      label: Color mode
      mode:
        light: Light
        dark: Dark
        auto: Auto
  account:
    label: Account
    login:
      not_logged_in: Not logged in
      subtitle: Login to use cloud sync and other services
      btn_login: Login
  cloud_sync:
    label: Cloud sync
    enable:
      title: Enable cloud sync
      subtitle: Automatically sync favorites, history and other data
  desktop:
    general:
      label: General
      openAtLogin:
        label: Open at login
        subtitle: Automatically open CTFever when you start your computer
zh:
  title: 首选项
  appearance:
    label: 外观
    language:
      label: 语言
    color_mode:
      label: 颜色模式
      mode:
        light: 亮色
        dark: 暗色
        auto: 自动
  account:
    label: 账户
    login:
      not_logged_in: 未登录
      subtitle: 登录以使用云同步和其他服务
      btn_login: 登录
  cloud_sync:
    label: 云同步
    enable:
      title: 启用云同步
      subtitle: 自动同步收藏、历史记录等数据
  desktop:
    general:
      label: 通用
      openAtLogin:
        label: 开机自启
        subtitle: 开机时自动打开 CTFever
</i18n>