import Router from 'koa-router'
import publicController from '../../api/PublicController'
import contentController from '../../api/ContentController'
import userController from '../../api/UserController'
import commentsController from '../../api/CommentsController'

const router = new Router()

router.prefix('/public')

router.get('/getCaptcha', publicController.getCaptcha)
router.get('/list', contentController.getPostList)    // 获取男生墙女生墙列表
router.get('/tips', contentController.getTips)
router.get('/links', contentController.getLinks)
router.get('/topWeek', contentController.getTopWeek)
router.get('/reset-email', userController.updateUsername)
router.get('/content/detail', contentController.getPostDetail) // 获取个人详细信息
router.get('/comments', commentsController.getComments)
router.get('/info', userController.getBasicInfo)
export default router
