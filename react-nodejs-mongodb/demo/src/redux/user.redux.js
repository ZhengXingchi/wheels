import axios from 'axios'

const REGISTER_SUCCESS='REGISTER_SUCCESS'
const ERROR_MSG='ERROR_MSG'

const initState={
  isAuth:false,
  msg:'',
  user:'',
  type:'',
  pwd:''
}



//reducer
export function user(state=initState,action){
  switch(action.type){
    case  REGISTER_SUCCESS:
      return {
        ...state,
        msg:'',
        isAuth:true,
        ...action.payload
      }
    case ERROR_MSG:
      return{
        ...state,
        isAuth:false,
        msg:action.msg
      }

    default:
    return state

  }
  return state
}

function errorMsg(msg){
  return {msg,type:ERROR_MSG}
}

function registerSuccess(data){
  return {payload:data,type:REGISTER_SUCCESS}
}

export function register({user,pwd,type,repeatpwd}){
  if(!user||!pwd){
    return errorMsg('用户名密码必须输入')
  }
  if(pwd!==repeatpwd){
    return errorMsg('密码和确认密码不同')
  }
  return dispatch=>{
    axios.post('/user/register',{user,type,pwd}).then(res=>{
      if(res.status==200&&res.data.code==0){
        dispatch(registerSuccess({user,pwd,type}))
      }else{

      }
    })
  }
}