import Router from 'koa-router'
import demoController from '../api/demoController'  

const router=new Router()
router.prefix('/public')
router.get('/getCaptcha',demoController.getCaptcha)

export default router