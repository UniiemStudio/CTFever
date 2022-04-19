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

module.exports = radixc;
