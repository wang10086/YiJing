<?php
namespace Home\Controller;

class AliPayConfig{
		public static $config = [//应用ID,您的APPID。
		'app_id' => "2017041106651977",

		//商户私钥，您的原始格式RSA私钥
		'merchant_private_key' => "MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCYDez7qKLbxzaKqDbbg+txaja0C4BlpV7hHvQQc4oJB0r7IISEIp+9fNiWIAaKo7k9mx/hDlSu8Sk/7uHBHHH+yP0xbONKsMQBHFUJzjY1JcYpoTaqRZJ7MFfS+vjlgLulQR7SYc6YphaFukhvLpC5mnpJxpg7Sha6WKz2uGIDIPPpCtW0sxrqmTgV3MPCaJ/f9G98vuWwISUDn8KRGfkgJwxcbzuKNVgKpnAMwckMMRjY0CFcvlkFpsYcLaDSLB/cWxLsl+CQPHvn3sRUPT/rz+K1NLFC8Q+zA8iWgDrhmuhSQshF0hrrIrv7Wt1Jn4SrwwOQz9YPYq0fdyUFEFPVAgMBAAECggEAPksOOHd46PMvTBToDHx6G4e5C3/exUW/nhjRQmAjP9mmBUXoJD4PFVEtZiuOooO6oxuHLutxFA6mqJOUF0oxBYGQAQyr/XB3jEDwMckyegmUqn9qZs2D2kYO5Nd+2n8n4ObR2rzJJ857UaPkgvAfyHoZ+VmMClYrA4LKsXUOalsWr5+CnKEQSVL6PPDc+cPfx2vP8bkf3lPxEEJbmAjFeUi0SKfqtY2EmCL0k9TPlBYrBIff8Bav9IIIcMeh/Su+zQVxADhl+etA/rT71qZwabLRXwEv7C6w5szpgciITH1C2WdSeY94vEU18aTaNNKqTCdDT7Rn6bzbvpOi4CxfgQKBgQDSu4R1dpM9fm/JDJeCZhIApKLBFnsmLLTlM4T8GFNlrP1mKQ1s6dQjLmsEmoqJ9IHaQksj9vkFoeWmzKUzmchhO3ItLDehqIbvxs+VsMdjEw04Z7FXQAIg2nOl60HNM30KLdXPfdp41ekDmVEePVmo4LmhGXweOy5H6Ui95F1S9QKBgQC4t52ZughJQekduWMP2Zk6Gk3Of4CrfGgz6Vu33sj7wpX/UbD4nQCR4Ce7qh1bBVxvBxQyud8RvZxKMzRNoiIWluB37swQPR6o7yURoxrfFgnVFk+PKhsis3ly/jciLu+jyG6mrZNS/BBKGtMVrLxASDucDBAq6aQenw98l6cxYQKBgQCOtl1jK1VV3O2Za4Sj07o3Y0exmib2WGp9mmFiVJsODZRifkTQUJ7Q4JurN3nBKaxTAnhet+A3V0fuqULr6iaQ6rBNNVfLjBUuBycICftN9lYKr/aizv9h/m85m1QpwsfYf+f/qAyvrrYqMMeFwiiZPO+Z0WeEFbInEy6nIyOsjQKBgGkGDRdwjHGKhg6eb1J9t/8vIXn9SJ03+M87KSjcBI4QTtSCEArqyX4nYq/ywwoTfECsV7GXuNsPYaNWhbB2NMd/NVU7cs7w0VPf1MW4ZPjeQOzk6ItPt2n9fVoCbDqFUT9gIHmoSxFtu51GrymtssMhzrKksTSU7vlyGo4Oc8NBAoGBAJ08cwLBKkCYHBEw+Lv4InnsD+aIC3C6aVjcMCxX2ea0NJ/RoT0S14ddwxNB5cOgKDTCFKTdY0W6ASWf85obvXRF6uO41GH4qm5khShw0d6vUHpl4IVmL0q1e9yI+y3CF206qsJhH1XkT3bGsfTpHDUt4wrZ9PXJ1BATK05JOfGd",
		
		//异步通知地址
		// 'notify_url' => "http://工程公网访问地址/alipay.trade.wap.pay-PHP-UTF-8/notify_url.php",
		'notify_url' => "http://wx.fuxiyi.com/fuwuhao/index.php/Home/Pay/pay_notify",
		
		//同步跳转
		//'return_url' => "http://mitsein.com/alipay.trade.wap.pay-PHP-UTF-8/return_url.php",

		//编码格式
		'charset' => "UTF-8",

		//签名方式
		'sign_type'=>"RSA2",

		//支付宝网关
		'gatewayUrl' => "https://openapi.alipay.com/gateway.do",

		//支付宝公钥,查看地址：https://openhome.alipay.com/platform/keyManage.htm 对应APPID下的支付宝公钥。
		'alipay_public_key' => "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAhuoWIMb7CzoCACkY4fCIXp/r5KwfdSB3XyPmtoAXW8wk9Pe7N1t8lbtoGL2yRSA0J3/IyXV/g4PxZ+m8uGujCqMhaoi7Ubh+sS2glnshecG+oDw6VOlewCDvmA0MTCG2yfPbLjS/+br4L8tNxgqywKFLnlsNlx7CtKJJyGZ8UL8bc+r/evnBQLXQ3RWhwXAyd52tfHVtuOM6sUtld08ERD1M27dWU0EQBqeJUqjwghc7fpEGSk0GVNcQfkhn08upE7Px6LQA7+c3AglCAW6ucw5D1jLOaLFNGpwZUKVQtpjv48XK38Qj+vzn7oOqnGR8yu3rLBN4ujT0Zh3H547QnQIDAQAB"];
}