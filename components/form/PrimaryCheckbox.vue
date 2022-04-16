<template>
  <div>
    <label v-if="label" class="inline text-gray-700 text-sm font-bold" :for="id">
      {{ label }}
    </label>
    <input
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      :id="id" :type="type" :placeholder="placeholder" :value="value" @input="onInput" :disabled="disable"
      :autocomplete="autocomplete"/>
  </div>
</template>

<script>
export default {
  name: "PrimaryCheckbox"
}
</script>

<style scoped>

</style>
