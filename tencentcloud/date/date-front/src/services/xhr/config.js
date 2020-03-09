// 此处配置 根访问路径 以及 全局错误处理
// 更多配置请根据业务逻辑自行实现

// 后端 API 地址，最好以 http(s):// 打头

let rootPath
if (__DEV__) {
  console.info('[当前环境] 开发环境')
  rootPath = 'http://10.0.0.12:8989'
}
if (__PROD__) {
  console.info('[当前环境] 生产环境')
  rootPath = 'http://list.zhengxc.xyz'
}

export {
  rootPath
}

export const errHandler = (e) => {
  alert('[ XHR:Failed ] 详情请看控制台')
  console.error(e)
}
