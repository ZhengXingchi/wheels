import  combineRoutes from 'koa-combine-routers'

import  demoRoute from './demoRoute'
 

export default combineRoutes(demoRoute)