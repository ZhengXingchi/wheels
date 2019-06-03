export default function arraythunk({getState,dispatch}){
	return (next)=>(action)=>{
		 console.log(action)
	   if(Array.isArray(action)){
         action.forEach(item=>dispatch(item))
	   }
	   else{
	   	next(action)
	   }
    }
}
