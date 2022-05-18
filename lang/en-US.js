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
    appearance: {
      light: 'Light',
      dark: 'Dark',
      auto: 'Auto'
    },
  },
  action: {
    marked: 'Added to bookmarks',
    unmarked: 'Removed from bookmarks',
  },
  common: {
    radix: {
      bin: 'Binary',
      oct: 'Octal',
      dec: 'Decimal',
      hex: 'Hexadecimal',
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
    // Network Tool
    ipAttribution: {
      title: 'IP Geo-location',
      desc: 'Query IP address attribution and ISP information'
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
      desc: 'Convert a time stamp to any format'
    },
    // Program Related
    pycDecompiler: {
      title: 'Pyc Decompiler',
      desc: 'Decompile pyc file'
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
  }
}
