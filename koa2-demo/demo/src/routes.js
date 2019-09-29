import AC from './components/async_load'
export default[{
  name:'首页',
  icon:'home',
  path:'/',
  component:AC(()=>import('./views/home'))
},{
  name:'详情页',
  icon:'detail',
  path:'/detail/:id',
  component:AC(()=>import('./views/movie/detail'))
},{
  name:'后台入口页',
  icon:'admin',
  path:'/admin',
  component:AC(()=>import('./views/admin/login'))
},,{
  name:'后台电影列表',
  icon:'admin',
  path:'/admin/list',
  component:AC(()=>import('./views/admin/list'))
}]