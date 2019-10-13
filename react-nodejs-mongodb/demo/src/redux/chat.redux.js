import axios from 'axios'
import io from 'socket.io-client'
const socket=io('ws://localhost:9093')


// 获取聊天列表
const MSG_LIST='MSG_LIST'

//读取信息
const MSG_RECV='MSG_RECV'

//标识已读
const MSG_READ='MAG_READ'
const LOGOOUT_CHAT='LOGOOUT_CHAT'



const initState={
  chatmsg:[],
  unread:0,
  users:{}

}

export function chat(state=initState,action){
  switch(action.type){
    case MSG_LIST:
      return{
        ...state,
        chatmsg:action.payload.msgs,
        users:action.payload.users,
        unread:action.payload.msgs.filter(v=>!v.read&&v.to==action.payload.userid).length
      }
    case MSG_RECV:
    return{
      ...state,
      chatmsg:[...state.chatmsg,action.payload.msg],
      unread:action.payload.msg.to==action.payload.userid?state.unread+1:state.unread
    }
    case LOGOOUT_CHAT:
      return{
        ...initState
      }
    case MSG_READ:
      const {from,num}=action.payload 
      return{
        ...state,
        unread:state.unread-action.payload.num,
        chatmsg:state.chatmsg.map(v=>({...v,read:v.from==from?true:v.read}))
      }
    default:
      return state
  }
}

function msgRead({from,to,num}){
  return {type:MSG_READ,payload:{from,to,num}}
}
export function readMsg(from){
  return (dispatch,getState)=>{
    axios.post('/user/readmsg',{from}).then((res)=>{
      const userid=getState().user._id
      if(res.status==200&&res.data.code==0){
        dispatch(msgRead({userid,from,num:res.data.num}))
      }
    }) 
  }
}

export function logoutChat(){
  return {type:LOGOOUT_CHAT}
}


function msgList(msgs,users,userid){
  return{type:MSG_LIST,payload:{msgs,users,userid}}
}

function msgRecv(msg,userid){

  return{
    type:MSG_RECV,
    payload:{msg,userid}
  }
}
export function sendMsg({from,to,msg}){
  return dispatch=>{
    socket.emit('sendMsg',{from,to,msg})

  }
}

export function recvMsg(){
  return (dispatch,getState)=>{
   
    
    socket.on('recvMsg',(data)=>{
       const userid=getState().user._id
       

      console.log('recvmsg',data,userid)
      dispatch(msgRecv(data,userid))
    })
  }
}
export function getMsgList(){

  console.log('vvvvvv33333')
  return (dispatch,getState)=>{
      axios.get('/user/getmsgList')
        .then(res=>{

          if(res.status==200 && res.data.code==0){
             const userid=getState().user._id
             console.log("vvvv2222",userid)
             dispatch(msgList(res.data.msgs,res.data.users,userid))
          }
        })
  }
}