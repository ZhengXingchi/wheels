## nodejs删除文件夹
var fs = require('fs'); // 引入fs模块
 
function deleteall(path) {
	var files = [];
	if(fs.existsSync(path)) {
		files = fs.readdirSync(path);
		files.forEach(function(file, index) {
			var curPath = path + "/" + file;
			if(fs.statSync(curPath).isDirectory()) { // recurse
				deleteall(curPath);
			} else { // delete file
				fs.unlinkSync(curPath);
			}
		});
		fs.rmdirSync(path);
	}
};
deleteall("./dir")//将文件夹传入即可

## CDN解析
CDN解析是通过将域名指向CDN厂商提供的CNAME地址，实现网站的加速服务。


## 网站http=>https
[koa框架构建Https服务器指南](https://blog.csdn.net/weixin_34343308/article/details/89132356)
[koa2学习笔记04 - 给koa2配置https - 申请安装ssl](https://blog.csdn.net/HoChine/article/details/90749740)
[阿里云 http 转成 https](https://www.jianshu.com/p/086817e78acd)
[Nodejs配置Https服务](https://www.jianshu.com/p/638f364e0642)


## 备案
1. 采用香港服务器，大陆访问不卡而且不用备案,访问国外速度也可以
2. 自己搭建一个外部端口的服务器
