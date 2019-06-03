import React from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from './zxc.redux'


export const connect=(mapStateToProps=state=>state,mapDispatchToProps={})=>(WrapComponent)=>{
	return  class ConnectComponent extends React.Component{
      static contextTypes={
      	store:PropTypes.object
      }

      constructor(props,context){
      	super(props,context)
      	this.state={
      		props:{}
      	}
      }

      componentDidMount(){
      	const {store} = this.context

      	this.update()
 
        // store.subscribe(this.update)
        store.subscribe(this.update.bind(this))
      }

      update(){
      	 
        const {store}=this.context
        const stateProps=mapStateToProps(store.getState())
        const dispatchProps=bindActionCreators(mapDispatchToProps,store.dispatch)
        this.setState({
        	props:{
        		...this.state.props,
        		...stateProps,
        		...dispatchProps
        	}
        })

      }

      render(){
      	return <WrapComponent {...this.state.props}></WrapComponent>
      }
	}
}

export class Provider extends React.Component{
  constructor(props,context){
  	super(props,context)
  	console.log(props.store)
  	this.store=props.store || context.store
  }
  static childContextTypes={
  	store:PropTypes.object,
  	dispatch:PropTypes.object,
  	subscribe:PropTypes.object,
  	getState:PropTypes.object,

  }
  getChildContext(){
  	console.log({store:this.store})
  	return {store:this.store}
  }
  render(){
  	console.log(this.props.children)
  	return this.props.children
    
  }
}