<template>
  <PrimaryContainer>
    <div class="primary-form">
      <InteractiveDoubleColumns>
        <template v-slot:left>
          <InteractiveBlock class="space-y-2">
            <PrimaryFileUploader @change="fileChanged" :mime-type="['image/*', 'png', 'jpg']"/>
            <PrimaryButton class="w-full" @click="download" :disable="!imageBase64">下载</PrimaryButton>
          </InteractiveBlock>
        </template>
        <template v-slot:right>
          <div class="w-full rounded-lg overflow-hidden">
            <img v-if="imageBase64"
                 class="w-full aspect-auto object-cover border border-slate-300 dark:border-slate-600"
                 :src="imageBase64" alt="Placeholder">
            <div v-else class="w-full h-40 border-2 border-dashed rounded-lg border-slate-300 dark:border-slate-600
                               flex justify-center items-center">
              <ion-icon class="text-4xl text-gray-400 dark:text-slate-400" name="image-outline"></ion-icon>
            </div>
            <InteractiveDoubleColumns class="mt-2">
              <template v-slot:left>
                <PrimaryButton class="w-full" @click="copy" :disable="!imageBase64">复制</PrimaryButton>
              </template>
              <template v-slot:right>
                <PrimaryButton class="w-full" @click="paste">从剪贴板获取</PrimaryButton>
              </template>
            </InteractiveDoubleColumns>
          </div>
        </template>
      </InteractiveDoubleColumns>
    </div>
  </PrimaryContainer>
</template>

<script>
import PrimaryContainer from "~/components/tool/PrimaryContainer.vue";
import InteractiveDoubleColumns from "~/components/tool/InteractiveDoubleColumns.vue";
import InteractiveBlock from "~/components/tool/InteractiveBlock.vue";
import PrimaryFileUploader from "~/components/form/PrimaryFileUploader.vue";
import PrimaryButton from "~/components/form/PrimaryButton.vue";

export default {
  name: 'Base64ToImage',
  components: {
    PrimaryButton, PrimaryFileUploader, InteractiveBlock, InteractiveDoubleColumns, PrimaryContainer
  },
  head() {
    return {
      title: this.$t('tool.base64ToImage.title') + ' - ' + this.$t('app.name'),
      meta: [
        {hid: "description", name: "description", content: this.$t("tool.base64ToImage.desc")},
      ],
    }
  },
  data() {
    return {
      file: null,
      imageBase64: null
    }
  },
  methods: {
    fileChanged(files) {
      this.file = files[0];
      this.convert();
    },
    convert() {
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        this.imageBase64 = reader.result;
      }
    },
    paste() {
      navigator.clipboard.readText().then(text => {
        this.imageBase64 = text;
      });
    },
    download() {
      const elem = document.createElement('a');
      elem.href = this.imageBase64;
      elem.download = 'image.png';
      elem.style.display = 'none';
      document.body.appendChild(elem);
      elem.click();
      document.body.removeChild(elem);
    },
    copy() {
      navigator.clipboard.writeText(this.imageBase64).then(() => {
        this.$message.info('已复制到剪贴板');
      });
    },
  }
}

</script>

<style scoped>

</style>
