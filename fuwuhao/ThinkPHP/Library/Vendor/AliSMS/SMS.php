<?php
include "TopSdk.php";
date_default_timezone_set('Asia/Shanghai'); 
class SMS{
	public $c;
	public function __construct(){
		$this->c = new TopClient;
		$this->c->appkey ='23725686';
		$this->c->secretKey = '1abd44f4bc8218b4599a18f97885494a';
	}
	public function send_code($mobile,$code){
		$req = new AlibabaAliqinFcSmsNumSendRequest;
		//$req->setExtend("123456");
		$req->setSmsType("normal");
		$req->setSmsFreeSignName("我的黄历");
		$req->setSmsParam("{\"code\":\"$code\"}");
		$req->setRecNum("$mobile");
		$req->setSmsTemplateCode("SMS_58980091");
		$resp = $this->c->execute($req);
		if(isset($resp->code)){
			if($resp->code==15){
				$msg='同一号码一分钟内只能发送一次，请稍后再试';
				$code = -1;
			}else{
				$msg='服务异常，请联系客服！';
				$code = -2;
			}
		}else{
			$msg='OK';
			$code = 1;
		}
		return ['code'=>$code,'msg'=>$msg];

	}
	
	
	
	
	
}
?>