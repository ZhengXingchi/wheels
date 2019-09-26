import React ,{Component} from 'react'
import 'babel-polyfill'  //需要引入babel-polyfill，不知道为什么
export default (loadComponent,placeholder='正在加载中')=>{
  return class AsyncComponent extends Component{
    unmount=false
    constructor(){
      super();

      this.state={
        Child:null
      }

    }
    componentWillUnmount(){
      this.unmount=true
    }
     async componentDidMount(){
      const {default:Child} =await loadComponent()
  
      
  
      if(this.unmount) return 
        this.setState({
          Child
        })
    }
    render(){
      const {Child} =this.state

   
      return(
        Child?<Child {...this.props}></Child>:placeholder
      )
    }

  }

  }

