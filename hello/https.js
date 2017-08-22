const https = require('https')
const fs = require('fs')

let options = {
	key: fs.readFileSync('ssh_key.pem'),
	cert: fs.readFileSync('ssh_cert.pem')
}

https
	.createServer(options, function (res) {
		res.writeHead(200)
		res.end('hello https')
	})
	.listen(8080)