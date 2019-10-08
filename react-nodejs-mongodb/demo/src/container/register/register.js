import React ,{Component} from 'react'
import Logo from '../../component/logo/logo'
import {connect} from 'react-redux'
import {register} from '../../redux/user.redux'
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
class Register extends Component{
  constructor(props){
    super(props);
    this.state={
      user:'',
      pwd:'',
      repeatpwd:'',
      type:'genius'
    }
    this.handleRegister=this.handleRegister.bind(this)
  }

  handleChange(key,val){
    this.setState({
      [key]:val
    })
  }

  handleRegister(){
    this.props.register(this.state)
    console.log(this.state)
  }
 
  render(){
    return(
      <div>
        <Logo></Logo>
        <h2>注册页</h2>
          <List>
            <InputItem onChange={v=>this.handleChange('user',v)}>用户</InputItem>
            <WhiteSpace/>
            <InputItem type="password" onChange={v=>this.handleChange('pwd',v)}>密码</InputItem>
            <InputItem type="password"  onChange={v=>this.handleChange('repeatpwd',v)}>确认密码</InputItem>
            <RadioItem checked={this.state.type==='genius'} onChange={v=>this.handleChange('type',"genius")}>牛人</RadioItem>
            <RadioItem checked={this.state.type==='boss'} onChange={v=>this.handleChange('type',"boss")}>BOSS</RadioItem>
            <Button type="primary" onClick={this.handleRegister}>注册</Button>
          </List>
      </div>
    )
   
  }
}

export default Register