"use strict";

const wrapI18nPath2MetaRoute = (pathWithI18n) => {
  return `/${pathWithI18n.split('/').slice(-2).join('/')}`;
}

module.exports = {
  wrapI18nPath2MetaRoute
}
