const base32Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
const paddingChar = "=";

const base32Encode = (input: string): string => {
  let output = "";
  let bits = 0;
  let value = 0;
  for (let i = 0; i < input.length; i++) {
    value = (value << 8) | input.charCodeAt(i);
    bits += 8;
    while (bits >= 5) {
      output += base32Chars[(value >>> (bits - 5)) & 0x1f];
      bits -= 5;
    }
  }
  if (bits > 0) {
    value <<= (5 - bits);
    output += base32Chars[value & 0x1f];
    bits = 5 - bits;
    while (bits >= 5) {
      output += base32Chars[(value >>> (bits - 5)) & 0x1f];
      bits -= 5;
    }
  }
  while (output.length % 8 !== 0) {
    output += paddingChar;
  }
  return output;
}

const base32Decode = (input: string): string => {
  let output = "";
  let bits = 0;
  let value = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charAt(i);
    if (char === paddingChar) {
      break;
    }
    const index = base32Chars.indexOf(char);
    if (index === -1) {
      throw new Error("Invalid character: " + char);
    }
    value = (value << 5) | index;
    bits += 5;
    if (bits >= 8) {
      output += String.fromCharCode((value >>> (bits - 8)) & 0xff);
      bits -= 8;
    }
  }
  return output;
}

export default {
  encode: base32Encode,
  decode: base32Decode
};
