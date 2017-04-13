var path = require('path');
var fs = require('fs');
fs.readFile(path.join(__dirname,'../models/user.js'),(err,data)=>{
	if(err){
		console.log(err)
		return 
	}
	console.log(data.toString(),'data')
})