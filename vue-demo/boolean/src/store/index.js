import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import errorLog from './modules/errorLog'
import tagsView from './modules/tagsView'
import user from './modules/user'
import actions from './actions'
import getters from './getters'
import state from './state'
import mutations from './mutation'


Vue.use(Vuex)

//  export一个Vuex.Store的实例
const store =  new Vuex.Store({
  modules:{
    app,
    errorLog,
    tagsView,
    user,
  },
  actions,
  state,
  mutations,
  getters

})
export default store
