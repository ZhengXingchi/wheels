const koa=require('koa')
const app=new koa()
const {htmlTpl,ejsTpl,pugTpl} =require('./tpl')
const ejs =require('ejs')
const pug =require('pug')
app.use(async (ctx,next)=>{
	ctx.type='text/html;charset=utf-8'
    ctx.body=pug.render(pugTpl,{
    	title:'标题呀',
    	content:'内容呀'
    })
})

app.listen(4405)