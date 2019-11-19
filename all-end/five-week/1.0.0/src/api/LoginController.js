import send from '../config/MailConfig'
import moment from 'moment'
import jsonwebtoken from 'jsonwebtoken'
import config from '../config/index.js'
import {checkCode} from '@/common/utils'
import bcrypt from 'bcrypt'
import User from '@/model/User'
class LoginController{
  constructor(){

  }

  async forget(ctx){
    const {body} =ctx.request
    try{
      let result =await send({
        expire:moment().add(30,'m').format('YYYY-MM-DD HH:mm:ss'),
        code:'1234',
        email:body.username,
        user:'qiufeng'
      })
      ctx.body={
        code:200,
        data:result,
        msg:'邮件发送成功'
      }
    }catch(e){
      ctx.body={
        code:100,
        msg:'邮件发送失败'
      }
      console.log(e)
    }
  }


  async login(ctx){
    const {body}=ctx.request
    let sid=body.sid
    let vercode=body.vercode

    console.log(sid,vercode)
    console.log(checkCode(sid,vercode))
    let code=await checkCode(sid,vercode) 
    if(code){
      let checkUserPassword=null
      let user=await User.findOne({username:body.username})
      if(await bcrypt.compare(body.password,user.password)){
        checkUserPassword=true
      }
      if(checkUserPassword){
          console.log('hello  login')
          let token=jsonwebtoken.sign({
            _name:'123@qq.com',
            // exp:Math.floor(Date.now()/1000+60*60*24)
          },config.JWT_SECRET,{expiresIn:'1d'})
          ctx.body={
            code:200,
            token
          }
      }else{
        ctx.body={
          code:404,
          msg:"用户名或者密码错误"
        }
      }

    }else{
      ctx.body={
      code:401,
      msg:"图片验证码不正确，请检查"
    }
 
  }
}






  async reg(ctx){
    //接收客户端的数据
    const {body}=ctx.request
    let sid=body.sid
    let vercode=body.vercode

    console.log(sid,vercode)
    console.log(checkCode(sid,vercode))
    //校验验证码的内容时效性有效性
    let code=await checkCode(sid,vercode) 

    let checkUserPassword=true
    let msg={}
    if(code){
    
      let user1=await User.findOne({username:body.username})
      if(user1&&typeof user1.username!=='undefined'){
        msg.username=['此邮箱已经注册，可以通过邮箱找回密码']
        checkUserPassword=false
      }
      let user2=await User.findOne({nickname:body.nickname})
      if(user2&&typeof user2.nickname!=='undefined'){
        msg.nickname=['此昵称已经注册，请修改']
        checkUserPassword=false
      }
      if(checkUserPassword){
        body.password=await bcrypt.hash(body.password,5)
        let user =new User({
          username:body.username,
          nickname:body.nickname,
          password:body.password,
          create:moment().format('YYYY-MM-DD HH:mm:ss')
        })
        let result =await user.save()
        ctx.body={
          code:200,
          data:result,
          msg:'注册成功'
        }
        return
      }

     
      
      

    }else{
      //验证码没有通过
    
      msg.vercode=["图片验证码不正确，请检查"]
    
 
  }

  ctx.body={
    code:500,
    msg:msg
  }
}


}


















export default new LoginController()