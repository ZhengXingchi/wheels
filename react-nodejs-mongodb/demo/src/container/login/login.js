import React ,{Component} from 'react'
import Logo from '../../component/logo/logo'
import {connect} from 'react-redux'
import {login,resetRedirectTo} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
import wrapperForm from '../../component/wrapper-form/wrapper-form'
import {
  List,
  InputItem,
  WingBlank,
  WhiteSpace,
  Button
}from 'antd-mobile'
 

@connect(
state=>state.user,
{login,resetRedirectTo}
)
@wrapperForm
class Login extends Component{
  constructor(props){
    super(props);
    this.register=this.register.bind(this)
    this.handlelogin=this.handlelogin.bind(this)
   
  }

  register(){
    this.props.resetRedirectTo()
    this.props.history.push('/register')
  }

  handlelogin(){
    this.props.login(this.props.state)
  }

 

  render(){

    return (
      <div>
        <Logo></Logo>
        {this.props.redirectTo?<Redirect to={this.props.redirectTo}/>:null}
        <h2>登录页</h2>
        <WingBlank>
          <List>
           {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
            <InputItem  onChange={v=>this.props.handleChange('user',v)}>用户</InputItem>
       
            <InputItem  onChange={v=>this.props.handleChange('pwd',v)}>密码</InputItem>
           
           </List>
           <WhiteSpace/>
          <Button type='primary'  onClick={this.handlelogin}>登录</Button>
          <WhiteSpace/>
          <Button type='primary' onClick={this.register}>注册</Button>
        </WingBlank>
      </div>
   
    )
  }
}

export default Login