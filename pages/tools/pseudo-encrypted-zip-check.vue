<template>
  <PrimaryContainer>
    <div class="primary-form">
      <InteractiveBlock class="space-y-4">
        <PrimaryFileUploader @change="fileChanged"/>
        <PrimaryButton class="w-full" :disable="loading">{{
            loading ? 'Extracting...' : 'Extract'
          }}
        </PrimaryButton>
      </InteractiveBlock>
    </div>
  </PrimaryContainer>
</template>

<script>
import PrimaryContainer from "~/components/tool/PrimaryContainer.vue";
import InteractiveBlock from "~/components/tool/InteractiveBlock.vue";
import PrimaryInput from "~/components/form/PrimaryInput.vue";
import PrimaryButton from "~/components/form/PrimaryButton.vue";
import CodeBlock from "~/components/widgets/CodeBlock.vue";
import PrimaryFileUploader from "~/components/form/PrimaryFileUploader.vue";

export default {
  name: 'PseudoEncryptedZipCheck',
  components: {PrimaryFileUploader, CodeBlock, PrimaryButton, PrimaryInput, InteractiveBlock, PrimaryContainer},
  head() {
    return {
      title: this.$t('tool.pseudoEncryptedZipCheck.title') + ' - ' + this.$t('app.name')
    }
  },
  data() {
    return {
      file: '',
      result: '',
      loading: false,
    }
  },
  methods: {
    fileChanged(files) {
      this.file = files[0];
    },
  },
}
</script>

<style scoped>

</style>
