const mongoose=require('mongoose')
const db='mongodb://localhost/douban-trailer'
const glob=require('glob')
const {resolve}=require('path')

mongoose.Promise=global.Promise
exports.initSchemes=()=>{
 
  glob.sync(resolve(__dirname,'./schema','**/*.js')).forEach(require)
}

exports.initAdmin=async ()=>{
	const User=mongoose.model('User')
	let user=await User.findOne({
		username:'admin1'
	})
	
	if(!user){
		const user=new User({
			username:'admin1',
			email:'xxxxxx1@qq.com',
			password:'1234561'
		})
		await user.save()
		
	}
}

exports.connect=()=>{
	let maxConnectTimes=0
	return new Promise((resolve,reject)=>{
		if(process.env.NODE_Env!=='production'){
		mongoose.set('debug',true)
		}
		mongoose.connect(db)

		mongoose.connection.on('disconnected',()=>{
			maxConnectTimes++
			if(maxConnectTimes<5){
				mongoose.connect()
			}else{
				throw new Error('数据库连接失败')
			}
	       
		})

		mongoose.connection.on('error',(err)=>{
			maxConnectTimes++
			if(maxConnectTimes<5){
				mongoose.connect()
			}else{
				throw new Error('数据库连接失败')
			}
		})

	    mongoose.connection.once('open',()=>{
	    	// const Dog=mongoose.model('Dog',{name:String})
	    	// const dog1=new Dog({name:'aaa'})
	    	// dog1.save().then(()=>{
	    	// 	console.log('wangwang')
	    	// })
	      resolve()
	      console.log('连接成功')
		})

	})
	
}