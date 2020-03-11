import mongoose from '@/config/DBHelpler'
import moment from 'dayjs'
const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: { type: String },  // 姓名
  password: { type: String },  // 密码
  telephone: { type: String, index: { unique: true }, sparse: true }, // 手机号
  isVip: { type: String, default: '0' },// 0 非vip
  created: { type: Date },// 注册时间
  //上墙时间
  // 基本信息
  birth: { type: String },// 出生日期
  gender: { type: String },// 性别  //1 男  2女
  height: { type: String },// 身高
  constellation: { type: String },// 星座
  birthplace: { type: String },// 出生地
  livingplace: { type: String },// 现居地
  degree: { type: String },// 学历
  occupational: { type: String },// 职业
  webchat: { type: String },// 微信号
  // 自我介绍
  character: { type: String },// 性格
  habits: { type: String },// 生活习惯
  hobby: { type: String },// 兴趣爱好
  other: { type: String },// 其它
  photos: { type: Array },// 生活照
  // 理想对象
  he_agerange: { type: String },// 年龄范围
  he_appearance: { type: String },// 外貌要求
  he_character: { type: String },// 性格要求
  he_degree: { type: String },// 学历要求
  he_coordinate: { type: String },// 他(她)坐标

  // name: { type: String },
  // updated: { type: String },
  // favs: { type: Number, default: 100 },
  // roles: { type: Array, default: ['user'] },
  // pic: { type: String, default: '/image/logo192.png' },
  // mobile: { type: String, match: /^1[3-9](\d{9})$/, default: '' },
  // status: { type: String, default: '0' },
  // regmark: { type: String, default: '' },
  // location: { type: String, default: '' },
  // count: { type: Number, default: 0 }
})

UserSchema.pre('save', function (next) {
  this.created = moment().format('YYYY-MM-DD HH:mm:ss')
  next()
})

UserSchema.pre('update', function (next) {
  this.created = moment().format('YYYY-MM-DD HH:mm:ss')
  next()
})

UserSchema.post('save', function (error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('Error:Mongoose has a dulplicate key.'))
  } else {
    next(error)
  }
})


UserSchema.statics = {
  findById: function (id) {
    return this.findOne({ _id: id }, {
      password: 0,
      username: 0,
      mobile: 0
    })
  },
  getList: function (options, sort, page, limit) {
    return this.find(options, { password: 0, telephone: 0, webchat: 0, created: 0 })
      .sort({ [sort]: -1 })
      .skip(page * limit)
      .limit(limit)
  },
}

const UserModel = mongoose.model('users', UserSchema)

export default UserModel