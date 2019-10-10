import React ,{Component} from 'react'
import {

  Grid,
  List
}from 'antd-mobile'
import PropTypes from 'prop-types'

export default class AvatarSelector extends Component{
  static propTypes={
    selectAvatar:PropTypes.func.isRequired
  }
  constructor(props){
    super(props)
    this.state={

    }
  }
  render(){
    const avatarList='boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'.split(',').map((item,index)=>{
      return {
        icon:require(`../img/${item}.png`),
        text:item
      }
    })

    const gridHead=this.state.text?(<div><span>已选择头像</span><img style={{width:20}} src={this.state.icon} alt=""/></div>):'请选择头像'
    return(
      <div>
        
        <List renderHeader={()=>gridHead}>
          <Grid 
            data={avatarList} 
            activeStyle={false}  
            columnNum={5}
            onClick={ele=>{
              this.setState(ele)
              this.props.selectAvatar(ele.text)
            }}
            >
            </Grid>

        </List>
        

      </div>
    )
  }
}