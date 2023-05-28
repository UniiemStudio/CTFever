<script>
import {defineComponent} from 'vue'
import {Icon} from "@iconify/vue2";

export default defineComponent({
  name: "SettingsLink",
  components: {Icon},
  props: {
    href: {
      type: String,
      default: null,
      required: true
    },
    external: {
      type: Boolean,
      default: false
    },
    target: {
      type: String,
      default: "_self"
    },
    rel: {
      type: String,
      default: "noopener noreferrer"
    }
  }
})
</script>

<template>
  <a v-if="external" :href="href" target="_blank" :rel="rel"
     class="flex flex-row items-center text-sm font-bold text-blue-500 hover:text-blue-400
            dark:text-blue-400/80 dark:hover:text-blue-400 transition">
    <slot/>
    <Icon icon="tabler:external-link" class="inline -mt-0.5"/>
  </a>
  <nuxt-link v-else :to="href" :target="target" :rel="rel"
             class="text-sm font-bold text-blue-500 hover:text-blue-400
                    dark:text-blue-400/80 dark:hover:text-blue-400 transition">
    <slot/>
  </nuxt-link>
</template>

<style scoped>

</style>
