import {getToolByRoute} from "~/libs/common";

const preferences = {
  previousPath: ''
}

const regexps = {
  index: /^index/i,
  tools: /^tools/i,
  tag: /^tag/i,
  settings: /^settings/i,
}

export default function ({route, store, app}) {
  if (route.path !== preferences.previousPath) {
    if (regexps.index.test(route.name)) {
      store.commit('runtime/setCurrentTitle', '')
    } else if (regexps.tools.test(route.name)) {
      const universalPath = route.path.replace(/^\/[a-z]{2}\//i, '/')
      store.commit('runtime/setCurrentTitle', getToolByRoute(universalPath).title)
    } else if (regexps.tag.test(route.name)) {
      store.commit('runtime/setCurrentTitle', `tags.${route.params.tag}`)
    } else if (regexps.settings.test(route.name)) {
      store.commit('runtime/setCurrentTitle', 'page.settings.title')
    }

    store.commit('runtime/setShowMiniBar', regexps.tools.test(route.name))
  } else {
    /* ignore */
  }
  preferences.previousPath = route.path
}
