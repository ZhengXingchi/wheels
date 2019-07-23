// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import qs from 'qs';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/style/index.scss' // global css
import '@/style/common/iconfont/ionicons.scss' // global css
import './permission' // permission control
import echarts from 'echarts'
import md5 from 'js-md5'
import './icons' // icon
import './errorLog' // error log
import * as compareVersions from 'compare-versions';
let Base64 = require('js-base64').Base64;

Vue.prototype.$echarts = echarts
Vue.use(ElementUI);
import axios from 'axios'
axios.defaults.withCredentials = true


Vue.prototype.$http = axios;

Vue.config.productionTip = false
Vue.prototype.$md5 = md5
Vue.prototype.$qs = qs
Vue.prototype.$Base64 = Base64
Vue.prototype.$compareVersions = compareVersions
/* eslint-disable no-new */
let myVue = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
// axios.interceptors.request.use(config => {
//   console.log(config);
//   return config
// }, error => {
//   console.log(error);
//   return Promise.reject(error)
// })
axios.interceptors.response.use(function (response) {
  const res = response.data
  if(response.status!=200){
    myVue.$message('系统错误,请联系服务商');
    return void(0);
  }
  if(res == 'NOACCESS'){
    myVue.$message('未有权限')
  }
  return response;
}, function (error) {
  console.log(error);
  return Promise.reject(error);
});
