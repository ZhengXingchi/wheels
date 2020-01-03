import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import store from '@/store'
import jwt from 'jsonwebtoken'
import moment from 'moment'
const Login = () => import(/* webpackChunkName: 'login' */ './views/Login.vue')
const Reg = () => import(/* webpackChunkName: 'reg' */ './views/Reg.vue')
const Forget = () => import(/* webpackChunkName: 'forget' */ './views/Forget.vue')
const Index = () => import(/* webpackChunkName: 'index' */ './views/channels/index.vue')
const Center = () => import(/* webpackChunkName: 'center' */ './views/Center.vue')
const Template1 = () => import(/* webpackChunkName: 'template1' */ './views/channels/template1.vue')
const UserCenter = () => import(/* webpackChunkName: 'user-center' */ './components/user/Center.vue')
const Settings = () => import(/* webpackChunkName: 'settings' */ './components/user/Settings.vue')
const Posts = () => import(/* webpackChunkName: 'settings' */ './components/user/Posts.vue')
const Msg = () => import(/* webpackChunkName: 'user-msg' */ './components/user/Msg.vue')
const Others = () => import(/* webpackChunkName: 'user-others' */ './components/user/Others.vue')
const User = () => import(/* webpackChunkName: 'user' */ './views/User.vue')
const MyInfo = () => import(/* webpackChunkName: 'myinfo' */ './components/user/common/MyInfo.vue')
const PicUpload = () => import(/* webpackChunkName: 'pic-upload' */ './components/user/common/PicUpload.vue')
const Passwd = () => import(/* webpackChunkName: 'passwd' */ './components/user/common/Passwd.vue')
const Accounts = () => import(/* webpackChunkName: 'accounts' */ './components/user/common/Accounts.vue')
const MyPost = () => import(/* webpackChunkName: 'my-post' */ './components/user/common/MyPost.vue')
const MyCollection = () => import(/* webpackChunkName: 'my-collection' */ './components/user/common/MyCollection.vue')
const NotFound = () => import(/* webpackChunkName: 'notfound' */ './views/NotFound.vue')
const Confirm = () => import(/* webpackChunkName: 'confirm' */ './views/Confirm.vue')
const Reset = () => import(/* webpackChunkName: 'reset' */ './views/Reset.vue')

Vue.use(Router)

const router = new Router({
  linkExactActiveClass: 'layui-this',
  routes: [
    {
      path: '/',
      component: Home,
      children: [{
        path: '',
        name: 'index',
        component: Index
      }, {
        path: '/index/:catelog',
        name: 'catelog',
        component: Template1
      }]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/confirm',
      name: 'confirm',
      component: Confirm
    },
    {
      path: '/reset',
      name: 'reset',
      component: Reset
    },
    {
      path: '/reg',
      name: 'reg',
      component: Reg,
      beforeEnter: (to, from, next) => {
        if (from.name === 'login') {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/forget',
      name: 'forget',
      component: Forget
    }, {
      path: '/user',
      name: 'home',
      props: true,
      component: User
    },
    {
      path: '/center',
      meta: { requireAuth: true },
      component: Center,
      linkActiveClass: 'layui-this',
      children: [{
        path: '',
        name: 'center',
        component: UserCenter
      }, {
        path: 'posts',
        name: 'posts',
        component: Posts,
        children: [{
          path: '',
          name: 'mypost',
          component: MyPost
        }, {
          path: 'mycollection',
          name: 'mycollection',
          component: MyCollection
        }]
      }, {
        path: 'msg',
        name: 'msg',
        component: Msg
      }, {
        path: 'others',
        name: 'others',
        component: Others
      }, {
        path: 'set',
        name: 'set',
        component: Settings,
        children: [{
          path: '',
          name: 'info',
          component: MyInfo
        }, {
          path: 'pic',
          name: 'pic',
          component: PicUpload
        }, {
          path: 'passwd',
          name: 'passwd',
          component: Passwd
        }, {
          path: 'accounts',
          name: 'accounts',
          component: Accounts
        }]
      }]
    }, {
      path: '/404',
      component: NotFound
    }, {
      path: '*',
      redirect: '/404'
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  if (token !== '' && token !== null) {
    const payload = jwt.decode(token)
    if (moment().isBefore(moment(payload.exp * 1000))) {
      store.commit('setToken', token)
      store.commit('setUserInfo', userInfo)
      store.commit('setIsLogin', true)
    } else {
      localStorage.clear()
    }
  }
  if (to.matched.some(record => record.meta.requireAuth)) {
    const isLogin = store.state.isLogin
    if (isLogin) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
export default router
