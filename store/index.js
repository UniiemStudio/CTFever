export const state = () => ({
  toolkits: [
    {
      name: 'Encoding and Decoding',
      description: 'A toolkit for encoding and decoding data',
      tools: [
        {
          name: 'ASCII',
          description: 'A tool for encoding and decoding ASCII data',
          route: '/tools/ascii',
        },
        {
          name: 'URL Encoding',
          description: 'A tool for encoding and decoding URL data',
          route: '/tools/url-encoding',
        },
        {
          name: 'BaseN Series',
          description: 'A tool for encoding and decoding Base-N data',
          route: '/tools/base-series',
        },
        {
          name: "ROT-N Series",
          description: 'A tool for encoding and decoding ROT-N data',
          route: '/tools/rot-series',
        },
        {
          name: 'Morse Code',
          description: 'A tool for encoding and decoding Morse Code data',
          route: '/tools/morse-code',
        }
      ]
    },
    {
      name: 'Cryptography',
      description: 'A toolkit for cryptography',
      tools: [
        {
          name: 'MD5',
          description: 'A tool for hashing data using MD5',
          route: '/tools/md5',
        },
        {
          name: 'SHA-1',
          description: 'A tool for hashing data using SHA-1',
          route: '/tools/sha-1',
        },
        {
          name: 'Caesar Cipher',
          description: 'A tool for encrypting and decrypting data using Caesar Cipher',
          route: '/tools/caesar-cipher',
        },
        {
          name: 'Rail Fence Cipher',
          description: 'A tool for encrypting and decrypting data using Rail Fence Cipher',
          route: '/tools/rail-fence-cipher',
        },
        {
          name: 'Curve Fence Cipher',
          description: 'A tool for encrypting and decrypting data using Curve Fence Cipher',
          route: '/tools/curve-fence-cipher',
        }
      ]
    }
  ],
})
