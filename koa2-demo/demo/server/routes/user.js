const mongoose=require('mongoose')
const {controller,post}=require('../lib/decorator')
const {checkPassword}=require('../service/user')
@controller('/api/v0/user')
export class userController{
  @post('/')
  async login(ctx,next){
    const {email,password}=ctx.query
    const {match,user}=await checkPassword(email,password)
    if(!user){
       return (
        ctx.body={
          success:false,
          err:'用户不存在'
        })
    }
    if(match){
      return (
        ctx.body={
          success:true
        })
    }
    return (
       ctx.body={
          success:true,
          err:'密码不正确'
      
    })
  }


 
}


 

 