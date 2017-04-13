
var mongodb = require('./db');

function User(user){
	this.name = user.name;
	this.password = user.password;
	this.email = user.email;
}

module.exports = User;

//存储用户信息  

User.prototype.save = function(callback){
	//要存入数据库的用户文档  
	var user = {
		name : this.name,
		password : this. password,
		email : this.email
	}

	// 打开数据库  
	mongodb.open(function (err,db) {
		// 
		if(err){
			return callback(err); //错误返回信息
		}

		// 读取 users 集合  
		db.collection('users',function(err,collection){
			if(err){
				mongodb.close();
				return callback(err); //错误返回信息
			}

			console.log(collection.find().pretty());

			// 将数据插入 user 集合 
			collection.insert(user,{
				safe : true
			},function(err,user){
				mongodb.close();
				if(err){
					return callback(err); //错误返回信息
				}

				callback(null,user[0]);//成功！ err 为null 并返回存储后用户文档
			})
		})
	})

}

// 读取用户信息
User.get = function(name,callback){
	// 打开数据库  ‘’
	mongodb.open(function(err,db){
		if(err){
			return callback(err);// 错误 返回错误信息  
		}
		// 读取users 集合 
		db.collection('users',function(err,collection){
			console.log(collection,'collection')
			if(err){
				mongodb.close();
				return callback(err);//错误 返回错误信息 
			}

			// 查找用户名 (name键) 和值为name的一个文档
			collection.findOne({
				name: name
			},function(err,user){
				if(err){
					mongodb.close();
					return callback(err);// 错误 返回错误信息
				}

				callback(null,user);//成功 返回查询的用户信息
			});
		})
	})
}