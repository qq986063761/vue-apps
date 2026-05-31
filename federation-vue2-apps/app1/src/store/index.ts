import Vue from 'vue'
import Vuex from 'vuex'
import app1StoreModule from '../exports/store'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    app1: app1StoreModule
  }
})
