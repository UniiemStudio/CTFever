<template>
  <div class="lg:m-8 lg:mt-6 p-4 bg-white rounded-lg border border-gray-200 bg-gray-50">
    <p class="font-bold text-lg mb-1.5" v-if="title">{{ title }}</p>
    <div class="mb-4" v-if="document">
      <nuxt-content class="prose prose-sm max-w-none reset-code" :document="document"/>
    </div>
    <div class="flex flex-col" v-if="references">
      <p class="font-bold text-lg mb-1">References</p>
      <a v-for="reference in references" :href="reference.url"
         class="group text-blue-500 mr-1 italic" target="_blank">
        {{ reference.name }}
        <ion-icon class="align-middle -mt-0.5 transition-transform group-hover:translate-x-1"
                  name="arrow-forward-outline"/>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "PrimaryIntroduction",
  props: {
    title: {
      type: String,
      default: null
    },
    references: {
      type: Array,
      default: false
    },
    document: {
      type: Object,
      default: null
    }
  }
}
</script>

<style>
.reset-code {
  @apply prose-code:before:content-none prose-code:after:content-none prose-code:rounded prose-code:bg-gray-300 prose-code:py-0.5 prose-code:px-1 prose-code:mx-0.5;
}
</style>
