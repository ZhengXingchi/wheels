const mongoose=require('mongoose')
const Movie=mongoose.model('Movie')
const {client}=require('../config/private')
export const getAllMovies=async(type,year)=>{
  let query={}
  if(type){
    query.movieType={
      $in:[type]
      
    }
  }
  if(year){
    query.year=year
  }

  const movies= await Movie.find(query)
  if(movies&&movies.length){
    for(let i=0;i<movies.length;i++){
      let movie=movies[i]
      if(movie.videoUrl){
        movie.videoUrl=client.signatureUrl(movie.videoUrl)
      }
      if(movie.coverUrl){
        movie.coverUrl=client.signatureUrl(movie.coverUrl)
      }
      if(movie.posterUrl){
        movie.posterUrl=client.signatureUrl(movie.posterUrl)
      }
    }
  }
     


  return movies
}

export const getMovieDetail=async(id)=>{
  const movie= await Movie.findOne({_id:id})
  if(movie.videoUrl){
    movie.videoUrl=client.signatureUrl(movie.videoUrl)
  }
  if(movie.coverUrl){
    movie.coverUrl=client.signatureUrl(movie.coverUrl)
  }
  if(movie.posterUrl){
    movie.posterUrl=client.signatureUrl(movie.posterUrl)
  }

  return movie
}

export const getRelativeDetail=async(movie)=>{
 
  const movies= await Movie.find({
    movieTypes:{
       $in:movie.movieTypes
    }
   
  })
  if(movies&&movies.length){
    for(let i=0;i<movies.length;i++){
      let movie=movies[i]
      if(movie.videoUrl){
        movie.videoUrl=client.signatureUrl(movie.videoUrl)
      }
      if(movie.coverUrl){
        movie.coverUrl=client.signatureUrl(movie.coverUrl)
      }
      if(movie.posterUrl){
        movie.posterUrl=client.signatureUrl(movie.posterUrl)
      }
    }
  }

  return movies
}

