<script setup lang="ts">

</script>

<template>
  <div class="lg:mt-6 mt-4 p-4 rounded-lg border border-gray-200 bg-gray-50 dark:bg-slate-800 dark:border-slate-500">
    <article
      class="prose prose-sm max-w-none reset-code overflow-x-auto dark:prose-p:text-slate-300 dark:prose-headings:text-slate-300 dark:prose-strong:text-slate-300 dark:prose-table:text-slate-300 nuxt-content">
      <ContentQuery :path="'/intro/caesar-ciphera'" find="one">
        <template #default="{data}">
          <ContentRenderer :value="data"/>
        </template>
        <template #not-found>
          asd
        </template>
      </ContentQuery>
    </article>
  </div>
</template>

<style scoped>

</style>