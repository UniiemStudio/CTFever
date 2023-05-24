"use strict";

const BigInt = require('bigi');

function radixc(str, from, to) {
  if (typeof str !== 'string') str = str + '';
  if (from === to) {
    return str.toUpperCase();
  }
  if (from === '10') {
    return BigInt(str).toString(to).toUpperCase();
  }
  if (to === '10') {
    return BigInt(str, from).toString().toUpperCase();
  }
  return BigInt(str, from).toString(to).toUpperCase();
}

/**
 * @returns {string}  Human-readable string
 * @param {number} n  Decimal number
 */
function decimal_to_readable(n) {
  // const u = "BKMGT";
  const u = ['B', 'KB', 'MB', 'GB', 'TB'];
  let t = "";
  let r = n;
  let i = 0;
  while (r > 0) {
    t = (r % 1024) + u[i] + ' ' + t;
    r = Math.trunc(r / 1024);
    i++;
  }
  return t.trim();
}


/**
 * @returns {number|null}  Decimal number
 * @param {string} s  Human-readable string
 *                    similar to '12GB 34MB 56KB 78B','12GiB 34MiB 56KiB 78B','12G34M56K78B'
 */
function readable_to_decimal(s) {
  s = s.split(' ').join('').toUpperCase()
    .replaceAll('IB', '')
    .replaceAll('KB', 'K')
    .replaceAll('MB', 'M')
    .replaceAll('GB', 'G')
    .replaceAll('TB', 'T');
  let n = 0;
  let j = 0;
  for (let i = 0; i < s.length; i++) {
    switch (s[i]) {
      case "B":
        n += +s.slice(j, i);
        j = i + 1;
        break;
      case "K":
        n += +s.slice(j, i) * 1024;
        j = i + 1;
        break;
      case "M":
        n += +s.slice(j, i) * 1024 * 1024;
        j = i + 1;
        break;
      case "G":
        n += +s.slice(j, i) * 1024 * 1024 * 1024;
        j = i + 1;
        break;
      case "T":
        n += +s.slice(j, i) * 1024 * 1024 * 1024 * 1024;
        j = i + 1;
        break;
      default:
      // should we throw error here?
      // throw new Error('Unexpected character in readable string')
    }
  }
  return n;
}

module.exports = {radixc, decimal_to_readable, readable_to_decimal};
