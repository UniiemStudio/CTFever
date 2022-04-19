"use strict";

function encode(r, a) {
  let u = [];
  let i = [[48, 57], [65, 90], [97, 122], [19968, 40869]];
  let t;
  let e;
  let s;
  let o;
  let n;
  for (let f = 0; f < r.length; f++) {
    e = r.substr(f, 1);
    s = !1;
    n = e.charCodeAt(0);
    for (const v in i) if (n >= i[v][0] && n <= i[v][1]) {
      t = a % (i[v][1] - i[v][0] + 1), t < 0 && (t = i[v][1] - i[v][0] + 1 + t), o = n + t, o > i[v][1] && (o = i[v][0] + (o - i[v][1] - 1)), u.push(String.fromCharCode(o)), s = !0;
      break
    }
    s || u.push(e)
  }
  return u.join("")
}

function decode(r, a) {
  let u = [];
  let n;
  let s;
  let e;
  let t;
  let i = [[48, 57], [65, 90], [97, 122], [19968, 40869]];
  let o;
  for (let f = 0; f < r.length; f++) {
    e = r.substr(f, 1);
    s = !1;
    n = e.charCodeAt(0);
    for (const v in i) if (n >= i[v][0] && n <= i[v][1]) {
      t = a % (i[v][1] - i[v][0] + 1), t < 0 && (t = i[v][1] - i[v][0] + 1 + t), o = n - t, o < i[v][0] && (o = i[v][1] - (i[v][0] - o - 1)), u.push(String.fromCharCode(o)), s = !0;
      break
    }
    s || u.push(e)
  }
  return u.join("")
}

const ceasarCipher = {
  encode,
  decode
};

module.exports = ceasarCipher;
