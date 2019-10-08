import React from 'react'
import axios from'axios'
import {withRouter} from'react-router-dom'

@withRouter
class AuthRoute extends React.Component{
  componentDidMount(){
    const publicList=['login','register']
    const pathname=this.props.location.pathname
    console.log(this.props)
    if(publicList.indexOf(pathname)>-1){
      return null
    }
    axios.get('/user/info')
    .then(res=>{
      if(res.status==200){
       
        if(res.data.code==0){

        }else{
          this.props.history.push('/login')
        }
         console.log(res.data)
      }
    })
  }

  render(){
    return(
      <h1>111</h1>
    )
  }
}

export default AuthRoute