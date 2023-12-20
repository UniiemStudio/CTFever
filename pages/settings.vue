<script lang="ts" setup>
import {LocaleObject} from '@nuxtjs/i18n/dist/runtime/composables';
import {RouteLocationRaw} from "vue-router";
import {InferType, object, string} from "yup";
import {FormSubmitEvent} from "#ui/types";
import {useMessage} from "~/composables/uni/useMessage";

const route = useRoute()
const router = useRouter()
const message = useMessage()
const runtimeConfig = useRuntimeConfig()
const localeRoute = useLocaleRoute()
const switchLocalePath = useSwitchLocalePath()
const {locale, locales} = useI18n()
const {t} = useI18n({
  useScope: 'local'
})

const modal = reactive({
  login: false,
  register: false
})

const loading = ref(false)

const schema = object({
  username: string().required('Username is required'),
  password: string()
      .min(6, 'Must be at least 6 characters')
      .required('Password is required')
})

type Schema = InferType<typeof schema>

const state = reactive({
  username: undefined,
  password: undefined
})

const onSubmit = async (e: FormSubmitEvent<Schema>) => {
  loading.value = true
  useFetch(`${runtimeConfig.public.apiBase}/v1/users/login`, {
    method: 'POST',
    body: e.data,
    watch: false
  }).then(res => {
    console.log(res.data.value);
    message.success(`user[${res.data.value?.data?.token}] logged in!`)
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
    icon: 'line-md:moon-alt-to-sunny-outline-loop-transition'
  },
  {
    value: 'dark',
    label: t('appearance.color_mode.mode.dark'),
    icon: 'line-md:sunny-outline-to-moon-alt-loop-transition'
  },
  {
    value: 'system',
    label: t('appearance.color_mode.mode.auto'),
    icon: 'tabler:device-desktop-cog'
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
    icon: locale.icon
  }
})

const handleLocaleSelect = (lc: string) => {
  router.push(switchLocalePath(lc))
}

const selectedLocale = ref(locale.value as string)
watch(selectedLocale, handleLocaleSelect)

const select = ref(false)

const handleLogin = () => {
  router.push(localeRoute({
    name: 'user-login',
    query: {
      redirect: route.fullPath
    }
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
    <AppSettingsArea :title="t('account.label')" icon="tabler:user-square-rounded">
      <AppSettingsItem :title="t('account.login.not_logged_in')" :subtitle="t('account.login.subtitle')">
        <UniButton @click="modal.login = true">{{ t('account.login.btn_login') }}</UniButton>
      </AppSettingsItem>
    </AppSettingsArea>
    <!-- <AppSettingsArea :title="t('cloud_sync.label')" icon="tabler:cloud">
      <AppSettingsItem :title="t('cloud_sync.enable.title')" :subtitle="t('cloud_sync.enable.subtitle')">
        <UniToggle v-model="select" size="sm" />
      </AppSettingsItem>
    </AppSettingsArea> -->

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

<style scoped></style>

<i18n lang="yaml">
en:
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
zh:
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
</i18n>