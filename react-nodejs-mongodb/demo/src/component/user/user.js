import React,{Component} from 'react'
import {connect} from 'react-redux' 
import {
  Result,
  List,
  WhiteSpace,
  Button
} from 'antd-mobile'
export default @connect(
state=>state.user
)
class User extends Component{
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
        <Button>退出登录</Button>
      </div>):null
    
  }
}