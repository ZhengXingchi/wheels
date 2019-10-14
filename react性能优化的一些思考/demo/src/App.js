import React, { Component } from 'react';

import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      num:1,
      title:'title'
    }
    this.handleClick=this.handleClick.bind(this)
    this.handleTitle=this.handleTitle.bind(this)
  }
  handleClick(){
    console.log('xx')
    this.setState({
      num:this.state.num+1
    })
  }

  handleTitle(){
    console.log('yy')
    this.setState({
      title:this.state.title+'!'
    })
  }
  render() {

   
    //每次render  bind都会执行一次
    return (
      <div>
        <h2>App{this.state.num}</h2>
        <button onClick={this.handleClick}>点击num</button>
        <button onClick={this.handleTitle}>点击title</button>
        {/*<button onClick={()=>this.handleClick()}>点击2</button>*/}
        <Demo title={this.state.title}></Demo>
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
