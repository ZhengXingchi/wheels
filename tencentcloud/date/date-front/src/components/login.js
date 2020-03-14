import React, { Component, PropTypes } from 'react'
import handleChange from 'MIXIN/handleChange'
import { connect } from 'react-redux'
import { List, InputItem, Toast } from 'antd-mobile'
import { createForm } from 'rc-form'
import pattern from 'UTIL/pattern'
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
class Login extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  constructor(props) {
    super(props)

    this.state = { telephone: '', password: '', telephoneError: null }

    this.handleChange = handleChange.bind(this) // mixin
  }
  onErrorClick = () => {
    if (this.state.telephoneError) {
      Toast.info('请输入正确的手机号码')
    }
  }
  onChange = (value, type) => {

    if (type === 'telephone') {
      let value1 = value.replace(/\s/g, '')
      if (value1.length < 11) {
        this.setState({
          telephoneError: true
        })
      } else {
        if (!(pattern.telephone.test(value1))) {
          this.setState({
            telephoneError: true
          })
        } else {
          this.setState({
            telephoneError: false
          })
        }
      }
    }

    this.setState({
      [type]: value
    })
  }
  handleSubmit = () => {
    this.props.form.validateFields((error, value) => {
      if (!this.state.telephone) {
        this.setState({
          telephoneError: true
        })
        return
      }
      if (error) {
        return
      }
      if (this.state.telephoneError) {
        return
      }
      let telephoneStr = this.state.telephone.replace(/\s/g, '')
      this.props.login({ ...value, telephone: telephoneStr }).then(res => {
        if (res.code === 200) {
          alert('登陆成功')
          this.context.router.replace('/')
        } else {
          alert(res.msg)
        }
      })
    })


  }
  render () {
    const { getFieldDecorator, getFieldError } = this.props.form
    return (
      <div className="jumbotron">
        <div className="title" style={{ textAlign: 'center' }}>
          <h1>玉山便民网 <br />    登录</h1>
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
        {/* <form
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
          </div> */}
        {/* <div className="form-group">
            <label for="telephone">姓名</label>
            <input onChange={this.handleChange} name="username" className="form-control" id="telephone" placeholder="姓名" />
          </div> */}
        {/* <div className="form-group">
            <label for="psword">密码</label>
            <input onChange={this.handleChange} name="password" type="password" className="form-control" id="psword" placeholder="密码" />
          </div>
          <button type="submit" className="btn btn-default">登录</button>
        </form> */}


        <List renderHeader={() => ''}>
          <InputItem
            type="phone"
            placeholder="请输入手机号"
            error={this.state.telephoneError}
            onErrorClick={this.onErrorClick}
            onChange={(v) => this.onChange(v, 'telephone')}
            value={this.state.telephone}
          >手机号码</InputItem>
          <div style={{ marginLeft: '10px', color: 'red' }}>{this.state.telephoneError === true ? '请输入正确的手机号码' : null}</div>


          {getFieldDecorator('password', {
            rules: [{ required: true, message: '密码不能为空' }, { pattern: pattern.password, message: '密码必须由8-18位字母数字组成的' }]
          })(<InputItem
            clear
            type="password"
            placeholder="********"
          >密码</InputItem>)}
          <div style={{ marginLeft: '10px', color: 'red' }}>{getFieldError('password') ? getFieldError('password').join(',') : null}</div>

          <List.Item>
            <div
              style={{ width: '100%', color: '#108ee9', textAlign: 'center' }}
              onClick={() => this.handleSubmit()}
            >
              登录
            </div>
          </List.Item>
        </List>
      </div >
    )
  }
}

Login = createForm()(Login)
export default Login
