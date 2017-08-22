'use strict'

let xm2js = require('xml2js')
const Promise = require('bluebird')

exports.xmlParseJSON = function (xml) {
	return new Promise (function (resolve, reject){
		xm2js.parseString(xml,{trim: true}, function (err, content) {
			if (err) reject(err)
			else resolve(content)
		})
	}) 

}

exports.formatMsg = function (result) {
	if (!(result instanceof Object )) return false
	let msg = {};
	let json = result;

	// 得到所有对象的keys 对其进行遍历处理
	var keys = Object.keys(json)
	for (var i = 0, len = keys.length; i < len; i++) {
		var key =  keys[i]
		let item = json[key]
		console.log(item, 'item',key)
		// 如果 遍历出来的对象length等于0 或者是数组的话跳过
		if (!(item instanceof Array) && !(item instanceof Object) && item.length == 0) {
			console.log('continue') 
			continue
		}
		if (typeof item == 'object' || item.length > 1) {//处理length为1的对象
			let val = item
			if (typeof val == 'object') {
				console.log(key, 'val == object')
				msg[key] = formatMessage(val)
			}else {
				msg[key] = (val || '').trim()
			}
			
		} else {//对遍历出来的数组进行处理
			msg[key] = []
			console.log(key, '[]')
			for (var j = 0,k = item.length; j < k; j++) {
				msg[key].push(formatMessage(item[j]))
			}
		} 
	}
	return msg
}
