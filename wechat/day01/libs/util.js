'use strict'
let fs = require('fs')

exports.readFileSync = function(fPath, encoding){
		console.log('getAccessToken')
		let data = fs.readFileSync(fPath, encoding)
		if (data != '') {
			data = JSON.parse(data.toString())
			return data
		}
		return ''
		
}

exports.writeFileSync = function(fPath, content){
	console.log('setAccessToken')
	fs.writeFileSync(fPath, content, (error, content) => {
		if (err) return err
		return content
	})
}

