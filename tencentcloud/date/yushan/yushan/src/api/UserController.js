import SignRecord from '../model/SignRecord'
import { getJWTPayload } from '../common/Utils'
import User from '../model/User'
import UserCollect from '../model/UserCollect'
import moment from 'dayjs'
import send from '@/config/MailConfig'
import uuid from 'uuid/v4'
import jwt from 'jsonwebtoken'
import { setValue, getValue } from '@/config/RedisConfig'
import config from '@/config'
import bcrypt from 'bcryptjs'
class UserController {
  async userSign (ctx) {
    const obj = await getJWTPayload(ctx.header.authorization)
    const record = await SignRecord.findByUid(obj._id)
    const user = await User.findById(obj._id)
    let newRecord = {}
    let result = {}
    if (record !== null) {
      console.log(moment(record.created).format('YYYY-MM-DD'))
      console.log(moment().format('YYYY-MM-DD'))
      if (moment(record.created).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')) {
        return ctx.body = {
          code: 500,
          lastSign: record.created,
          msg: '用户已经签到',
          favs: user.favs,
          count: user.count
        }
      } else {
        let count = user.count
        let fav = 0
        if (moment(record.created).format('YYYY-MM-DD') === moment().subtract(1, 'days').format('YYYY-MM-DD')) {
          count += 1
          if (count < 5) {
            fav = 5
          } else if (count >= 5 && count < 15) {
            fav = 10
          } else if (count >= 15 && count < 30) {
            fav = 15
          } else if (count >= 30 && count < 100) {
            fav = 20
          } else if (count >= 100 && count < 365) {
            fav = 30
          } else if (count >= 365) {
            fav = 50
          }
          await User.updateOne({ _id: obj._id }, {
            $inc: {
              favs: fav, count: 1
            }
          })
          result = {
            favs: user.favs + fav,
            count: user.count + 1
          }
        } else {
          fav = 5
          await User.updateOne({ _id: obj._id }, { $set: { count: 1 } }, { $inc: { favs: fav } })
          result = {
            favs: user.favs + fav,
            count: 1
          }
        }
        newRecord = new SignRecord({
          uid: obj._id,
          favs: fav
        })
        await newRecord.save()
      }
    } else {
      await User.updateOne({
        _id: obj._id
      }, {
        $set: { count: 1 },
        $inc: { fav: 5 }
      })

      newRecord = new SignRecord({
        uid: obj._id,
        favs: 5
      })
      await newRecord.save()
      result = {
        favs: user.favs + 5,
        count: 1
      }
    }
    ctx.body = {
      code: 200,
      msg: '请求成功',
      ...result,
      lastSign: newRecord.created
    }
  }

  //更新用户基本信息接口
  async updateUserInfo (ctx) {
    const { body } = ctx.request
    const obj = await getJWTPayload(ctx.header.authorization)
    //判断用户是否修改了邮箱
    const user = await User.findOne({ _id: obj._id })
    let msg = ''
    if (body.username && body.username !== user.username) {
      //用户修改了邮箱
      //发送reset邮件
      const tmpUser = await User.findOne({ username: body.username })
      if (tmpUser && tmpUser.password) {
        ctx.body = {
          code: 501,
          msg: '邮箱已经注册'
        }
        return
      }
      const key = uuid()
      setValue(key, jwt.sign({ _id: obj._id }, config.JWT_SECRET, {
        expiresIn: '30m'
      }))
      let result = await send({
        type: 'email',
        data: {
          username: body.username,
          key: key,
        },
        code: '',
        expire: moment()
          .add(30, 'minutes')
          .format('YYYY-MM-DD HH:mm:ss'),
        email: user.username,
        user: user.name,
      })
      msg = '更新基本资料成功，账号修改需要邮件确认，请查收邮件!'

    }
    const arr = ['username', 'mobile', 'password']
    arr.map(item => {
      delete body[item]
    })
    const result = await User.updateOne({ _id: obj._id }, body)
    console.log(result)
    if (result.n === 1 && result.ok === 1) {
      ctx.body = {
        code: 200,
        msg: msg === '' ? '更新成功' : msg
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '更新失败'
      }
    }


  }

  //更新用户名
  async updateUsername (ctx) {
    const body = ctx.query
    if (body.key) {
      const token = await getValue(body.key)
      const obj = getJWTPayload('Bearer ' + token)
      await User.updateOne({ _id: obj._id }, {
        username: body.username
      })
      ctx.body = {
        code: 200,
        msg: '更新用户名称'
      }
    }
  }

  //修改密码接口
  async changePasswd (ctx) {
    const { body } = ctx.request
    const obj = await getJWTPayload(ctx.header.authorization)
    console.log(obj)
    const user = await User.findOne({ _id: obj._id })
    console.log(user.password)
    if (await bcrypt.compare(body.oldpwd, user.password)) {
      const newpassword = await bcrypt.hash(body.newpwd, 5)
      const result = await User.updateOne(
        { _id: obj._id },
        {
          $set: {
            password: newpassword
          }
        }
      )
      ctx.body = {
        msg: '更新密码成功',
        code: 200
      }
    } else {
      ctx.body = {
        msg: "更新密码错误",
        code: 500
      }
    }
  }
  async setCollect (ctx) {
    const params = ctx.query
    const obj = await getJWTPayload(ctx.header.authorization)
    if (parseInt(params.isFav)) {
      // 说明用户已经收藏了帖子
      await UserCollect.deleteOne({ uid: obj._id, tid: params.tid })
      ctx.body = {
        code: 200,
        msg: '取消收藏成功'
      }
    } else {
      const newCollect = new UserCollect({
        uid: obj._id,
        tid: params.tid,
        title: params.title
      })
      const result = await newCollect.save()
      if (result.uid) {
        ctx.body = {
          code: 200,
          data: result,
          msg: '收藏成功'
        }
      }
    }
  }
  // 获取收藏列表
  async getCollectByUid (ctx) {
    const params = ctx.query
    const obj = await getJWTPayload(ctx.header.authorization)
    const result = await UserCollect.getListByUid(obj._id, params.page, params.limit ? parseInt(params.limit) : 10)
    const total = await UserCollect.countByUid(obj._id)
    if (result.length > 0) {
      ctx.body = {
        code: 200,
        data: result,
        total,
        msg: '查询列表成功'
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '查询列表失败'
      }
    }
  }

  // 获取用户基本信息
  async getBasicInfo (ctx) {
    const params = ctx.query;
    const uid = params.uid
    const user = await User.findById(uid)
    ctx.body = {
      code: 200,
      data: user,
      msg: '查询成功'
    }
  }
  // 获取用户基本信息
  async checkUser (ctx) {
    const obj = await getJWTPayload(ctx.header.authorization)
    const user = await User.findOne({ _id: obj._id }, {
      birth: 1,// 出生日期
      gender: 1,// 性别  //1 男  2女
      height: 1,// 身高
      constellation: 1,// 星座
      birthplace: 1,// 出生地
      livingplace: 1,// 现居地
      degree: 1,// 学历
      occupational: 1,// 职业
      webchat: 1,// 微信号
      // 自我介绍
      character: 1,// 性格
      habits: 1,// 生活习惯
      hobby: 1,// 兴趣爱好
      other: 1,// 其它
      photos: 1,// 生活照
      // 理想对象
      he_agerange: 1,// 年龄范围
      he_appearance: 1,// 外貌要求
      he_character: 1,// 性格要求
      he_degree: 1,// 学历要求
      he_coordinate: 1,// 他(她)坐标
      he_other: 1// 其它
    })
    if (user && user.birth && user.gender) {
      // if (user && user.birth) {
      ctx.body = {
        code: 500,
        msg: '您已经上墙，是否进行编辑',
        data: user
      }
      return
    } else {
      ctx.body = {
        code: 200
      }
    }

  }
}

export default new UserController()
