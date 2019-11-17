import send from '../config/MailConfig'
import moment from 'moment'
import jsonwebtoken from 'jsonwebtoken'
import config from '../config/index.js'
import {checkCode} from '@/common/utils'

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
      if(user.password==body.password){
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


}


















export default new LoginController()