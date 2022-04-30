const LF_ENUM = {
  FAVORITE_TOOLS: "favorite_tools",
  SETTINGS: "settings",
}

export const state = () => ({
  cloudSyncData: {
    enabled: false,
    lastSync: null,
    favoriteTools: [],
  },
  favoriteTools: [],
  settings: {
    darkMode: 'auto',
  },
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
  },
  setDarkMode(state, darkMode) {
    if (darkMode === 'auto' || darkMode === 'light' || darkMode === 'dark') {
      state.settings.darkMode = darkMode;
    } else {
      state.settings.darkMode = 'auto';
    }
  },
}
