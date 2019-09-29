const mongoose=require('mongoose')
const {controller,post,auth,get,admin,required,del}=require('../lib/decorator')
const {checkPassword}=require('../service/user')
const {getAllMovies,findAndRemove}=require('../service/movie')
@controller('/admin')
export class adminController{
  @post('/login')
  @required({
    body:['email','password']
  })
  async login(ctx,next){
    const {email,password}=ctx.request.body
    console.log(email,password)
    const {match,user}=await checkPassword(email,password)
    if(!user){
       return (
        ctx.body={
          success:false,
          err:'用户不存在'
        })
    }
    if(match){
      ctx.session.user={
        _id:user._id,
        email:user.email,
        role:user.role,
        username:user.username

      }
      return (
        ctx.body={
          success:true
        })
    }
    return (
       ctx.body={
          success:false,
          err:'密码不正确'
      
    })
  }

  @get('/movie/list')
  @auth
  @admin('admin')
  async getMovieList(ctx,next){
    

    const movies=await getAllMovies()
  
   
    ctx.body={
      data:movies,   
      success:true
    }
  }



  @del('/movie')
  @required({
    query:['id']
  })
  async remove(ctx,next){
    const id=ctx.query.id
    console.log(ctx.query.id)
    console.log(ctx.request.query.id)
   
    const movie=await findAndRemove(id)
    const movies= await getAllMovies()
 
  
    return (
      ctx.body={
        success:true,
        data:movies
      
    })
  }


 
}


 

 