const fs=require('fs')

//1.回调
fs.readFile('./package.json',(err,data)=>{
  if(err) return console.log(err)
  data=JSON.parse(data)
  console.log(data.name)
})



//2.自己封装方法使用promise
function readFileAsync(path){
	return new Promise((resolve,reject)=>{
		fs.readFile(path,(err,data)=>{
			if(err) reject(err)
		    else resolve(data)
		})
	})
}
readFileAsync('./package.json')
  .then(data=>{
	data=JSON.parse(data)
	console.log(data.name)
  })
  .catch(err=>{
  	console.log(err)
  })


//3.采用util库的方法
const util=require('util')
util.promisify(fs.readFile)('./package.json')
  .then(JSON.parse)
  .then(data=>{
  	console.log(data.name)
  })
  .catch(err=>{
  	console.log(err)
  })

//4.采用async/await
const readAsync=util.promisify(fs.readFile)
async function  init(){
	try{
      let data=await readAsync('./package.json')
      data=JSON.parse(data)
      console.log(data.name)
	}catch(err){
	  console.log(err)
	}
}

init()