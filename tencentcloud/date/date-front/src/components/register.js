import React, { Component, PropTypes } from 'react'
import handleChange from 'MIXIN/handleChange'
import { connect } from 'react-redux'
import { List, InputItem, Toast, Button, Modal } from 'antd-mobile'
import { createForm } from 'rc-form'
import pattern from 'UTIL/pattern'
import userService from 'SERVICE/userService'
// const alert = Modal.alert
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
class Register extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  constructor(props) {
    super(props)

    this.state = {
      num: 0,
      telephone: '',
      email: '',
      code: '',
      telephoneError: null,
      password: '',
      username: '',
      other: ''
    }

    this.handleChange = handleChange.bind(this) // mixin
  }
  getCode = () => {
    let email = this.props.form.getFieldValue('email')
    if (!email) {
      Toast.fail('请输入邮箱', 1)
      return
    }
    if (this.props.form.getFieldError('email')) {
      Toast.fail('邮箱格式错误', 1)
      return
    }
    if (this.state.num > 0) {
      return
    }

    // alert('成功', '获取验证码成功，请去邮箱查收', [

    //   { text: 'OK', onPress: () => console.log('ok') },
    // ])
    userService.getcode({ email }).then(res => {

      if (res.code === 200) {
        Toast.success('邮箱验证码已发送', 1)
        let num = 60
        this.setState({
          num
        })
        this.ctrl = setInterval(() => {
          num--
          this.setState({
            num
          })

          if (num === 0) {
            clearInterval(this.ctrl)
          }
        }, 1000)
      } else {
        Toast.success(res.msg, 1)
      }
    })




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
      this.props.register({ ...value, telephone: telephoneStr }).then(res => {
        if (res.code === 200) {
          alert('注册成功')
          console.log(this.context, '4333333')
          this.context.router.replace('/login')
        } else {
          if (res.msg) {
            for (let key in res.msg) {
              alert(res.msg[key])
            }
          }
        }
      })

    })
  }
  render () {
    const { getFieldProps, getFieldDecorator, getFieldError } = this.props.form
    return (
      <div className="jumbotron">
        <div className="title" style={{ textAlign: 'center' }}>
          <h1>玉山便民网 <br />    注册</h1>
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

        <div>
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
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '昵称不能为空' }]
            })(<InputItem
              clear
              placeholder="请输入昵称"
            >昵称</InputItem>)}
            <div style={{ marginLeft: '10px', color: 'red' }}>{getFieldError('username') ? getFieldError('username').join(',') : null}</div>


            {getFieldDecorator('email', {
              rules: [
                { required: true, message: '邮箱不能为空' },
                { type: 'email', message: '邮箱格式不正确' }
              ]
            })(<InputItem
              clear
              type="email"
              placeholder="请输入邮箱"
            >邮箱</InputItem>)}
            <div style={{ marginLeft: '10px', color: 'red' }}>{getFieldError('email') ? getFieldError('email').join(',') : null}</div>

            {getFieldDecorator('code', {
              rules: [
                { required: true, message: '验证码不能为空' }

              ]
            })(<InputItem
              clear
              extra={<Button style={{ top: '-3px' }} size="small">{this.state.num === 0 ? '获取' : this.state.num}</Button>}
              onExtraClick={() => {
                this.getCode()
              }}
              type="email"
              placeholder="请输入验证码"
            >验证码</InputItem>)}
            <div style={{ marginLeft: '10px', color: '#888', fontSize: '8' }}>点击获取邮箱将收到系统发放的验证码，请注意查收</div>
            <div style={{ marginLeft: '10px', color: 'red' }}>{getFieldError('code') ? getFieldError('code').join(',') : null}</div>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '密码不能为空' }, { pattern: pattern.password, message: '密码必须由8-18位字母数字组成的' }]
            })(<InputItem
              clear
              type="password"
              placeholder="********"
            >密码</InputItem>)}
            <div style={{ marginLeft: '10px', color: 'red' }}>{getFieldError('password') ? getFieldError('password').join(',') : null}</div>
            <InputItem
              {...getFieldProps('other')}
              clear
              placeholder="选填"
            > 邀请人</InputItem>
            <div style={{ marginLeft: '10px', color: '#888', fontSize: '8' }}>邀请人请根据实际情况填写</div>
            <List.Item>
              <div
                style={{ width: '100%', color: '#108ee9', textAlign: 'center' }}
                onClick={() => this.handleSubmit()}
              >
                注册
            </div>
            </List.Item>
          </List>
        </div>
      </div >
      // <form
      //   onSubmit={
      //     (e) => {
      //       e.preventDefault() // 防页面跳转
      //       this.handleSubmit()
      //     }
      //   }
      // >
      //   <div className="form-group">
      //     <label for="telephone">手机号</label>
      //     <input onChange={this.handleChange} name="telephone" className="form-control" id="telephone" placeholder="手机号" />
      //   </div>
      //   <div className="form-group">
      //     <label for="telephone">昵称</label>
      //     <input onChange={this.handleChange} name="username" className="form-control" id="telephone" placeholder="姓名" />
      //   </div>
      //   <div className="form-group">
      //     <label for="psword">密码</label>
      //     <input onChange={this.handleChange} name="password" type="password" className="form-control" id="psword" placeholder="密码" />
      //   </div>
      //   <button type="submit" className="btn btn-default">注册</button>
      // </form> 
    )
  }
}


Register = createForm()(Register)
export default Register
