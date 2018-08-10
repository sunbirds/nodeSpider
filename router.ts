import fs = require('fs')
import pug = require('pug')
import Spider = require('./spider')
import Router = require('koa-router')

import test = require('./test/test')

const router = new Router()
router
  .get('/', async (ctx, next) => {
    const {response} = ctx
    const images = fs.readdirSync('./images').filter(f => f.includes('.jpg') || f.includes('.png'))
    const html = pug.renderFile('./pages/index/index.pug', {
      pageTitle: 'test-abc',
      youAreUsingPug: true,
      images,
      basedir: './pages/index/'
    })
    response.body = html
  })
  .get('/fuli', async (ctx, next) => {
    const res = await Spider.doSpider()
    ctx.body = res
  })
  .get('/g', (ctx) => {

    ctx.redirect('/')
    // ctx.body =  JSON.stringify(global)
    // console.log('g',__filename)
    // console.log('g', __dirname)
    test.doTest()
  })
// .get('/2', (ctx)=> {
//   ctx.throw(500)
//   // ctx.body = 123
// })
// .get('/images/:id', async (ctx, next) => {
//   const {response, request, params: {id = ''}, path} = ctx
//   const img = fs.readFileSync(`./images/${id}`)
//   response.res.writeHead(200, {'Content-Type': 'image/jpg' })
//   response.res.end(img, 'binary')
// })

export = router