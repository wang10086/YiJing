$(function () {
    //设置cookie
    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }
    //获取cookie
    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return "";
    }
    //清除cookie 
    function clearCookie(name) {
        setCookie(name, "", -1);
    }
    
    setCookie('vip_type','free');
    // console.log(getCookie('vip_type'));

    // function checkCookie() {
    //     var user = getCookie("username");
    //     if (user != "") {
    //         alert("Welcome again " + user);
    //     } else {
    //         user = prompt("Please enter your name:", "");
    //         if (user != "" && user != null) {
    //             setCookie("username", user, 365);
    //         }
    //     }
    // }
    // checkCookie();


    // 去点击延迟
    FastClick.attach(document.body);
    // 禁止微信调整字体大小
    if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
        handleFontSize();
    } else {
        if (document.addEventListener) {
            document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
        } else if (document.attachEvent) {
            document.attachEvent("WeixinJSBridgeReady", handleFontSize);
            document.attachEvent("onWeixinJSBridgeReady", handleFontSize);
        }
    }
    function handleFontSize() {
        // 设置网页字体为默认大小
        WeixinJSBridge.invoke('setFontSizeCallback', {
            'fontSize': 0
        });
        // 重写设置网页字体大小的事件
        WeixinJSBridge.on('menu:setfont', function () {
            WeixinJSBridge.invoke('setFontSizeCallback', {
                'fontSize': 0
            });
        });
    }
    // 轮播
    var item2Show = false, item3Show = false;//子选项卡是否显示标志
    document.querySelector('.mui-slider').addEventListener('slide', function (event) {
        if (event.detail.slideNumber === 1) {
            //切换到第二个选项卡
            //根据具体业务，动态获得第二个选项卡内容；
            // var content = ....
            //显示内容
            // document.getElementById("item2").innerHTML = content;
            $('.lunbo_two').addClass('red');
            $('.lunbo_one').removeClass('red');
            $('.seven').css({ display: 'none' });
            $('.thirty').css({ display: 'block' });
            $('button').html('立即购买');
            //改变标志位，下次直接显示
            // item2Show = true;
            clearCookie('vip_type');
            setCookie('vip_type','seven_yuan');
            // console.log(getCookie('vip_type'));
        } else {
            //切换到第三个选项卡
            //根据具体业务，动态获得第三个选项卡内容；
            // var content = ....
            //显示内容
            // console.log(22);
            // document.getElementById("item3").innerHTML = content;
            $('.lunbo_one').addClass('red');
            $('.lunbo_two').removeClass('red');
            $('.seven').css({ display: 'block' });
            $('.thirty').css({ display: 'none' });
            $('button').html('免费领取');
            //改变标志位，下次直接显示
            // item3Show = true;
            clearCookie('vip_type');
            setCookie('vip_type','free');
            // setCookie('vip_type','seven_yuan');
            // console.log(getCookie('vip_type'));
            
        }
    });

    // 免费或7元点击跳转不同链接
    $('.mobile-btn').click(function(){
        var vip_type =getCookie('vip_type');
        // console.log(vip_type);
        if(vip_type=='free'){
            console.log('免费');
        }else if(vip_type=='seven_yuan'){
            console.log('七元');
        }
        // return false;
    })



    // 遮罩
    $('button').click(function () {
        $('.backdrop').show();
        $('.mobile-login').show();
    })
    $('.backdrop').click(function (e) {
        e.preventDefault();
        $(this).hide();
        $('.mobile-login').hide();
        $('.mobile-input').val('');
        $('.mobile-code').val('');
        $mobileBtn.attr('disabled', true);
    })
    var $verificationDesc = $('.verification-desc'),
        $mobileInput = $('.mobile-input'),
        $mobileCode = $('.mobile-code'),
        $mobileBtn = $('.mobile-btn'),
        $close = $('.close-icon');
    //输入框事件处理
    $mobileInput.on('input', function () {
        $close.show();
        if ((/^1[34578]\d{9}$/.test($(this).val()))) {
            $verificationDesc.addClass('get-verification');
        } else {
            $verificationDesc.removeClass('get-verification');
            $mobileBtn.addClass('disabled-btn');
            $mobileBtn.attr('disabled', true);
        }
        if ($(this).val() == '') { $close.hide(60); }
    });
    //关闭按钮
    $close.click(function () {
        $mobileInput.val('');
        $verificationDesc.removeClass('get-verification');
        $mobileBtn.addClass('disabled-btn');
        $mobileBtn.attr('disabled', true);
        $(this).hide(60);
    });
    $mobileCode.on('input', function () {
        var $this = $(this);
        if ((/^\d{6}$/.test($this.val())) && (/^1[34578]\d{9}$/.test($mobileInput.val()))) {
            $mobileBtn.removeClass('disabled-btn');
            $mobileBtn.removeAttr('disabled');
        } else {
            $mobileBtn.addClass('disabled-btn');
            $mobileBtn.attr('disabled', true);
        }
    });
    $('body').on('click touchstart', '.get-verification', function (e) {
        e.preventDefault();
        var tel = $mobileInput.val().trim();
        var _this = $(this);
        $.post('/fuwuhao/index.php/Home/User/public_send_code', { 'mobile': tel }, function (res) {
            if (res.code > 0) {
                setTime(_this);
            } else {
                alert(res.msg);
            }
        }, 'json');

    });
    //60秒倒计时
    var countdown = 60;
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

    // 用户循环滚动
    //获得slider插件对象
    var gallery = mui('.mui-slider2');
    gallery.slider({
        interval: 500//自动轮播周期，若为0则不自动播放，默认为0；
    });

})