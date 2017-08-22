'use strict';
const Koa = require('koa')

let config = require('../config')
let g = require('./middle/g')
let rel = require('./middle/reply')
let util = require('./libs/util')

let app = new Koa()


app.use(g(config.wechat))
app.use(rel.reply)
app.listen(3000)
console.log('listen 3000')