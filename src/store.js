import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = {
  state: {
    token: null,
    album: {},
    following: [],
    timId: '19429176',
    highlight: null
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
    },
    timId(state) {
      return state.timId
    },
    highlight(state) {
      return state.highlight
    }
  },
  mutations: {
    setToken(state, token) {
      return state.token = token
    },
    setAlbum(state, album) {
      return state.album = album
    },
    setHighlight(state, tweet) {
      return state.highlight = tweet
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
