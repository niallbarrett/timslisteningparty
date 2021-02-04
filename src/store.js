import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export const store = {
  state: {
    token: null,
    album: null,
    follow: null
  },
  getters: {
    token(state) {
      return state.token
    }
  },
  mutations: {
    setToken(state, token) {
      return state.token = token
    }
  }
}

export default new Vuex.Store(store)
