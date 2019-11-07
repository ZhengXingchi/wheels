import csshook from 'css-modules-require-hook/preset'
import assethook from 'asset-require-hook'
assethook({
  extensions:['png']
})
import express from 'express'
import bodyParser from'body-parser'
import cookieParser from'cookie-parser'
import userRouter from'./user'
import model from'./model'
import path from'path'
import React from 'react'
import {Provider} from 'react-redux'
import {
  createStore,
  applyMiddleware,
  compose 
} from 'redux'
import thunk from 'redux-thunk'
import {StaticRouter} from 'react-router'


import {renderToString,renderTostaticMarkup} from 'react-dom/server'
import reducers from '../src/reducer'
import App  from '../src/App'
import staticPath from '../build/asset-manifest.json'

console.log(staticPath)


const Chat=model.getModel('chat')
const app =express()

//workwith express
const server=require('http').Server(app)
const io=require('socket.io')(server)

io.on('connection',(socket)=>{
  //socket当次连接  io全局连接
  socket.on('sendMsg',(data)=>{
    console.log(data)
    const {from ,to, msg}=data
    const chatid=[from,to].sort().join('_')
    Chat.create({chatid,from,to,content:msg},(err,doc)=>{

     
      io.emit('recvMsg',Object.assign({},doc._doc))
    })
    
  }) 
})

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter)
app.use((req,res,next)=>{
  if(req.url.startsWith('/user/')||req.url.startsWith('/static')){
    return next()
  }else{
   
    
    const store=createStore(reducers,compose(
      applyMiddleware(thunk)
    ))

    //css-modules/css-modules-require-hook  css钩子
    //aribouius/asset-require-hook          图片钩子静态资源钩子
    const context={}
    const markup=renderToString( 
      (<Provider store={store}>
         <StaticRouter
          location={req.url}
          context={context}
         >
           <App></App>
         </StaticRouter>
      </Provider>)
    )

     /*注意${staticPath.files['main.css']}放在${staticPath.files['static/css/2.21457059.chunk.css']}的后面来覆盖antd-mobile的样式*/
    const pageHtml=
    `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <meta
            name="description"
            content="Web site created using create-react-app"
          />
          <link rel="apple-touch-icon" href="logo192.png" />
          <link rel="stylesheet" href="${staticPath.files['static/css/2.21457059.chunk.css']}"/>
          <link rel="stylesheet" href="${staticPath.files['main.css']}"/>


         
          <title>React App</title>
        </head>
        <body>
          <noscript>You need to enable JavaScript to run this app.</noscript>
          <div id="root">${markup}</div>
          <script src="${staticPath.files['main.js']}"></script>
      
          <script src="${staticPath.files['runtime-main.js']}"></script>
      
          <script src="${staticPath.files['static/js/2.49c67b37.chunk.js']}"></script>
         
        </body>
      </html>`
    return res.send(pageHtml)

    //  console.log('path resolve',path.resolve('build/index.html'))
    // return res.sendFile(path.resolve('build/index.html'))
  }
})
app.use('/',express.static(path.resolve('build')))

server.listen(9093,()=>{
  console.log('Node app start at port 9093')
})





























