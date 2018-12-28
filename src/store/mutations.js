import * as types from './mutation-types'
import MessageBox from '../messagebox'

export default {
  [types.SHOOT] (state) {
    state.own.shoot()
  },
  [types.PLAYER_TURN] (state, direct) {
    state.own.move(direct)
    state.own.state = 1
  },
  [types.PLAYER_TURN_END] (state) {
    state.own.state = 0
  },
  [types.PLAYER_LOGIN] (state, username) {
    state.own.setEnermy(state.monsters)
    state.own.setMessageBox(new MessageBox(4))
    state.own.setName(username)
  }
}
