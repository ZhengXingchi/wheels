import React from 'react'
import io from 'socket.io-client'
import {
  List,
  InputItem,
  NavBar,
  Icon,
  Grid
} from 'antd-mobile'
import {connect} from 'react-redux'
import  {getMsgList,sendMsg,recvMsg,readMsg} from '../../redux/chat.redux'
import {getChatId} from '../../util' 
// const socket=io('ws://localhost:9093')


export default  @connect(
  state=>state,
  {getMsgList,sendMsg,recvMsg,readMsg}
)
class Chat extends React.Component {
  constructor(props){
    super(props)
    this.state={
      text:'',
      msg:[],
      showEmoji:false
    }
  }
  componentDidMount(){
    // socket.on('recvMsg',(data)=>{
    //   console.log(data)
    //   this.setState({
    //     msg:[...this.state.msg,data.text]
    //   })
    // })
    if(!this.props.chat.chatmsg.length){

      this.props.getMsgList()
      this.props.recvMsg()
      this.fixCarousel()
    }
    
  


  }

  componentWillUnmount(){
    const to=this.props.match.params.user
    this.props.readMsg(to)
  }

  fixCarousel(){
    setTimeout(()=>{
      window.dispatchEvent(new Event('resize'))
    },0)
  }
  handleSubmit(){
    // const {text}=this.state
    // socket.emit('sendMsg',{text})
    
    const from=this.props.user._id
    const to=this.props.match.params.user
    const msg=this.state.text
    this.props.sendMsg({from,to,msg})
    this.setState({
      text:''
    })
  }
  render(){
    const {user}=this.props.match.params
    const Item=List.Item
    const users=this.props.chat.users
    const chatmsgs=this.props.chat.chatmsg.filter(v=>v.chatid==getChatId(this.props.user._id,user))
    const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
                    .split(' ')
                    .filter(v=>v)
                    .map(v=>({text:v}))

    if(!users[user]){
      return null
    }
    return(
      <div id="chat-page">
        <NavBar 
          mode='dark' 
          icon={<Icon type="left"></Icon>}
          onLeftClick={()=>{
            this.props.history.goBack()
          }}
        >
          {users[user].name}
        </NavBar>
        {chatmsgs.map(v=>{
          
          return v.from==user?(
            <List key={v._id}>
               <Item
                 thumb={require(`../img/${users[user].avatar}.png`)}
               >{v.content}</Item>
            </List>
          ):
          (
            <List key={v._id}>
              <Item 
                className="chat-me"
                extra={<img src={require(`../img/${users[v.from].avatar}.png`)}/>}
              >{v.content}</Item>
            </List>
          )
        })}
        <div className="stick-footer">
          <List>
             <InputItem 
               placeholder="请输入"
               value={this.state.text}
               onChange={v=>{
                this.setState({text:v})
               }}
               extra={
                <div>
                  <span style={{maringRight:15}} onClick={()=>{this.fixCarousel();this.setState({showEmoji:!this.state.showEmoji})}}>😀</span>
                  <span onClick={()=>this.handleSubmit()}>发送</span>
                </div>
              }
             >
               
             </InputItem>
          </List>
          {this.state.showEmoji?<Grid
            data={emoji}
            columnNum={9}
            carouselMaxRow={4}
            isCarousel
            onClick={(el)=>{
              this.setState({
                text:this.state.text+el.text
              })
            }}
          >
            
          </Grid>:null}
        </div>
      </div>
    
      
    )
  }
}