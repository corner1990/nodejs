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
			return console.err(err)
		}

		let topicUrls = [];
		let $ = cheerio.load(res.text);

		// 获取首页所有的链接
		$('#topic_list .topic_title').each((idx,elem)=>{
			let $elem = $(elem);
			console.dir(`${$elem} --> $elem`);
			let href = url.resolve(condeUrl,$elem.attr('href'));
			topicUrls.push(href)
		})

		console.dir(`${topicUrls} =>topicUrls`)
	})
