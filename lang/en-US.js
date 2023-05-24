export default {
  app: {
    name: 'CTFever',
    title: 'CTFever Toolkit by uniiem',
    subtitle: 'Toolkit',
    tip: {
      title: 'Welcome to CTFever',
      content: 'CTFever is a toolkit for CTFers. It is a collection of useful online tools.',
    }
  },
  topbar: {
    login: 'LOGIN',
    signup: 'SIGN UP',
    back: 'Back',
    install_pwa: 'Install',
    appearance: {
      light: 'Light',
      dark: 'Dark',
      auto: 'Auto'
    },
    share: 'Share',
    share_link: 'Link with page state',
    drawer_collapse: 'Collapse',
  },
  context_menu: {
    external_link: 'Open in new tab',
    mark_add: 'Add to favorites',
    mark_remove: 'Remove from favorites',
    copy: 'Copy link',
  },
  action: {
    marked: 'Added to favorites',
    unmarked: 'Removed from favorites',
    copied: 'Copied to clipboard',
    copied_with_state: 'Copied {} to clipboard',
  },
  common: {
    radix: {
      bin: 'Binary',
      oct: 'Octal',
      dec: 'Decimal',
      hex: 'Hexadecimal',
    },
    badge: {
      premium: 'Premium',
      newest: 'Newest',
      recommended: 'Recommended',
      beta: 'Experimental'
    },
    btn_encode: 'Encode',
    btn_decode: 'Decode',
    text_encoded: 'Encoded',
    text_decoded: 'Decoded',
    btn_encrypt: 'Encrypt',
    btn_decrypt: 'Decrypt',
    btn_execute: 'Execute',
    btn_calculate: 'Calculate',
    btn_run: 'RUN',
    btn_swap: 'SWAP',
    btn_backspace: '← BACKSPACE',
    btn_clean: 'Clean',
    btn_validate: 'Validate',
    btn_parse: 'Parse',
    btn_version: 'Version',
    btn_generate: 'Generate',
    text_encode: 'Encode',
    text_decode: 'Decode',
    text_plain: 'Plaintext',
    text_cipher: 'Ciphertext',
    text_original_content: 'Original content',
    text_result_content: 'Result',
    text_input: 'Input',
    text_output: 'Output',
    text_secret: 'Secret',
    text_algorithm: 'Algorithm',
    text_offset: 'Offset',
    text_mode: 'Mode',
    text_type: 'Type',
    text_radix: 'Radix',
    text_string: 'String',
    text_search: 'Search',
    text_search_result: `Search results for <span class="font-bold">'{}'</span>`,
    text_tag_archive: 'Archiving of tag <span class="font-bold">{}</span>',
  },
  page: {
    home: {
      favoriteKit: {
        title: 'Favorites',
        desc: 'Tools that you marked as favorite',
      },
    },
    notFound: {
      title: 'Page Not Found',
      message: 'The spirit of exploration is valuable, but unfortunately there is nothing here :(',
      btn: 'Back home',
      btnPrevious: 'Previous page',
    },
  },
  toolkit: {
    EaD: {
      title: 'Encoding and Decoding',
      desc: 'A toolkit for encoding and decoding data'
    },
    cryptography: {
      title: 'Cryptography',
      desc: 'A toolkit for cryptography'
    },
    programRelated: {
      title: 'Program related',
      desc: 'Code obfuscation, decompilation, etc.'
    },
    networkTool: {
      title: 'Network tool',
      desc: 'A toolkit for network'
    },
    dataConversion: {
      title: 'Data Conversion',
      desc: 'A toolkit for data conversion'
    },
    misc: {
      title: 'Misc',
      desc: 'A toolkit for miscellaneous'
    },
  },
  tool: {
    // EaD
    ascii: {
      title: 'ASCII',
      desc: 'Convert text to ASCII code',
      continuity: 'Continuity (Auto recognize printable characters)',
      split: 'Split by comma'
    },
    urlEncoding: {
      title: 'URL Encoding',
      desc: 'URL encode and decode'
    },
    baseSeries: {
      title: 'BaseN Series',
      desc: 'Convert words and numbers to baseN series encoded'
    },
    rotSeries: {
      title: 'ROT-N Series',
      desc: 'Convert words or numbers to ROT series encoded'
    },
    morseCode: {
      title: 'Morse Code',
      desc: 'Convert words to Morse Code'
    },
    utf8Conversion: {
      title: 'UTF8 Conversion',
      desc: 'Conversion of Chinese and special characters'
    },
    jsonSerializer: {
      title: 'JSON Serializer',
      desc: 'Json data editing, supports JSONPath'
    },
    // Cryptography
    uuid: {
      title: 'UUID',
      desc: 'Generate UUID'
    },
    messageDigest: {
      title: 'Message Digest',
      desc: 'Generate message digest'
    },
    caesarCipher: {
      title: 'Caesar Cipher',
      desc: 'Convert text to Caesar Cipher'
    },
    railFenceCipher: {
      title: 'Rail Fence Cipher',
      desc: 'Convert text to Rail Fence Cipher',
      rows: 'Rows'
    },
    pigpen: {
      title: 'Pigpen Cipher',
      desc: 'Freemason\'s cipher, Simple replacement password'
    },
    vigenereCipher: {
      title: 'Vigenere Cipher',
      desc: 'It is an encryption method based on the Caesar cipher'
    },
    cloudShadow: {
      title: 'Cloud Shadow',
      desc: 'Cloud Shadow is a simple encryption method'
    },
    // Network Tool
    ipAttribution: {
      title: 'IP Geo-location',
      desc: 'Query IP address attribution and ISP information'
    },
    portScan: {
      title: 'Port Scanning',
      desc: 'Scan and analyze the port opening of the specified host'
    },
    httpHeaders: {
      title: 'HTTP(s) Headers',
      desc: 'Parse HTTP(s) response headers'
    },
    // Data Conversion
    radixConversion: {
      title: 'Radix Converter',
      desc: 'Convert a number to a different radix'
    },
    timeStamp: {
      title: 'Time Stamp Converter',
      desc: 'Convert a time stamp to any format',
      timestamp: 'Timestamp',
      humanReadable: 'Human Readable',
      unit: 'Unit',
      now: 'NOW',
      utc: 'UTC',
      fromNow: 'From Now',
      dayOfYear: 'Day of Year',
      weekOfYear: 'Week of Year'
    },
    base2img: {
      title: 'Base64 to Image',
      desc: 'Convert base64 string to image'
    },
    dataUnitsConversion: {
      title: 'Data Unit Conversion',
      desc: 'Convert data storage units'
    },
    // Program Related
    pycDecompiler: {
      title: 'Pyc Decompiler',
      desc: 'Decompile pyc file',
    },
    binExtract: {
      title: 'Bin Extractor',
      desc: 'Extract from bin file (binwalk)',
    },
    jsFuck: {
      title: 'JSFuck',
      desc: 'JSFuck is a JavaScript implementation of the esoteric programming language Fuck'
    },
    brainFuck: {
      title: 'BrainFuck',
      desc: 'BrainFuck is a programming language that is a variant of the esoteric programming language Fuck'
    },
    // Misc
    serialTool: {
      title: 'Serial Port Tool',
      desc: 'A experimental tool for serial port',
      baud: 'Baud rate',
      status: 'Status',
      resend: 'Timed',
      resendDelay: 'Delay',
      autoEOL: 'Auto CR+LF',
      connected: 'CONNECTED',
      disconnected: 'DISCONNECTED',
      open: 'SELECT PORT',
      close: 'CLOSE PORT',
      tip: {
        unknown: 'Unknown error',
        opened: 'Serial port opened',
        closed: 'Serial port closed'
      }
    },
    crc: {
      title: 'CRC',
      desc: 'CRC is a checksum algorithm used to detect errors in data transmissions',
      crcModel: 'CRC Model',
      inputMode: 'Input Mode',
      checksum_result: 'Checksum Result',
    },
    temperatureConversion: {
      title: 'Temperature Conversion',
      desc: 'Convert temperature into multiple units'
    },
    coreValues: {
      title: 'Core Values Cipher',
      desc: 'Prosperity, democracy, civilization, harmony!'
    },
    blindWatermark: {
      title: 'Blind Watermark Extractor',
      desc: 'A watermark method invisible to the naked eye'
    },
    dictionaryGenerator: {
      title: 'Dictionary Generator',
      desc: 'Generate an exhaustive dictionary in the specified format'
    },
    pseudoEncryptedZipCheck: {
      title: 'Pseudo Encrypted Zip Check',
      desc: 'Check if the zip file is pseudo encrypted'
    },
  },
  tags: {
    encodingAndDecoding: 'Encoding And Decoding',
    generator: 'Generator',
    hash: 'Hash',
    encryptionAndDecryption: 'Encryption And Decryption',
    conversion: 'Conversion',
    decompiler: 'Decompiler',
    obfuscation: 'Obfuscation',
    compiler: 'Compiler',
    utility: 'Utility',
    check: 'Check',
    reverse: 'Re',
    steganography: 'Steganography',
    editor: 'Editor',
  }
}
