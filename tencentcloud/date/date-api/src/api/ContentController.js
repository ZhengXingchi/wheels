import Post from '@/model/Post'
import User from '@/model/User'
import UserCollect from '@/model/UserCollect'
import Links from '@/model/Links'
// import fs, { rename } from 'fs'
import fs from 'fs'
import uuid from 'uuid/v4'
import moment from 'dayjs'
import config from '@/config'
import { dirExists } from '@/common/Utils'
import mkdir from 'make-dir'
import { checkCode, getJWTPayload, rename } from '@/common/Utils'
class ContentController {
  constructor() { }
  async getPostList (ctx) {
    const body = ctx.query
    const page = body.page ? parseInt(body.page) : 0
    const limit = body.limit ? parseInt(body.limit) : 10
    const result = await User.getList({ gender: body.gender }, 'created', page, limit)
    ctx.body = {
      code: 200,
      data: result,
      msg: '获取文章列表成功'
    }
  }

  async getLinks (ctx) {
    const result = await Links.find({ type: 'links' })
    ctx.body = {
      code: 200,
      data: result
    }
  }

  async getTips (ctx) {
    const result = await Links.find({ type: 'tips' })
    ctx.body = {
      code: 200,
      data: result
    }
  }

  async getTopWeek (ctx) {
    const result = await Post.getTopWeek()
    ctx.body = {
      code: 200,
      data: result
    }
  }

  // 上传图片
  async uploadImg (ctx) {
    const file = ctx.request.files.file
    // 图片名称、图片格式、存储的位置，返回前台可以读取路径
    const ext = file.name.split('.').pop()
    const obj = await getJWTPayload(ctx.header.authorization)
    const user = await User.findByIdAll({ _id: obj._id })
    console.log(user.telephone)
    const dir = `${config.uploadPath}/${user.telephone}`
    //判断路径是否存在
    // await dirExists(dir)
    await mkdir(dir)
    //存储文件到指定的路径
    //给文件一个唯一的名称
    const picname = uuid()
    const destPath = `${dir}/${picname}.${ext}`
    const reader = fs.createReadStream(file.path, {
      highWaterMark: 100 * 1024 * 1024
    })
    console.log('file.path', file.path)
    const upStream = fs.createWriteStream(destPath)
    const filePath = `/${user.telephone}/${picname}.${ext}`
    //method1
    reader.pipe(upStream)
    //method2
    // const stat=fs.statSync(file.path)
    // console.log('stat.totalSize',stat.size)
    // let totalLength=0
    // reader.on('data',(chunk)=>{
    //   totalLength += chunk.length
    //   console.log('=======',totalLength)
    //   if(upStream.write(chunk)===false){
    //     reader.pause()
    //   } 
    // })
    // upStream.on('drain',()=>{
    //   reader.resume()
    // })
    // reader.on('end',()=>{
    //   console.log('end=======',totalLength)
    //   upStream.end()

    // })
    // console.log(totalLength)
    ctx.body = {
      code: 200,
      msg: '图片上传成功',
      data: {
        url: filePath,
        id: picname
      }
    }
  }

  // 添加新帖
  async addPost (ctx) {
    const { body } = ctx.request
    const obj = await getJWTPayload(ctx.header.authorization)
    const user = await User.findById({ _id: obj._id })
    // if (user && user.gender) {
    //   ctx.body = {
    //     code: 500,
    //     msg: '您已经上墙了',
    //   }
    //   return
    // }
    Object.assign(user, body);
    await user.save()
    ctx.body = {
      code: 200,
      msg: '提交成功'
    }
  }

  async updatePost (ctx) {
    console.log('11111111111111111')
    const { body } = ctx.request
    let sid = body.sid
    let code = body.code
    // 验证图片验证码的时效性、正确性
    let result = await checkCode(sid, code)
    if (result) {
      const obj = await getJWTPayload(ctx.header.authorization)
      // 判断帖子作者是否为本人
      const post = await Post.findOne({ _id: body.tid })
      // 判断帖子是否结贴
      if (post.uid === obj._id && post.isEnd === '0') {
        const result = await Post.updateOne({ _id: body.tid }, body)
        if (result.ok === 1) {
          ctx.body = {
            code: 200,
            msg: '更新帖子成功',
            data: result
          }
        } else {
          ctx.body = {
            code: 500,
            msg: '编辑帖子，更新失败',
            data: result
          }
        }

      } else {
        ctx.body = {
          code: 401,
          mag: '没有操作的权限'
        }
      }
    } else {
      // 图片验证码验证失败
      ctx.body = {
        code: 500,
        msg: '图片验证码验证失败'
      }
    }
  }

  async getPostDetail (ctx) {
    const params = ctx.query
    const result = await User.findById(params._id)
    if (result._id) {
      ctx.body = {
        code: 200,
        data: result,
        msg: '查询成功'
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '没有该用户'
      }
    }
  }
  async getWebChat (ctx) {
    const params = ctx.query
    const obj = await getJWTPayload(ctx.header.authorization)
    if (obj._id) {
      console.log(params)
      let webchat = await UserCollect.getwebchat(obj._id, params.id)
      if (webchat) {
        ctx.body = {
          code: 500,
          msg: `您已经获得该用户微信号：${webchat.webchat},本次获取免费`
        }
        return
      } else {
        const result = await User.findWebChat(params.id, obj._id)
        console.log(result)
        if (result.webchat) {
          const userCollect = new UserCollect({
            tid: params.id,
            uid: obj._id,
            webchat: result.webchat
          })
          const resl = await userCollect.save()
          if (resl.id) {
            ctx.body = {
              code: 200,
              msg: '查询成功',
              data: result
            }
          } else {
            ctx.body = {
              code: 500,
              msg: '出现未知错误'
            }
          }

        } else {
          ctx.body = result
        }

      }
    } else {
      ctx.body = {
        code: 500,
        msg: '请进行登录'
      }
    }
  }
  async getPostByUid (ctx) {
    const params = ctx.query
    const obj = await getJWTPayload(ctx.header.authorization)
    const result = await Post.getListByUid(obj._id, params.page, params.limit ? parseInt(params.limit) : 10)
    const total = await Post.countByUid(obj._id)
    if (result.length > 0) {
      ctx.body = {
        code: 200,
        data: result,
        msg: '查询列表成功',
        total
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '查询列表失败'
      }
    }
  }

  async deletePostByUid (ctx) {
    const params = ctx.query
    const obj = await getJWTPayload(ctx.header.authorization)
    const post = await Post.findOne({ uid: obj._id, _id: params.tid })
    if (post.id === params.tid && post.isEnd === '0') {
      const result = await Post.deleteOne({ _id: params.tid })
      if (result.ok === 1) {
        ctx.body = {
          code: 200,
          msg: '删除成功'
        }
      } else {
        ctx.body = {
          code: 500,
          msg: '执行删除失败'
        }
      }

    } else {
      ctx.body = {
        code: 500,
        msg: '删除失败，无权限'
      }
    }

  }
}

export default new ContentController()
