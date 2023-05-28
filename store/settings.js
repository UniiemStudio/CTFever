import {wrapI18nPath2MetaRoute} from "~/libs/common";

export const state = () => ({
  cloudSync: {
    enabled: false,
    lastSync: null,
  },
  markedTool: [],
  latest: 0,
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
  setMarkedTools(state, payload) {
    state.markedTool = payload;
  },
  setAppearance(state, appearance) {
    if (appearance === 'auto' || appearance === 'light' || appearance === 'dark') {
      state.settings.appearance = appearance;
    } else {
      state.settings.appearance = 'auto';
    }
  },
  setLatest(state, latest) {
    state.latest = latest;
  },
  wipe(state) {
    state.cloudSync = {
      enabled: false,
      lastSync: null,
    };
    state.markedTool = [];
    state.latest = 0;
    state.settings = {
      appearance: 'auto',
    };
  }
}
