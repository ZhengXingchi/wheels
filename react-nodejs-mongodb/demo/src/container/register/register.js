import React ,{Component} from 'react'
import Logo from '../../component/logo/logo'
import {connect} from 'react-redux'
import {register} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
import wrapperForm from '../../component/wrapper-form/wrapper-form'
import {
  List,
  InputItem,
  WingBlank,
  WhiteSpace,
  Button,
  Radio
}from 'antd-mobile'
const {RadioItem}=Radio

@connect(
  state=>state.user,
  {register}
)
@wrapperForm
class Register extends Component{
  constructor(props){
    super(props);
  
    this.handleRegister=this.handleRegister.bind(this)
  }

 componentDidMount(){
  this.props.handleChange('type','genius')
 }

  handleRegister(){
    this.props.register(this.props.state)
    console.log(this.props.state)
  }
 
  render(){
    
    return(
      <div>
        {this.props.redirectTo?<Redirect to={this.props.redirectTo}/>:null}
        <Logo></Logo>
        <h2>注册页</h2>
          <List>
            {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
            <InputItem onChange={v=>this.props.handleChange('user',v)}>用户</InputItem>
            <WhiteSpace/>
            <InputItem type="password" onChange={v=>this.props.handleChange('pwd',v)}>密码</InputItem>
            <InputItem type="password"  onChange={v=>this.props.handleChange('repeatpwd',v)}>确认密码</InputItem>
            <RadioItem checked={this.props.state.type==='genius'} onChange={v=>this.props.handleChange('type',"genius")}>牛人</RadioItem>
            <RadioItem checked={this.props.state.type==='boss'} onChange={v=>this.props.handleChange('type',"boss")}>BOSS</RadioItem>
            <Button type="primary" onClick={this.handleRegister}>注册</Button>
          </List>
      </div>
    )
   
  }
}

export default Register