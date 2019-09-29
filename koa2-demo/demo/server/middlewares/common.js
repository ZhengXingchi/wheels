import bodyParse from 'koa-bodyparser'
import logger from 'koa-logger'
import session from 'koa-session'

export const addBodyParse=app=>{
  app.use(bodyParse())
}

export const addLogger=app=>{
  app.use(logger())
}

// session中间件
export const addSession = app => {
  app.keys = ['douban-trailer']

  const CONFIG = {
    key: 'koa:sess',
    maxAge: 86400000,
    overwrite: true,
    httpOnly: false,
    signed: true,
    rolling: false
  }

  app.use(session(CONFIG, app))
}