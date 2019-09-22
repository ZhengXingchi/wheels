const Router=require('koa-router')
const glob=require('glob')
const {resolve}=require('path')
const symbolPrefix=Symbol('prefix')
const _=require('lodash')
const routerMap=new Map()
const isArray=arr=> _.isArray(arr)?arr:[arr]
const router=conf=>(target,key,descriptor)=>{
  conf.path=normalizePath(conf.path)

  console.log(conf)
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
    console.log(this.apiPath)
    glob.sync(resolve(this.apiPath,'./**/*.js')).forEach(require)
    for(let [conf,controller] of routerMap){
      const controllers = isArray(controller)
      let prefixPath=conf.target[symbolPrefix]

      console.log(prefixPath)
      if(prefixPath) prefixPath=normalizePath(prefixPath)
      const routerPath=prefixPath+conf.path
      this.router[conf.method](routerPath,...controllers)

      console.log(conf.method,controllers,routerPath)
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
    method:'del',
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


