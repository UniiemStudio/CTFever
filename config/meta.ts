export const rawTags = {
  crypto: { key: "crypto" },
  web: { key: "web" },
  binary: { key: "binary" },
  reverse: { key: "reverse" },
  forensics: { key: "forensics" },
  general: { key: "general" },
  misc: { key: "misc" },
};

export const rawToolkits = [
  {
    key: "encoding",
    icon: "IconCode",
    tools: [
      {
        key: "ascii",
        route: "/tools/ascii",
        tags: [rawTags.general],
      },
      {
        key: "urlEncoding",
        route: "/tools/url-encoding",
        tags: [rawTags.general],
        signatures: ["url-encoded"],
      },
      {
        key: "base64",
        route: "/tools/base64",
        tags: [rawTags.general],
        signatures: ["base64"],
      },
      {
        key: "rot13",
        route: "/tools/rot13",
        tags: [rawTags.general],
      },
      {
        key: "utf8Conversion",
        route: "/tools/utf8-conversion",
        tags: [rawTags.general],
        signatures: ["utf8"],
      },
      {
        key: "jsonSerializer",
        route: "/tools/json-serializer",
        tags: [rawTags.general, rawTags.misc],
        signatures: ["json"],
      },
    ],
  },
  {
    key: "crypto",
    icon: "IconKey",
    tools: [
      {
        key: "caesar",
        route: "/tools/caesar-cipher",
        tags: [rawTags.crypto],
      },
      {
        key: "vigenereCipher",
        route: "/tools/vigenere-cipher",
        tags: [rawTags.crypto],
      },
      {
        key: "digestCalculation",
        route: "/tools/digest-calculation",
        tags: [rawTags.crypto, rawTags.forensics, rawTags.web],
      },
      {
        key: "uuid",
        route: "/tools/uuid",
        tags: [rawTags.general, rawTags.misc],
      },
      {
        key: "railFenceCipher",
        route: "/tools/rail-fence-cipher",
        tags: [rawTags.crypto],
      },
      {
        key: "pigpenCipher",
        route: "/tools/pigpen-cipher",
        tags: [rawTags.crypto],
      },
    ],
  },
  {
    key: "converter",
    icon: "IconTransform",
    tools: [
      {
        key: "timestamp",
        route: "/tools/timestamp",
        tags: [rawTags.general],
        signatures: ["timestamp"],
      },
      {
        key: "radixConversion",
        route: "/tools/radix-conversion",
        tags: [rawTags.general],
      },
      {
        key: "dataUnitsConversion",
        route: "/tools/data-units-conversion",
        tags: [rawTags.general],
      },
    ],
  },
  {
    key: 'network',
    icon: 'IconWorldWww',
    tools: [
      {
        key: 'ip2int',
        route: '/tools/ip2int',
        tags: [rawTags.general, rawTags.web],
      }
    ],
  },
  {
    key: "misc",
    icon: "IconMicroscope",
    tools: [
      {
        key: "socialEngineeringDictGen",
        route: "/tools/social-engineering-dictionary-generator",
        tags: [rawTags.misc, rawTags.forensics],
      },
      {
        key: "zeroWidthSteganography",
        route: "/tools/zero-width-steganography",
        tags: [rawTags.forensics],
      },
      {
        key: "brainFuck",
        route: "/tools/brain-fuck",
        tags: [rawTags.misc],
      },
      {
        key: "zipPseudoEncryption",
        route: "/tools/zip-pseudo-encryption",
        tags: [rawTags.forensics, rawTags.binary],
      },
      {
        key: "coreValuesCipher",
        route: "/tools/core-values-cipher",
        tags: [rawTags.crypto],
      },
      {
        key: "crc",
        route: "/tools/crc",
        tags: [rawTags.general, rawTags.binary, rawTags.reverse],
      },
    ],
  },
];
