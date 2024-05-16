export const rawTags = {
  charactersProcessing: {
    key: 'charactersProcessing',
  },
  generator: {
    key: 'generator',
  },
  socialEngineering: {
    key: 'socialEngineering',
  },
  classicalCiphers: {
    key: 'classicalCiphers',
  },
  steganography: {
    key: 'steganography',
  },
  compiler: {
    key: 'compiler',
  },
}

export const rawToolkits = [
  {
    key: 'encoding',
    icon: 'IconCode',
    tools: [
      {
        key: 'ascii',
        route: '/tools/ascii',
        tags: [rawTags.charactersProcessing],
      },
      {
        key: 'urlEncoding',
        route: '/tools/url-encoding',
        tags: [rawTags.charactersProcessing],
        signatures: ['url-encoded'],
      },
      {
        key: 'base64',
        route: '/tools/base64',
        tags: [rawTags.charactersProcessing],
        signatures: ['base64'],
      },
    ],
  },
  {
    key: 'cryptology',
    icon: 'IconKey',
    tools: [
      {
        key: 'caesar',
        route: '/tools/caesar-cipher',
        tags: [rawTags.classicalCiphers],
      },
      {
        key: 'vigenereCipher',
        route: '/tools/vigenere-cipher',
        tags: [rawTags.classicalCiphers],
      },
    ],
  },
  {
    key: 'misc',
    icon: 'IconMicroscope',
    tools: [
      {
        key: 'socialEngineeringDictGen',
        route: '/tools/social-engineering-dictionary-generator',
        tags: [rawTags.generator, rawTags.socialEngineering],
      },
      {
        key: 'zws',
        route: '/tools/zero-width-steganography',
        tags: [rawTags.steganography],
      },
      {
        key: 'bf',
        route: '/tools/brain-fuck',
        tags: [rawTags.compiler],
      },
    ],
  },
]