"use strict";

const state = require('~/store').state();

const wrapI18nPath2MetaRoute = (pathWithI18n) => {
  return `/${pathWithI18n.split('/').slice(-2).join('/')}`;
}

const getToolByRoute = (route) => {
  let tools = [];
  state.toolkits.forEach(toolkit => tools.push(toolkit.tools.filter(t => t.route === wrapI18nPath2MetaRoute(route))));
  return tools.filter(t => t.length > 0)[0][0];
}

module.exports = {
  wrapI18nPath2MetaRoute,
  getToolByRoute
}
