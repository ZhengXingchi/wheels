const Router=require('koa-router')
const glob=require('glob')
const {resolve}=require('path')
const symbolPrefix=Symbol('prefix')
const _=require('lodash')
const routerMap=new Map()
const  R =  require('ramda')
const isArray=arr=> _.isArray(arr)?arr:[arr]
const router=conf=>(target,key,descriptor)=>{
  conf.path=normalizePath(conf.path)


  routerMap.set({
    target:target,
    ...conf

  },target[key])
}
const normalizePath=path=>{
   return path.startsWith('/')?path:`/${path}`
}
export class Route{
  constructor(app,apiPath){
  
      this.app=app
      this.apiPath=apiPath
      this.router=new Router()
  }



  init(){
   
    glob.sync(resolve(this.apiPath,'./**/*.js')).forEach(require)
    for(let [conf,controller] of routerMap){
      const controllers = isArray(controller)
      let prefixPath=conf.target[symbolPrefix]

    
      if(prefixPath) prefixPath=normalizePath(prefixPath)
      const routerPath=prefixPath+conf.path
      this.router[conf.method](routerPath,...controllers)

     
    }
    this.app.use(this.router.routes())
    this.app.use(this.router.allowedMethods())
  } 

}
  

  export const controller=path=>target=>(target.prototype[symbolPrefix]=path) 

  export const get=path=>router({
    method:'get',
    path
  })

  export const post=path=>router({
    method:'post',
    path
  })

  export const del=path=>router({
    method:'delete',
    path
  })

  export const put=path=>router({
    method:'put',
    path
  })

  export const all=path=>router({
    method:'all',
    path
  })

  export const use=path=>router({
    method:'use',
    path
  })

  // const decorate = (args, middleware) => {
  //   let [ target, key, descriptor ] = args
  //   target[key] = isArray(target[key])
  //   target[key].unshift(middleware)
  //   return descriptor
  // }
  
  // const convert = middleware => (...args) => decorate(args, middleware)


  const convert=middleware=>(target,key,descriptor)=>{
  
        target[key]=R.compose(
        R.concat(
          changeToArr(middleware)
        ),
        changeToArr
      )(target[key])
      return descriptor
    }
  
  

  const changeToArr=R.unless(R.is(Array),R.of)


  //是否登录
  export const auth = convert(async (ctx, next) => {
    console.log('ctx.session.user')
    console.log(ctx.session.user)
    if (!ctx.session.user) {
      return (
        ctx.body = {
          success: false,
          code: 401,
          err: '登录信息失效，重新登录'
        }
      )
    }

    await next()
  })


  export const admin=(roleExpected)=>convert(async(ctx,next)=>{
    const {role}=ctx.session.user

 
    if(!role||role!==roleExpected){
      return (
        ctx.body={
          success:false,
          code:403,
          err:'你没有权限操作'
        }
      )
    }
    await next()

  })

  export const required=rules=>convert(async (ctx,next)=>{
    let errors=[]

    console.log(rules,typeof rules)
    console.log(ctx.request.body)
   
      const checkRules = R.forEachObjIndexed(
    (value, key) => {
      errors = R.filter(i => !R.has(i, ctx.request[key]))(value)
    }
  )
    checkRules(rules)
     console.log(errors)
    if(errors.length){
      // ctx.throw(412,`${errors.join(',')} is required`)
      return ctx.body={
        success:false,
        code:412,
        err:`${errors.join(',')} is required`
      }
    }
     
      await next()
  })


