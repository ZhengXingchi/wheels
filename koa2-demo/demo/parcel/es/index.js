import React from 'react'
import {render} from 'react-dom'
import App from './app'

class AppContainer extends React.Component{
  state={
    name:'Pacrcel打包案例'
  }
  componentDidMount(){
    setTimeout(()=>{
      this.setState({
        name:'parcel打包案例。哈哈哈哈哈！！！'
      })
    },2000)
  }
  render(){
    return  <App name={this.state.name}></App>
  }
}

render(<AppContainer/>,document.getElementById('app'))