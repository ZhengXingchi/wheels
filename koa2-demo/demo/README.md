## 参考文献
[xyjackxjw/douban-trailer-imooc](https://github.com/xyjackxjw/douban-trailer-imooc)


## mongodb可视化工具
`git  clone https://github.com/mrvautin/adminMongo.git`

## async await
```
async ()=>{
    ...
    xxx.map(async()=>{
      ...
      await ...
    })
}
```
注意此时await里面并不能同步


## modal弹窗引入dplayer按钮无法使用
`npm i antd@3.0.0 -S`
修改package.json的`"antd": "^3.23.4"`,to`"antd": "^3.0.0"`


## dplayer Uncaught (in promise) DOMException

Unhandled Promise Rejection: NotSupportedError (DOM Exception 9): The operation is not supported.

可能是视频地址不对,检查视频是否可以播放
```
this.player=new DPlayer({
  container:document.getElementById('videoPlayertt'),
  sreenshot:true,
  video:{
    url:movie.videoUrl,
    pic:movie.coverUrl,
    thumbnails:movie.coverUrl
  }
})
```

## map()记得返回return
1. 写法一
```
xxx.map((item,i)=>{
  return(
    ...
    ...
    ...
  )
})
```

2. 写法二
```
xxx.map((item,i)=>(
  ...
  ...
  ...

))
```


## 有些数据时有时无
因为是异步的，当还在查询或者上传的时候，改变文件导致nodemon刷新时，事务就中断了。


## 阿里云OSS
#### 1.费用
对象存储 OSS 详细价格信息 https://www.aliyun.com/price/product?spm=5176.7933691.1309819.6.4b152a66okeyuA#/oss/detail

#### 2.通过网络图片获取流
1. 任何响应都可以输出到文件流。
request('http://google.com/doodle.png').pipe(fs.createWriteStream('doodle.png'))
2. 反过来，也可以将文件传给PUT或POST请求。未提供header的情况下，会检测文件后缀名，在PUT请求中设置相应的content-type。
fs.createReadStream('file.json').pipe(request.put('http://mysite.com/obj.json'))
3. 请求也可以pipe给自己。这种情况下会保留原content-type和content-length。
request.get('http://google.com/img.png').pipe(request.put('http://mysite.com/img.png'))

`fs.createReadStream('./template/pc.ftl').pipe(fs.createWriteStream('./template/abc.ftl'));`

```
var fs = require('fs');
var request = require("request");
var src = "https://www.google.com.hk/images/srpr/logo3w.png";
var writeStream = fs.createWriteStream('image.png');
var readStream = request(src)
readStream.pipe(writeStream);
readStream.on('end', function() {
    console.log('文件下载成功');
});
readStream.on('error', function() {
    console.log("错误信息:" + err)
})
writeStream.on("finish", function() {
    console.log("文件写入成功");
    writeStream.end();
});
```

```
URL link = new URL(url);
InputStream is = link.openStream();
BufferedReader br = new BufferedReader(new InputStreamReader(is,"utf-8"));
StringBuilder strBuilder = new StringBuilder();
String sLine = null;
while ((sLine = br.readLine()) != null) {
    strBuilder.append(sLine);
    strBuilder.append("\r\n");
}
br.close();
String content = strBuilder.toString();
```


```
//1.采用request模块
//request('http://www.valu.cn/images/1.gif').pipe(fs.createWriteStream('./public/upload/downImg/logonew.png'));

//2.采用http模块
var req = http.get(url, function (res) {
    var imgData = "";
    res.setEncoding("binary"); //一定要设置response的编码为binary否则会下载下来的图片打不开
    res.on("data", function (chunk) {
        imgData += chunk;
    });
    res.on("end", function () {
        fs.writeFile("./public/upload/downImg/logonew.png", imgData, "binary", function (err) {
            if (err) {
                console.log("保存失败");
            }
            console.log("保存成功");
        });
    });
    res.on("error", function (err) {
        console.log("请求失败");
    });
});
req.on('error', function (err) {
    console.log("请求失败2" + err.message);
});
```

参考[nodejs 如何读取远程的图片并显示出来?](https://segmentfault.com/q/1010000000095621)
```
var http = require('http');
var url = require('url');
http.createServer(function(req, res) {

    var params = url.parse(req.url, true);

    var IMGS = new imageServer(http, url);

    IMGS.http(params.query.url, function(data) {
        res.writeHead(200, {"Content-Type": data.type});
        res.write(data.body, "binary");
        res.end();
    });

}).listen(8124);

var imageServer = function(http, url) {
    var _url = url;
    var _http = http;

    this.http = function(url, callback, method) {
        method = method || 'GET';
        callback = callback ||
        function() {};
        var urlData = _url.parse(url);
        var request = _http.createClient(80, urlData.host).
        request(method, urlData.pathname, {
            "host": urlData.host
        });

        request.end();

        request.on('response', function(response) {
            var type = response.headers["content-type"],
                body = "";
            response.setEncoding('binary');
            response.on('end', function() {
                var data = {
                    type: type,
                    body: body
                };
                callback(data);

            });
            response.on('data', function(chunk) {
                if (response.statusCode == 200) body += chunk;
            });
        });

    };
};
```

#### 3.图片处理
[nodejs图片处理文档](https://help.aliyun.com/document_detail/50039.html?spm=a2c4g.11186623.2.19.598417f1VcxQce#concept-50039-zh)

私有图片如果进行图片处理需要加签名，代码如下
```
let OSS = require('ali-oss');
let client = new OSS({
  accessKeyId: '<accessKeyId>',
  accessKeySecret: '<accessKeySecret>',
  bucket: '<bucketName>',
  endpoint: '<endpoint, 例如http://oss-cn-hangzhou.aliyuncs.com>'
});
// 过期时间10分钟, 图片处理式样"image/resize,w_300"
let signUrl = client.signatureUrl('example.jpg', {expires: 600, 'process' : 'image/resize,w_300'});
console.log("signUrl="+signUrl);
```

如果不用阿里云图片处理服务，怎么保证前端图片不变形？
```
<div class="father">
    <img src="xxxxx.jpg"/>
</div>
<style>
.father{
    width: 300px;
    height: 300px;
    overflow: hidden;
    /* position: relative;*/
}
.father img{
    display: block;
    width: 300px;
    /* 如果需要图片居中的话
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    */
}
</style>
```



