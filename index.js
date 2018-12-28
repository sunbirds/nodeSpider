"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const path = require("path");
const serve = require("koa-static");
const error = require("koa-error");
const logger = require("koa-logger");
const convert = require("koa-convert");
const less = require("koa-less");
// import spider = require('./spider')
const router = require("./router");
const app = new Koa();
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
    .use(convert(less(__dirname + '/pages/**/*.less')))
    .use(serve(path.join(__dirname)));
app.listen(3000);
