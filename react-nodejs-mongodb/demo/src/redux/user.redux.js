import axios from 'axios'
import {getRedirectPath} from '../util'
const ERROR_MSG='ERROR_MSG'
const LOAD_DATA='LOAD_DATA'
const AUTH_SUCCESS='AUTH_SUCCESS'
const LOGOUT='LOGOUT'
const RESET_REDERECTTO='RESET_REDERECTTO'
const initState={
  isAuth:false,
  msg:'',
  redirectTo:'',
  user:'',
  type:'',
  pwd:''
}



//reducer
export function user(state=initState,action){
  switch(action.type){
    case  AUTH_SUCCESS:
      return {
        ...state,
        msg:'',
        isAuth:true,
        redirectTo:getRedirectPath(action.payload),
        ...action.payload
      }
    case RESET_REDERECTTO:
      return{
        ...state,
        redirectTo:''
      }
    case ERROR_MSG:
      return{
        ...state,
        isAuth:false,
        msg:action.msg
      }
  
    case LOAD_DATA:
      return {
        ...state,
        ...action.payload
      }
    case LOGOUT:
      return {
        ...initState,redirectTo:'/login'
      }

    default:
    return state

  }
  return state
}

function errorMsg(msg){
  return {msg,type:ERROR_MSG}
}

function authSuccess(data){
  const {pwd,...obj}=data
  return {payload:obj,type:AUTH_SUCCESS}
}
 

export function loadData(data){
  return {type:LOAD_DATA,payload:data}
}

export function update(data){
  return dispatch=>{
    axios.post('user/update',data).then((res)=>{
      if(res.status==200&&res.data.code==0){
        dispatch(authSuccess(res.data.data))
      }else{
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}

export function resetRedirectTo(){
  return {
    type:RESET_REDERECTTO
  }
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
        dispatch(authSuccess({user,pwd,type}))
      }else{
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}

export function logoutSubmit(){
  return {type:LOGOUT}
}

export function login({user,pwd}){
  if(!user||!pwd){
    return errorMsg('用户名密码必须输入')
  }
 
  return dispatch=>{
    axios.post('/user/login',{user,pwd}).then(res=>{
      if(res.status==200&&res.data.code==0){
        dispatch(authSuccess(res.data.data))
      }else{
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}