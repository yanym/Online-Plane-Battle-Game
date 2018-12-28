import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import Player from '../player'

Vue.use(Vuex)

const state = {
  own: new Player('test', Math.round(Math.random() * window.innerWidth), Math.round(Math.random() * window.innerHeight)),
  monsters: new Map()
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
