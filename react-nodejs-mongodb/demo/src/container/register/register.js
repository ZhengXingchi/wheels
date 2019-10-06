import React ,{Component} from 'react'
import Logo from '../../component/logo/logo'
import {
  List,
  InputItem,
  WingBlank,
  WhiteSpace,
  Button,
  Radio
}from 'antd-mobile'
const {RadioItem}=Radio
class Register extends Component{
  constructor(props){
    super(props);
    this.state={
      type:'genius'
    }
    
  }
 
  render(){
    return(
      <div>
        <Logo></Logo>
        <h2>注册页</h2>
          <List>
            <InputItem>用户</InputItem>
            <WhiteSpace/>
            <InputItem>密码</InputItem>
            <InputItem>确认密码</InputItem>
            <RadioItem checked={this.state.type==='genius'}>牛人</RadioItem>
            <RadioItem checked={this.state.type==='boss'}>BOSS</RadioItem>
            <Button type="primary">注册</Button>
          </List>
      </div>
    )
   
  }
}

export default Register