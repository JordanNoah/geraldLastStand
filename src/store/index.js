import Vue from 'vue'
import Vuex from 'vuex'
import provider from '../plugins/provider'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    jwt:localStorage.getItem('token')
  },
  getters: {
    getJwt(state){
      return state.jwt
    }
  },
  mutations: {
    createJwt(state, token){
      localStorage.setItem('token',token)
      provider.setToken(token)
      state.jwt = token
    },
    deleteJwt(state){
      localStorage.removeItem('token')
      provider.removeToken()
      state.jwt = null
    }
  },
  actions: {
  },
  modules: {
  }
})
