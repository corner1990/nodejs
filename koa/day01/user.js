/*
* 定义一个Schema
 */

let mongoose = require('./db.js'),
	Schema = mongoose.Schema;


let UserSchema = new Schema({
	username : { type: String }, //用户账号
    userpwd: {type: String}, //密码
    userage: {type: Number}, //年龄
    logindate : { type: Date}
})

module.exports = mongoose.model('User',UserSchema);