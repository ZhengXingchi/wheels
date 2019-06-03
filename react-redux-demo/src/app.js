import React from 'react'
import {addGUN,removeGUN,addGUNAsync,addGUNTwice} from "./index.redux"
import {connect} from './zxc.react.redux'

// const mapStateToProps=(state)=>{
//   return {num:state}
// }
// const actionCreater={addGUN,removeGUN,addGUNAsync}
// App=connect(mapStateToProps,actionCreater)(App)

// @connect(
// state=>({num:state}),
// {addGUN,removeGUN,addGUNAsync}
// )
class App extends React.Component{
  constructor(props,context){
    super(props,context)
    console.log(props,context)
   
  }

 
  
  render(){
     console.log(this.props.num)
     
     return(
      <div>
       <h1>现在有机枪{this.props.num}把</h1>
       <button onClick={this.props.addGUN}>增加机关枪</button>
       <button onClick={this.props.addGUNTwice}>增加两把机关枪</button>
       <button onClick={this.props.removeGUN}>上交机关枪</button>
       <button onClick={this.props.addGUNAsync}>异步增加机关枪</button>
      </div>
     ) 
  }
}

App=connect(
  state=>{return {num:state}},
  {addGUN,removeGUN,addGUNAsync,addGUNTwice}
)(App)

 

export default App