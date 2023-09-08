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
    async checkTokenLive(state){
      provider.setToken(state.state.jwt)
      var isAlive = await provider.getAccount()
      if ((isAlive.response != undefined && isAlive.response.status === 401) || isAlive.status != 200) {
        localStorage.removeItem('token')
        return false;
      }else{
        return true;
      }
    }
  },
  modules: {
  }
})
 