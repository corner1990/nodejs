const Promise = require('bluebird')
var request = Promise.promisify(require('request'))
var fs = require('fs')
var path = require('path')
var wechat_file = path.join(__dirname, './access_token.txt')
var prefix = 'https://api.weixin.qq.com/cgi-bin/'

// https://api.weixin.qq.com/cgi-bin/material/add_news?access_token=ACCESS_TOKEN
var api = {
	access_token: prefix+'token?grant_type=client_credential',
	linshi: {
		set: prefix + 'media/upload?',
		get: prefix + '/media/get?'
	},
	material:{
		material: prefix + 'material/add_material?',
		news: prefix + 'media/add_news?',
		pic: prefix + 'media/uploadimg?',
	}
}

function Wechat (opts) {
	var that = this;
	this.appId = opts.appID
	this.appSecret = opts.appSecret
	this.getAccessToken = opts.getAccessToken()
	this.setAccessToken = opts.setAccessToken
	
	if(!this.isValidAccessToken(this.getAccessToken)){console.log('过期 重新获取')
		this.updataAccessToken()
		.then(function(result){
			that.saveAccessToken(result)
		},function(err){
			console.log('err', err)
		})
	}
	console.log(!this.isValidAccessToken(this.getAccessToken), 'isValidAccessTokens')
	
}

Wechat.prototype = {
	// 检查合法性
	isValidAccessToken: (data) => {
		if (!data || !data.access_token || !data.expires_in) {return false }
		var access_token = data.access_token
		var expires_in = data.expires_in
		
		var now = new Date().getTime()
		
		if (expires_in < now) return false
		else return true
	},
	updataAccessToken: function () {

		var appId = this.appId;
		var appSecret = this.appSecret;
		var url = api.access_token + '&appid=' + appId +'&secret='+ appSecret

		return new Promise(function (resolve, reject){
			request({url:url,json: true})
			.then(function (response){
				resolve(response.body)
			})
		})

	},
	saveAccessToken: function (info) {
		let data = {}
			data.access_token = info.access_token
			let now = new Date().getTime()
			data.expires_in = now + (info.expires_in - 20) *1000
			this.setAccessToken(data)
			access_token = info.access_token
	},
	fetchAccessToken () {
		var that = this

		return new Promise((resolve, reject)=>{
			if (that.isValidAccessToken(that.getAccessToken)) {
				resolve(that)
			}else {
				that.updataAccessToken()
				.then(function(result){
					that.saveAccessToken(result)
					resolve(that)					
				},function(err){
					console.log('err', err)
				})
			}
		})
	},
	uploadSuCai (type, filepath) {
		var that = this
		var form = {
			media: fs.createReadStream(filepath)
		}
		var appId = this.Id;
		var appSecret = this.appSecret;
		

		return new Promise(function (resolve, reject) {
			var access_token = '';
			if (that.isValidAccessToken(that.getAccessToken)) {
				access_token = that.getAccessToken.access_token 
			}else {
				that.updataAccessToken()
				.then(function(result){
					that.saveAccessToken(result)
					
				},function(err){
					console.log('err', err)
				})
			}

			var url = api.linshi.set + '&access_token=' + access_token +'&type='+ type;
			request({method: 'POST', url: url, formData: form, json: true})
			.then(function(response){
				var _data = response.body
				
				if (_data)  resolve(_data)
				else reject(new Error('upload error'))
			})
		})
	},
	getLinshi (media_id) {
		var that = this

		var appId = this.Id;
		var appSecret = this.appSecret;

		return new Promise(function (resolve, reject) {
			var access_token = '';

			if (that.isValidAccessToken(that.getAccessToken)) {
				access_token = that.getAccessToken.access_token 
			}else {
				that.updataAccessToken()
				.then(function(result){
					that.saveAccessToken(result)					
				},function(err){
					console.log('err', err)
				})
			}
			var url = api.linshi.get + '&access_token=' + access_token +'&media_id='+ media_id;
			console.log(url, 'linshis')
			request({method: 'get', url: url, json: true})
			.then(function(response){
				var _data = response.body
				
				if (_data)  resolve(_data)
				else reject(new Error('upload error'))
			})
		})
	},
	uploadMaterial (type, filepath) {
		var that = this;
	    var form = {};
	    var uploadUrl = '';
	    if(type == 'image') uploadUrl = api.material.pic;
	    if(type == 'other') uploadUrl = api.material.material;
	    if(type == 'news'){
	        uploadUrl = api.material.news;
	        form = material
	    }else {
	    	form.media = fs.createReadStream(filepath);
	    }
	    return new Promise(function(resolve,reject){
	    	var access_token = '';

			if (that.isValidAccessToken(that.getAccessToken)) {
				access_token = that.getAccessToken.access_token 
			}else {
				that.updataAccessToken()
				.then(function(result){
					access_token = result.access_token
					that.saveAccessToken(result)					
				},function(err){
					console.log('err', err)
				})
			}

            var url = uploadUrl + 'access_token=' + access_token;
            console.log(url,'url', uploadUrl, 'uploadUrl')
            var opts = {
                method:'POST',
                url:url,
                json:true
            };


            (type == 'news') ? (opts.body = form) : (opts.formData = form); //上传数据的方式不同
            console.log(opts, 'opts',api.material)
            request(opts).then(function(response){
                var _data = response.body;
                if(_data){
                    resolve(_data)
                }else{
                    throw new Error('upload permanent material failed!');
                }
            }).catch(function(err){
                reject(err);
            });
	    });

	}
}

module.exports = Wechat