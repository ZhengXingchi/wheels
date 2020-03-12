import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IndexLink, Link } from 'react-router'
import LoginForm from './LoginForm'
import LogoutDropdown from './LogoutDropdown'

/* 导航栏全局显示，控制着用户的登录注销 */

@connect( // 功能同 UTIL/createContainer
  ({ userData }) => ({ userData }),
  require('ACTION/user').default
)
export default class Navbar extends Component {
  componentWillMount () {
    console.info('[Navbar] 初始化：检查用户是否已经登录')
    console.info('[TIPS] 由于有Redux Logger，故之后就不手动打印动作了')
    // this.props.checkLogin()
    this.props.fresh()
  }

  render () {
    let {
      userData, login, logout, // 通过 connect 获取
      location: { pathname }   // 通过 App 传入
    } = this.props

    return (
      <div style={{ position: 'fixed', top: 0, zIndex: 999, width: '100%' }}>
        <div className="row clearfix" >
          <div className="col-md-12 column">
            <nav className="navbar navbar-default" role="navigation">
              <div className="navbar-header">
                <button
                  type="button"
                  className="navbar-toggle"
                  data-toggle="collapse"
                  data-target="#nav-collapse">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>

                <span className="navbar-brand" onClick={() => window.history.back(-1)}>返回</span>
                <Link to='/' className="navbar-brand">
                  {/* 玉山鹊桥仙 */}
                  {/* 玉山人人网 */}
                玉山便民网
                {/* 玉山百姓网 */}
                  {/* 玉山黄页 */}
                </Link>
              </div>
              <div className="collapse navbar-collapse" id="nav-collapse">
                <ul className="nav navbar-nav">
                  <li className={pathname === '/' && 'active'}>
                    <IndexLink to='/'>
                      欢迎页
                  </IndexLink>
                  </li>
                  <li className={pathname.startsWith('/add') && 'active'}>
                    <Link to='/add'>
                      我要上墙
                  </Link>
                  </li>
                  <li className={pathname.startsWith('/showgirl') && 'active'}>
                    <Link to='/showgirl'>
                      女生墙
                  </Link>
                  </li>
                  <li className={pathname.startsWith('/showboy') && 'active'}>
                    <Link to='/showboy'>
                      男生墙
                  </Link>
                  </li>
                </ul>
                {userData ?
                  <LogoutDropdown userData={userData} logout={logout} /> :
                  <LoginForm login={login} />
                }
              </div>
            </nav>
          </div>
        </div>
      </div>
    )
  }
}
