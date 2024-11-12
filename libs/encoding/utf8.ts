const utf8Encode = (str: string): string => {
  return str.replace(/[\u0080-\uFFFF]/g, (char) => {
    return `&#x${char.charCodeAt(0).toString(16).toUpperCase()};`;
  });
};

const utf8Decode = (str: string): string => {
  return str.replace(/&#x([0-9A-Fa-f]+);/g, (match, hex) => {
    return String.fromCharCode(parseInt(hex, 16));
  });
};

export { utf8Encode, utf8Decode };
