import { getNotifications } from '~/api';

export const state = () => ({
  notifications: [],
});

export const actions = {
  async get({ commit }) {
    this.$axios.$get('/subscribe/public-notifications').then(res => {
      commit('set', res);
    });
  },
};

export const mutations = {
  set(state, { notifications, status_code }) {
    if (status_code === 200) {
      state.notifications = notifications.reverse();
    }
  },
};
