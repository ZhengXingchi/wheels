export default function thunk({getState,dispatch}){
	return (next)=>(action)=>{
		 console.log(action)
	   if(typeof action==="function"){
         action(next,getState)
	   }
	   else{
	   	next(action)
	   }
    }
}
