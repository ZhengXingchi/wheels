
// 自己制作迭代器
function makeIterator(arr){
	let nextIndex=0;
	return {
		next:()=>{
			if(nextIndex<arr.length){
				return {
					value:arr[nextIndex++],
					done:false
				}
			}else{
				return {done:true}
			}
		}
	}
}

const it=makeIterator(['红色','黑色','白色'])
console.log(it.next().value)
console.log(it.next().value)
console.log(it.next().value)
console.log(it.next().value)

// 生成器
function *makeIteratortwo(arr){
	for(let i=0;i<arr.length;i++){
	  yield arr[i] 	
	}
	
}

const gen=makeIteratortwo(['红色','黑色','白色'])
console.log(gen.next().value)
console.log(gen.next().value)
console.log(gen.next().value)
console.log(gen.next().value)