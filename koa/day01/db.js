var mongoose = require('mongoose'),
   uri = 'mongodb://localhost/blog';
	

/**
 * 连接
 */

mongoose.connect(uri);
var db = mongoose.connection;
/**
  * 连接成功
  */
db.on('connected', function () {    
    console.log('Mongoose connection open to ' +  uri);  
});    

/**
 * 连接异常
 */
db.on('error',function (err) {    
    console.log('Mongoose connection error: ' + err);  
});    
 
/**
 * 连接断开
 */
db.on('disconnected', function () {    
    console.log('Mongoose connection disconnected');  
}); 

module.exports = mongoose;  