const rp=require('request-promise-native')

async function fetchMovie(item){
	const url=`http://api.douban.com/v2/movie/subject/${item.doubanId}?apikey=0b2bdeda43b5688921839c8ecb20399b`
	const res=await rp(url)
	return res
}

;(async()=>{
  let movies=[{
    doubanId: 1291546,
    title: '霸王别姬',
    rate: '9.6',
    poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2561716440.jpg'
  },
  {
    doubanId: 1849031,
    title: '当幸福来敲门',
    rate: '9.1',
    poster: 'https://img1.doubanio.com/view/photo/l_ratio_poster/public/p1312700628.jpg'
  }]
  movies.map(async(movie)=>{
  	let movieData=await fetchMovie(movie)
  	try{
     movieData=JSON.parse(movieData)
     console.log(movieData.summary)
  	}catch(err){
  		console.log(err)	
    }
  })

})()
