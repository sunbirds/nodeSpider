"use strict";
const fs = require("fs");
const path = require("path");
class test {
    doTest() {
        // console.log('t',__filename)
        // console.log('t', __dirname)
        const imagesDir = path.resolve(__dirname, '../images');
        const a = fs.readFileSync(path.resolve(__dirname, '../pages/index.pug'));
        console.log(a);
    }
}
module.exports = new test();
