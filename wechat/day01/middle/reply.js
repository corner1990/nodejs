'use strict'
let path = require('path')
let Msg = require('./../libs/message')
let config = require('./../../config')
let Wechat = require('./../libs/wechat')

var wechat = new Wechat(config.wechat)

exports.reply = function *(next) {
	var msg = this.message
	var type = '';
	// var json = { 
	// 	xml: { ToUserName: [ 'gh_d7db28f9bd3c' ],
	//     FromUserName: [ 'oCSlgv-6V8LIBM-9Qt6766q2BdXI' ],
	//     CreateTime: [ '1499475035' ],
	//     MsgType: [ 'event' ],
	//     Event: [ 'unsubscribe' ],
	//     EventKey: [ '' ] } 
	//  }
	console.log(msg, 'msg.Event')

	if (msg.Event && msg.Event[0] == 'subscribe') {
		console.log('感谢关注')
	} else if (msg.Event && msg.Event[0] == 'unsubscribe') {
		console.log('取消关注')
	}


	if (msg.Content == 1) {
		msg.Content = '你想问我什么'
		msg.MsgType = 'text'
	} else if (msg.Content == 2) {
		msg.MsgType = 'image'
		msg.MediaId = '2-5sBgNVcCjWb50XIcpxa3lRrz7Hs1lX8xm1e09plhSf3gNC2LyxmAWDXggS_fWa'
	} else if (msg.Content == 3) {
		msg.MsgType = 'news'
		msg.articles= [{
			Title: 'nodejs',
			Description: '哈哈 反正我是描述',
			PicUrl: 'http://nodejs.cn/static/images/logos/nodejs-2560x1440.png',
			Url: 'http://book.apebook.org/minghe/koa-action/co/koa.html'
		}]

	} else if (msg.Content == 4) {
		var _file = path.join(__dirname,'../../WP_20141216_001.jpg');
		var data = yield wechat.uploadSuCai('image', _file)
		console.log(data, '4 - data')
		
		msg.MsgType = data.type
		msg.MediaId = data.media_id
	} else if (msg.Content == 5) {
		var _file = path.join(__dirname,'../../6.mp4');
		var data = yield wechat.uploadSuCai('video', _file)
		
		msg.MsgType = data.type
		msg.MediaId = data.media_id
	}else if (msg.Content == 6) {
		// var _file = path.join(__dirname,'../../WP_20141216_001.jpg');
		// var _file = path.join(__dirname,'../../6.mp4');
		var data = yield wechat.uploadMaterial('image', _file, {title: '测试视频', introduction: '我是测试的描述信息'})

		console.log(data, '6 - data')
		msg.MsgType = 'text'
		msg.Content = '打印在控制台了！'
	} else {
		msg.Content = '我不知道你想表达什么？？？？'
		msg.MsgType = 'text'
	}

	var xml = Msg(msg, msg.MsgType)
	
	this.body = xml
}