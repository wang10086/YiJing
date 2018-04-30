/**
 @ Name:			main.css
 @ Introduction:	我的方向
 @ Author：		    sun lei
 @ Time:			2017.03.07  14:10
 **/

$(function(){
    var $verificationDesc = $('.verification-desc'),
        $mobileInput = $('.mobile-input'),
        $mobileCode = $('.mobile-code'),
        $mobileBtn = $('.mobile-btn'),
        $close = $('.close-icon');
    //输入框事件处理
    $mobileInput.on('input',function() {
        $close.show();
        if((/^1[34578]\d{9}$/.test($(this).val()))){
            $verificationDesc.addClass('get-verification');
        }else{
            $verificationDesc.removeClass('get-verification');
            $mobileBtn.addClass('disabled-btn');
            $mobileBtn.attr('disabled',true);
        }
        if($(this).val()==''){$close.hide(60);}
    });
    //关闭按钮
    $close.click(function() {
        $mobileInput.val('');
        $verificationDesc.removeClass('get-verification');
        $mobileBtn.addClass('disabled-btn');
        $mobileBtn.attr('disabled',true);
        $(this).hide(60);
    });
    $mobileCode.on('input',function() {
        var $this = $(this);
        if((/^\d{6}$/.test($this.val()))&&(/^1[34578]\d{9}$/.test($mobileInput.val()))){
            $mobileBtn.removeClass('disabled-btn');
            $mobileBtn.removeAttr('disabled');
        }else{
            $mobileBtn.addClass('disabled-btn');
            $mobileBtn.attr('disabled',true);
        }
    });
    $('body').on('click touchstart','.get-verification',function(e) {
		e.preventDefault();
		var tel = $mobileInput.val().trim();
		var _this=$(this);
		$.post('/fuwuhao/index.php/Home/User/public_send_code',{'mobile':tel,'check':1},function(res){
			if(res.code>0){
				setTime(_this);
			}else{
				alert(res.msg);
			}
		},'json');
        
    });
    //60秒倒计时
    var countdown=60;
    function setTime(obj) {
        if (countdown == 0) {
            obj.addClass('get-verification');
            obj.text("获取验证码");
            countdown = 60;
            return;
        } else {
            obj.removeClass('get-verification');
            obj.text("重新发送(" + countdown + ")");
            countdown--;
        }
        setTimeout(function () {
            setTime(obj)
        }, 1000)
    }

});
