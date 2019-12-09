//参考资料【ES6】两个例子明白箭头函数this指向  https://blog.csdn.net/w390058785/article/details/82884032#commentBox
//彻底理解js中this的指向，不必硬背。 https://www.cnblogs.com/pssp/p/5216085.html





//箭头函数和普通函数的区别如下。
//普通函数：根据调用我的人（谁调用我，我的this就指向谁）
//箭头函数：根据所在的环境（我再哪个环境中，this就指向谁）


//1.普通函数this的指向在函数定义的时候是确定不了的，只有函数执行的时候才能确定this到底指向谁，实际上this的最终指向的是那个调用它的对象
//情况1：如果一个函数中有this，但是它没有被上一级的对象所调用，那么this指向的就是window，这里需要说明的是在js的严格版中this指向的不是window，但是我们这里不探讨严格版的问题，你想了解可以自行上网查找。
//情况2：如果一个函数中有this，这个函数有被上一级的对象所调用，那么this指向的就是上一级的对象。
//情况3：如果一个函数中有this，这个函数中包含多个对象，尽管这个函数是被最外层的对象所调用，this指向的也只是它上一级的对象，
//情况4：this永远指向的是最后调用它的对象，也就是看它执行的时候是谁调用的

//普通函数中的this:
//1. this总是代表它的直接调用者(js的this是执行上下文), 例如 obj.func ,那么func中的this就是obj
//2.在默认情况(非严格模式下,未使用 'use strict'),没找到直接调用者,则this指的是 window （常见的window的属性和方法有: alert, location,document,parseInt,setTimeout,setInterval等）(约定俗成)
//3.在严格模式下,没有直接调用者的函数中的this是 undefined
//4.使用call,apply,bind(ES5新增)绑定的,this指的是 绑定的对象



//2.箭头函数没有自己的this, 它的this是继承而来; 默认指向在定义它时所处的对象(宿主对象),而不是执行时的对象, 定义它的时候,可能环境是window; 箭头函数可以方便地让我们在 setTimeout ,setInterval中方便的使用this
//要整明白这些, 我们需要首先了解一下作用域链:
//当在函数中使用一个变量的时候,首先在本函数内部查找该变量,如果找不到则找其父级函数,
//最后直到window,全局变量默认挂载在window对象下


//例子1
const luke={
	id:2,
	say:function(){
		setTimeout(function(){
          console.log("id",this.id)
		},50)
	},
	sayWithThis:function(){
		var that=this
		setTimeout(function(){
          console.log("id",that.id)
		},100)
	},
	sayWithArrow:function(){
		setTimeout(()=>{
          console.log("id",this.id)
		},100)
	},
	sayWithGlobalArrow:()=>{
		  
		setTimeout(()=>{
          console.log("id",this.id)
		},100)
	}
}

luke.say()   //undefined
luke.sayWithThis()  //2
var sayWithThisLocal=luke.sayWithThis
sayWithThisLocal()//undefinmed
luke.sayWithArrow()//2
luke.sayWithGlobalArrow()///undefined



//例子2
//这里只能用var定义变量,let,const定义的变量，不是绑定在window下。
var str = 'window';  
 
const obj = {
    str:'obj',
    nativeFn: function(){
	console.log(this.str, '当前词法作用域中的this');
	return function(){
	    console.log('原生函数',this.str);	
	}
    },
    arrowFn: function(){
	console.log(this.str, '当前词法作用域中的this');
	return ()=>{
	    console.log('箭头函数',this.str);	
	}
    }
};
const obj2 = {
    str:'obj2'	
}
 
var nativeFn = obj.nativeFn();
var arrowFn = obj.arrowFn();
	
console.log('函数调用一 **********');  
nativeFn();   //window
arrowFn();     //obj
	
console.log('函数调用二 **********');  
nativeFn.call(obj2);  //obj2
arrowFn.call(obj2);    //obj
	
console.log('函数调用三 **********'); 
setTimeout(function(){    
    nativeFn();  //window
    arrowFn();	 //obj
},50);
 
//函数调用四
var doc = document.documentElement;
doc.str = 'document';
doc.addEventListener('click',function(){
    console.log('函数调用四 **********'); 
},false);
doc.addEventListener('click',nativeFn,false); //document
doc.addEventListener('click',arrowFn,false);  //obj



//例子3

//这里只能用var定义变量,let,const定义的变量，不是绑定在window下。
var str = 'window';  
 
const obj = {
    str:'obj',
    fn: ()=>{
	console.log(this.str);	
    }
}
 
obj.fn();   //window





//例子4
//这里只能用var定义变量,let,const定义的变量，不是绑定在window下。
var str = 'window';  
 
const obj = {
    str:'obj',
    fn: ()=>{
	console.log(this.str);	
    },
    fn2: function(){
	console.log(this.str, '当前词法作用域中的this')
	return {
	    str: 'newObj',
	    fn: ()=>{
		console.log(this.str);	
	    }	
	}
    }
}
 
obj.newFn = ()=>{
    console.log(this.str);	
}
 
obj.fn();//window
obj.newFn();//windiw
 
var newObj = obj.fn2();
newObj.fn();  ///obj



//例子5
{
	var factory=function(){
		this.a='a'
		this.b='b'
		this.c={
			a:'a+',
			b:function(){
				return this.a
			}
		}
	}
	console.log(new factory().c.b())  //a+   在普通函数中，this指向的是调用该函数的对象，此时调用b()函数的是c，所以this指向c对象
}

{
	var factory=function(){
		this.a='a'
		this.b='b'
		this.c={
			a:'a+',
			b:()=>{
				return this.a
			}
		}
	}
	console.log(new factory().c.b())  //a  
	//箭头函数里面的this指向的是定义时this的指向，
	//定义时this指向的是factory函数里面的this
	//factory函数里面的this指向的是构造函数factory的实例
}












