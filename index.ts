import Koa = require('koa')
import path = require('path')
import serve = require('koa-static')
import error = require('koa-error')
import logger = require('koa-logger')
import convert = require('koa-convert')
import less = require('koa-less')

import spider = require('./spider')

import router = require('./router')

const app = new Koa()


// spider.doSpider()

app
  .use(router.routes())
  .use(router.allowedMethods())
  .use(logger())
  // .use(async (ctx, next)=> {  
  //   console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`)
  //   await next()
  // })
  // .use(async (ctx, next) => {
  //   try {
  //     await next()
  //     if (ctx.status === 404) {
  //       ctx.response.body = '大哥你找的页面不存在'
  //       // do somthing here
  //     }
  //   } catch (err) {
  //     // handle error
  //   }
  // })
  .use(error({
    engine: 'pug',
    template: __dirname + '/pages/error.pug'
  }))
  .use(convert(less(__dirname + '/pages/**/*.less1')))
  .use(serve(path.join(__dirname)))


app.listen(3000)

