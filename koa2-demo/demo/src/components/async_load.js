import React ,{Component} from 'react'
import 'babel-polyfill'
export default (loadComponent,placeholder='正在加载中')=>{
  return class AsyncComponent extends Component{
    unmount=false
    constructor(){
      super();
      console.log('hhhh')
      this.state={
        Child:null
      }

    }
    componentWillUnmount(){
      this.unmount=true
    }
     async componentDidMount(){
      const {default:Child} =await loadComponent()
  
      
      console.log(Child)
      if(this.unmount) return 
        this.setState({
          Child
        })
    }
    render(){
      const {Child} =this.state

      console.log(Child)
      return(
        Child?<Child {...this.props}></Child>:placeholder
      )
    }

  }

  }

