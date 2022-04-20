"use strict";

function RailFenceW(content) {
  const railFence = {};
  railFence['encode'] = (rows) => {
    rows = rows || 3;
    let fence = [];
    for (let i = 0; i < rows; i++) fence.push([]);
    let rail = 0;
    let change = 1;
    for (let char of content.split("")) {
      fence[rail].push(char);
      rail += change;
      if (rail === rows - 1 || rail === 0) change = -change;
    }
    let r = '';
    for (let rail of fence) r += rail.join("");
    return r;
  }

  railFence['decode'] = (rows) => {
    rows = rows || 3;
    let fence = [];
    for (let i = 0; i < rows; i++) fence.push([]);
    let rail = 0;
    let change = 1;
    content.split("").forEach(char => {
      fence[rail].push(char)
      rail += change;
      if (rail === rows - 1 || rail === 0) change = -change;
    });
    const rFence = [];
    for (let i = 0; i < rows; i++) rFence.push([]);
    let i = 0;
    let s = content.split("");
    for (r of fence) {
      for (let j = 0; j < r.length; j++) rFence[i].push(s.shift());
      i++;
    }
    rail = 0;
    change = 1;
    let r = "";
    for (let i = 0; i < content.length; i++) {
      r += rFence[rail].shift();
      rail += change;
      if (rail === rows - 1 || rail === 0) change = -change;
    }
    return r;
  }

  return railFence;
}

function RailFence(content) {
  const railFence = {};
  railFence['encode'] = (rows) => {
    return 'This feature is unavailable this time. Pull Request is welcome :)';
  }
  railFence['decode'] = (rows) => {
    return 'This feature is unavailable this time. Pull Request is welcome :)';
  }
  return railFence;
}

module.exports = {RailFence, RailFenceW};
