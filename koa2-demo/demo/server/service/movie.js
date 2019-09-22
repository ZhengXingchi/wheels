const mongoose=require('mongoose')
const Movie=mongoose.model('Movie')
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

  console.log('kkkkkkkkkk')
  return movies
}

export const getMovieDetail=async(id)=>{
  const movie= await Movie.find({_id:id})
  return movie
}

export const getRelativeDetail=async(movie)=>{
  
  const movies= await Movie.find({
    movieType:{
       $in:movie.type
    }
   
  })

  return movies
}

