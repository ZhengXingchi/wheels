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
export default class Login extends Component {
  constructor(props) {
    super(props)

    this.state = { telephone: '', password: '' }

    this.handleChange = handleChange.bind(this) // mixin
  }
  handleSubmit = () => {
    console.log('11111', this.state)
    let telephone = this.state.telephone
    if (!telephone) return alert('手机号不得为空')
    let password = this.state.password
    if (!password) return alert('密码不得为空')

    this.props.login({ telephone, password }).then(res => {
      if (res.code === 200) {
        alert('登陆成功')
      } else {
        alert(res.msg)
      }
    })

  }
  render () {
    return (
      <div className="jumbotron">
        <div className="title" style={{ textAlign: 'center' }}>
          <h1>玉山鹊桥仙 <br />    我要报名</h1>
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
          <div style={{
            height: '30px',
            lineHeight: '30px',
            fontSize: '20px',
            textAlign: 'center',
            margin: '0 100px 10px',
            borderBottom: '1px solid #a190df'
          }}>基本信息</div>
          <div className="form-group">
            <label for="birth">出生日期</label>
            <input onChange={this.handleChange} name="birth" className="form-control" id="birth" placeholder="出生日期，例如：1990" />
          </div>
          <div className="form-group">
            <label for="birth">身高</label>
            <input onChange={this.handleChange} name="birth" className="form-control" id="birth" placeholder="出生日期，例如：1990" />
          </div>
          <div className="form-group">
            <label for="birth">星座</label>
            <input onChange={this.handleChange} name="birth" className="form-control" id="birth" placeholder="出生日期，例如：1990" />
          </div>
          <div className="form-group">
            <label for="birth">出生地</label>
            <input onChange={this.handleChange} name="birth" className="form-control" id="birth" placeholder="出生日期，例如：1990" />
          </div>
          <div className="form-group">
            <label for="birth">现居地</label>
            <input onChange={this.handleChange} name="birth" className="form-control" id="birth" placeholder="出生日期，例如：1990" />
          </div>
          <div className="form-group">
            <label for="birth">学历</label>
            <input onChange={this.handleChange} name="birth" className="form-control" id="birth" placeholder="出生日期，例如：1990" />
          </div>
          <div className="form-group">
            <label for="birth">职业</label>
            <input onChange={this.handleChange} name="birth" className="form-control" id="birth" placeholder="出生日期，例如：1990" />
          </div>
          <div className="form-group">
            <label for="telephone">微信号</label>
            <input onChange={this.handleChange} name="telephone" className="form-control" id="telephone" placeholder="手机号" />
          </div>
          <div style={{
            height: '30px',
            lineHeight: '30px',
            fontSize: '20px',
            textAlign: 'center',
            margin: '0 100px 10px',
            borderBottom: '1px solid #a190df'
          }}>自我介绍</div>
          <div className="form-group">
            <label for="birth">性格</label>
            <input onChange={this.handleChange} name="birth" className="form-control" id="birth" placeholder="出生日期，例如：1990" />
          </div>
          <div className="form-group">
            <label for="birth">生活习惯</label>
            <input onChange={this.handleChange} name="birth" className="form-control" id="birth" placeholder="出生日期，例如：1990" />
          </div>
          <div className="form-group">
            <label for="birth">兴趣爱好</label>
            <input onChange={this.handleChange} name="birth" className="form-control" id="birth" placeholder="出生日期，例如：1990" />
          </div>
          <div className="form-group">
            <label htmlFor="content">其它</label>
            <textarea
              name="content"
              className="form-control"
              rows="3"
              placeholder="请输入内容..."
              onChange={this.handleChange}
              value={this.state.content}>
            </textarea>
          </div>
          <div style={{
            height: '30px',
            lineHeight: '30px',
            fontSize: '20px',
            textAlign: 'center',
            margin: '0 100px 10px',
            borderBottom: '1px solid #a190df'
          }}>理想对象</div>
          <div className="form-group">
            <label for="birth">年龄范围</label>
            <input onChange={this.handleChange} name="birth" className="form-control" id="birth" placeholder="出生日期，例如：1990" />
          </div>
          <div className="form-group">
            <label for="birth">外貌</label>
            <input onChange={this.handleChange} name="birth" className="form-control" id="birth" placeholder="出生日期，例如：1990" />
          </div>
          <div className="form-group">
            <label for="birth">性格</label>
            <input onChange={this.handleChange} name="birth" className="form-control" id="birth" placeholder="出生日期，例如：1990" />
          </div>
          <div className="form-group">
            <label for="birth">学历</label>
            <input onChange={this.handleChange} name="birth" className="form-control" id="birth" placeholder="出生日期，例如：1990" />
          </div>
          <div className="form-group">
            <label for="birth">坐标</label>
            <input onChange={this.handleChange} name="birth" className="form-control" id="birth" placeholder="出生日期，例如：1990" />
          </div>
          <div className="form-group">
            <label htmlFor="content">其它</label>
            <textarea
              name="content"
              className="form-control"
              rows="3"
              placeholder="请输入内容..."
              onChange={this.handleChange}
              value={this.state.content}>
            </textarea>
          </div>
          <button type="submit" className="btn btn-default" style={{ display: 'block', margin: '0 auto' }}>登录</button>
        </form>

      </div >
    )
  }
}
