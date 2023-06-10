<template>
  <PrimaryContainer>
    <GridWithDoubleColumns>
      <InteractiveBlock>
        <UniInput id="timestamp" :label="$t('tool.timeStamp.timestamp').toString()" @input="changeTimestamp"
                  :value="isUnixTime ? date.unix() : date.valueOf()" copyable
                  :pattern="isUnixTime ? /^\d{10}$/g : /^\d{13}$/g"/>
      </InteractiveBlock>
      <InteractiveBlock>
        <UniInput id="human-readable" :label="$t('tool.timeStamp.humanReadable').toString()"
                  @input="changeHumanDate" :value="humanReadable" copyable
                  :pattern="/^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}$/g"/>
      </InteractiveBlock>
      <InteractiveBlock>
        <UniSelect id="unit" :label="$t('tool.timeStamp.unit').toString()" :options="units" value="sec"
                   @input="(val)=>this.isUnixTime = val === 'sec'" v-model="unit"/>
      </InteractiveBlock>
      <InteractiveBlock>
        <UniButton class="w-full mt-2 md:mt-6" @click="refreshDayjs">
          {{ $t('tool.timeStamp.now').toString() }}
        </UniButton>
      </InteractiveBlock>
    </GridWithDoubleColumns>
    <hr class="mt-3 mb-4 dark:border-slate-500"/>
    <GridWithDoubleColumns>
      <InteractiveBlock>
        <UniInput id="utc" :label="$t('tool.timeStamp.utc').toString()" :value="date.utc().format()" disabled
                  copyable/>
      </InteractiveBlock>
      <InteractiveBlock>
        <UniInput id="from-now" :label="$t('tool.timeStamp.fromNow').toString()" :value="date.fromNow()" disabled
                  copyable/>
      </InteractiveBlock>
      <InteractiveBlock>
        <UniInput id="day-of-year" :label="$t('tool.timeStamp.dayOfYear').toString()" :value="date.dayOfYear()"
                  disabled copyable/>
      </InteractiveBlock>
      <InteractiveBlock>
        <UniInput id="week-of-year" :label="$t('tool.timeStamp.weekOfYear').toString()" :value="date.isoWeek()"
                  disabled copyable/>
      </InteractiveBlock>
    </GridWithDoubleColumns>
  </PrimaryContainer>
</template>

<script>
import PrimaryContainer from "~/components/tool/PrimaryContainer";
import InteractiveBlock from "~/components/tool/InteractiveBlock";
import GridWithDoubleColumns from "~/components/form/GridWithDoubleColumns";

import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

dayjs.extend(require('dayjs/plugin/utc'));
dayjs.extend(require('dayjs/plugin/relativeTime'));
dayjs.extend(require('dayjs/plugin/dayOfYear'));
dayjs.extend(require('dayjs/plugin/isoWeek'));
dayjs.extend(require('dayjs/plugin/customParseFormat'));

export default {
  name: "timestamp",
  components: {GridWithDoubleColumns, InteractiveBlock, PrimaryContainer},
  head() {
    return {
      title: this.$t("tool.timeStamp.title") + " - " + this.$t("app.name"),
      meta: [
        {hid: "description", name: "description", content: this.$t("tool.timeStamp.desc")},
      ],
    };
  },
  data() {
    return {
      isUnixTime: true,
      date: dayjs(),
      humanReadable: '',
      isHumanReadable: true,
      unit: 'sec',
      units: [
        {
          label: 'sec',
          value: 'sec',
          icon: 'tabler:circle'
        },
        {
          label: 'msec',
          value: 'msec',
          icon: 'tabler:circle-dot'
        }
      ]
    }
  },
  beforeCreate() {
    dayjs.locale(this.$i18n.locales.filter(i => i.code === this.$i18n.locale)[0].iso);
    this.$nextTick(() => {
      this.date = dayjs();
      this.humanReadable = this.date.format("YYYY-MM-DD HH:mm:ss");
    })
  },
  beforeMount() {
  },
  methods: {
    changeTimestamp(val) {
      let timestamp = Number(val.toString().replace(/\D/g, ''));
      if (this.isUnixTime) timestamp = timestamp * 1000;
      this.date = dayjs(timestamp);
      this.humanReadable = dayjs(timestamp).format("YYYY-MM-DD HH:mm:ss");
    },
    changeHumanDate(val) {
      this.humanReadable = val;
      const newTime = dayjs(val, 'YYYY-MM-DD HH:mm:ss');
      if (newTime.isValid()) {
        this.date = newTime;
        this.humanReadable = this.date.format("YYYY-MM-DD HH:mm:ss");
      }
    },
    refreshDayjs() {
      this.date = dayjs();
      this.humanReadable = this.date.format("YYYY-MM-DD HH:mm:ss");
    }
  },
}
</script>

<style scoped>

</style>
