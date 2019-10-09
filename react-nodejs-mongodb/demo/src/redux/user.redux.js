import axios from 'axios'
import {getRedirectPath} from '../util'
const REGISTER_SUCCESS='REGISTER_SUCCESS'
const ERROR_MSG='ERROR_MSG'
const LOGIN_SUCCESS='LOGIN_SUCCESS'
const LOAD_DATA='LOAD_DATA'

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
    case  REGISTER_SUCCESS:
      return {
        ...state,
        msg:'',
        isAuth:true,
        redirectTo:getRedirectPath(action.payload),
        ...action.payload
      }
    case ERROR_MSG:
      return{
        ...state,
        isAuth:false,
        msg:action.msg
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        msg:'',
        isAuth:true,
        redirectTo:getRedirectPath(action.payload),
        ...action.payload
      }
    case LOAD_DATA:
      return {
        ...state,
        ...action.payload
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
function loginSuccess(data){
  return {payload:data,type:LOGIN_SUCCESS}
}

export function loadData(data){
  return {type:LOAD_DATA,payload:data}
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
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}


export function login({user,pwd}){
  if(!user||!pwd){
    return errorMsg('用户名密码必须输入')
  }
 
  return dispatch=>{
    axios.post('/user/login',{user,pwd}).then(res=>{
      if(res.status==200&&res.data.code==0){
        dispatch(loginSuccess(res.data.data))
      }else{
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}