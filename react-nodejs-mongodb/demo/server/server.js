const express=require('express')

const bodyParser=require('body-parser')
const cookieParser=require('cookie-parser')
const userRouter=require('./user')
const model=require('./model')
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


server.listen(9093,()=>{
  console.log('Node app start at port 9093')
})