import axios from '@/utils/request'
import qs from 'qs'
const getLists = options => {
  return axios.get('/public/list?' + qs.stringify(options))
}
const getTips = options => {
  return axios.get('/public/tips?' + qs.stringify(options))
}
const getLinks = options => {
  return axios.get('/public/links?' + qs.stringify(options))
}
const getTop = options => {
  return axios.get('/public/topweek?' + qs.stringify(options))
}
export {
  getLists,
  getTips,
  getLinks,
  getTop
}
