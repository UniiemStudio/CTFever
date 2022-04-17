"use strict";

const BigInt = require('bigi');

const B62 = [...'0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'];
// const B62 = [
//   '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
//   'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
//   'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
//   'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
//   'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
// ];

function RadixC(digits, srcRadix) {
  srcRadix = Array.isArray(srcRadix) ? srcRadix : B62.slice(0, srcRadix);
  // this._digits = Array.isArray(digits) ? digits : digits.split('').map(c => srcRadix.indexOf(c));
  this._digits = Array.isArray(digits) ? digits : (digits + '').split('');
  this._srcRadixLen = new BigInt(srcRadix.length + '');
  this._srcRadixMap = srcRadix.reduce((map, c, i) => {
    map[c + ''] = new BigInt(i + '');
    return map;
  }, {});
}

function convertBase(targetRadix) {
  let bignum = new BigInt(0 + '');
  let converted = [];
  let targetRadixEncoding = Array.isArray(targetRadix) ? targetRadix : B62;
  let temp, val;
  targetRadix = Array.isArray(targetRadix) ? targetRadix.length : targetRadix;
  targetRadix = new BigInt(targetRadix + '');
  this._digits.forEach(function (digit) {
    val = this._srcRadixMap[digit + ''];
    if (val === undefined) {
      throw new Error('Invalid digit');
    }
    bignum = bignum.multiply(this._srcRadixLen).add(val);
  }.bind(this));
  do {
    temp = bignum.divideAndRemainder(targetRadix);
    converted.push(targetRadixEncoding[temp[1].toString()]);
    bignum = temp[0];
  } while (bignum.toString() !== '0');
  converted.reverse();
  return converted;
}

RadixC.prototype.toArray = function (targetRadix) {
  return convertBase.call(this, targetRadix);
};

RadixC.prototype.toString = function (targetRadix) {
  return convertBase.call(this, targetRadix).join('');
};

module.exports = RadixC;
