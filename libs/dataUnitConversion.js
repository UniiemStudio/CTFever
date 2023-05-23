const DATA_UNITS = Object.freeze({
  BYTE: 'B',        // 8 bits, standard unit
  // Bit units (IEC) - https://en.wikipedia.org/wiki/Bit
  BIT: 'b',
  KILOBIT: 'kbit',  // 10^3 bits
  MEGABIT: 'Mbit',  // 10^6 bits
  GIGABIT: 'Gbit',  // 10^9 bits
  TERABIT: 'Tbit',  // 10^12 bits
  PETABIT: 'Pbit',  // 10^15 bits
  EXABIT: 'Ebit',   // 10^18 bits
  ZETTABIT: 'Zbit', // 10^21 bits
  YOTTABIT: 'Ybit', // 10^24 bits
  // Decimal units (SI) - https://en.wikipedia.org/wiki/Byte
  KILOBYTE: 'KB',   // 10^3 bytes
  MEGABYTE: 'MB',   // 10^6 bytes
  GIGABYTE: 'GB',   // 10^9 bytes
  TERABYTE: 'TB',   // 10^12 bytes
  PETABYTE: 'PB',   // 10^15 bytes
  EXABYTE: 'EB',    // 10^18 bytes
  ZETTABYTE: 'ZB',  // 10^21 bytes
  YOTTABYTE: 'YB',  // 10^24 bytes
  // Binary units (IEC) - https://en.wikipedia.org/wiki/Byte
  KIBIBYTE: 'KiB',  // 2^10 bytes
  MEBIBYTE: 'MiB',  // 2^20 bytes
  GIBIBYTE: 'GiB',  // 2^30 bytes
  TEBIBYTE: 'TiB',  // 2^40 bytes
  PEBIBYTE: 'PiB',  // 2^50 bytes
  EXBIBYTE: 'EiB',  // 2^60 bytes
  ZEBIBYTE: 'ZiB',  // 2^70 bytes
  YOBIBYTE: 'YiB',  // 2^80 bytes
})

const byte = (size, originUnit) => {
  const ANY_TO_BYTE = Object.freeze({
    [DATA_UNITS.BYTE]: 1,
    [DATA_UNITS.BIT]: 1 / 8,
    [DATA_UNITS.KILOBIT]: 10 ** 3 / 8,
    [DATA_UNITS.MEGABIT]: 10 ** 6 / 8,
    [DATA_UNITS.GIGABIT]: 10 ** 9 / 8,
    [DATA_UNITS.TERABIT]: 10 ** 12 / 8,
    [DATA_UNITS.PETABIT]: 10 ** 15 / 8,
    [DATA_UNITS.EXABIT]: 10 ** 18 / 8,
    [DATA_UNITS.ZETTABIT]: 10 ** 21 / 8,
    [DATA_UNITS.YOTTABIT]: 10 ** 24 / 8,
    [DATA_UNITS.KILOBYTE]: 10 ** 3,
    [DATA_UNITS.MEGABYTE]: 10 ** 6,
    [DATA_UNITS.GIGABYTE]: 10 ** 9,
    [DATA_UNITS.TERABYTE]: 10 ** 12,
    [DATA_UNITS.PETABYTE]: 10 ** 15,
    [DATA_UNITS.EXABYTE]: 10 ** 18,
    [DATA_UNITS.ZETTABYTE]: 10 ** 21,
    [DATA_UNITS.YOTTABYTE]: 10 ** 24,
    [DATA_UNITS.KIBIBYTE]: 2 ** 10,
    [DATA_UNITS.MEBIBYTE]: 2 ** 20,
    [DATA_UNITS.GIBIBYTE]: 2 ** 30,
    [DATA_UNITS.TEBIBYTE]: 2 ** 40,
    [DATA_UNITS.PEBIBYTE]: 2 ** 50,
    [DATA_UNITS.EXBIBYTE]: 2 ** 60,
    [DATA_UNITS.ZEBIBYTE]: 2 ** 70,
    [DATA_UNITS.YOBIBYTE]: 2 ** 80,
  })
  const BYTE_TO_OTHERS = Object.freeze({
    [DATA_UNITS.BYTE]: 1,
    [DATA_UNITS.BIT]: 8,
    [DATA_UNITS.KILOBIT]: 8 / 10 ** 3,
    [DATA_UNITS.MEGABIT]: 8 / 10 ** 6,
    [DATA_UNITS.GIGABIT]: 8 / 10 ** 9,
    [DATA_UNITS.TERABIT]: 8 / 10 ** 12,
    [DATA_UNITS.PETABIT]: 8 / 10 ** 15,
    [DATA_UNITS.EXABIT]: 8 / 10 ** 18,
    [DATA_UNITS.ZETTABIT]: 8 / 10 ** 21,
    [DATA_UNITS.YOTTABIT]: 8 / 10 ** 24,
    [DATA_UNITS.KILOBYTE]: 1 / 10 ** 3,
    [DATA_UNITS.MEGABYTE]: 1 / 10 ** 6,
    [DATA_UNITS.GIGABYTE]: 1 / 10 ** 9,
    [DATA_UNITS.TERABYTE]: 1 / 10 ** 12,
    [DATA_UNITS.PETABYTE]: 1 / 10 ** 15,
    [DATA_UNITS.EXABYTE]: 1 / 10 ** 18,
    [DATA_UNITS.ZETTABYTE]: 1 / 10 ** 21,
    [DATA_UNITS.YOTTABYTE]: 1 / 10 ** 24,
    [DATA_UNITS.KIBIBYTE]: 1 / 2 ** 10,
    [DATA_UNITS.MEBIBYTE]: 1 / 2 ** 20,
    [DATA_UNITS.GIBIBYTE]: 1 / 2 ** 30,
    [DATA_UNITS.TEBIBYTE]: 1 / 2 ** 40,
    [DATA_UNITS.PEBIBYTE]: 1 / 2 ** 50,
    [DATA_UNITS.EXBIBYTE]: 1 / 2 ** 60,
    [DATA_UNITS.ZEBIBYTE]: 1 / 2 ** 70,
    [DATA_UNITS.YOBIBYTE]: 1 / 2 ** 80,
  })
  return {
    to: (targetUnit, toFixed = 2) => {
      return [
        parseFloat((size * ANY_TO_BYTE[originUnit] * BYTE_TO_OTHERS[targetUnit]).toFixed(toFixed)),
        targetUnit
      ]
    }
  }
}

module.exports = {DATA_UNITS, byte}
