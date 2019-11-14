import send from '../config/MailConfig'
import moment from 'moment'
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
}

export default new LoginController()