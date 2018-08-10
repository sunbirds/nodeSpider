const http = require("http"), url = require("url"), superagent = require("superagent"), cheerio = require("cheerio"), async = require("async"), eventproxy = require('eventproxy');
require('superagent-proxy')(superagent);
const header = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'zh-CN,zh;q=0.8,zh-TW;q=0.6',
    'Host': 'www.jianshu.com',
    'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Mobile Safari/537.36',
    'Cache-Control': 'max-age=0',
    'Connection': 'keep-alive'
};
const proxy = 'http://dev-proxy.oa.com:8080';
let urlsArray = []; //存放爬取网址
let pageUrls = []; //存放收集文章页面网站
let pageNum = 200; //要爬取文章的页数
for (let i = 1; i < 2; i++) {
    pageUrls.push('http://www.cnblogs.com/#p' + i);
}
const start = () => {
    console.log(1);
    const onRequest = (req, res) => {
        // console.log(req, res)
        console.log(pageUrls);
        pageUrls.forEach(pageUrl => {
            superagent
                .get('http://gank.io/api/random/data/%E7%A6%8F%E5%88%A9/20')
                .proxy(proxy)
                .end((err, res) => {
                if (err) {
                    // console.log(err)
                }
                // console.log('err', err)
                console.log('res', res.text);
                // const $ = cheerio.load(pres.text)
                // const curPageUrls = $('.titlelnk')
                // console.log(curPageUrls)
            });
        });
    };
    http.createServer(onRequest).listen(3000);
    console.log('Server running at http://127.0.0.1:3000/');
};
start();
