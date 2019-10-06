const Koa=require('koa')
const app=new Koa()
delay=()=>{
  return new Promise(resolve=>{
    setTimeout(()=>{
      resolve()

    },1000)
  })
}
app.use(async (ctx,next)=>{
  ctx.body='1'
  await next()
  ctx.body =ctx.body+'2'

})

app.use(async (ctx,next)=>{
  ctx.body  =ctx.body+'3'
  await delay()

  await next()
   ctx.body  =ctx.body+'4'

})

app.use(async (ctx,next)=>{
  ctx.body  =ctx.body+'5'
  await next()
   ctx.body  =ctx.body+'6'

})
app.listen('8888')