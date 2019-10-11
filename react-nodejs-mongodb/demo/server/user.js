const express=require('express')
const Router=express.Router()
const model=require('./model')
const User=model.getModel('user')
const utils=require('utility')

const _filter={pwd:0,__v:0}

Router.get('/list',function(req,res){
  // User.remove({},(err,doc)=>{})
  const {type} =req.query
  User.find({type},(err,doc)=>{
    return res.json({code:0,data:doc})
  })
})

Router.post('/login',function(req,res){


   const {user,pwd}=req.body;
   User.findOne({user,pwd:md5pwd(pwd)},_filter,(err,doc)=>{
    if(!doc){
      return res.json({msg:'用户名不存在或者密码错误',code:1})
    }
    res.cookie('userid',doc._id)
    return res.json({data:doc,code:0})
     
 
  })
})

Router.get('getmsglist',(req,res)=>{
  const user=req
})

Router.post('/register',function(req,res){
 

  
   const {user,type,pwd}=req.body;
   User.findOne({user},(err,doc)=>{
    if(doc){
      return res.json({msg:'用户名重复',code:1})
    }
    const userModel=new User({user,pwd:md5pwd(pwd),type})
    userModel.save((err,doc)=>{
      if(err){
        return res.json({code:1,msg:"后端出错了"})
      }
      const {user,_id,type}=doc
      res.cookie('userid',_id)
      return res.json({code:0,data:{user,_id,type}})
    })
  })
})


Router.get('/info',function(req,res){
  const {userid}=req.cookies
  if(!userid){

    return res.json({code:1})
  }

  User.findOne({_id:userid},_filter,(err,doc)=>{
    if(err){
      return res.json({msg:'后端出错了',code:1})
    }
    if(doc){
        return res.json({code:0,data:doc})
    }
  })

})

Router.post('/update',function(req,res){
  const userid=req.cookies.userid
  if(!userid){
    return res.json({code:1})
  }
  const body=req.body
  User.findByIdAndUpdate(userid,body,(err,doc)=>{
    const data=Object.assign({},{
      user:doc.user,
      type:doc.type
    },body)
    return res.json({code:0,data})
  })
})


function md5pwd(pwd){
  const salt='qwertyuii_123_erddd'
  return utils.md5(utils.md5(pwd+salt))
}

module.exports=Router