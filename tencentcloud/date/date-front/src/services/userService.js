import xhr from './xhr/'

/**
 * 对应后端涉及到用户认证的 API
 */
class UserService {

  checkLogin () {
    return xhr({ url: '/user' })
  }

  /**
   * @param  {Object} userData
   * @return {Promise}
   */
  login (userData) {
    return xhr({
      method: 'post',
      url: '/login/login',
      body: userData
    })
  }

  register (userData) {
    return xhr({
      method: 'post',
      url: '/login/register',
      body: userData
    })
  }

  logout () {
    return xhr({ url: '/logout' })
  }

  uploadpic (data) {
    return xhr({
      method: 'post',
      url: '/content/upload',
      body: data,
      type: 'file'
    })
  }

  wallhop (data) {
    return xhr({
      method: 'post',
      url: '/content/add',
      body: data
    })
  }

  getlist (data) {
    return xhr({
      method: 'get',
      url: '/public/list',
      body: data
    })
  }

}

// 实例化后再导出
export default new UserService()
