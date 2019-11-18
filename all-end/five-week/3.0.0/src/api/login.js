import axios from '@/util/request'


const getCode = async (sid)=>{
   return  axios.get('/public/getCaptcha',{
    params:{
      sid
    }
   }) 
}

const forget =  (options)=>{
  return axios.post('/forget',{...options})
}

const login=(loginInfo)=>{
  return axios.post('/login/login',{...loginInfo})
}

export {
  getCode,
  forget,
  login
}