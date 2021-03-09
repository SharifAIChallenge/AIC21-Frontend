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
    let res = await login(this.$axios, payload).catch(e => this.$toast.error('ایمیل یا رمز اشتباه است'));
    commit('loaded');
    if (res.token) {
      commit('setToken', res);
      dispatch('getUser');
      commit('formStatus/toggleShow', {}, { root: true });
      this.$router.push('/dashboard');
      this.$cookies.set('token', res.token, {
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      });
    }
  },
  loadUser({ commit, dispatch }, token) {
    commit('setToken', token);
    dispatch('getUser');
  },
  async logout({ commit }) {
    this.$cookies.remove('token');
    let res = await logout(this.$axios).catch(e => console.log(e));
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
  },
  loading(state) {
    state.isLoading = true;
  },
  loaded(state) {
    state.isLoading = false;
  },
};
