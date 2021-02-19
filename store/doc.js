export const state = () => ({
  content: '',
});

export const actions = {
  async set({ commit }, path) {
    const url = `https://raw.githubusercontent.com/jamshidi799/markdownContent/main/${path}`;
    fetch(url)
      .then(res => res.text())
      .then(res => commit('set', res));
  },
};

export const mutations = {
  set(state, content) {
    // console.log(content);
    console.log('bbbbbbbbbb');
    state.content = content;
  },
};
