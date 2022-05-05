<template>
  <PrimaryContainer>
    <form class="primary-form">
      <InteractiveBlock>
        <PrimaryArea id="input" :label="$t('common.text_original_content').toString()" v-model="input" :rows="10"/>
      </InteractiveBlock>
      <InteractiveBlock>
        <PrimarySelector id="algorithm" :label="$t('common.text_algorithm').toString()" v-model="algorithm"
                         :options="algorithms"/>
      </InteractiveBlock>
      <InteractiveBlock>
        <PrimaryPreBlock :label="$t('common.text_result_content').toString()">{{ output }}</PrimaryPreBlock>
      </InteractiveBlock>
    </form>
  </PrimaryContainer>
</template>

<script>
import PrimaryContainer from "~/components/tool/PrimaryContainer";
import InteractiveBlock from "~/components/tool/InteractiveBlock";
import PrimaryArea from "~/components/form/PrimaryTextArea";
import PrimaryPreBlock from "~/components/form/PrimaryPreBlock";
import PrimarySelector from "~/components/form/PrimarySelector";

import md5 from 'js-md5';
import sha1 from 'js-sha1';
import {sha224, sha256} from 'js-sha256';
import {sha384, sha512, sha512_224, sha512_256} from 'js-sha512';

export default {
  name: "message-digest",
  components: {PrimarySelector, PrimaryPreBlock, PrimaryArea, InteractiveBlock, PrimaryContainer},
  head() {
    return {
      title: this.$t("tool.messageDigest.title") + " - " + this.$t("app.name")
    };
  },
  watch: {
    input: function (val) {
      this.updateOutput();
    },
    algorithm: function (val) {
      this.updateOutput();
    }
  },
  methods: {
    updateOutput() {
      if (this.input !== '') {
        switch (this.algorithm) {
          case 'md5':
            this.output = md5(this.input);
            break;
          case 'sha1':
            this.output = sha1(this.input);
            break;
          case 'sha256':
            this.output = sha256(this.input);
            break;
          case 'sha224':
            this.output = sha224(this.input);
            break;
          case 'sha512':
            this.output = sha512(this.input);
            break;
          case 'sha384':
            this.output = sha384(this.input);
            break;
          case 'sha512_256':
            this.output = sha512_256(this.input);
            break;
          case 'sha512_224':
            this.output = sha512_224(this.input);
            break;
          default:
            this.output = '';
        }
      }
    },
  },
  data() {
    return {
      input: "",
      output: "",
      algorithm: "md5",
      algorithms: [
        {
          label: "MD5",
          value: "md5"
        },
        {
          label: "SHA1",
          value: "sha1"
        },
        {
          label: "SHA256",
          value: "sha256"
        },
        {
          label: "SHA224",
          value: "sha224"
        },
        {
          label: "SHA512",
          value: "sha512"
        },
        {
          label: "SHA384",
          value: "sha384"
        },
        {
          label: "SHA512_256",
          value: "sha512_256"
        },
        {
          label: "SHA512_224",
          value: "sha512_224"
        }
      ],
    };
  },
}
</script>

<style scoped>

</style>
