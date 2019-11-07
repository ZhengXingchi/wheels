// const koa=require('koa')
// const helmet=require('koa-helmet')
// const statics=require('koa-static')
// const path=require('path')
// const router=require('./routes/routes')

import koa from 'koa'
import helmet from 'koa-helmet'
import statics from 'koa-static'
import path from 'path'
import koaBody from 'koa-body'
import jsonutil from 'koa-json'
import cors from '@koa/cors'
import router from './routes/routes'
import compose from 'koa-compose'
import compress from 'koa-compress'


const app=new koa()

const isDevMode=process.env.NODE_ENV==='production'?false:true

const middleware=compose([
 koaBody(),
 statics(path.join(__dirname,'../public')),
 cors(),
 jsonutil({pretty:false,param:'pretty'}),
 helmet()

])

if(!isDevMode){
  app.use(compress())
}
app.use(middleware)
app.use(router())
app.listen(3000)