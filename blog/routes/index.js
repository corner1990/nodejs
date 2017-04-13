
var crypto = require('crypto');/*JavaScript库的加密标准。*/
var User = require('../models/user');
module.exports = function(app) {
	
	app.get('/', function (req, res) {
		res.render('index', { title: '主页' });
	});

	app.get('/reg', function (req, res) {
		res.render('reg', { title: '注册' });
	});

	app.post('/reg', function (req, res) {

		var name = req.body.name,
		password = req.body.password,
		password_re = req.body['password-repeat'];
		//检验用户两次输入的密码是否一致
		if(password != password_re){
			req.flash('error','两次输入的密码不一致');
			return res.redirect('/reg');//返回注册页
		}

		// 生成 md5 值
		var md5 = crypto.createHash('md5');
		password = md5.update(req.body.password).digest('hex');
		var newUser = new User({
			name : req.body.name,
			password : password,
			email : req.body.email
		});

	
		// 检查用户名是否已经存在  
		User.get(newUser.name,function(err,user){
			console.log(newUser.name,'newUser.name')
			if(user){
				req.flash('error','用户名已存在！');
				return res.redirect('/reg'); /* 返回注册页*/
			}

			// 如果不存在 则创建新用户
			// newUser.save(function(err,user){
			// 	if(err){
			// 		req.flash('error',err);
			// 		return res.redirect('/reg'); //注册失败 返回注册页面
			// 	}

			// 	req.session.user = user; //用户信息存入session 
			// 	req.flash('success','注册成功');
			// 	req.redirect('/'); //注册成功 返回主页
			// })
		})
	});
	app.get('/login', function (req, res) {
		res.render('login', { title: '登录' });
	});
	app.post('/login', function (req, res) {
	});
	app.get('/post', function (req, res) {
		res.render('post', { title: '发表' });
	});
	app.post('/post', function (req, res) {
	});
	app.get('/logout', function (req, res) {
	});
};