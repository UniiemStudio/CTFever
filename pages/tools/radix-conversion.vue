<template>
  <PrimaryContainer>
    <InteractiveBlock class="space-y-2">
      <UniInput 
        id="radix-2" 
        v-model="formData['r2']" 
        :label="$t('common.radix.bin').toString()"
        @input="inputHandler('r2')" 
        placeholder="Binary..." 
        copyable 
        :pattern="/^[0-1]+$/g"
        :class="{ 'error': errors.r2 }"
        :style="errors.r2 ? 'border-color: #ef4444;' : ''"
      />
      <UniInput 
        id="radix-8" 
        v-model="formData['r8']" 
        :label="$t('common.radix.oct').toString()"
        @input="inputHandler('r8')" 
        placeholder="Octal..." 
        copyable 
        :pattern="/^[0-7]+$/g"
        :class="{ 'error': errors.r8 }"
        :style="errors.r8 ? 'border-color: #ef4444;' : ''"
      />
      <UniInput 
        id="radix-10" 
        v-model="formData['r10']" 
        :label="$t('common.radix.dec').toString()"
        @input="inputHandler('r10')" 
        placeholder="Decimal..." 
        copyable 
        type="number" 
        :pattern="/^[^e-]+$/g"
        :class="{ 'error': errors.r10 }"
        :style="errors.r10 ? 'border-color: #ef4444;' : ''"
      />
      <UniInput 
        id="radix-16" 
        v-model="formData['r16']" 
        :label="$t('common.radix.hex').toString()"
        @input="inputHandler('r16')" 
        placeholder="Hexadecimal..." 
        copyable 
        :pattern="/^[0-9a-fA-F]+$/g"
        :class="{ 'error': errors.r16 }"
        :style="errors.r16 ? 'border-color: #ef4444;' : ''"
      />
      <UniInput 
        id="readable" 
        v-model="formData['readable']" 
        :label="$t('tool.radixConversion.readable').toString()"
        @input="inputHandler('readable')" 
        placeholder="Readable..." 
        copyable
        :class="{ 'error': errors.readable }"
        :style="errors.readable ? 'border-color: #ef4444;' : ''"
      />
    </InteractiveBlock>
  </PrimaryContainer>
</template>

<script>
import PrimaryContainer from "~/components/tool/PrimaryContainer";
import PrimaryIntroduction from "~/components/tool/PrimaryIntroduction";
import InteractiveBlock from "~/components/tool/InteractiveBlock";

import {decimal_to_readable, radixc, readable_to_decimal, isValidRadixString} from '~/libs/radixc';

export default {
  name: "radix-conversion",
  components: {InteractiveBlock, PrimaryIntroduction, PrimaryContainer},
  head() {
    return {
      title: this.$t("tool.radixConversion.title") + " - " + this.$t("app.name"),
      meta: [
        {hid: "description", name: "description", content: this.$t("tool.radixConversion.desc")},
      ],
    };
  },
  mounted() {
    // 优先处理十进制查询参数，以十进制为基准恢复所有值
    this.initializeFromQuery();
  },
  data() {
    return {
      formData: {
        ['r2']: "",
        ['r8']: "",
        ['r10']: "",
        ['r16']: "",
        ['readable']: "",
      },
      errors: {
        ['r2']: false,
        ['r8']: false,
        ['r10']: false,
        ['r16']: false,
        ['readable']: false,
      },
      isConverting: false,
    };
  },
  methods: {
    /**
     * 从URL查询参数初始化，优先使用十进制作为基准
     */
    initializeFromQuery() {
      const query = this.$route.query;
      
      // 优先检查十进制参数
      if (query.r10 && query.r10 !== '') {
        this.formData.r10 = query.r10;
        this.inputHandler('r10');
        return;
      }
      
      // 如果没有十进制参数，按优先级检查其他参数
      const priorityOrder = ['r16', 'r8', 'r2', 'readable'];
      
      for (const format of priorityOrder) {
        if (query[format] && query[format] !== '') {
          this.formData[format] = query[format];
          this.inputHandler(format);
          return;
        }
      }
    },

    /**
     * 安全的进制转换函数
     * @param {string} val - 输入值
     * @param {number} from - 源进制
     * @param {number} to - 目标进制
     * @returns {string} 转换结果
     */
    convert(val, from, to) {
      try {
        return radixc(val, from, to);
      } catch (error) {
        console.warn(`Conversion error: ${error.message}`);
        return '';
      }
    },

    /**
     * 清除所有错误状态
     */
    clearErrors() {
      for (let format in this.errors) {
        this.errors[format] = false;
      }
    },

    /**
     * 设置特定字段的错误状态
     * @param {string} field - 字段名
     * @param {boolean} hasError - 是否有错误
     */
    setError(field, hasError) {
      this.$set(this.errors, field, hasError);
    },

    /**
     * 验证输入值是否符合指定进制
     * @param {string} value - 输入值
     * @param {string} format - 格式 (r2, r8, r10, r16, readable)
     * @returns {boolean} 是否有效
     */
    validateInput(value, format) {
      if (!value || value.trim() === '') {
        return true; // 空值被认为是有效的
      }

      try {
        if (format === 'readable') {
          // 验证可读格式
          readable_to_decimal(value);
          return true;
        } else {
          // 验证数字进制格式
          const radix = parseInt(format.replace('r', ''));
          return isValidRadixString(value.trim(), radix);
        }
      } catch (error) {
        return false;
      }
    },

    /**
     * 处理输入事件
     * @param {string} eventFormat - 输入字段格式
     */
    inputHandler(eventFormat) {
      if (this.isConverting) return;
      
      const eventValue = this.formData[eventFormat];
      
      // 更新 URL 查询参数
      this.updateUrlQuery(eventFormat, eventValue);
      
      // 清除所有错误
      this.clearErrors();
      
      // 如果输入为空，清空所有字段
      if (!eventValue || eventValue.trim() === '') {
        this.clearAllFields(eventFormat);
        return;
      }
      
      // 验证输入
      if (!this.validateInput(eventValue, eventFormat)) {
        this.setError(eventFormat, true);
        return;
      }
      
      this.isConverting = true;
      
      try {
        if (eventFormat === 'readable') {
          this.convertFromReadable(eventValue, eventFormat);
        } else {
          this.convertFromRadix(eventValue, eventFormat);
        }
      } catch (error) {
        console.error('Conversion error:', error);
        this.setError(eventFormat, true);
      } finally {
        this.isConverting = false;
      }
    },

    /**
     * 从可读格式转换到其他格式
     * @param {string} eventValue - 输入值
     * @param {string} eventFormat - 输入字段格式
     */
    convertFromReadable(eventValue, eventFormat) {
      try {
        const decimalBigInt = readable_to_decimal(eventValue);
        const decimalString = decimalBigInt.toString();
        
        for (let format in this.formData) {
          if (format !== eventFormat) {
            if (format === 'readable') {
              continue; // 跳过自己
            }
            
            const targetRadix = parseInt(format.replace('r', ''));
            this.formData[format] = this.convert(decimalString, 10, targetRadix);
          }
        }
      } catch (error) {
        throw new Error(`Failed to convert from readable: ${error.message}`);
      }
    },

    /**
     * 从数字进制转换到其他格式
     * @param {string} eventValue - 输入值
     * @param {string} eventFormat - 输入字段格式
     */
    convertFromRadix(eventValue, eventFormat) {
      try {
        const sourceRadix = parseInt(eventFormat.replace('r', ''));
        
        for (let format in this.formData) {
          if (format !== eventFormat) {
            if (format === 'readable') {
              // 转换为可读格式
              const decimalString = this.convert(eventValue, sourceRadix, 10);
              this.formData[format] = decimal_to_readable(decimalString);
            } else {
              // 转换为其他进制
              const targetRadix = parseInt(format.replace('r', ''));
              this.formData[format] = this.convert(eventValue, sourceRadix, targetRadix);
            }
          }
        }
      } catch (error) {
        throw new Error(`Failed to convert from radix: ${error.message}`);
      }
    },

    /**
     * 清空所有字段（除了当前输入字段）
     * @param {string} exceptFormat - 保留的字段格式
     */
    clearAllFields(exceptFormat) {
      for (let format in this.formData) {
        if (format !== exceptFormat) {
          this.formData[format] = '';
        }
      }
    },

    /**
     * 更新 URL 查询参数，始终以十进制为基准
     * @param {string} format - 字段格式
     * @param {string} value - 字段值
     */
    updateUrlQuery(format, value) {
      // 如果输入为空，清空URL参数
      if (!value || value.trim() === '') {
        this.$router.replace({
          query: {}
        }).catch(() => {
          // 忽略路由错误
        });
        return;
      }

      // 始终以十进制作为URL参数的基准
      let decimalValue = '';
      
      try {
        if (format === 'r10') {
          // 如果本身就是十进制，直接使用
          decimalValue = value;
        } else if (format === 'readable') {
          // 如果是可读格式，转换为十进制
          const bigIntValue = readable_to_decimal(value);
          decimalValue = bigIntValue.toString();
        } else {
          // 如果是其他进制，先转换为十进制
          const sourceRadix = parseInt(format.replace('r', ''));
          decimalValue = this.convert(value, sourceRadix, 10);
        }

        // 更新URL参数，只保存十进制值
        this.$router.replace({
          query: {
            r10: decimalValue
          }
        }).catch(() => {
          // 忽略路由错误
        });
      } catch (error) {
        // 如果转换失败，清空URL参数
        this.$router.replace({
          query: {}
        }).catch(() => {
          // 忽略路由错误
        });
      }
    },
  },
  watch: {
    'formData.r16': function (val) {
      if (val) {
        this.formData.r16 = val.toUpperCase();
      }
    },
  }
}
</script>

<style scoped>
.error {
  @apply border-red-500;
}

/* 为输入框添加错误状态的渐变效果 */
.error input {
  @apply border-red-500 ring-red-500;
}

/* 错误状态下的焦点样式 */
.error input:focus {
  @apply ring-2 ring-red-500 border-red-500;
}
</style>
