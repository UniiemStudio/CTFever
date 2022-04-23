import localforage from "localforage";

export const state = () => ({
  cloudSyncData: {
    enabled: false,
    lastSync: null,
    favoriteTools: [],
  },
  favoriteTools: [],
  settings: {},
})

export const mutations = {
  setFavoriteTools(state, tools) {
    state.favoriteTools = tools;
  },
  FAVORITE_TOOL(state, payload) {
    console.log(payload.mark ? 'favorite' : 'unfavorite', payload.route, payload.mark);
    if (payload.mark) {
      if (state.favoriteTools.filter(f => f.route === payload.route).length === 0) {
        state.favoriteTools.push(
          {
            route: payload.route,
            create_time: new Date().getTime()
          }
        )
      }
    } else {
      state.favoriteTools = state.favoriteTools.filter(f => f.route !== payload.route);
    }
    localforage.setItem("favorite_tools", state.favoriteTools).then(r => {
    });
  },
}
