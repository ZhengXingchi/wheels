import React ,{Component} from 'react'
import axios from 'axios'
 
import {connect}  from 'react-redux'
import {getUserList} from '../../redux/chatuser.redux'
import UserCard from '../usercard/usercard'

export default  @connect(
  state=>state.chatuser,
  {getUserList}
)
class Genius extends Component{
  constructor(props){
    super(props)
 
  }
  componentDidMount(){
    this.props.getUserList('boss')
  }
  render(){
   
     return (
       <UserCard userList={this.props.userList}></UserCard>
    )
  }
}