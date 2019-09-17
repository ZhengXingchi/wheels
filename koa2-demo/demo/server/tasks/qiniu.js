const movies=[{
  video: 'http://vt1.doubanio.com/201909170901/b038544952085152e62e68225551fe5a/view/movie/M/301020952-1.mp4',
  doubanId: '3793023',
  cover: 'https://img3.doubanio.com/img/trailer/medium/1301691506.jpg?',
  poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p579729551.jpg'
}]
let OSS =require('ali-oss')
let http =require('http')
let fs =require('fs')
let {resolve} =require('path')








// ```
// var http = require('http');
//     var https = require('https');
//     // Setting http to be the default client to retrieve the URI.
//     var url = new URL("https://www.google.com")
//     var client = http; /* default  client */
//     // You can use url.protocol as well 
//     /*if (url.toString().indexOf("https") === 0){
//                 client = https;
//     }*/
//     /* Enhancement : using the  URL.protocol  parameter
//      * the  URL  object ,  provides a  parameter url.protocol that gives you 
//      * the protocol  value  ( determined  by the  protocol ID  before 
//      * the ":" in the  url. 
//      * This makes it easier to  determine the protocol, and to  support other  
//      * protocols like ftp ,  file  etc) 
//      */
//    client=(url.protocol=="https") ? https:client; 
//     // Now the client is loaded with the correct Client to retrieve the URI.
//     var req = client.get(url, function(res){
//         // Do what you wanted to do with the response 'res'.
//         console.log(res);
//     });
// ```

async function put () {
 
    var req = http.get('http://vt1.doubanio.com/201909170901/b038544952085152e62e68225551fe5a/view/movie/M/301020952-1.mp4', function (res) {
    var imgData = "";
    res.setEncoding("binary"); //一定要设置response的编码为binary否则会下载下来的图片打不开
    res.on("data",  function (chunk) {
        imgData += chunk;
      
    });
        res.on("end", async function () {
     try {
      // fs.writeFile(resolve(__dirname,'./bb.mp4'), imgData, "binary", function (err) {
      //       if (err) {
      //           console.log("保存失败",err);
      //       }else{
      //        console.log("保存成功"); 
      //       }
            
      //   });
          let result = await client.put('object-name70.mp4', Buffer.from(imgData,"binary"));
         
         console.log(result);
         } catch (e) {
    console.log('buffer',e);
  }
             
        });
        res.on("error", function (err) {
            console.log("请求失败");
        });
    });
    req.on('error', function (err) {
        console.log("请求失败2" + err.message);
    });
    
 
}

put();
