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
        },
        {
          title: 'tool.urlEncoding.title',
          description: 'tool.urlEncoding.desc',
          route: '/tools/url-encoding',
        },
        {
          title: 'tool.baseSeries.title',
          description: 'tool.baseSeries.desc',
          route: '/tools/base-series',
        },
        {
          title: "tool.rotSeries.title",
          description: 'tool.rotSeries.desc',
          route: '/tools/rot-series',
        },
        {
          title: 'tool.morseCode.title',
          description: 'tool.morseCode.desc',
          route: '/tools/morse-code',
        }
      ]
    },
    {
      title: 'toolkit.cryptography.title',
      description: 'toolkit.cryptography.desc',
      icon: 'calculator-outline',
      tools: [
        {
          title: 'tool.md5.title',
          description: 'tool.md5.desc',
          route: '/tools/md5',
        },
        {
          title: 'tool.sha1.title',
          description: 'tool.sha1.desc',
          route: '/tools/sha-1',
        },
        {
          title: 'tool.caesarCipher.title',
          description: 'tool.caesarCipher.desc',
          route: '/tools/caesar-cipher',
        },
        {
          title: 'tool.railFenceCipher.title',
          description: 'tool.railFenceCipher.desc',
          route: '/tools/rail-fence-cipher',
        },
      ]
    }
  ],
})
