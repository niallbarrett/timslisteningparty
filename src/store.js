import Vue from 'vue'
import Vuex from 'vuex'
import tim from '@/json/tim'
Vue.use(Vuex)

export const store = {
  state: {
    token: null,
    album: null,
    following: [tim]
  },
  getters: {
    token(state) {
      return state.token
    },
    album(state) {
      return state.album
    },
    following(state) {
      return state.following
    }
  },
  mutations: {
    setToken(state, token) {
      return state.token = token
    },
    setAlbum(state, album) {
      return state.album = album
    },
    addUser(state, user) {
      return state.following.push(user)
    },
    removeUser(state, user) {
      return state.following.splice(state.following.indexOf(user), 1)
    }
  }
}

export default new Vuex.Store(store)
