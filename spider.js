"use strict";
const superagent = require("superagent");
require('superagent-proxy')(superagent);
class spider {
    doSpider(times = 1) {
        const proxy = 'http://dev-proxy.oa.com:8080';
        let list = [];
        for (let i = 0; i < times; i++) {
            superagent
                .get('http://gank.io/api/random/data/%E7%A6%8F%E5%88%A9/20')
                .timeout({
                response: 5000,
                deadline: 60000,
            })
                .end((err, res) => {
                console.log(err);
                // console.log(res)
                console.log(typeof res.text, res.text); //res.text.results
                const { results = [] } = JSON.parse(res.text) || {};
                // console.log(typeof results, results)
                results.forEach((r, i) => {
                    console.log(r.url);
                    list.push(r.url);
                    // const writeFileStream = fs.createWriteStream(`./images/${r._id}.jpg`)
                    // const req = superagent.get(r.url).proxy(proxy)
                    // req.pipe(writeFileStream)
                });
            });
        }
        return list.length ? list : '';
    }
}
module.exports = new spider();
