var json = { 
	xml: { ToUserName: [ 'gh_d7db28f9bd3c' ],
    FromUserName: [ 'oCSlgv-6V8LIBM-9Qt6766q2BdXI' ],
    CreateTime: [ '1499475035' ],
    MsgType: [ 'event' ],
    Event: [ 'unsubscribe' ],
    EventKey: [ '' ] } 
 }

 function formMatMesg (json) {
 	var msg = {};


 	if (typeof json == 'object') {
 		var keys = Object.keys(json)
 		for (var i =0, len = keys.length; i < len; i++) {
 			var key = keys[i]
 			var item = json[key]
 			console.log((item instanceof Object ), 'instanceof Array')
 			if ((item[key] instanceof Object || item[key] instanceof Array)) {
 				console.log('item[key]1', item[key])
	 			msg[key] = formMatMesg(item[key])
	 		} else {
	 			console.log('item[key]2', item instanceof Array )
	 			msg[key] = (item || '')
	 		} 
 			
 		} 

 	} 

 	
 	return msg
 }

var mes = formMatMesg(json)

console.log(mes, 'mes')




