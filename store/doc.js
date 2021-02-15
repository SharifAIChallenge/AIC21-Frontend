export const state = () => ({
  content: '',
});

export const actions = {
  async set({ commit }, path) {
    const url = `https://raw.githubusercontent.com/jamshidi799/markdownContent/main/${path}`;
    fetch(url)
      .then(res => res.text())
      .then(res => commit('setContent', res));
  },
};

export const mutations = {
  setContent(state, content) {
    console.log(content);
    state.content = content;
  },
};
