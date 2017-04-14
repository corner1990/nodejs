'use strict';
// 引入依赖
const eventproxy = require('eventproxy');
const express = require('express');
const superagent = require('superagent');
const cheerio = require('cheerio');
// url 模块是nodejs标准库集成的
const url = require('url');

let condeUrl = 'https://cnodejs.org/';

superagent.get(condeUrl)
	.end((err,res)=>{
		if(err){
			return next.err(err)
		}

		let topicUrls = [];
		let $ = cheerio.load(res.text);

		// 获取首页所有的链接
		$('#topic_list .topic_title').each((idx,elem)=>{
			let $elem = $(elem);
			// $element.attr('href') 本来的样子是 /topic/542acd7d5d28233425538b04
			//  // 我们用 url.resolve 来自动推断出完整 url，变成
      		// https://cnodejs.org/topic/542acd7d5d28233425538b04 的形式
      		// 具体请看 http://nodejs.org/api/url.html#url_url_resolve_from_to 的示例
			let href = url.resolve(condeUrl,$elem.attr('href'));
			topicUrls.push(href)
		})

		let ep = new eventproxy();

		ep.after('topic_html',topicUrls.length,(data)=>{
			 // topics 是个数组，包含了 40 次 ep.emit('topic_html', data) 中的那 40 个 data
			 // 开始行动
			 data = data.map((detail)=>{
			 	let topicUrl = detail[0];
			 	let topicHtml = detail[1];
			 	var $ = cheerio.load(topicHtml);
	
			 	// console.log($('.reply_content').eq(0).text().trim())
			 	return({
			 		title:$('.topic_full_title').text().trim(),
			 		href : topicUrl,
			 		comment1: $('.reply_content').eq(0).text().trim()
			 	})

			 })
			console.log('final:');
      		console.log(data,'data');
		})
		
		topicUrls.forEach((topicUrl)=>{
			superagent.get(topicUrl)
			.end((err,res)=>{
				console.log(`fetch ${topicUrl} successful`);
				ep.emit('topic_html',[topicUrl,res.text]);
			})
		})
		

	})
