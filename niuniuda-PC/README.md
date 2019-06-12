1. react中引入swiper后initialslide不生效
参考[swiper里initialslide不生效](https://segmentfault.com/q/1010000014873696)

[swiper-slide-active控制初始位置以及轮播开始后定位第二个slide](http://bbs.swiper.com.cn/forum.php?mod=viewthread&tid=2157)
```
<script>
 var mySwiper = new Swiper('.swiper-container', {
        // autoplay: 5000,//可选选项，自动滑动
        // loop: true,
        initialSlide: 0,
        slidesPerView: 4,
        observer: true,
        observeParents: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        
    })
    //定时
    setTimeout(() => {
        mySwiper.slideTo(0, 50, false);
    }, 50);
</script>

```



2. Swiper 无法检测到数据变动，轮播图显示的就一直只有一张图片
```
改动展示性组件 在 componentDidMount 周期函数中，添加 observer: true, 这一配置项
```


3. 封装dialog
参考[手把手教你在 react 中使用 Swiper 4 做轮播图](https://php.ctolib.com/article/wiki/81427)
```
const dialogWrapper = document.createElement('div')
const tools = {
	// 显示弹窗
    showDialog: function(config) {
		// 先创建弹窗元素容器
		document.body.appendChild(dialogWrapper)
		// 然后通过 redner 方法加载组件
        ReactDOM.render((
                <Dialog {...config} />
            ),
            dialogWrapper
        )
        if (!document.body.className.includes('preventScroll')) {
            document.body.className += ' preventScroll'
        }
	},
	// 关闭弹窗
    closeDialog: function() {
		// 挂载组件
		ReactDOM.unmountComponentAtNode(dialogWrapper)
		// 删除节点
        if (dialogWrapper.parentNode != null) {
            document.body.removeChild(dialogWrapper)
        }
        document.body.className.replace(/\preventScroll\b/g, "")
    },
}
```


4. React 父组件如何获取子组件的ref值？
参考[React 父组件如何获取子组件的ref值？](https://segmentfault.com/q/1010000006253845)
[React获取子组件的ref](https://segmentfault.com/q/1010000007812149)
[react 中通过ref获取高阶（HOC）子组件实例的解决方案](https://www.jianshu.com/p/2609fd3777cd)


5. react中使用轮播图插件
[React中使用CSSTransitionGroup插件实现轮播图](https://www.cnblogs.com/libin-1/p/6638193.html)
[github地址](https://github.com/DiligentYe/react-carousel)