import Vue from 'vue'
import Vuex from 'vuex'
import app2StoreModule from '../exports/store'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    app2: app2StoreModule
  }
})
