import React, { Component, PropTypes } from 'react'
import handleChange from 'MIXIN/handleChange'

export default class LoginForm extends Component {
  constructor(props) {
    super(props)
    // P.S: 仅能在构造函数中设置 state
    // 在其他地方绝不能使用 this.state.XXX = XXX
    // 只能使用 this.setState({ XXX: XXX })
    this.state = { username: '' }

    this.handleChange = handleChange.bind(this) // mixin
  }
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  // handleSubmit () {
  //   let username = this.state.username
  //   if (!username) return alert('用户名为空')
  //   this.props.login({ username })
  // }

  register (e) {
    e.preventDefault()
    console.log('注册')
    this.props.router.replace('/register')
  }

  login (e) {
    e.preventDefault()
    console.log('登录')
    this.props.router.replace('/login')
  }
  render () {
    /* 由于 ES6 中 React 不会自动绑定this，直接 onSubmit={this.handleSubmit} 会报错
      详情请参考 https://facebook.github.io/react/docs/reusable-components.html#no-autobinding */
    return (
      <form
        role="search"
        className="navbar-form navbar-right"
      >

        {/* <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="username"
            placeholder="请输入您的用户名"
            required
            value={this.state.username}
            onChange={this.handleChange} />
        </div> */}

        <button
          className="btn btn-success"
          onClick={this.login}>
          登录
        </button>

        <button
          className="btn btn-success"
          style={{ marginLeft: '10px' }}
          onClick={this.register}>
          注册
        </button>

      </form >
    )
  }
}

/**
 * React onClick点击事件传参三种写法
 * 写法一
<Button onClick={this.delFolder.bind(this,"abc")}></Button>

定义delFolder方法

delFolder = (name,e)=>{

alert(name)

}

用bind绑定，调用是作为第二个参数传递，不用显示传递事件对象，定义方法时，事件对象作为最后一个参数传入

写法二
<Button onClick={this.delFolder("abc")}></Button>

定义delFolder方法

delFolder = (name)=>{

return (e)=>{

console.log(e);

console.log(key);

}

}

返回一个函数，事件对象在返回的函数中

第三种写法
<Button onClick={（e）=>this.delFolder("abc",e)}></Button>

delFolder = (name,e)=>{

}

事件对象作为第二个参数传递


 */
