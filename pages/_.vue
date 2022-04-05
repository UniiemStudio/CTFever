<template>

</template>

<script>
export default {
  asyncData(ctx) {
    return ctx.redirect(404, '/not-found', {'missing': ctx.route.path})
  }
}
</script>

<style scoped>

</style>
