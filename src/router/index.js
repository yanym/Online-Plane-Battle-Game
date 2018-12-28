import Vue from 'vue'
import Router from 'vue-router'

import Login from '../components/Login.vue'
import Menu from '../components/Menu.vue'
import RoomList from '../components/RoomList.vue'
import Game from '../components/Game.vue'
import Ready from '../components/Ready.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/menu',
      name: 'Menu',
      component: Menu
    },
    {
      path:'/roomList',
      name: 'RoomList',
      component: RoomList
    },
    {
      path: '/ready',
      component: Ready
    },
    {
      path: '/game',
      component: Game
    }
  ]
})
