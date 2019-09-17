## 参考文献
[xyjackxjw/douban-trailer-imooc](https://github.com/xyjackxjw/douban-trailer-imooc)


## 通过网络图片获取流
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