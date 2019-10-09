import React ,{Component} from 'react'
import Logo from '../../component/logo/logo'
import {connect} from 'react-redux'
import {login} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
import {
  List,
  InputItem,
  WingBlank,
  WhiteSpace,
  Button
}from 'antd-mobile'

@connect(
state=>state.user,
{login}
)
class Login extends Component{
  constructor(props){
    super(props);
    this.register=this.register.bind(this)
    this.handlelogin=this.handlelogin.bind(this)
     this.state={
      user:'',
      pwd:''
     
    }
  }

  register(){
    this.props.history.push('/register')
  }

  handlelogin(){
    this.props.login(this.state)
  }

   handleChange(key,val){
    this.setState({
      [key]:val
    })
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
            <InputItem  onChange={v=>this.handleChange('user',v)}>用户</InputItem>
       
            <InputItem  onChange={v=>this.handleChange('pwd',v)}>密码</InputItem>
           
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