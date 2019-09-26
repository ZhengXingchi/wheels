import React,{Component} from 'react'
import {
  Menu,
  Spin
}from 'antd'
import navRoutes from '../nav'

const getMenuContent=({path,name})=>{

  return(
   <a href={path?path:'/'} style={{color:"#000"}}>{name}</a>

  )
}

export default class LayoutDefault extends Component{
  constructor(props){
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

  render(){
    const {children}=this.props
    const {loading,tip}=this.state
    return (
     <div className='flex-column' style={{width:"100%",height:"100%"}}>
      <Menu
        mode="horizontal"
        style={{fontSize:13.5,backgroundColor:"fff"}}
        defaultSelectedKeys={[this.matchRouteName]}
      >
        <Menu.Item 
          style={{fontSize:18,textAlign:"center",color:"#000 !important"}}
        >
          <a href={'/'} className='hover-scale logo-text' style={{color:"#000"}}>预告片网站</a>     
        </Menu.Item>
        {
          navRoutes.map((e,i)=>{
             return (<Menu.Item key={e.name}>
                {getMenuContent({...e})}
              </Menu.Item>)
          })
        }
     

      </Menu>
      <Spin
        spinning={loading}
        tip={tip}
        wrapperClassName='content-spin full'
      >
        {children}
      </Spin>
     </div>

    )
  }

}