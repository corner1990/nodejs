
const express = require('express');

let  app = express();

app.get('/',(reg,res)=>{
	res.send('Hello World!');
})


let  server = app.listen(8081,()=>{
	console.dir(server)
})