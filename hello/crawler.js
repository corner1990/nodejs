const https = require('https')
const cheerio = require('cheerio')
let url = 'https://cnodejs.org/'

function fifterHtml (html) {
	var $ = cheerio.load(html)

	let info = []

	let htmlList = $('#topic_list .cell')


	//想要的数据格式
	// [
	// 	{
	// 		href:'',
	// 		title:'',
	// 		text:''
	// 	}
	// ]
	let contents = []
	let itemJson = {}
	htmlList.each(function (item, val) {
		let content = $(val)
		itemJson.text = content.find('.topic_title').text()
		itemJson.title = content.find('.topic_title').attr('title')
		itemJson.href = content.find('.topic_title').attr('href')
		contents.push(itemJson)
		itemJson = {}
	})
	console.log(contents)


}

https.get(url, function (res) {
	var html = ''

	res.on('data', function (data) {
		html += data
	})

	res.on('end', function () {
		fifterHtml(html)
		// console.log(html)
	})
})
.on('error', ()=>{
	console.log('获取数据出错')
})