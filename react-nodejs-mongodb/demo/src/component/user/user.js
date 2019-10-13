import React,{Component} from 'react'
import {connect} from 'react-redux' 
import {
  Result,
  List,
  WhiteSpace,
  Button,
  Modal
} from 'antd-mobile'
import cookies from 'browser-cookies'
import {logoutSubmit} from '../../redux/user.redux'
import {logoutChat} from '../../redux/chat.redux'
import {Redirect} from 'react-router-dom'
export default @connect(
state=>state.user,
{logoutSubmit,logoutChat}
)
class User extends Component{
  constructor(props){
    super(props)
    this.logout=this.logout.bind(this)
  }

  logout(){
    console.log('111')
    Modal.alert('注销','确认退出吗?',[
      {text:'取消',onPress:()=>console.log('cancel')},
      {text:'确认',onPress:()=>{
        cookies.erase('userid')
        this.props.logoutSubmit()
        this.props.logoutChat()
       
      }}
    ])
  }
  render(){
    return this.props.user?(

      <div>
        <Result
          img={<img src={require(`../img/${this.props.avatar}.png`)} style={{width:50}} alt=""/>}
          title={this.props.user}
          message={this.props.type=='boss'?this.props.company:null}>
        </Result>
        
        <List
          renderHeader={()=>'简介'}
        >
          <List.Item multipleLine>
             {this.props.title}
             {this.props.desc.split('\n').map(v=>(
                <List.Item.Brief key={v}>{v}</List.Item.Brief>
             ))} 
             {this.props.money? <List.Item.Brief>薪资：{this.props.money}</List.Item.Brief>:null}
            
          </List.Item>
        </List>
        <WhiteSpace></WhiteSpace>
        <Button onClick={this.logout}>退出登录</Button>
      </div>):<Redirect to={this.props.redirectTo}></Redirect>
    
  }
}