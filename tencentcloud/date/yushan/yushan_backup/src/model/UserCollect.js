import mongoose from '@/config/DBHelpler'
import moment from 'dayjs'
const Schema = mongoose.Schema

const UserCollectSchema = new Schema({
  uid: { type: String },// 登录者的id
  tid: { type: String },// 展示详情的id
  // title: { type: String },
  created: { type: Date },// 获取到详情微信号的时间
  webchat: { type: String }
})

UserCollectSchema.pre('save', function (next) {
  this.created = moment().format('YYYY-MM-DD HH:mm:ss')
  next()
})



UserCollectSchema.post('save', function (error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('Error:Mongoose has a dulplicate key.'))
  } else {
    next(error)
  }
})

UserCollectSchema.statics = {
  // 查询特定用户的收藏数据
  getListByUid: function (id, page, limit) {
    return this.find({ uid: id })
      .skip(limit * page)
      .limit(limit)
      .sort({ created: -1 })
  },
  getwebchat: function (uid, tid) {
    return this.findOne({ uid, tid })
  },
  // 查询总数
  countByUid: function (id) {
    return this.find({ uid: id }).countDocuments()
  }
}




const UserCollectModel = mongoose.model('usercollects', UserCollectSchema)

export default UserCollectModel