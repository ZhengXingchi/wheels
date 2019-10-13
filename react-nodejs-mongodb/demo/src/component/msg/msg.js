import React from 'react'
import {connect} from 'react-redux'
import {
  List,
  Badge
} from 'antd-mobile'
export default @connect(
state=>state
)
class Msg extends React.Component{

  getLast(arr){
    return arr[arr.length-1]
  }
  render(){
    const msgGroup={}
    this.props.chat.chatmsg.forEach(v=>{
      msgGroup[v.chatid]=msgGroup[v.chatid]||[]
      msgGroup[v.chatid].push(v)
    })
    const chatList=Object.values(msgGroup)
    const userid=this.props.user._id
    const userinfo = this.props.chat.users
    return (
      <div>
        
           {chatList.map(v=>{
              const lastItem=this.getLast(v)
              const targetId=v[0].from==userid?v[0].to:v[0].from
              const unreadNum=v.filter(item=>!item.read&&item.to==userid).length
              console.log('vvvv1111',v,unreadNum,userid)
              if (!userinfo[targetId]) {
                return null
              }
              return(
                <List key={lastItem._id}>
                  <List.Item
                    extra={<Badge text={unreadNum}></Badge>}
                    thumb={require(`../img/${this.props.chat.users[targetId]&&this.props.chat.users[targetId].avatar}.png`)}
                    arrow="horizontal"
                    onClick={()=>{
                      this.props.history.push('/chat')
                    }}
                  >
                  {lastItem.content}
                   <List.Item.Brief> {this.props.chat.users[targetId]&&this.props.chat.users[targetId].name}</List.Item.Brief>
                  </List.Item>
                </List>
              )
           })}
       
      </div>
    )
  }
}





















