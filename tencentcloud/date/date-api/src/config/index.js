import path from 'path'

// const DB_URL = 'mongodb://test:123456@0.0.0.0:27017/testdb'
const DB_URL = 'mongodb://49.233.180.182:27017/date'
// const REDIS = {
//   host: '0.0.0.0',
//   port: 15001,
//   password: '123456'
// }
const REDIS = {
  host: '49.233.180.182',
  port: 15001,
}
const uploadPath = process.env.NODE_ENV === 'production' ? '/app/public' : path.join(path.resolve(__dirname), '../../public')
const JWT_SECRET = 'a&*38QthAKuiRwISGLotgq^3%^$zvA3A6Hfr8MF$jM*HY4*dWcwAW&9NGp7*b53!'
const baseUrl = process.env.NODE_ENV === 'production' ? 'http://www.toimc.com' : 'http://10.0.0.12:9090'
export default {
  DB_URL,
  REDIS,
  JWT_SECRET,
  baseUrl,
  uploadPath
}
