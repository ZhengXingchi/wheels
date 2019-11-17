import axios from 'axios'
import errorHandle from './errorHandle'

 

class HttpRequest{
  constructor(baseUrl){
    this.baseUrl = baseUrl;
  }

  getInsideConfig(){
    const config={
       baseURL:this.baseURL,
        header:{
          'Content-Type':'application/json;charset=utf-8'
        },
        timeout:10000
    }
    return config
  }

  interceptors(instance){

    instance.interceptors.response.use(res=>{
      if(res.status===200){
        return  Promise.resolve(res.data)
      }else{
        Promise.reject(res)
      }
      
    },err=>{
      errorHandle(err)
      return Promise.reject(err)
    })

    instance.interceptors.request.use(config=>{

      console.log('config:'+config)
      return config
    },err=>{
      errHandle(err)
      return Promise.reject(err)
    })
  }

  request(options){
    const instance=axios.create()
    const newOptions=Object.assign(this.getInsideConfig(),options)
    this.interceptors(instance)
    return instance(newOptions)
  }

  get(url,config){
    const options=Object.assign({
      method:'get',
      url
    },config)
    return this.request(options)
  }

  post(url,data){
     return this.request({
      method:'post',
      data,
      url
     })
  }
}

export default HttpRequest

 