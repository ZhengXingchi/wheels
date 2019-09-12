// import {promisify} from 'util'
// import {resolve as r} from 'path'
// import {readFile,writeFileSync as wfs} from 'fs'
// import * as qs from 'querystring'
// promisify(readFile)(r(__dirname,'./package.json')).then((data)=>{
//   data=JSON.parse(data)
//   wfs(r(__dirname,'./name'),String(data.name),'utf8')
// })

const name='look'
export  {name}
//或者export const name='look'

export const getName=()=>{
	return name
}
const age=19
export default age

export{
	name as name2,
	getName as getName2,
	age
}