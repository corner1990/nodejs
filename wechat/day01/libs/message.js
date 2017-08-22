'use staict'
module.exports = function (msg, type) {
	var now = new Date().getTime()
	let xml = '';
	
		if (type == 'text') {
			xml =`<xml>
				 <ToUserName><![CDATA[${msg.FromUserName}]]></ToUserName>
				 <FromUserName><![CDATA[${msg.ToUserName}]]></FromUserName>
				 <CreateTime>${now}</CreateTime>
			 	<MsgType><![CDATA[text]]></MsgType>
				 <Content><![CDATA[${msg.Content}]]></Content>
				 <MsgId>${msg.MsgId}</MsgId></xml>`;
		} else if (type == 'image') {
			xml = `<xml>
					<ToUserName><![CDATA[${msg.FromUserName}]]></ToUserName>
					<FromUserName><![CDATA[${msg.ToUserName}]]></FromUserName>
					<CreateTime>${now}</CreateTime>
					<MsgType><![CDATA[image]]></MsgType>
					<Image>
					<MediaId><![CDATA[${msg.MediaId}]]></MediaId>
					</Image>
				</xml>`;
		} else if (type == 'voice') {
			xml = `<xml>
					<ToUserName><![CDATA[${msg.FromUserName}]]></ToUserName>
					<FromUserName><![CDATA[${msg.ToUserName}]]></FromUserName>
					<CreateTime>${now}</CreateTime>
					<MsgType><![CDATA[voice]]></MsgType>
					<Voice>
					<MediaId><![CDATA[${msg.MediaId}]]></MediaId>
					</Voice>
				</xml>`;
		} else if (type == 'video') {
			xml = `<xml>
					<ToUserName><![CDATA[${msg.FromUserName}]]></ToUserName>
					<FromUserName><![CDATA[${msg.ToUserName}]]></FromUserName>
					<CreateTime>${now}</CreateTime>
					<MsgType><![CDATA[video]]></MsgType>
					<Video>
					<MediaId><![CDATA[${msg.MediaId}]]></MediaId>
					</Video>  
				</xml>`;
		} else if (type == 'news') {
			var doc = msg.articles,
				len = doc.length;
			xml = `<xml>
					<ToUserName><![CDATA[${msg.FromUserName}]]></ToUserName>
					<FromUserName><![CDATA[${msg.ToUserName}]]></FromUserName>
					<CreateTime>${now}</CreateTime>
					<MsgType><![CDATA[news]]></MsgType>
					<ArticleCount>${len}</ArticleCount>
					<Articles>`;
			for (var i =0; i < len; i++) {
				xml += `<item>
				<Title><![CDATA[${doc[i].Title}]]></Title> 
				<Description><![CDATA[${doc[i].Description}]]></Description>
				<PicUrl><![CDATA[${doc[i].PicUrl}]]></PicUrl>
				<Url><![CDATA[${doc[i].Url}]]></Url>
				</item>
				<item>`
			}
			xml += `</Articles></xml>`;
		}
		
	return xml
}