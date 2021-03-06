import { VIEW_MATCHES, VIEW_LOBBY, GET_CHALLENGE } from '~/api'
import {getChallenge} from '~/api'
import Vue from 'vue'

export const state = () => ({
  games: [],
  gamesCount: 0,
  friendlyLobbies: [],
  challenge: {
    friendly_game_delay: 0,
    code_submit_delay: 0,
    can_submit: true,
    can_change_submission: true,
  },
})

export const actions = {
  async getGames({ commit, rootState, dispatch }, { count = 50, offset = 0 }) {
    let data = await this.$axios.$get(VIEW_MATCHES.url, { params: { count, offset } })
    if (rootState.team.team === null) {
      await dispatch('team/getTeam', null, { root: true })
    }
    let team = rootState.team.team.name
    commit('setGames', { ...data, team })
  },
  async getFriendlyLobbies({ commit }) {
    let data = await this.$axios.$get(VIEW_LOBBY.url)
    commit('setFriendlyLobbies', data)
  },
  async getChallenge({ commit, rootState, dispatch }) {
    if (rootState.team.team === null) {
      await dispatch('team/getTeam', null, { root: true })
    }
    let challenge = rootState.team.team.challenge
    // let data = await this.$axios.$get(GET_CHALLENGE.url + '/' + challenge)
    let data= await getChallenge(this.$axios,challenge)
    commit('setChallenge', data)
  },
}

export const mutations = {
  setGames(state, { status_code, games, team, count }) {
    if (status_code === 200) {
      games.forEach(x => {
        let log = []
        let ss = [0, 0, 1, 1]
        let ts = [0, 1, 0, 1]
        for (let i = 0; i < 4; i++) {
          let side = x.game_sides[ss[i]].game_teams[ts[i]]
          if (side && side.team.name === team) log.push(side.log)
        }
        x.client_log = [...log]
      })
      Vue.set(state, 'games', games)
      Vue.set(state, 'gamesCount', count)
    }
  },
  setChallenge(state, { status_code, challenge }) {
    if (status_code === 200) {
      Vue.set(state, 'challenge', challenge)
    }
  },
  setFriendlyLobbies(state, { status_code, lobbies }) {
    if (status_code === 200) {
      Vue.set(state, 'friendlyLobbies', lobbies)
    }
  },
}
