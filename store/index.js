import createVuexAlong from 'vuex-along';

export const plugins = [createVuexAlong({
  name: "ctfever-preferences",
  local: {
    list: ["toolkits"],
    isFilter: true,
  },
})];

/**
 * @description All of the tag categories, which indicates the i18n text path.
 * @readonly
 * @enum {string}
 */
export const tagCategories = Object.freeze({
  encodingAndDecoding: 'tags.encodingAndDecoding',
  generator: 'tags.generator',
  hash: 'tags.hash',
  encryptionAndDecryption: 'tags.encryptionAndDecryption',
  conversion: 'tags.conversion',
  disassembler: 'tags.disassembler',
  obfuscation: 'tags.obfuscation',
  complier: 'tags.complier',
  utility: 'tags.utility',
  inspection: 'tags.inspection'
});

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
          tags: [tagCategories.encodingAndDecoding]
        },
        {
          title: 'tool.urlEncoding.title',
          description: 'tool.urlEncoding.desc',
          route: '/tools/url-encoding',
          tags: [tagCategories.encodingAndDecoding]
        },
        {
          title: 'tool.baseSeries.title',
          description: 'tool.baseSeries.desc',
          route: '/tools/base-series',
          tags: [tagCategories.encodingAndDecoding]
        },
        {
          title: 'tool.rotSeries.title',
          description: 'tool.rotSeries.desc',
          route: '/tools/rot-series',
          tags: [tagCategories.encodingAndDecoding]
        },
        {
          title: 'tool.morseCode.title',
          description: 'tool.morseCode.desc',
          route: '/tools/morse-code',
          tags: [tagCategories.encodingAndDecoding]
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
          tags: [tagCategories.generator]
        },
        {
          title: 'tool.messageDigest.title',
          description: 'tool.messageDigest.desc',
          route: '/tools/message-digest',
          tags: [tagCategories.hash]
        },
        {
          title: 'tool.caesarCipher.title',
          description: 'tool.caesarCipher.desc',
          route: '/tools/caesar-cipher',
          tags: [tagCategories.encryptionAndDecryption]
        },
        {
          title: 'tool.railFenceCipher.title',
          description: 'tool.railFenceCipher.desc',
          route: '/tools/rail-fence-cipher',
          tags: [tagCategories.encryptionAndDecryption]
        },
        {
          title: 'tool.pigpen.title',
          description: 'tool.pigpen.desc',
          route: '/tools/pigpen',
          tags: [tagCategories.encryptionAndDecryption]
        },
        {
          title: 'tool.vigenereCipher.title',
          description: 'tool.vigenereCipher.desc',
          route: '/tools/vigenereCipher',
          tags: [tagCategories.encryptionAndDecryption]
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
          tags: [tagCategories.disassembler],
          disabled: true
        },
        {
          title: 'tool.jsFuck.title',
          description: 'tool.jsFuck.desc',
          route: '/tools/jsfuck',
          tags: [tagCategories.obfuscation]
        },
        {
          title: 'tool.brainFuck.title',
          description: 'tool.brainFuck.desc',
          route: '/tools/brain-fuck',
          tags: [tagCategories.complier]
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
          tags: [tagCategories.conversion],
          disabled: true,
        },
        {
          title: 'HTTP(s) 请求头',
          description: '查看 HTTP(s) 请求头信息',
          route: '/tools/http-headers',
          tags: ['HTTP'],
          disabled: true
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
          tags: [tagCategories.conversion]
        },
        {
          title: 'tool.timeStamp.title',
          description: 'tool.timeStamp.desc',
          route: '/tools/timestamp',
          tags: [tagCategories.conversion],
          disabled: true
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
          tags: [tagCategories.utility]
        },
        {
          title: 'tool.crc.title',
          description: 'tool.crc.desc',
          route: '/tools/crc-checksum',
          tags: [tagCategories.inspection]
        },
        {
          title: 'tool.temperatureConversion.title',
          description: 'tool.temperatureConversion.desc',
          route: '/tools/temperature-conversion',
          tags: [tagCategories.conversion],
          disabled: true,
        },
        {
          title: 'Base64 图片转换',
          description: '图片和 Base64 互相转换',
          route: '/tools/base-to-image',
          tags: ['图片处理'],
          disabled: true,
        },
      ]
    }
  ],
})
