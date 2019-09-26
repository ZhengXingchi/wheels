import React ,{Component}  from 'react'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
import {
  Card,
  Row,
  Col,
  Badge,
  Icon,
  Modal,
  Spin
  
}from 'antd'
import {Link} from 'react-router-dom'
const site='http://video.iblack7.com/'
const Meta=Card.Meta
export default class Content extends Component{

  constructor(props){
    super(props)
    this.state={
      visible:false
    }
  }

  _handleClose=(e)=>{
    if(this.player&&this.player.pause){
      this.player.pause()
    }

  }

  _handleCancel=(e)=>{
    this.setState({
      visible:false  
    })
  }

  _jumpToDetail=()=>{
    const {url} =this.props
    url&&window.open(url)
  }


  _showModal=(movie)=>{
    this.setState({
      visible:true
    })
    const video=movie.videoUrl
    const pic=movie.coverUrl
    if(!this.player){
      setTimeout(()=>{
        this.player=new DPlayer({
          container:document.getElementsByClassName('videoModal')[0],
          // srennshot:true,
          autoplay:true,
          video:{
            url:video,
            pic:pic,
            thumbnails:pic
          }
        })
      },500)
    }else{
      if(this.player.video.currentSrc!==video){
        this.player.switchVideo({
          url:video,
          autoplay:true,
          pic:pic,
          type:'auto'
        })
      }
      this.player.play()
    }
  }



  _renderContent=()=>{
    const {movies} =this.props
 
    return (
      <div>
        <Row>
          {/*1.map方法使用
             xxx.map(()=>{
              return()
             })
             1.map方法使用或者
              xxx.map(()=>(
              ))
          */}
          {
            movies.map((it,i)=>(
              <Col
                key={i}
                xl={{span:6}}
                lg={{span:6}}
                md={{span:6}}
                sm={{span:6}}
                style={{marginBottom:8}}
              >
           
                <Card
                  bordered={false}
                  hoverable
                  style={{width:'100%'}}
                  actions={[
                    <Badge>
                      <Icon style={{marginRight:2}} type='clock-circle'/> 
                      {moment(it.meta.createdAt).fromNow(true)}前更新
                    </Badge>,
                     <Badge>
                      <Icon style={{marginRight:2}} type='star'/> 
                      {it.rate}分
                    </Badge>
                  ]}
                  // cover={<img src={site+it.posterKey+'?imageMongr2/thumbnail/x1680、crop/1080x1600crop/1080x1600'}/>}
                  cover={<div  onClick={()=>this._showModal(it)} style={{width:260,height:300,overflow:"hidden",position:"relative"}}><img src={it.posterUrl} width="300" style={{position: "absolute",top:"50%",left: "50%",transform: "translate(-50%, -50%)"}}/></div>}
                >
                  <Meta
                    style={{height:202,overflow:'hidden'}}
                    title={<Link to={`/detail/${it._id}`}>{it.title}</Link>}
                    onClick={this._jumpToDetail}
                    description={<Link to={`/detail/${it._id}`}>{it.summary}</Link>}
                  />
                </Card>
                
              </Col>
            ))
          }
        </Row>
        <Modal
          className="videoModal"
          footer={null}
          visible={this.state.visible}
          afterClose={this._handleClose}
          onCancel={this._handleCancel}
          keyboard={true}
        >
          <Spin size="large"></Spin>
        </Modal>


      </div>

    ) 
    
  }
  render(){
    return (
      <div style={{padding:10}}>
     
        {this._renderContent()}
      </div>
    )
  }
}