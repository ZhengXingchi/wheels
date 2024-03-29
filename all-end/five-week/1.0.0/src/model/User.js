import mongoose from '../config/DBHelper'


const Schema = mongoose.Schema

const UserSchema = new Schema({
  'username': { type: String },
  'nickname':{type:String},
  'password': { type: String },
  'create':{type:String}
  
})

const UserModel = mongoose.model('users', UserSchema)

export default UserModel