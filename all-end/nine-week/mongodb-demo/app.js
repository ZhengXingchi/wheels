const mongoose=require('mongoose')

mongoose.connect('mongodb://test:123456@127.0.0.1:27017/testdb',{useNewUrlParser:true,useUnifiedTopology: true})

const User=mongoose.model('users',{name:String,age:Number,email:String})

const user=new User({
  name:'uu',
  age:13,
  email:'uu@qq.com'
})

user.save().then(res=>{
  console.log(res)
})