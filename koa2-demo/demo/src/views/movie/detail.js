import React ,{Component}  from 'react'
import Layout from '../../layouts/default'
import {request} from '../../lib'
import {Link} from 'react-router-dom'
import{
  
  Tabs,
  Badge


}from 'antd'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
const TabPane=Tabs.TabPane
const DPlayer=window.DPlayer

const callback=(key)=>{
  console.log(key)

}

export default class Detail  extends Component{
  constructor(props){
    super(props)

    this.state={
      movie:null,
      relativeMovies:[],
      _id:this.props.match.params.id
    
    
    }
  }
  componentDidMount(){
    this._getMovieDetail()
  }



  _getMovieDetail=()=>{
  
    request({
      method:'get',
      url:`/api/v0/movies/${this.state._id}`
    }).then(res=>{
      const movie=res.movie
      const relativeMovies=res.relativeMovies
      this.setState({
        movie,
        relativeMovies
      },()=>{
        this.player=new DPlayer({
          container:document.getElementById('videoPlayer'),
          sreenshot:true,
          video:{
            url:movie.videoUrl,
            pic:movie.coverUrl,
            thumbnails:movie.coverUrl
          }
        })
      })
    }).catch(err=>{
      this.setState({
        movie:[]
      })
      this.props.history.goBack()
    })
  }



  render(){
    const {movie,relativeMovies} =this.state
    if(!movie) return null
    return(
      <div className='flex-row full'>
        <div className="page-shade">
            <div className='video-wrapper'>
              <div id='videoPlayer' data-src={movie.coverUrl} data-video={movie.videoUrl}></div>
            </div>
            <div className='video-sidebar'>
              <Link className='homeLink' to={'/'}>回到首页</Link>
              <Tabs defaultActiveKey='1' onChange={callback}>
                <TabPane tab='关于本片' key='1'>
                  <h1>{movie.title}</h1>
                  <dl>
                    <dt>豆瓣评分：<Badge count={movie.rate} style={{backgroundColor:'#52c41a'}}></Badge>分</dt>
                    <dt>电影分类：{movie.tags&&movie.tags.join(' ')}</dt>
                    <dt>更新时间：{movie.meta&&moment(movie.meta.createdAt).fromNow()}</dt>
                    <dt>影片介绍：</dt>
                    <dd>{movie.summary}</dd>
                  </dl>

                </TabPane>
                <TabPane tab='同类电影' key='2'>
                {
                   relativeMovies.map(item=>{
                    return(
                      <Link key={item._id} className='media' to={`/detail/${item._id}`}>
                         <img width='60' className="align-self-center-mr-3" src={item.posterUrl}></img>
                         <div className="media-body">
                           <h6 className="media-title">
                             {item.title}
                           </h6>
                           <ul style={{paddingLeft:5}}>
                             {item.pubdate&&item.pubdate.map((it,i)=>(
                                // <li className="list-unstyled" key={i}>{moment(it.date).format('YYYY.MM')} {it.country}</li>
                                <li className="list-unstyled" key={i}>{it}</li>
                              ))}
                           </ul>
                         </div>
                      </Link>          
                    )
                   })
                }
                </TabPane>
              </Tabs>
            </div>
         
        </div>
        
      </div>
    )
  }
}