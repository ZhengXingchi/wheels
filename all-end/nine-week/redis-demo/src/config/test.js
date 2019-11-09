import { getValue , setValue ,getHValue} from './redisConfig'
setValue('uu','uu message from redis client')

getValue('uu').then(res=>{
  console.log('getValue:'+res)
})


setValue('ii',{
  name:'hhhh',
  age:13,
  email:3455353
})

getHValue('ii').then(res=>{
  console.log('getHValue:'+JSON.stringify(res,null,2))
})