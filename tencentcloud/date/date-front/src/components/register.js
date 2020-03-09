import React, { Component } from 'react'
import handleChange from 'MIXIN/handleChange'
import { connect } from 'react-redux'
// import { Link } from 'react-router'
/**
 * 本组件为欢迎页（首页）
 * 由于几乎没有交互逻辑
 * 因此可以不使用类的写法
 * 
 * 实际上，ES6 的类经由 Babel 转码后
 * 其实还是返回一个类似的函数
 */

@connect( // 功能同 UTIL/createContainer
  ({ userData }) => ({ userData }),
  require('ACTION/user').default
)
export default class Register extends Component {
  constructor(props) {
    super(props)

    this.state = { telephone: '', password: '', username: '' }

    this.handleChange = handleChange.bind(this) // mixin
  }
  handleSubmit = () => {
    console.log('11111', this.state)
    let telephone = this.state.telephone
    if (!telephone) return alert('手机号不得为空')
    let password = this.state.password
    if (!password) return alert('密码不得为空')
    let username = this.state.username
    if (!username) return alert('姓名不得为空')
    this.props.register({ telephone, password, username })
  }
  render () {
    return (
      <div className="jumbotron">
        <div className="title" style={{ textAlign: 'center' }}>
          <h1>玉山鹊桥仙 <br />    注册</h1>
        </div>

        {/* <p>
          <Link
            to="/msg"
            role="button"
            className="btn btn-success btn-lg">
            前往留言板 &gt;
          </Link>
          &nbsp;
          <Link
            to="/todo"
            role="button"
            className="btn btn-success btn-lg">
            前往待办事项(新功能) &gt;
          </Link>
        </p> */}
        <form
          onSubmit={
            (e) => {
              e.preventDefault() // 防页面跳转
              this.handleSubmit()
            }
          }
        >
          <div className="form-group">
            <label for="telephone">手机号</label>
            <input onChange={this.handleChange} name="telephone" className="form-control" id="telephone" placeholder="手机号" />
          </div>
          <div className="form-group">
            <label for="telephone">姓名</label>
            <input onChange={this.handleChange} name="username" className="form-control" id="telephone" placeholder="姓名" />
          </div>
          <div className="form-group">
            <label for="psword">密码</label>
            <input onChange={this.handleChange} name="password" type="password" className="form-control" id="psword" placeholder="密码" />
          </div>
          <button type="submit" className="btn btn-default">注册</button>
        </form>

      </div >
    )
  }
}
