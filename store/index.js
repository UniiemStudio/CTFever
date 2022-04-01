export const state = () => ({
  toolkits: [
    {
      title: 'toolkit.EaD.title',
      description: 'toolkit.EaD.description',
      tools: [
        {
          title: 'tool.ascii.title',
          description: 'tool.ascii.desc',
          route: '/tools/ascii',
        },
        {
          title: 'URL Encoding',
          description: 'A tool for encoding and decoding URL data',
          route: '/tools/url-encoding',
        },
        {
          title: 'BaseN Series',
          description: 'A tool for encoding and decoding Base-N data',
          route: '/tools/base-series',
        },
        {
          title: "ROT-N Series",
          description: 'A tool for encoding and decoding ROT-N data',
          route: '/tools/rot-series',
        },
        {
          title: 'Morse Code',
          description: 'A tool for encoding and decoding Morse Code data',
          route: '/tools/morse-code',
        }
      ]
    },
    {
      title: 'Cryptography',
      description: 'A toolkit for cryptography',
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
