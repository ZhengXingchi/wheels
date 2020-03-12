import { injectReducer } from 'REDUCER'
// import userAuth from 'UTIL/userAuth'           // 用户访问拦截器
import createContainer from 'UTIL/createContainer'

const connectComponent = createContainer(
  ({ userData, msg }) => ({ userData, msg }), // mapStateToProps
  require('ACTION/msg').default               // mapActionCreators
)

export default {
  path: 'showgirl',

  /* 布局基页 */
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      // 立即注入 Reducer
      injectReducer('msg', require('REDUCER/msg/').default)
      // cb(null, require('VIEW/msg').default)
      cb()
    }, 'showgirl')
  },

  indexRoute: { // 对应 /login
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        cb(null, connectComponent(require('COMPONENT/Show').default))
      }, 'showgirlView')
    }
  }
}
