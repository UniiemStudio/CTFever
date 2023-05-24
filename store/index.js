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
  decompiler: 'tags.decompiler',
  obfuscation: 'tags.obfuscation',
  compiler: 'tags.compiler',
  utility: 'tags.utility',
  check: 'tags.check',
  reverse: 'tags.reverse',
  steganography: 'tags.steganography',
  editor: 'tags.editor',
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
        {
          title: 'tool.utf8Conversion.title',
          description: 'tool.utf8Conversion.desc',
          route: '/tools/utf8-conversion',
          tags: [tagCategories.encodingAndDecoding, tagCategories.conversion],
        },
        {
          title: 'tool.jsonSerializer.title',
          description: 'tool.jsonSerializer.desc',
          route: '/tools/json-serializer',
          tags: [tagCategories.editor, tagCategories.conversion],
          shareable: true,
          newest: true
        },
        // {
        //   title: 'tool.ciphey.title',
        //   description: 'tool.ciphey.desc',
        //   route: '/tools/ciphey',
        //   tags: [tagCategories.encodingAndDecoding],
        //   newest: false,
        //   disabled: true
        // },
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
        {
          title: 'tool.cloudShadow.title',
          description: 'tool.cloudShadow.desc',
          route: '/tools/cloud-shadow',
          tags: [tagCategories.encryptionAndDecryption],
          // newest: true,
          disabled: true
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
          tags: [tagCategories.decompiler],
          premium: true,
        },
        {
          title: 'tool.binExtract.title',
          description: 'tool.binExtract.desc',
          route: '/tools/bin-extractor',
          tags: [tagCategories.reverse],
          premium: true,
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
          tags: [tagCategories.compiler],
          recommended: true,
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
          recommended: true,
        },
        {
          title: 'tool.portScan.title',
          description: 'tool.portScan.desc',
          route: '/tools/port-scan',
          tags: [tagCategories.utility],
          premium: true,
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
        },
        {
          title: 'tool.base2img.title',
          description: 'tool.base2img.desc',
          route: '/tools/base64-to-image',
          tags: [tagCategories.conversion],
        },
        {
          title: 'tool.dataUnitsConversion.title',
          description: 'tool.dataUnitsConversion.desc',
          route: '/tools/data-units-conversion',
          tags: [tagCategories.conversion],
          shareable: true,
          newest: true,
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
          tags: [tagCategories.check, tagCategories.hash]
        },
        // {
        //   title: 'tool.temperatureConversion.title',
        //   description: 'tool.temperatureConversion.desc',
        //   route: '/tools/temperature-conversion',
        //   tags: [tagCategories.conversion],
        //   disabled: true,
        // },
        // {
        //   title: '与佛论禅',
        //   description: '面对这个纷繁复杂的世界, 真神会如何作答呢',
        //   route: '/tools/undefined',
        //   tags: [tagCategories.encryptionAndDecryption],
        //   disabled: true,
        // },
        {
          title: 'tool.coreValues.title',
          description: 'tool.coreValues.desc',
          route: '/tools/core-values-cipher',
          tags: [tagCategories.conversion],
        },
        {
          title: 'tool.blindWatermark.title',
          description: 'tool.blindWatermark.desc',
          route: '/tools/blind-watermark-extractor',
          tags: [tagCategories.steganography],
          disabled: true
        },
        {
          title: 'tool.dictionaryGenerator.title',
          description: 'tool.dictionaryGenerator.desc',
          route: '/tools/dictionary-generator',
          tags: [tagCategories.generator],
          disabled: true
        },
        {
          title: 'tool.pseudoEncryptedZipCheck.title',
          description: 'tool.pseudoEncryptedZipCheck.desc',
          route: '/tools/pseudo-encrypted-zip-check',
          tags: [tagCategories.steganography],
          premium: true,
        },
      ]
    }
  ],
})
