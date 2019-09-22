
const {controller,get}=require('../lib/decorator')
const {getAllMovies,getMovieDetail,getRelativeDetail}=require('../service/movie')










@controller('/api/v0/movie')
export class movieController{
  @get('/')
  async getMovies(ctx,next){
    const {type,year}=ctx.query
    const movies=await getAllMovies(type,year)
    ctx.body={
      movies
    }
  }
  @get('/:id')
  async getMoviesDetail(ctx,next){
    
    const id=ctx.params.id
    const movie=await getMovieDetail(id)
    const relativeMovie=await getRelativeDetail(movie)
    return ctx.body={
      data:{
        movie,
        relativeMovie
      },
      success:true
    }
  }
}