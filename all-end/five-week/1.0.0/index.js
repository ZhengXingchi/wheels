const Koa=require('koa')
const koaBody=require('koa-body')
const cors=require('@koa/cors')
const app=new Koa()
const Router=require('koa-router')
const router=new Router()

router.prefix('/api')

router.get('/',ctx=>{
   const params=ctx.request.query
   ctx.body='Hello World'
})


router.post('/post',async (ctx)=>{
  let { body }=ctx.request

  console.log(body)
  console.log(ctx.request)
  ctx.body={
    ...body
  }
 
})


app.use(koaBody())
app.use(cors())
app.use(router.routes())
.use(router.allowedMethods())

app.listen(3000)




































