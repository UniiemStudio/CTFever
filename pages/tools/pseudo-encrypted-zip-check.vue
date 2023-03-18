<template>
  <PrimaryContainer>
    <div class="primary-form">
      <InteractiveBlock class="space-y-4">
        <PrimaryFileUploader @change="fileChanged"/>
        <PrimaryButton class="w-full" :disable="loading" @click="check">{{
            loading ? 'Uploading...' : 'Check'
          }}
        </PrimaryButton>
      </InteractiveBlock>
      <InteractiveDoubleColumns v-if="result">
        <template v-slot:left>
          <div
            class="flex flex-col justify-center items-center p-4 bg-gray-100 dark:bg-slate-700 dark:text-slate-300 rounded-lg">
            <div class="flex flex-col items-center">
              <ion-icon v-if="result && result.assert === 1" class="text-6xl" name="glasses-outline"></ion-icon>
              <ion-icon v-if="result && result.assert === 0" class="text-6xl" name="document-lock-outline"></ion-icon>
              <ion-icon v-if="result && result.assert === -1" class="text-6xl" name="lock-open-outline"></ion-icon>
              <ion-icon v-if="result && result.assert === -2" class="text-6xl" name="help-circle-outline"></ion-icon>
              <p v-if="result && result.assert === 1" class="text-lg font-bold text-orange-500">伪加密</p>
              <p v-if="result && result.assert === 0" class="text-lg font-bold text-green-500">加密</p>
              <p v-if="result && result.assert === -1" class="text-lg font-bold text-blue-500">未加密</p>
              <p v-if="result && result.assert === -2" class="text-lg font-bold text-gray-500">未知</p>
            </div>
            <p class="text-xs mt-2 text-center">{{ result && assertDesc[result.assert + 2] }}</p>
          </div>
        </template>
        <template v-slot:right>
          <div class="flex flex-col p-4 bg-gray-100 dark:bg-slate-700 rounded-lg h-full">
            <div class="flex flex-row justify-between items-center">
              <p class="text-sm font-bold dark:text-slate-300">特征</p>
              <p class="text-sm font-bold dark:text-slate-300">节选 HEX 数据</p>
            </div>
            <div class="w-full h-px bg-gray-200 dark:bg-slate-600 mt-2"></div>
            <div class="flex flex-col h-full justify-evenly">
              <div class="flex flex-row justify-between items-center mt-2">
                <p class="text-sm font-normal dark:text-slate-300">内容块</p>
                <div class="text-xs font-bold dark:text-slate-300 font-mono flex flex-row justify-around items-center
                          w-fit p-0 ">
                  <div v-for="(item, k) in decList2Hex(result.characteristics[0])" :key="k"
                       class="text-center px-1 py-1 inline-block leading-none"
                       :class="{
                               'bg-green-400/50 dark:bg-green-400/50': k === 3 || k === 4,
                               'bg-orange-400/50 dark:bg-orange-400/50 font-black': (k === 3 || k === 4) && result.assert === 1,
                               'bg-blue-400/25 dark:bg-blue-400/25': k !== 3 && k !== 4,
                             }">
                    {{ item }}
                  </div>
                </div>
              </div>
              <div class="flex flex-row justify-between items-center mt-2">
                <p class="text-sm font-normal dark:text-slate-300">文件头</p>
                <div class="text-xs font-bold dark:text-slate-300 font-mono flex flex-row justify-around items-center
                          w-fit p-0 ">
                  <div v-for="(item, k) in decList2Hex(result.characteristics[1])" :key="k"
                       class="text-center px-1 py-1 inline-block leading-none"
                       :class="{
                               'bg-green-400/50 dark:bg-green-400/50': (k === 3 || k === 4) && result.assert !== 1,
                               'bg-orange-400/50 dark:bg-orange-400/50 font-black': (k === 3 || k === 4) && result.assert === 1,
                               'bg-blue-400/25 dark:bg-blue-400/25': k !== 3 && k !== 4,
                             }">
                    {{ item }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </InteractiveDoubleColumns>
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
import InteractiveDoubleColumns from "~/components/tool/InteractiveDoubleColumns.vue";

// TODO: i18n

export default {
  name: 'PseudoEncryptedZipCheck',
  components: {
    InteractiveDoubleColumns,
    PrimaryFileUploader, CodeBlock, PrimaryButton, PrimaryInput, InteractiveBlock, PrimaryContainer
  },
  head() {
    return {
      title: this.$t('tool.pseudoEncryptedZipCheck.title') + ' - ' + this.$t('app.name')
    }
  },
  data() {
    return {
      file: '',
      result: null,
      // result: {
      //   assert: 0,
      //   characteristics: [
      //     [4, 20, 0, 9, 0, 8, 0, 162],
      //     [0, 20, 0, 9, 0, 8, 0, 162]
      //   ]
      // },
      loading: false,
      assertDesc: {
        3: '伪加密的压缩包可以使用任意压缩软件打开，但是里面的文件无法正常解压',
        2: '正常且加密的 Zip 压缩包，可以查看但需要密码才能解压',
        1: '正常 Zip 压缩包，可以使用任意压缩软件打开并解压',
        0: '文件损坏或不是 Zip 压缩包'
      }
    }
  },
  methods: {
    fileChanged(files) {
      this.file = files[0];
    },
    check() {
      if (this.file === '') return this.$message.error('请选择文件');
      this.loading = true;
      this.$api.tool.zipUtil.pseudo_check(this.file).then(res => {
        this.result = res.data.result;
        // 1 伪加密, 0 真加密, -1 未加密, -2 文件错误
        console.log(this.result)
      }).catch(err => {
        if (err.response) {
          this.$message.error(err.response.data.detail);
        } else {
          this.$message.error(err.toJSON().message);
        }
      }).finally(() => {
        this.loading = false;
      });
    },
    decList2Hex(list, to_str = false, separator = ' ') {
      let ret = list.map(item => item.toString(16).padStart(2, '0').toUpperCase());
      if (to_str) ret = ret.join(separator);
      return ret;
    },
  },
}
</script>

<style scoped>

</style>
