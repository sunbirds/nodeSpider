"use strict";
const fs = require("fs");
const pug = require("pug");
const Spider = require("./spider");
const Router = require("koa-router");
const test = require("./test/test");
const router = new Router();
router
    .get('/', async (ctx, next) => {
    const { response } = ctx;
    const images = fs.readdirSync('./images').filter(f => f.includes('.jpg') || f.includes('.png'));
    const html = pug.renderFile('./pages/index/index.pug', {
        pageTitle: 'test-abc',
        youAreUsingPug: true,
        images,
        basedir: './pages/index/'
    });
    response.body = html;
})
    .get('/fuli', async (ctx, next) => {
    const res = await Spider.doSpider();
    ctx.body = res;
})
    .get('/g', (ctx) => {
    ctx.redirect('/');
    // ctx.body =  JSON.stringify(global)
    // console.log('g',__filename)
    // console.log('g', __dirname)
    test.doTest();
});
module.exports = router;
