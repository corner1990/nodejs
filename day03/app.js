
'use strict';
// 引入依赖
const express = require('express');
const superagent = require('superagent');
const cheerio = require('cheerio');

// 实例
let app = express();

app.get('/',(req,res,next)=>{
	
	// 用superagent 去抓去 https://cnodejs.org/ 内容
	superagent.get('https://cnodejs.org/')
		.end((err,sers)=>{
			// 常规错误处理
			if(err){
				return next(err);
			}

			// sres.text 里边存储这html内容，将它传给cheerio 之后
			// 就可以得到一个实现了jquery接口的变量 可以命名为$
			// 然就是 jquery操作 
			
			let $ = cheerio.load(sers.text);

			let items = [];

			$('#topic_list .topic_title').each((idx,elem)=>{
				let $elem = $(elem);

				items.push({
					title : $elem.attr('title'),
					href : $elem.attr('href')
				})
			})

			res.send(items)
		})
})

app.listen(3000,(req,res)=>{
	console.log('app is runming at port 3000')
})