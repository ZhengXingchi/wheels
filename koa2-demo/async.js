const fs=require('fs')
const util=require('util')
const readAsync=util.promisify(fs.readFile)
const co=require('co')
// 回调函数
function readFile(cb){
	fs.readFile('./package.json',(err,data)=>{
       if(!err) return cb(null,data)
       cb(err)
	})
}

readFile((err,data)=>{
  if(!err){
  	data=JSON.parse(data)
  	console.log(data.name)
  }
})


// Promise
function readFileAsync(path){
  return new Promise((resolve,reject)=>{
    fs.readFile('./package.json',(err,data)=>{
       if(!err)  resolve(data)
       else reject(err)
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



//co  generator  promise
co(function *(){
	let data=yield readAsync('./package.json')
	data=JSON.parse(data)
	console.log(data.name)
})

//async
async function init(){
  let data=await readAsync('./package.json')
  data=JSON.parse(data)
  console.log(data.name)
}
init()