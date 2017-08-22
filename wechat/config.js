// const config = {
// 	appID: 'wxd7072e0dd9aeb550',
// 	appSecret: 'wxd7072e0dd9aeb550',
// 	Token:'corner1990'
// }
let path = require('path')
let util = require('./day01/libs/util')
let wechat_file = path.join(__dirname, 'day01/access_token.txt')
//测试微信公众号

const config = {
	wechat: {
		appID: 'wx855e3a182e1c8dab',
		appSecret: 'd03d1e2f57d46d983c95229ddb9df312',
		Token:'corner1990',
		getAccessToken: ()=>{
			console.log('get')
			return util.readFileSync(wechat_file);
		},
		setAccessToken: (data)=> {console.log('set')
			data = JSON.stringify(data)
			return util.writeFileSync(wechat_file, data);
		},
	}
}
module.exports = config