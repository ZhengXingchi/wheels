# linux
mv temp/* public
tar -zxvf ./text.tar.gz -C /home/app/test/       将text.tar.gz 解压到 /home/app/test/ （绝对路径）下





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

# 关于表单校验
[antd form](https://ant.design/components/form-cn/)
[yiminghe/async-validator rules规格](https://github.com/yiminghe/async-validator)
[react-component/form antd-mobile是引入rc-form](https://github.com/react-component/form)
[rc-form（翻译）](https://www.cnblogs.com/chaoxiZ/p/9364989.html)
[antd-mobile示例 InputItem](https://mobile.ant.design/components/input-item-cn/)



# webpack下css/js/html引用图片的正确方式
1. 在html/ejs等中引用图片：
借助require和es6语法引入

```html
<img src="${require('../../../../static_guojiang_tv/src/mobile/img/recharge/bg.png')}">
```

2. 在css/vue组件中引用图片：
照常按照相对路径引用

```html
css:
background: url(../../img/backpack/all.png);
vue组件：
<img class="round_bg" src='../../img/store/img_4.png'>
```
3. 在js中引用图片：

需要借助require才能被webpack识别并打包图片资源

```
let img = require('../../img/loveday/4.png');
let img_html = `<img src="${img}"/>`
```



# 关于账号体系
1. 手机验证码服务
2. 邮箱验证码
3. 获取浏览器唯一标识
4. 获取手机唯一标识  mobile-detect  modernizr  Media Queries, examples at https://mediaqueri.es/
[如何通过web页获取手机设备ID(或其它唯一标识)?](https://www.zhihu.com/question/35458043)
[js获取移动端设备信息（IMEM，IMIS,手机型号，系统版本，浏览器信息等）](https://www.cnblogs.com/dontes/p/9075877.html)
[mobile-detect的npm上介绍](https://www.npmjs.com/package/mobile-detect)


5. jssdk需要绑定域名不支持ip地址，填写的域名须通过icp备案的验证，参考[微信公众号开发之如何使用JSSDK](https://www.jianshu.com/p/bb88f7520b9e)
6. 相关的
[免费手机短信验证码接收，临时邮箱，临时网盘(最新)](https://zhuanlan.zhihu.com/p/68206170)
[2019 免费验证码接收平台](https://zhuanlan.zhihu.com/p/54248030)



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


# 移动滑动优化
[移动Web滚动性能优化: Passive event listeners](https://segmentfault.com/a/1190000007913386)




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


# 网址转化为二维码
[纯前端生成二维码（并将Html转换成图片） 下载到本地](https://blog.csdn.net/ys930126/article/details/79972027)
[jeromeetienne/jquery-qrcode](https://github.com/jeromeetienne/jquery-qrcode)
pc火狐可以将网址转化为二维码
截屏的实现[html2canvas.min  -- 将Html转换成Canvas画布内容](http://html2canvas.hertzen.com/)


# 如何给background-image设置透明度
1. 背景图用png，有透明度。
2. 
```css
div{
  position: relative;        
}
div:after{
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: url(...);
  opacity: 0.5;
  filter:alpha(opacity=50);
}
```


# 关于监听页面跳转的思路
[ajax与HTML5 history pushState/replaceState实例](https://www.zhangxinxu.com/wordpress/2013/06/html5-history-api-pushstate-replacestate-ajax/)
[H5如何解监听页面退出需求？？？](https://www.cnblogs.com/zdf-xue/p/10018157.html)
[微信浏览器左上角返回按钮拦截功能](https://www.jb51.net/html5/587910.html)
1. 采用window.history方案
缺点：循环刷新会导致累积很多historyfilter 
点击link跳转路由无法阻止(走with-router)
```js
import { Modal } from 'antd-mobile'
const alert = Modal.alert
historyfilter = () => {
  let state = {
    title: '',
    url: '/#/add' // 这个url可以随便填，只是为了不让浏览器显示的url地址发生变化，对页面其实无影响
  }
  window.history.pushState(state, state.title, state.url)
}
backfilter = () => {
  alert('通知', <div>您还没有提交，返回将导致已编辑数据丢失，确定继续返回吗</div>, [
    {
      text: '取消', onPress: () => {
        this.historyfilter()
      }, style: 'default'
    },
    {
      text: '确定', onPress: () => {
        window.removeEventListener('popstate', this.backfilter)
        window.history.back(-1)
      }
    },
  ])
}
componentWillUnmount () {
  window.removeEventListener('popstate', this.backfilter)
}
componentWillMount () {
  this.historyfilter()
  window.addEventListener('popstate', this.backfilter, false)
}
```
对循环刷新的改良
```js
import { Modal } from 'antd-mobile'
const alert = Modal.alert
historyfilter = () => {
  let state = {
    title: '',
    url: '/#/add' // 这个url可以随便填，只是为了不让浏览器显示的url地址发生变化，对页面其实无影响
  }
  window.history.pushState(state, state.title, state.url)
}
backfilter = () => {
  this.historyfilter()
  alert('通知', <div>您还没有提交，返回将导致已编辑数据丢失，确定继续返回吗</div>, [
    {
      text: '取消', onPress: () => {
        this.historyfilter()
      }, style: 'default'
    },
    {
      text: '确定', onPress: () => {
        window.removeEventListener('popstate', this.backfilter)
        window.history.back(-1)
      }
    },
  ])
}
componentWillUnmount () {
  window.removeEventListener('popstate', this.backfilter)
}
componentWillMount () {
  window.addEventListener('popstate', this.backfilter, false)
}
```
抽象为一个类方法
```js
class _browserBack {
  init (param) {
    let {callback} = param;
    this.callback = callback;
    this.pushHistory()
    this.listenEvent()
  }
  listenEvent () {
　　if('pushState' in window.history){
　　　　window.addEventListener('popstate', (e) =>
　　　　　　this.callback()
　　　　}, false)
　　}
}
  pushHistory () {
    if (this.ifhasHash()) return;
    let state = {
      title: 'pushstate',
      url: '#'
    }
    window.history.pushState(state, 'title', '#');
  }
  ifhasHash () {
    return location.href.includes('#')
  }
}
```
2. react路由钩子

3. beforeonload
```js
componentWillMount () {
    // 拦截判断是否离开当前页面
    window.addEventListener('beforeunload', this.beforeunload);
  }
  componentWillUnmount () {
    // 销毁拦截判断是否离开当前页面
    window.removeEventListener('beforeunload', this.beforeunload);
  }
  beforeunload (e) {
    let confirmationMessage = '你确定离开此页面吗?';
    (e || window.event).returnValue = confirmationMessage;
    return confirmationMessage;
  }
```




# for in循环
对象的属性分为可枚举和不可枚举之分，它们是由属性的enumerable值决定的。因此for-in循环有缺陷，需要和object.hasOwnProperty(key)一起使用。


# es6 class类中的this指向
```js
class Logger{
    printName(name = 'there'){
        this.print(`hello ${name}`);
    }
    print(text){
        console.log(text);
    }
}
 
const logger = new Logger();    //实例化
const {printName } = logger;    //printName
printName(); // 报错    VM77:3 Uncaught TypeError: Cannot read property 'print' of undefined
```
解决方案：
1. 在构造方法中绑定this，这样实例化时 this就会指向当前实例
```js
class Logger{
    constructor(){
        this.printName = this.printName.bind(this);
    }
 
//...
```
}
2. 使用箭头函数
```js
class Logger{
    constructor(){
        this.printName = (name = 'there') => {
            this.print(name);
        }
    }
}
```
3. 使用 Proxy， 获取方法的时候，自动绑定this
(回头看Proxy时候补上)
```js
function selfish(target){
    const cache = new WeakMap();
    const handler = {
            
    }
}
```


# 切换淘宝源
npm  install postcss-loader  --registry https://registry.npm.taobao.org



# 手机端html响应式布局
## em rem 百分比

## webpack打包bootstrap
[打包器 | Webpack](https://cloud.tencent.com/developer/section/1008091)

## webpackloader的内联写法
可以在 import 语句或任何等效于 "import" 的方式中指定 loader。使用 ! 将资源中的 loader 分开。分开的每个部分都相对于当前目录解析。
`import Styles from 'style-loader!css-loader?modules!./styles.css';`
通过前置所有规则及使用 !，可以对应覆盖到配置中的任意 loader。
选项可以传递查询参数，例如 ?key=value&foo=bar，或者一个 JSON 对象，例如 ?{"key":"value","foo":"bar"}。
尽可能使用 module.rules，因为这样可以减少源码中的代码量，并且可以在出错时，更快地调试和定位 loader 中的问题。

## 额外的一些资料
[移动端和pc端，响应式设计布局](https://www.cnblogs.com/wgl0126/p/9468804.html)
[移动前端自适应适配方法总结](http://caibaojian.com/mobile-responsive.html)
1. 使用Flexible实现手淘H5页面的终端适配
[flexible.js 布局详解](http://caibaojian.com/flexible-js.html)
[使用Flexible实现手淘H5页面的终端适配 #17](https://github.com/amfe/article/issues/17)
px2rem解决方案
1.1 postcss-px2rem
```js
npm install postcss-loader
npm install postcss-px2rem
var px2rem = require('postcss-px2rem');

module.exports = {
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: "style-loader!css-loader!postcss-loader"
      }
    ]
  },
  postcss: function() {
    return [px2rem({remUnit: 75})];
  }
}
```
1.2 px2rem-loader
```js
module.exports = {
  // ...
  module: {
    rules: [{
      test: /\.css$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader'
      }, {
        loader: 'px2rem-loader',
        // options here
        options: {
          remUni: 75,
          remPrecision: 8
        }
      }]
    }]
  }
}
```

1.3 Sass函数功能——rem转px
[Sass函数功能——rem转px](https://www.w3cplus.com/preprocessor/rem-px-browser-function-sass.html)

