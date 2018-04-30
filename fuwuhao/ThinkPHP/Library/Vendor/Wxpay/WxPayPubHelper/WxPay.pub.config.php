<?php
class WxPayConf_pub
{		//伏羲太昊
	 // const APPID = 'wx46580160142505b3';
	// const MCHID = '1232522002';
	// const KEY = 'beijingfuxitaihaowenhuafazhan201';
	// const APPSECRET = '9fc5cd178e79e62e60dac634aa45d6a8'; 
	//研易科技
	const APPID = 'wx9691c903e2ae5d3f';
	const MCHID = '1462268702';
	const KEY = 'yanyikejiweixinzhifumiyao1234567';
	const APPSECRET = '2e80655c98bc4a62185d5ee0fecbb4fb';
	const JS_API_CALL_URL = 'http://wx.fuxiyi.com/fuwuhao/index.php/Home/Index/pay_for_service?showwxpaytitle=1';
	const SSLCERT_PATH = 'C:\wamp\www\fuwuhao\ThinkPHP\Library/Vendor/Wxpay/WxPayPubHelper/cacert/apiclient_cert.pem';
	const SSLKEY_PATH = 'C:\wamp\www\fuwuhao\ThinkPHP\Library/Vendor/Wxpay/WxPayPubHelper/cacert/apiclient_key.pem';
	const NOTIFY_URL = 'http://wx.fuxiyi.com/fuwuhao/index.php/Home/Pay/pay_notify';
	const CURL_TIMEOUT = 30;
}
	
?>