"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const path = require("path");
const serve = require("koa-static");
const error = require("koa-error");
const logger = require("koa-logger");
const convert = require("koa-convert");
const less = require("koa-less");
const router = require("./router");
const app = new Koa();
// spider.doSpider()
app
    .use(router.routes())
    .use(router.allowedMethods())
    .use(logger())
    .use(error({
    engine: 'pug',
    template: __dirname + '/pages/error.pug'
}))
    .use(convert(less(__dirname + '/pages/**/*.less1')))
    .use(serve(path.join(__dirname)));
app.listen(3000);
