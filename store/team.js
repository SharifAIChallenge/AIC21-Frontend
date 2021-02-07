import { RECEIVED_INVITATIONS, SENT_INVITATIONS, getTeamDetail, VIEW_SUBMISSIONS , viewSubmissions , receivedInvitations , sentInvitations} from '~/api';
import Vue from 'vue';

export const state = () => ({
  team: null,
  receivedInvitations: [],
  sentInvitations: [],
  finalSubmission: [],
});

export const actions = {
  async getTeam({ commit }) {
    let data = await getTeamDetail(this.$axios);
    if (data.status_code === 200) {
      if (data.errors) {
        commit('set', { team: null });
        commit('dashboard/updateRoute', { route: 'submissions', val: true }, { root: true });
        commit('dashboard/updateRoute', { route: 'games', val: true }, { root: true });
      } else {
        commit('set', data);
        commit('dashboard/updateRoute', { route: 'submissions', val: !data.team.is_valid }, { root: true });
        commit('dashboard/updateRoute', { route: 'games', val: !data.team.is_valid }, { root: true });
      }
    }
  },
  async getReceivedInvitations({ commit }) {
    let data = await receivedInvitations(this.$axios);
    commit('setInvitations', { ...data, type: 'received' });
  },
  async getSentInvitations({ commit }) {
    let data = await receivedInvitations(this.$axios);
    commit('setInvitations', { ...data, type: 'sent' });
  },
  async getSubmissions({ commit }) {
    // let data = await this.$axios.$get(VIEW_SUBMISSIONS.url);
    let data = await viewSubmissions(this.$axios);

    commit('setSubmissions', data);
  },
};

export const mutations = {
  set(state, { team }) {
    Vue.set(state, 'team', team);
  },
  setInvitations(state, { type, invitations, status_code }) {
    if (status_code === 200) {
      Vue.set(state, `${type}Invitations`, invitations.reverse());
    } else {
      Vue.set(state, `${type}Invitations`, []);
    }
  },
  setSubmissions(state, { submissions, status_code }) {
    if (status_code === 200) {
      Vue.set(state, 'submissions', submissions);
      state.submissions.forEach(x => {
        if (x.is_final) state.finalSubmission = [x];
      });
    }
  },
};
