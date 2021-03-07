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
  },
  async login({ commit, dispatch }, payload) {
    commit('loading');
    let res = await login(this.$axios, payload);
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
    commit('logout');
  },
};

export const mutations = {
  setUser(state, { data }) {
    state.user = data;
  },
  setToken(state, { token }) {
    state.token = token;
    state.isAuthenticated = true;
    this.$cookies.set('token', token, {
      maxAge: 60 * 60 * 24 * 7,
    });
    this.$router.push('/dashboard');
    this.$axios.setToken(token, 'token');
  },
  logout(state) {
    state.isAuthenticated = false;
    state.token = null;
    this.$cookies.remove('token');
    this.$router.push('/');
  },
  loading(state) {
    state.isLoading = true;
  },
  loaded(state) {
    state.isLoading = false;
  },
};
