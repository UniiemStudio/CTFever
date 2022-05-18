import {wrapI18nPath2MetaRoute} from "~/libs/common";

export const state = () => ({
  cloudSync: {
    enabled: false,
    lastSync: null,
  },
  markedTool: [],
  settings: {
    appearance: 'auto',
  },
})

export const mutations = {
  markToolByRoute(state, payload = {route: '', mark: false}) {
    payload.route = wrapI18nPath2MetaRoute(payload.route);
    if (payload.mark) {
      if (state.markedTool.filter(f => f.route === payload.route).length === 0) {
        state.markedTool.push(
          {
            route: payload.route,
            create_time: new Date().getTime()
          }
        )
      }
    } else {
      state.markedTool = state.markedTool.filter(f => f.route !== payload.route);
    }
  },
  setAppearance(state, appearance) {
    if (appearance === 'auto' || appearance === 'light' || appearance === 'dark') {
      state.settings.appearance = appearance;
    } else {
      state.settings.appearance = 'auto';
    }
  },
}
