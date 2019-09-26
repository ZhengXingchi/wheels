const koa=require('koa')

const {htmlTpl,ejsTpl,pugTpl} =require('./tpl')
const ejs =require('ejs')
const pug =require('pug')
const views =require('koa-views')
const {resolve} =require('path')
const {connect,initSchemes,initAdmin}=require('./database/init')
const mongoose=require('mongoose')

const R=require('ramda')
// const MIDDLEWARES=['router']
const MIDDLEWARES=['router','parcel']
;(async()=>{
	await connect()
  initSchemes()
	// initAdmin()
	// require('./tasks/movie')
	// require('./tasks/api')
	// require('./tasks/trailer') 
	// require('./tasks/qiniu')

  const app=new koa()
  const userMiddlewares=(app)=>{
    R.map(
     R.compose(
       R.forEachObjIndexed(
         initwith=>initwith(app)
      ),
       require,
       name=>resolve(__dirname,`./middlewares/${name}`)
     )
    )(MIDDLEWARES)
  }

  await userMiddlewares(app)

//   app.use(views(resolve(__dirname,'./views'),{
//  extension:'pug'
// }))
// app.use(async (ctx,next)=>{
   
//     await ctx.render('index',{
//      title:'标题呀',
//      content:'内容呀'
//     })
// })

  app.listen(4405)
	 
})()






function* foo(x) {
 var y = 2 * (yield (x + 1));
 var z = yield (y / 3);
 return (x + y + z);
}
var a = foo(5);

a.next() // Object{value:6, done:false}

a.next() // Object{value:NaN, done:false}

a.next() // Object{value:NaN, done:true}