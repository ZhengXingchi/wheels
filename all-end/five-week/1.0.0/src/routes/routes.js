import  combineRoutes from 'koa-combine-routers'

import  demoRoute from './demoRoute'
import  loginoRoute from './LoginRoute'
 

export default combineRoutes(demoRoute,loginoRoute)