<script>
import {defineComponent} from 'vue'
import PrimaryContainer from "~/components/tool/PrimaryContainer.vue";
import {Icon} from "@iconify/vue2";

export default defineComponent({
  name: "settings",
  head() {
    return {
      title: "Preferences" + " - " + this.$t("app.name"),
      meta: [
        {hid: "description", name: "description", content: '偏好设置'},
      ],
    };
  },
  components: {Icon, PrimaryContainer},
  data() {
    return {
      languageOptions: [],
      colorModeOptions: [
        {
          value: 'light',
          label: this.$t('settings.appearance.color_mode.mode.light').toString(),
          icon: 'line-md:moon-alt-to-sunny-outline-loop-transition'
        },
        {
          value: 'dark',
          label: this.$t('settings.appearance.color_mode.mode.dark').toString(),
          icon: 'line-md:sunny-outline-to-moon-alt-loop-transition'
        },
        {
          value: 'auto',
          label: this.$t('settings.appearance.color_mode.mode.auto').toString(),
          icon: 'tabler:device-desktop-cog'
        },
      ],
      // server_online: 'pending...',
      // server_endpoint: !this.$config.CEVER_BACKEND_BASE ? 'unavailable' : this.$config.CEVER_BACKEND_BASE.includes('uniiem.com') ? 'Official' : this.$config.CEVER_BACKEND_BASE,
      // server_version: null,
      server_fallback: false,
      server_endpoint: '',
      server_status: 'checking...',
      server_version: '',
    }
  },
  computed: {
    language: {
      get() {
        return this.$i18n.localeProperties.code
      },
      set(value) {
        this.$i18n.setLocale(value)
      }
    },
    darkMode: {
      get() {
        return this.$store.state.settings.settings.appearance;
      },
      set(value) {
        this.$store.commit('settings/setAppearance', value)
      }
    }
  },
  mounted() {
    this.languageOptions = this.$i18n.locales.map(locale => ({
      value: locale.code,
      label: locale.name,
      icon: locale.icon
    }))

    let env_server_endpoint = this.$config.CEVER_BACKEND_BASE;
    let sys_server_endpoint_fallback = this.$config.CEVER_BACKEND_BASE_FALLBACK;
    if (!env_server_endpoint) {
      this.server_fallback = true;
      this.server_endpoint = 'Fallback - official';
    } else {
      if (env_server_endpoint.includes('uniiem.com')) {
        this.server_endpoint = 'Official';
      } else {
        this.server_endpoint = env_server_endpoint;
      }
    }
    const server_endpoint_status = new URL('status', this.server_fallback ? sys_server_endpoint_fallback : env_server_endpoint);
    this.$axios.get(server_endpoint_status.href)
      .then(res => {
        if (res.data.status === 'ok') {
          this.server_status = 'online';
          this.server_version = res.data.version;
        } else {
          this.server_status = 'offline';
          this.server_version = 'unavailable';
        }
      })
      .catch(err => {
        this.server_status = 'offline';
        this.server_version = `Failed to fetch (${err.response.status} ${err.response.data.detail})`;
      })
  },
  methods: {
    handleWipe() {
      const self = this;
      this.$confirm({
        title: self.$t('settings.danger_zone.wipe.dialog.title').toString(),
        content: self.$t('settings.danger_zone.wipe.dialog.content').toString(),
        okType: 'danger',
        okText: self.$t('settings.danger_zone.wipe.dialog.okText').toString(),
        cancelText: self.$t('settings.danger_zone.wipe.dialog.cancelText').toString(),
        onOk() {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              self.$store.commit('settings/wipe')
              self.$router.push('/')
              setTimeout(() => {
                self.$router.go(0)
              }, 500);
              resolve()
            }, 1000);
          });
        },
        onCancel() {
        },
      })
    },
  }
})
</script>

<template>
  <PrimaryContainer>
    <div>

      <SettingsArea
        :title="$t('settings.appearance.label').toString()"
        icon="tabler:layout">
        <SettingsItem :title="$t('settings.appearance.language.label').toString()">
          <template #actions>
            <SettingsFormSelect :options="languageOptions" v-model="language"/>
          </template>
        </SettingsItem>
        <SettingsItem :title="$t('settings.appearance.color_mode.label').toString()">
          <template #actions>
            <SettingsFormSelect :options="colorModeOptions" v-model="darkMode"/>
          </template>
        </SettingsItem>
      </SettingsArea>
      <SettingsArea
        :title="$t('settings.about.label').toString()"
        icon="tabler:info-square-rounded">
        <SettingsItem
          :title="$t('settings.about.version.label').toString()"
          :subtitle="$config.version">
          <template #actions>
            <SettingsButton ghost>{{ $t('settings.about.version.check_update_logs').toString() }}</SettingsButton>
          </template>
        </SettingsItem>
        <SettingsItem
          :title="$t('settings.about.follow_us.label').toString()"
          :subtitle="$t('settings.about.follow_us.subtitle').toString()">
          <template #actions>
            <SettingsLink href="https://github.com/UniiemStudio/CTFever" external>GitHub</SettingsLink>
            <SettingsLink href="https://t.me/boxmoe" external>Telegram</SettingsLink>
          </template>
        </SettingsItem>
        <SettingsItem
          :title="$t('settings.about.donate.label').toString()"
          :subtitle="$t('settings.about.donate.subtitle').toString()">
          <template #actions>
            <SettingsLink href="https://afdian.net/a/hoshino_suzumi" external>
              {{ $t('settings.about.donate.link.afdian').toString() }}
            </SettingsLink>
          </template>
        </SettingsItem>
      </SettingsArea>
      <SettingsArea
        :title="$t('settings.backend.label').toString()"
        :subtitle="$t('settings.backend.subtitle').toString()"
        icon="tabler:server-2">
        <SettingsItem
          :title="$t('settings.backend.endpoint.label').toString()"
          :subtitle="`${server_endpoint} (${server_status})`"/>
        <SettingsItem
          :title="$t('settings.backend.version.label').toString()"
          :subtitle="server_version || 'unknown'"/>
      </SettingsArea>
      <SettingsDivider/>
      <SettingsArea
        danger
        :title="$t('settings.danger_zone.label').toString()"
        :subtitle="$t('settings.danger_zone.subtitle').toString()"
        icon="tabler:alert-triangle">
        <SettingsItem
          :title="$t('settings.danger_zone.wipe.label').toString()"
          :subtitle="$t('settings.danger_zone.wipe.subtitle').toString()">
          <template #actions>
            <SettingsButton @click="handleWipe" danger>
              {{ $t('settings.danger_zone.wipe.btn').toString() }}
            </SettingsButton>
          </template>
        </SettingsItem>
      </SettingsArea>

    </div>
  </PrimaryContainer>
</template>

<style>
.ant-modal-content {
  @apply rounded-xl dark:bg-slate-800;
}

.ant-modal-content * {
  @apply dark:text-slate-300;
}

.ant-btn {
  @apply dark:bg-slate-800 inline-flex flex-row items-center gap-x-0.5;
}

.ant-btn-primary {
  background-color: #1890ff;
  @apply dark:!border-slate-500;
}

.ant-btn-danger {
  background-color: #ff4d4f !important;
  @apply dark:!bg-red-500/50 dark:!border-red-500/50;
}
</style>
