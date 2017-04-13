'use strict';
// 引入依赖
const express = require('express');
const utility = require('utility');

// 实例
let app = express();

app.get('/',(req,res)=>{
	// 从req.query取出需要的q参数
	// 如果是post出来的body数据,则是在req.body里边,不过express默认不处理body中的信息 
	// 需要引入 https://github.com/expressjs/body-parser 这个中间件才会处理，这个后面会讲到
	
	let q = req.query.q || '0';

	// 调用utility.md5方法，得到md5后的值
	// utility 的 github 地址：https://github.com/node-modules/utility
	// 里边有很多常用且比较复杂的方法，可以学习一下
	
	let md5Val = utility.md5(q);

	res.send(md5Val)
})

app.listen(3000,(req,res)=>{
	console.log('app is runming at port 3000')
})























