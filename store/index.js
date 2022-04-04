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
          title: 'MD5',
          description: 'A tool for hashing data using MD5',
          route: '/tools/md5',
        },
        {
          title: 'SHA-1',
          description: 'A tool for hashing data using SHA-1',
          route: '/tools/sha-1',
        },
        {
          title: 'Caesar Cipher',
          description: 'A tool for encrypting and decrypting data using Caesar Cipher',
          route: '/tools/caesar-cipher',
        },
        {
          title: 'Rail Fence Cipher',
          description: 'A tool for encrypting and decrypting data using Rail Fence Cipher',
          route: '/tools/rail-fence-cipher',
        },
        {
          title: 'Curve Fence Cipher',
          description: 'A tool for encrypting and decrypting data using Curve Fence Cipher',
          route: '/tools/curve-fence-cipher',
        }
      ]
    }
  ],
})
