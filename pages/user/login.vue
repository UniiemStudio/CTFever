<script setup lang="ts">
import {type InferType, object, string} from 'yup'
import {FormSubmitEvent} from '@nuxt/ui/dist/runtime/types';
import {useMessage} from '~/composables/uni/useMessage';

definePageMeta({
  layout: 'authentication'
})

const message = useMessage()
const runtimeConfig = useRuntimeConfig()

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
</script>

<template>
  <UForm class="w-60 space-y-2" :schema="schema" :state="state" @submit="onSubmit">
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
</template>

<style scoped></style>