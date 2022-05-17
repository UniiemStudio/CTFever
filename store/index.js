import createVuexAlong from 'vuex-along';

export const plugins = [createVuexAlong({
  name: "ctfever-preferences",
  local: {
    list: ["toolkits"],
    isFilter: true,
  },
})];

export const state = () => ({
  toolkits: [
    {
      title: 'toolkit.EaD.title',
      description: 'toolkit.EaD.desc',
      icon: 'code-outline',
      tools: [
        {
          title: 'tool.ascii.title',
          description: 'tool.ascii.desc',
          route: '/tools/ascii',
          tags: ['字符编码'],
        },
        {
          title: 'tool.urlEncoding.title',
          description: 'tool.urlEncoding.desc',
          route: '/tools/url-encoding',
          tags: ['字符编码'],
        },
        {
          title: 'tool.baseSeries.title',
          description: 'tool.baseSeries.desc',
          route: '/tools/base-series',
          tags: ['字符编码'],
        },
        {
          title: "tool.rotSeries.title",
          description: 'tool.rotSeries.desc',
          route: '/tools/rot-series',
          tags: ['字符编码'],
        },
        {
          title: 'tool.morseCode.title',
          description: 'tool.morseCode.desc',
          route: '/tools/morse-code',
          tags: ['字符编码'],
        },
      ]
    },
    {
      title: 'toolkit.cryptography.title',
      description: 'toolkit.cryptography.desc',
      icon: 'key-outline',
      tools: [
        {
          title: 'tool.uuid.title',
          description: 'tool.uuid.desc',
          route: '/tools/uuid-generator',
          tags: ['信息摘要'],
        },
        {
          title: 'tool.messageDigest.title',
          description: 'tool.messageDigest.desc',
          route: '/tools/message-digest',
          tags: ['信息摘要'],
        },
        {
          title: 'tool.caesarCipher.title',
          description: 'tool.caesarCipher.desc',
          route: '/tools/caesar-cipher',
          tags: ['加密算法'],
        },
        {
          title: 'tool.railFenceCipher.title',
          description: 'tool.railFenceCipher.desc',
          route: '/tools/rail-fence-cipher',
          tags: ['加密算法'],
        },
        {
          title: 'tool.pigpen.title',
          description: 'tool.pigpen.desc',
          route: '/tools/pigpen',
          tags: ['加密算法'],
        },
        {
          title: 'tool.vigenereCipher.title',
          description: 'tool.vigenereCipher.desc',
          route: '/tools/vigenereCipher',
          tags: ['加密算法'],
        },
      ]
    },
    {
      title: 'toolkit.programRelated.title',
      description: 'toolkit.programRelated.desc',
      icon: 'bug-outline',
      tools: [
        {
          title: 'tool.pycDecompiler.title',
          description: 'tool.pycDecompiler.desc',
          route: '/tools/pyc-decompiler',
          tags: ['反编译'],
          disabled: true,
        },
        {
          title: 'tool.jsFuck.title',
          description: 'tool.jsFuck.desc',
          route: '/tools/jsfuck',
          tags: ['混淆'],
        },
        {
          title: 'tool.brainFuck.title',
          description: 'tool.brainFuck.desc',
          route: '/tools/brain-fuck',
          tags: ['编译器'],
        }
      ]
    },
    {
      title: 'toolkit.networkTool.title',
      description: 'toolkit.networkTool.desc',
      icon: 'globe-outline',
      tools: [
        {
          title: 'tool.ipAttribution.title',
          description: 'tool.ipAttribution.desc',
          route: '/tools/ip-geo',
          tags: ['IP2Geo'],
          disabled: true,
        },
        {
          title: 'HTTP(s) 请求头',
          description: '查看 HTTP(s) 请求头信息',
          route: '/tools/http-headers',
          tags: ['HTTP'],
          disabled: true,
        },
      ]
    },
    {
      title: 'toolkit.dataConversion.title',
      description: 'toolkit.dataConversion.desc',
      icon: 'hardware-chip-outline',
      tools: [
        {
          title: 'tool.radixConversion.title',
          description: 'tool.radixConversion.desc',
          route: '/tools/radix-conversion',
          tags: ['数据处理'],
        },
        {
          title: 'tool.timeStamp.title',
          description: 'tool.timeStamp.desc',
          route: '/tools/timestamp',
          tags: ['数据处理'],
          disabled: true,
        },
      ]
    },
    {
      title: 'toolkit.misc.title',
      description: 'toolkit.misc.desc',
      icon: 'construct-outline',
      tools: [
        {
          title: 'tool.serialTool.title',
          description: 'tool.serialTool.desc',
          route: '/tools/serial',
          tags: ['调试工具'],
        },
        {
          title: 'tool.crc.title',
          description: 'tool.crc.desc',
          route: '/tools/crc-checksum',
          tags: ['信息摘要', '校验'],
        },
        {
          title: 'tool.temperatureConversion.title',
          description: 'tool.temperatureConversion.desc',
          route: '/tools/temperature-conversion',
          tags: ['数据转换'],
          disabled: true,
        },
        {
          title: 'Base64 图片转换',
          description: '图片和 Base64 互相转换',
          route: '/tools/base-to-image',
          tags: ['图片处理'],
          disabled: true,
        },
        {
          title: '与佛论禅',
          description: '面对这个纷繁复杂的世界, 真神会如何作答呢',
          route: '/tools/core-values-cipher',
          tags: ['加密算法'],
          disabled: true,
        },
        {
          title: '核心价值观密码',
          description: '富强民主文明和谐自由平等公正法制爱国敬业诚信友善！',
          route: '/tools/core-values-cipher',
          tags: ['加密算法'],
          disabled: true,
        },
      ]
    }
  ],
})
