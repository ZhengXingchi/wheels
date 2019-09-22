
let OSS =require('ali-oss')
let http =require('http')
var https = require('https');
let fs =require('fs')
let {resolve} =require('path')
let nanoid=require('nanoid')
const {client}=require('../config/private')
const mongoose=require('mongoose')
const Movie=mongoose.model('Movie')
 






//注意:关于http方法不能参数不能为https协议报错的处理方法
// var http = require('http');
// var https = require('https');
// // Setting http to be the default client to retrieve the URI.
// var url = new URL("https://www.google.com")
// var client = http; /* default  client */
// // You can use url.protocol as well 
// /*if (url.toString().indexOf("https") === 0){
//    client = https;
// }*/
// /* Enhancement : using the  URL.protocol  parameter
//  * the  URL  object ,  provides a  parameter url.protocol that gives you 
//  * the protocol  value  ( determined  by the  protocol ID  before 
//  * the ":" in the  url. 
//  * This makes it easier to  determine the protocol, and to  support other  
//  * protocols like ftp ,  file  etc) 
//  */
// client=(url.protocol=="https") ? https:client; 
// // Now the client is loaded with the correct Client to retrieve the URI.
// var req = client.get(url, function(res){
//   // Do what you wanted to do with the response 'res'.
//   console.log(res);
// });


// async function put () {
//   var req = http.get('http://vt1.doubanio.com/201909170901/b038544952085152e62e68225551fe5a/view/movie/M/301020952-1.mp4', function (res) {
//     var imgData = "";
//     res.setEncoding("binary"); //一定要设置response的编码为binary否则会下载下来的图片打不开
//     res.on("data",  function (chunk) {
//       imgData += chunk;
        
//     });
//     res.on("end", async function () {
//       try {
//         //1.写入服务器地址
//         // fs.writeFile(resolve(__dirname,'./bb.mp4'), imgData, "binary", function (err) {
//         //    if (err) {
//         //       console.log("保存失败",err);
//         //    }else{
//         //       console.log("保存成功"); 
//         //    }      
//         // });
//         //2.写入阿里云OSS
//         let result = await client.put('object-name70.mp4', Buffer.from(imgData,"binary"));
//           console.log(result);
//         } catch (e) {
//           console.log('buffer',e);
//         }
               
//     });
//     res.on("error", function (err) {
//       console.log("请求失败1"+err);
//     });
//   });
//   req.on('error', function (err) {
//     console.log("请求失败2" + err.message);
//   });
// }
// put();


function uploadToaliyun (url,key) {
  var ht = http; 
  if (url.toString().indexOf("https") === 0){
    ht = https;
  }


  return new Promise((resolve,reject)=>{
    var req = ht.get(url, function (res) {
      var imgData = "";
      res.setEncoding("binary"); 
      res.on("data",  function (chunk) {
        imgData += chunk;
          
      });
      res.on("end", async function () {
        try {
          let result = await client.put(key, Buffer.from(imgData,"binary"));
            console.log(result);
            resolve(result)
          } catch (e) {
            console.log('buffer',e);
            reject(e)
          }       
      });
      res.on("error", function (err) {
        console.log("请求失败1"+err);
        reject(err)
      });
    });
    req.on('error', function (err) {
      console.log("请求失败2" + err.message);
      reject(err)
    });
  })
}

;(async()=>{
  // let movies=[{
  //   // video: 'http://vt1.doubanio.com/201909170901/b038544952085152e62e68225551fe5a/view/movie/M/301020952-1.mp4',
  //    video: 'https://img3.doubanio.com/img/trailer/medium/1301691506.jpg?',
  //   doubanId: '3793023',
  //   cover: 'https://img3.doubanio.com/img/trailer/medium/1301691506.jpg?',
  //   poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p579729551.jpg'
  // }]

  let movies=await Movie.find({
    $or:[
      {videoUrl:{$exists:false}},
      {videoUrl:''},
      {videoUrl:null}
    ]
  })
console.log([movies[0]])
  
    for(let i=0;i<[movies[0]].length;i++){
    let movie=movies[i]
    if(movie.poster&&!movie.posterUrl){


      try{
        let videoData =await uploadToaliyun(movie.video,nanoid()+'.mp4')
        let coverData =await uploadToaliyun(movie.cover,nanoid()+'.jpg')
        let posterData=await uploadToaliyun(movie.poster,nanoid()+'.jpg')
          if(videoData.url){
        movie.videoUrl=client.signatureUrl(videoData.name)
      }
      if(coverData.url){
        movie.coverUrl=client.signatureUrl(coverData.name)
      }
      if(posterData.url){
        movie.posterUrl=client.signatureUrl(posterData.name)
      }
      console.log(movie)
      await movie.save()
      }catch(err){
        console.log(err)
    }


    }
  }

})()

























