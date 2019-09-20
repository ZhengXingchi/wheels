const koa=require('koa')
const app=new koa()
const {htmlTpl,ejsTpl,pugTpl} =require('./tpl')
const ejs =require('ejs')
const pug =require('pug')
const views =require('koa-views')
const {resolve} =require('path')
const {connect,initSchemes}=require('./database/init')
const mongoose=require('mongoose')
;(async()=>{
	await connect()
	initSchemes()
	console.log('kkk')
	const Movie=mongoose.model('Movie')
	const movies=await Movie.find({})
	console.log('hhhh',movies)
})()

app.use(views(resolve(__dirname,'./views'),{
	extension:'pug'
}))
app.use(async (ctx,next)=>{
	 
    await ctx.render('index',{
    	title:'标题呀',
    	content:'内容呀'
    })
})

app.listen(4405)


function* foo(x) {
 console.log('1')
 var y = 2 * (yield (x + 1));
 console.log('2')
 var z = yield (y / 3);
 console.log('3')
 return (x + y + z);
}
var a = foo(5);
console.log('11')
a.next() // Object{value:6, done:false}
console.log('22')
a.next() // Object{value:NaN, done:false}
console.log('33')
a.next() // Object{value:NaN, done:true}