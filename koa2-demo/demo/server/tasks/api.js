const rp=require('request-promise-native')
const {apikey}=require('../config/private')
const mongoose=require('mongoose')
const Movie=mongoose.model('Movie')
const Category=mongoose.model('Category')
async function fetchMovie(item){
	const url=`http://api.douban.com/v2/movie/subject/${item.doubanId}?apikey=${apikey}`
	const res=await rp(url)
	return res
}

;(async()=>{
  // let movies=[{
  //   doubanId: 1291546,
  //   title: '霸王别姬',
  //   rate: '9.6',
  //   poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2561716440.jpg'
  // },
  // {
  //   doubanId: 1849031,
  //   title: '当幸福来敲门',
  //   rate: '9.1',
  //   poster: 'https://img1.doubanio.com/view/photo/l_ratio_poster/public/p1312700628.jpg'
  // }]
  let  movies=await Movie.find({
    $or:[
      {summary:{$exists:false}},
      {summary:null},
      {summary:''},
      {title:''}
    ]
  })

 

  for(let i=0;i<movies.length;i++){
    let movie=movies[i]

  
    let movieData=await fetchMovie(movie)


    
    try{
      movieData=JSON.parse(movieData)
     
      if(movieData){
        movie.tags=movieData.tags;
        movie.summary=movieData.summary||'';
        movie.title=movieData.title||'';
        movie.rawTitle=movieData.original_title||'';

       
    
          movie.movieTypes=movieData.genres||[]
          for(let k=0;k<movie.movieTypes.length;k++){
            let item = movie.movieTypes[k]

            let cat=await Category.findOne({name:item}) 
            if(!cat){
              cat=new Category({
                name:item,
                movies:[movie._id]
              })
            }else{

            
              if(cat.movies.indexOf(movie._id)===-1){
                cat.movies.push(movie._id)
              }
            }
            await cat.save()
          
            if(!movie.category||!movie.category.length){
         
              movie.category=[cat._id]
            }else{
              if(movie.category.indexOf(cat._id)===-1){
               
                movie.category.push(cat._id)
              }
            
            }
           }

            movie.pubdate=movieData.pubdates||[]
      

        
            await movie.save()
         




        
      }
      }catch(err){
        console.log(err)  
      }
  }
  // movies.map(async(movie)=>{
  // 	let movieData=await fetchMovie(movie)
  // 	try{
  //    movieData=JSON.parse(movieData)
  //    console.log(movieData.summary)
  // 	}catch(err){
  // 		console.log(err)	
  //   }
  // })

})()
