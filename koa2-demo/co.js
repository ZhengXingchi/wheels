const co=require('co');
const fetch=require('node-fetch')
const {apikey}=require('./demo/server/config/index')
co(function *(){
	const res=yield fetch(`https://api.douban.com/v2/movie/1291843?apikey=${apikey}`);
	const movie=yield res.json()
	const summary=movie.summary
	console.log('summary',summary)
})



function  run(generator){
	const iterator=generator()
	const it1=iterator.next()
	const promise1=it1.value
	promise1.then(data1=>{
	  const it2=iterator.next(data1)
	  const promise2=it2.value
	  promise2.then(data2=>{
        iterator.next(data2)
	  })
	})
}
run(function *(){
	const res=yield fetch(`https://api.douban.com/v2/movie/1291843?apikey=${apikey}`);
	const movie=yield res.json()
	const summary=movie.summary
	console.log('summary',summary)
})


//简化版本co伪代码
// function co(gen) {
// 	var ctx=this
// 	var args=slice.call(arguments,1)
// 	return Promise(function(resolve, reject) {
// 	  gen=gen.apply(ctx,args);
// 	  onFulFilled()	
// 	  function onFulFilled(res){
//         var ret;
//         try{
//           ret=gen.next(res)
//         }catch(e){
//           reject(e)		
//         }
//         next(ret)
// 	  }
// 	  function onReject(err){
// 	  	var ret;
// 	  	try{
// 	  	  ret=gen.throw(err)
// 	  	}catch(e){
//           reject(e)
// 	  	}
// 	  	next(ret)
// 	  }
// 	  function next(ret){
// 	  	if(ret.done) return resolve(ret.value)
// 	  	var value=toPromise(ctx,ret.value)
// 	    if(value&&isPromise(value))return value.then(onFulfilled,onRejected)
// 	    return onRejected(new TypeError('You may only yield a function, promise, generator, array, or object, '
//         + 'but the following object was passed: "' + String(ret.value) + '"'));
// 	  }
// 	})
// }
	


