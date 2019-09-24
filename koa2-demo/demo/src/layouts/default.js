import React,{Component} from 'react'
import {
  Menu,
  spin
}from 'antd'
import navRoutes from '../nav'

const getMenuContent=({path,name})=>(
 <a href={path?path:'/'} style={{color:"#fff2e8"}}>{name}</a>

)

export default LayoutDefault extends Component{
  constructor(){
    super(props)
    this.state={
      loading:false,
      tip:'稍等'
    }
  }

  componentWillUnmount(){
    window.__LOADING__=null
  }

  componentDidMount(){
    window.__LOADING__=this.toggleLoading

  }

  matchRouteName=this.props.match
    ?navRoutes.find(e=>e.name===this.props.match.params.type)
      ?navRoutes.find(e=>e.name===this.props.match.params.type)
      :'全部'
    :navRoutes[0].name

  toggleLoading=(status=false,tip="稍等")=>{
    this.setState({
      loading:status,
      tip
    })
  }

  render（）{
    const {children}=this.props
    const {loading,tip}=this.state
    return (
     <div className='flex-column' style={{width:"100%",height:"100%"}}>
      <Menu
        mode="horizontal"
        style={{fontSize=13.5,backgroundColor:"#000"}}
        defaultSelectedKeys={[this.matchRouteName]}
      >
        <Menu.Item 
          style={{marginLeft:24,marginRight:30,fontSize:18,textAlign:"center",color:"#fff !important",float:"left"}}
        >
          <a href={'/'} className='hover-scale logo-text' style={{color:"fff2e8"}}>预告片网站</a>     
        </Menu.item>
        {
          navRoutes.map((e,i)=>{
             <Menu.Item key={e.name}>
                {getMenuContent(...e)}
              </Menu.item>
          })
        }
     

      </Menu>
      <spin>
        spinning={loading}
        tip={tip}
        wrapperClassName='content-spin full'
      </spin>
     </div>

    )
  }

}