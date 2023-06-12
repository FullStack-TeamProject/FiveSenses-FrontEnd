export default {
  state() {
    return {
      showTableRow: true
    };
  },
  mutations: {
    hideTableRow(state) {
      state.showTableRow = false;
    }
  },
  actions: {
    hideTableRow({ commit }) {
      commit('hideTableRow');
    }
  }
};