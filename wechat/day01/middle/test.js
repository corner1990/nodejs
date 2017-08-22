let path = require('path')
let fs = require('fs')
var filepath = path.join(__dirname, '../../1.png');
var data = fs.createReadStream(filepath)
console.log(data)

