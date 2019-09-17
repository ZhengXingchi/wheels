const cp=require('child_process')
const {resolve} =require('path')
;(async()=>{

 
  const script=resolve(__dirname,'../crawler/video')
 
  const child=cp.fork(script,[])
 
  let invoked=false
  child.on('error',err=>{
  	if(invoked) return
  	invoked=true
    console.log(err)
  })

  child.on('exit',code=>{
  	if(invoked) return
    invoked=false
    let err=code===0?null:new Error('exit code'+code)
    console.log(err)
  })

  child.on('message',data=>{
    let result=data

    /*
    {
      doubanId: 3793023,
      title: '三傻大闹宝莱坞',
      rate: '9.2',
      poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p579729551.jpg'
    }
    */
    console.log(data)
  })
})()