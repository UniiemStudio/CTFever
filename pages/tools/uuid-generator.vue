<template>
  <PrimaryContainer>
    <InteractiveDoubleColumns>
      <template v-slot:left>
        <InteractiveBlock class="space-y-2">
          <UniSelect :label="$t('common.text_type').toString()" :options="uuidTypes" v-model="type"/>
          <!--          <PrimarySelector :label="$t('common.text_type').toString()" id="type" :options="uuidTypes" v-model="type"/>-->
          <UniButton @click="generate" class="w-full">{{ $t('common.btn_generate').toString() }}</UniButton>
          <PrimaryPreBlock v-if="uuidResult" label="UUID">
            {{ uuidResult }}
          </PrimaryPreBlock>
        </InteractiveBlock>
      </template>
      <template v-slot:right>
        <InteractiveBlock class="space-y-2">
          <UniInput :label="`UUID ${$t('common.text_input')}`" v-model="inputUUID"/>
          <div class="flex flex-row space-x-2">
            <UniButton @click="validate" class="w-full">{{ $t('common.btn_validate').toString() }}</UniButton>
            <UniButton @click="parse" class="w-full">{{ $t('common.btn_parse').toString() }}</UniButton>
            <UniButton @click="version" class="w-full">{{ $t('common.btn_version').toString() }}</UniButton>
          </div>
          <PrimaryPreBlock v-if="validateResult" :label="$t('common.text_output').toString()">
            {{ validateResult }}
          </PrimaryPreBlock>
        </InteractiveBlock>
      </template>
    </InteractiveDoubleColumns>
  </PrimaryContainer>
</template>

<script>
import PrimaryContainer from "~/components/tool/PrimaryContainer";
import InteractiveBlock from "~/components/tool/InteractiveBlock";
import InteractiveDoubleColumns from "~/components/tool/InteractiveDoubleColumns";
import PrimaryPreBlock from "~/components/form/PrimaryPreBlock";

import {NIL as uuidNIL, parse, v1 as uuidv1, v3 as uuidv3, v4 as uuidv4, v5 as uuidv5, validate, version} from 'uuid';

export default {
  name: "uuid-generator",
  components: {
    PrimaryPreBlock, InteractiveDoubleColumns, InteractiveBlock, PrimaryContainer
  },
  head() {
    return {
      title: this.$t("tool.uuid.title") + " - " + this.$t("app.name"),
      meta: [
        {hid: "description", name: "description", content: this.$t("tool.uuid.desc")},
      ],
    };
  },
  data() {
    return {
      uuidTypes: [
        {label: 'NIL', value: 'nil', icon: 'tabler:square-rounded-number-0'},
        {label: 'UUID v1', value: 'v1', icon: 'tabler:square-rounded-number-1'},
        {label: 'UUID v3', value: 'v3', icon: 'tabler:square-rounded-number-3'},
        {label: 'UUID v4', value: 'v4', icon: 'tabler:square-rounded-number-4'},
        {label: 'UUID v5', value: 'v5', icon: 'tabler:square-rounded-number-5'},
      ],
      type: 'v4',
      uuidResult: '',
      inputUUID: '',
      validateResult: '',
    };
  },
  methods: {
    generate() {
      switch (this.type) {
        case 'nil':
          this.uuidResult = uuidNIL;
          break;
        case 'v1':
          this.uuidResult = uuidv1();
          break;
        case 'v3':
          this.uuidResult = uuidv3(uuidv4(), uuidv4());
          break;
        case 'v4':
          this.uuidResult = uuidv4();
          break;
        case 'v5':
          this.uuidResult = uuidv5(uuidv4(), uuidv4());
          break;
      }
    },
    validate() {
      this.validateResult = validate(this.inputUUID) ? '✅ Valid' : '❌ invalid';
    },
    parse() {
      if (validate(this.inputUUID)) {
        this.validateResult = [...parse(this.inputUUID)].map((v) => v.toString(16).padStart(2, '0'));
      } else {
        this.validateResult = '❌ invalid UUID';
      }
    },
    version() {
      if (validate(this.inputUUID)) {
        this.validateResult = `Version: UUIDv${version(this.inputUUID)}`;
      } else {
        this.validateResult = '❌ invalid UUID';
      }
    }
  }
}
</script>

<style scoped>

</style>
