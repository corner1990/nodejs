'use strict'
const sha1 = require('sha1')
const Promise = require('bluebird')
let Wechat = require('./../libs/wechat')
// let reply = require('./reply')

let xmlParse = require('./../libs/xmlParseJSON')

const getRawBody = require('raw-body')

module.exports = function(opts, next){
	var wechat = new Wechat(opts)
	
	return  function *(next) {
		
		var that = this 
		var token = opts.Token;
		var signature = this.query.signature
		var echostr = this.query.echostr
		var nonce = this.query.nonce
		var timestamp = this.query.timestamp

		var str = [token, timestamp, nonce].sort().join('')
		var sha = sha1(str)

		if (this.method === 'GET') {
			if(sha === signature){
				this.body = echostr + ''
			}else{
				this.body = 'wran'
			}
		} else if (this.method === 'POST') {
			if (sha != signature) {
				this.body = 'wran'
				return false
			}

			let data = yield getRawBody(this.req, {
				length: this.length,
				limit: '1mb',
				encoding: this.charset
			})

			// var json = { 
			// 	xml: { ToUserName: [ 'gh_d7db28f9bd3c' ],
			//     FromUserName: [ 'oCSlgv-6V8LIBM-9Qt6766q2BdXI' ],
			//     CreateTime: [ '1499475035' ],
			//     MsgType: [ 'event' ],
			//     Event: [ 'unsubscribe' ],
			//     EventKey: [ '' ] } 
			//  }
			let content = yield xmlParse.xmlParseJSON(data)
			this.message = content.xml
			yield next;

			that.status = 200
			that.type = 'appliaction/xml'
			
		}
		
	}
}
