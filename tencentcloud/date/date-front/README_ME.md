# 关于图片预览
react-zmage https://zmage.caldis.me/

# 移动端实现图片压缩预览裁剪
[image-conversion 比较不错的image压缩库](https://github.com/WangYuLue/image-conversion) 

```js
1. ./static文件夹添加文件conversion.js来自于./node_modules/image-conversion/build/conversion.js
2. index.html添加<script src="/static/conversion.js"></script>
3. 可以使用window.imageConversion方法了，该方法将FILE转为Blob
4. blob=>File var file = new File([blob], filename, {type: contentType, lastModified: Date.now()});
```

在react的移动端项目中实现手机拍摄图片、压缩、预览、裁剪、上传的实现方案 https://blog.csdn.net/wanshaobo888/article/details/102839037



# 移动端图片倒立问题解决
一点思路：[如何解决上传图片倒转的问题？](http://www.woshipm.com/pd/293760.html)
1. 事后防控 如果我们在产品上可预见会发生图片倒转的问题，是需要给到用户一个补偿措施的。就是说既然上传的图片在方向上可能会出现问题，我们可以设计出一个交互组件，来帮助用户对尚未正式上传前的预览图片进行方向调整然后再上传。
2. 事前预处理 图片上传时让前端来识别图片的方向，从而将图片准确无误地显示出来。解决思路：从图片 Exif 信息中取到 Orientation 后，就可以根据它来自动旋转图片了，canvas、filter 滤镜、vml、css3 都可以实现图片的旋转。然后通过我们获取的Orientation 属性作对比， 旋转方式自行选择，一般我个人用transform:rotate(90deg)这个方法解决 ，具体旋转度数，自行判断。
[exif-js库](https://github.com/exif-js/exif-js)
一些操作图片的资料参考:
[前端压缩图片并获取exif信息](https://blog.csdn.net/bluelotos893/article/details/79661718)
[JS对图片进行base64压缩以及图片的EXIF-Orientation信息](https://blog.csdn.net/wyrhero/article/details/61192753)
[js图片前端压缩多图上传（旋转其实已经好了只是手机端有问题要先压缩再旋转）](https://www.cnblogs.com/yixi978/p/5869348.html)
原生可以var image=new Image() js创建dom节点 然后转为canvas 旋转角度然后导出为File







# 解决微信内嵌浏览器无法响应上传文件
微信jsdk  https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html
accept="image/*"
用User Agent判断针对Android版微信中已采取已采用flash上传页面
微信内置的浏览器如何上传文件？ https://www.zhihu.com/question/21452742
【移动端实现】相机唤起及图片上传功能（包括微信） https://blog.csdn.net/candy_home/article/details/74440519
解决微信内嵌浏览器无法响应上传文件（图片）的思路（2种办法） https://www.cnblogs.com/cai-rd/p/3930227.html


# 图片自动旋转的前端实现方案
图片自动旋转的前端实现方案 https://imququ.com/post/how-to-auto-rotate-photo-in-js.html


微信内置浏览器WebApp开发，踩坑 https://blog.csdn.net/xingxingsuhuan/article/details/51279887