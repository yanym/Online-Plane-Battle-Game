import * as types from './mutation-types'

export default {
  shoot ({ commit }) {
    commit(types.SHOOT)
  },
  move ({ commit }, direct) {
    commit(types.PLAYER_TURN, direct)
  },
  turnEnd ({ commit }) {
    commit(types.PLAYER_TURN_END)
  },
  login ({ commit }, username) {
    commit(types.PLAYER_LOGIN, username)
  }
}
