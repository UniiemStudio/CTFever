export const rawTags = {
  crypto: { key: 'crypto' },
  web: { key: 'web' },
  binary: { key: 'binary' },
  reverse: { key: 'reverse' },
  forensics: { key: 'forensics' },
  general: { key: 'general' },
  misc: { key: 'misc' },
}

export const rawToolkits = [
  {
    key: 'encoding',
    icon: 'IconCode',
    tools: [
      {
        key: 'ascii',
        route: '/tools/ascii',
        tags: [rawTags.general],
      },
      {
        key: 'urlEncoding',
        route: '/tools/url-encoding',
        tags: [rawTags.general],
        signatures: ['url-encoded'],
      },
      {
        key: 'base64',
        route: '/tools/base64',
        tags: [rawTags.general],
        signatures: ['base64'],
      },
      {
        key: 'rot13',
        route: '/tools/rot13',
        tags: [rawTags.general],
      },
    ],
  },
  {
    key: 'crypto',
    icon: 'IconKey',
    tools: [
      {
        key: 'caesar',
        route: '/tools/caesar-cipher',
        tags: [rawTags.crypto],
      },
      {
        key: 'vigenereCipher',
        route: '/tools/vigenere-cipher',
        tags: [rawTags.crypto],
      },
    ],
  },
  // {
  //   key: 'converter',
  //   tools: [],
  // },
  // {
  //   key: 'network',
  //   tools: [],
  // },
  {
    key: 'misc',
    icon: 'IconMicroscope',
    tools: [
      {
        key: 'socialEngineeringDictGen',
        route: '/tools/social-engineering-dictionary-generator',
        tags: [rawTags.misc, rawTags.forensics],
      },
      {
        key: 'zeroWidthSteganography',
        route: '/tools/zero-width-steganography',
        tags: [rawTags.forensics],
      },
      {
        key: 'brainFuck',
        route: '/tools/brain-fuck',
        tags: [rawTags.misc],
      },
      {
        key: 'zipPseudoEncryption',
        route: '/tools/zip-pseudo-encryption',
        tags: [rawTags.forensics, rawTags.binary],
      },
    ],
  },
]