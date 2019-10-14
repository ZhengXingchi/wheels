import React, { Component } from 'react';
import {
  Map,
  is
}from 'immutable'
import './App.css';
import _  from 'lodash';


// function compareObj(obj1,obj2){
//   if(obj1==obj2){
//     return true
//   }
//   if(Object.keys(obj1).length!==Object.keys(obj2).length){
//     return false
//   }
//   for(let k in obj1){
//     if(typeof obj1[k]=='object'){
     
//       if(!compareObj(obj1[k],obj2[k])){
//         return false
//       }
//     }else if (obj1[k]!==obj2[k]){
     
//       return false
      
//     }
//   }
//   return true
// }

let obj1=Map({
  'name':'haha',
  'course':Map({name:'react+redux'})
})
let obj2=obj1.set('name','hahala')





console.log('obj1==obj2',obj1.get('course')==obj2.get('course'))
class App extends Component {
  constructor(props){
    super(props)
    this.state={
      num:1,
      title:'title',
      map:['aa','bb','cc']
    }
    this.handleClick=this.handleClick.bind(this)
    this.handleTitle=this.handleTitle.bind(this)
    this.handleMap=this.handleMap.bind(this)


  }
  handleClick(){
    console.log('xx')
    this.setState({
      num:this.state.num+1
    })
  }

  handleMap(){
     this.setState({
      num:this.state.num+1
    },()=>{
    console.log(this.state.num)
      let arr=_.cloneDeep(this.state.map)
      arr.unshift(this.state.num)
      this.setState({
        map: arr
      })
    })

    
  }

  handleTitle(){
    console.log('yy')
    this.setState({
      title:this.state.title+'!'
    })
  }
  render() {

    const {map}=this.state
    //每次render  bind都会执行一次
    return (
      <div>
        <h2>App{this.state.num}</h2>
        <button onClick={this.handleClick}>点击num</button>
        <button onClick={this.handleTitle}>点击title</button>
        <button onClick={this.handleMap}>点击map</button>
        {/*<button onClick={()=>this.handleClick()}>点击2</button>*/}
        <Demo title={this.state.title}></Demo>
        {map.map((item,i)=>{
          return(
            
               <div key={i}>{item}</div>
              
          )
        })}
      </div>
    );
  }
}

class Demo extends React.PureComponent{
   
  render(){
    console.log('demo render执行中')
    return (
      <h2>I am Demo,title:{this.props.title}</h2>
    )


  }
}

export default App;
