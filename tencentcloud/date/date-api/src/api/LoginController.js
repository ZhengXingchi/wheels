import send from '@/config/MailConfig'
// import bcrypt from 'bcrypt'
import bcrypt from 'bcryptjs'
import moment from 'dayjs'
import jsonwebtoken from 'jsonwebtoken'
import config from '@/config'
import uuid from 'uuid/v4'
import { checkCode } from '@/common/Utils'
import User from '@/model/User'
import SignRecord from '@/model/SignRecord'
import { setValue, getValue } from '@/config/RedisConfig'
class LoginController {
  constructor() {
    this.getCode = this.getCode.bind(this)
  }
  async forget (ctx) {
    const { body } = ctx.request
    console.log(body)
    try {
      // body.username -> database -> email
      const code = uuid()
      let result = await send({
        code: '1234',
        expire: moment()
          .add(30, 'minutes')
          .format('YYYY-MM-DD HH:mm:ss'),
        email: body.username,
        user: 'Brian',
      })
      ctx.body = {
        code: 200,
        data: result,
        msg: '邮件发送成功',
      }
    } catch (e) {
      console.log(e)
    }
  }

  createCode () {
    let code = "";
    const codeLength = 4;//验证码的长度   
    let random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
      'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');//随机数   
    for (let i = 0; i < codeLength; i++) {//循环操作   
      var index = Math.floor(Math.random() * 36);//取得随机数的索引（0~35）   
      code += random[index];//根据索引取得随机数加到code上   
    }
    return code
  }

  async getCode (ctx) {
    const { body } = ctx.request
    if (!body.email) {
      ctx.body = {
        code: 500,
        msg: '邮箱格式不正确'
      }
      return
    }
    let user = await User.findByEmailAll(body.email)
    if (user && user.email) {
      ctx.body = {
        code: 500,
        msg: '该邮箱已经注册'
      }
      return
    }
    let code = this.createCode()
    console.log('---------code---------', code)
    setValue(body.email, code, 30 * 60)// 10分钟
    let result = await send({
      code,
      expire: moment()
        .add(30, 'minutes')
        .format('YYYY-MM-DD HH:mm:ss'),
      email: body.email,
      type: 'register',
      registerTime: moment().format('YYYY-MM-DD HH:mm:ss')
    })
    ctx.body = {
      code: 200,
      data: result,
      msg: '邮件发送成功',
    }
    ctx.body = {
      code: 200,
      msg: '获取成功'
    }
  }

  async login (ctx) {
    // 接收用户的数据
    // 返回token
    const { body } = ctx.request
    // 验证用户账号密码是否正确
    let checkUserPasswd = false
    let user = await User.findOne({ telephone: body.telephone })
    if (user != null) {
      if (await bcrypt.compare(body.password, user.password)) {
        checkUserPasswd = true
      }
    }
    // mongoDB查库
    if (checkUserPasswd) {
      // 验证通过，返回Token数据
      console.log('Hello login')

      const userObj = user.toJSON()
      const arr = ['password', 'roles']
      arr.map((item, index) => {
        delete userObj[item]
      })
      let token = jsonwebtoken.sign({ _id: userObj._id }, config.JWT_SECRET, {
        expiresIn: '1d'
      })
      ctx.body = {
        code: 200,
        data: userObj,
        token: token
      }
    } else {
      // 用户名 密码验证失败，返回提示
      ctx.body = {
        code: 404,
        msg: '手机号或者密码错误'
      }
    }
  }

  async register (ctx) {
    // 接收客户端的数据
    const { body } = ctx.request
    console.log(body, '22222222')
    let msg = {}
    let check = true
    // 查库，看username是否被注册
    let user1 = await User.findOne({ username: body.username })
    if (user1 !== null && typeof user1.username !== 'undefined') {
      msg.username = ['此昵称已经注册']
      check = false
    }
    let user2 = await User.findOne({ telephone: body.telephone })
    // 查库，看name是否被注册
    if (user2 !== null && typeof user2.telephone !== 'undefined') {
      msg.telephone = ['此手机号已经被注册']
      check = false
    }
    let user3 = await User.findOne({ telephone: body.email })
    // 查库，看name是否被注册
    if (user3 !== null && typeof user3.email !== 'undefined') {
      msg.email = ['此邮箱已经被注册']
      check = false
    }

    let code = await getValue(body.email)
    if (body.code.toUpperCase() !== code.toUpperCase()) {
      msg.code = ['验证码错误']
      check = false
    }
    // 写入数据到数据库
    if (check) {
      body.password = await bcrypt.hash(body.password, 5)
      let user = new User({
        username: body.username,
        telephone: body.telephone,
        password: body.password,
        email: body.email,
        created: moment().format('YYYY-MM-DD HH:mm:ss')
      })
      let result = await user.save()
      ctx.body = {
        code: 200,
        data: result,
        msg: '注册成功'
      }
      return
    }

    ctx.body = {
      code: 500,
      msg: msg
    }
  }
}

export default new LoginController()
