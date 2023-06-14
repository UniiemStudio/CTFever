export const state = () => ({
  currentTitle: '',
  showMiniBar: false,
})

export const mutations = {
  setCurrentTitle(state, title) {
    state.currentTitle = title;
  },
  setShowMiniBar(state, show) {
    state.showMiniBar = show;
  }
}
