import createReducer from 'UTIL/createReducer'
import { ACTION_HANDLERS } from 'ACTION/msg/displayControl'
import initState from 'STORE/initState'


/*
创建reducer
其中params[0]:msg下面的initState
params[1]:msg下面所有的acions
返回类似reducer(){
  swich
  case:
  case:

}这种功能

*/
export default createReducer(initState.msg.displayControl, ACTION_HANDLERS)
