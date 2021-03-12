import { login, getUser, logout } from '~/api/auth';

export const state = () => ({
  token: null,
  isAuthenticated: false,
  isLoading: false,
  user: null,
});

export const actions = {
  async getUser({ commit, state }) {
    let res = await getUser(this.$axios);
    commit('setUser', res);
    return res;
  },
  async login({ commit, dispatch }, payload) {
    commit('loading');
    let res = await login(this.$axios, payload).catch(e => this.$toast.error('ایمیل یا رمز اشتباه است'));
    commit('loaded');
    if (res.token) {
      commit('setToken', res);
      dispatch('getUser');
      commit('formStatus/toggleShow', {}, { root: true });
    }
  },
  async loadUser({ commit, dispatch }, token) {
    commit('setToken', token);
    dispatch('getUser');
  },
  async logout({ commit }) {
    let res = await logout(this.$axios);
    commit('removeToken');
    this.$router.push('/');
  },
};

export const mutations = {
  setUser(state, { data }) {
    state.user = data;
  },
  setToken(state, { token }) {
    state.token = token;
    state.isAuthenticated = true;
    // console.log(token, 'setToken');
    this.$axios.setToken(token, 'token');
  },
  removeToken(state) {
    state.isAuthenticated = false;
    state.token = null;
    state.user = null;
    this.$axios.setToken(false);
    this.$cookies.remove('token');
  },
  loading(state) {
    state.isLoading = true;
  },
  loaded(state) {
    state.isLoading = false;
  },
};
