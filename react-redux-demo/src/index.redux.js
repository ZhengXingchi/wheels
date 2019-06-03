const ADD_GUN="加机关枪"
const REMOVE_GUN="减机关枪"


//reducer
export function counter(state=0,action){
  console.log(state,action)
  switch(action.type){
    case '加机关枪':
      return state+1
    case '减机关枪':
      return state-1
    default:
      return 10
  }
}

//action_creator
export function addGUN(){
	return {type:ADD_GUN}
}

export function removeGUN(){
	return {type:REMOVE_GUN}
}

export function  addGUNAsync(){
  return dispatch=>{
    setTimeout(()=>{
      dispatch(addGUN())
    },2000)
  }
}

export function  addGUNTwice(){
  console.log('111')
   return [{type:ADD_GUN},{type:ADD_GUN}]
}