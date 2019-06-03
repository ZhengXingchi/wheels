export  function createStore(reducer,enhancer){
  let listeners=[]
  let state={}
  if(enhancer){
    return enhancer(createStore)(reducer)
  }
  function dispatch(action){
   
  	state=reducer(state,action)
 
  	listeners.forEach(v=>{
        
       v()
    })
    return action
  }

  function subscribe(li){
    
  	listeners.push(li)
   
  }
  function getState(){
  	return state
  }
  dispatch({type:'@hahaha'})
  return {
  	dispatch,
  	subscribe,
  	getState
  }
}

export function applyMiddleware(...middlewares){
  return (createStore)=>(reducer)=>{
    let store=createStore(reducer)
    let dispatch=store.dispatch

    const midAPI={
      getState:store.getState,
      dispatch:(...args)=>dispatch(...args)
    }
    let middlewareChain=middlewares.map(middleware=>middleware(midAPI))

    let middlewarearray=compose(middlewareChain)
console.log('sss',middlewarearray)
    dispatch=middlewarearray(store.dispatch)
console.log({
  ...store,
  dispatch
})
    return{
      ...store,
      dispatch
    }
  }
}

export function compose(funcs){
  console.log(Array.isArray(funcs))
  console.log(funcs.length)
  if(funcs.length==0){
    return arg=>arg
  }else if(funcs.length==1){
    return funcs[0]
  }else{

    console.log(typeof funcs)
    // item middleware({getState,dispatch})
    let middlewareChainMethods=funcs.reduce((ret,item)=>(...args)=>{ console.log('yyy',args,item,ret);return ret(item(...args))})
    console.log('ttt',middlewareChainMethods)
    return middlewareChainMethods
  }

}

export function bindActionCreators(creators,dispatch){
  let bound={}
  Object.keys(creators).forEach(v=>{
    let creator=creators[v]
    bound[v]=(...args)=>{
      dispatch(creator(...args))
    }
  })
 return bound
  
}