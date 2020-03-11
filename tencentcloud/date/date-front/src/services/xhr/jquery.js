import { rootPath, errHandler } from './config'
import storage from 'UTIL/storage'
import publicConfig from 'CONFIG'
const xhr = ({ url, body = null, method = 'get', type }) => {
  const defer = $.Deferred()
  console.log(url)
  let options = {
    type: method,
    url: rootPath + url,
    data: body
    // xhrFields: { // 跨域允许带上 cookie
    //   withCredentials: [域名]
    // },
    // crossDomain: true
  }
  if (type === 'file') {
    options.processData = false
    options.contentType = false
  }
  let isPublic = false
  publicConfig.publicPath.map((path) => {
    isPublic = isPublic || path.test(url)
  })
  const token = storage.get('token')
  if (!isPublic && token) {
    options.headers = {
      Authorization: 'Bearer ' + token
    }
  }

  $.ajax(options)
    .done(defer.resolve)
    .fail(errHandler)

  return defer.promise()
}

export default xhr
