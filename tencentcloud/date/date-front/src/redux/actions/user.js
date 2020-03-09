import userService from 'SERVICE/userService'
import storage from 'UTIL/storage'
// ================================
// Action Type
// ================================
const LOG_IN = 'LOG_IN'
const LOG_OUT = 'LOG_OUT'

// ================================
// Action Creator
// ================================
const loginDone = (userData) => ({
  type: LOG_IN,
  payload: userData
})

const fresh = (formData) => {
  return dispatch => {
    let userdata = storage.get('userdata')
    if (userdata !== '' && userdata != null) {
      dispatch(loginDone(userdata))
    }
  }
}


// const login = (formData) => {
//   return dispatch => {
//     userService
//       .login(formData)
//       .then(
//         re => {
//           console.log('4444444444', re)
//           storage.set('token', re.token, 300)
//           storage.set('userdata', re.data, 300)
//           dispatch(loginDone(re.data))
//         }
//       )
//   }
// }

const login = (formData) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      userService
        .login(formData)
        .then(
          re => {
            if (re.code === 200) {
              storage.set('token', re.token, 300)
              storage.set('userdata', re.data, 300)
              dispatch(loginDone(re.data))
            }
            resolve(re)
          },
          rej => {
            reject(rej)
          }
        )
    })
  }
}


const register = (formData) => {
  return dispatch => {
    userService
      .register(formData)
      .then(
        re => dispatch(loginDone(re))
      )
  }
}

const checkLogin = () => {
  return dispatch => {
    userService
      .checkLogin()
      .then((re) => {
        if (!re) return
        dispatch(loginDone(re))
      })
  }
}

const logout = () => {
  return dispatch => {
    userService
      .logout()
      .then(() =>
        dispatch({
          type: LOG_OUT
        })
      )
  }
}
/* default 导出所有 Actions Creator */
export default {
  login, checkLogin, logout, register, fresh
}

// ================================
// Action handlers for Reducer
// 本来更新 state 是 Reducer 的责任
// 但要把 ActionType 导出又引入实在太麻烦
// 且在 Reducer 中写 switch-case 实在太不优雅
// 故在此直接给出处理逻辑
// ================================
export const ACTION_HANDLERS = {
  [LOG_IN]: (userData, { payload }) => payload, // payload is userData
  [LOG_OUT]: () => null
}
