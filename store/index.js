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
          disabled: true,
        },
        {
          title: "tool.rotSeries.title",
          description: 'tool.rotSeries.desc',
          route: '/tools/rot-series',
          tags: ['字符编码'],
          disabled: true,
        },
        {
          title: 'tool.morseCode.title',
          description: 'tool.morseCode.desc',
          route: '/tools/morse-code',
          tags: ['字符编码'],
        }
      ]
    },
    {
      title: 'toolkit.cryptography.title',
      description: 'toolkit.cryptography.desc',
      icon: 'key-outline',
      tools: [
        {
          title: 'tool.md5.title',
          description: 'tool.md5.desc',
          route: '/tools/md5',
          tags: ['校验'],
          disabled: true,
        },
        {
          title: 'tool.sha1.title',
          description: 'tool.sha1.desc',
          route: '/tools/sha-1',
          tags: ['校验'],
          disabled: true,
        },
        {
          title: 'tool.caesarCipher.title',
          description: 'tool.caesarCipher.desc',
          route: '/tools/caesar-cipher',
          tags: ['加密'],
          disabled: true,
        },
        {
          title: 'tool.railFenceCipher.title',
          description: 'tool.railFenceCipher.desc',
          route: '/tools/rail-fence-cipher',
          tags: ['加密'],
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
          tags: ['数据'],
          disabled: true,
        },
      ]
    },
    {
      title: 'toolkit.codeObfuscation.title',
      description: 'toolkit.codeObfuscation.desc',
      icon: 'bug-outline',
      tools: [
        {
          title: 'tool.jsFuck.title',
          description: 'tool.jsFuck.desc',
          route: '/tools/jsfuck',
          tags: [],
          disabled: true,
        },
        {
          title: 'tool.brainFuck.title',
          description: 'tool.brainFuck.desc',
          route: '/tools/brain-fuck',
          tags: [],
          disabled: true,
        }
      ]
    },
    {
      title: 'toolkit.misc.title',
      description: 'toolkit.misc.desc',
      icon: 'construct-outline',
      tools: [
        {
          title: 'tool.crc.title',
          description: 'tool.crc.desc',
          route: '/tools/crc',
          tags: ['校验'],
          disabled: true,
        }
      ]
    }
  ],
})
