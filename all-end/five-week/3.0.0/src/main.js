import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import VeeValidate, { Validator } from 'vee-validate'
import axios from 'axios'
// import Vuelidate from 'vuelidate'
// method1 to zh-cn
// import zh from 'vee-validate/dist/locale/zh_CN'

// method2 to zh-cn
// import './local/index'

// Vue.use(VeeValidate)
// Vue.use(Vuelidate)
// method1 to zh-cn
// Validator.localize('zh-CN', zh)

// method2 to zh-cn
// const validator = new Validator()
// validator.localize('zh-CN')


// import '@/util/veevalidate'
import '@/util/veevalidate-i18n'
Vue.config.productionTip = false





new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
