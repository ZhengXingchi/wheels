const mongoose=require('mongoose')
const Schema=mongoose.Schema
const {Mixed,ObjectId}=Schema.Types

const movieSchema=new Schema({
	doubanId:{
      required:true,
      type:String
	},
	category:{
		type:ObjectId,
		ref:'Category'
	},
	rate:Number,
	title:String,
	summary:String,
	video:String,
	poster:String,
	cover:String,
	videoName:String,
	posterName:String,
	coverName:String,
	rawTitle:String,
	movieTypes:[String],
	pubdate:Mixed,
	year:Number,
	tags:[String],
	meta:{
		createdAt:{
			type:Date,
			default:Date.now()
		},
		updatedAt:{
			type:Date,
			default:Date.now()
		}
	}
})


movieSchema.pre('save',next=>{
	if(this.isNew){
       this.meta.createdAt=this.meta.updatedAt=Date.now()
	}else{
       this.meta.updatedAt=Date.now()
	}
	next()
})

mongoose.model('Movie',movieSchema)