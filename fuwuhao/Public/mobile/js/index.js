$(function () {
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

    // 眨眼
    function zhayan() {
        setInterval(function () {
            $('.eye').css({ animation: 'eye .2s ease backwards' });
            setTimeout(function () {
                $('.eye').css({ animation: 'none' });
            }, 500)
        }, 2000)
    }
    zhayan();
    // 浮动
    function fly() {
        setInterval(function () {
            $('.body').css({ animation: 'fly 2s ease forwards' });
            $('.paizi').css({ animation: 'paizi 2s ease forwards' });
            $('.dizuoshang').css({ animation: 'fly 2s ease forwards' });
            setTimeout(function () {
                $('.body').css({ animation: 'none' });
                $('.paizi').css({ animation: 'none' });
                $('.dizuoshang').css({ animation: 'none' });
            }, 2100)
        }, 2200)

    }
    fly();
    // 语音合成
    // function tts(text){
    //     $('iframe').remove();
    //     var k ="<iframe height='0' width='0' class='speech_iframe' scrolling='no' frameborder='0' src='http://tts.baidu.com/text2audio?per=4&spd=4&pit=5&tex="+text+"&lan=zh&tok=24.8b22950c43ef8dcf6d8cf9b854abb749.2592000.1507707029.282335-9994738&ctp=1&cuid=9mzdA8hEfOQJdpIJ6ZWUyAWexAXYNnw92Qcn/5AzQCWHJrG5u30+Is9fMB+6PNzJn3e0xmKkUuzhZ71cWUXybkq4EScc' ></iframe>";
    //     $('body').append(k);
    // }
    var isclose = false;
    function ttsa(text){
        if(!isclose){
            $('audio').remove();
            var audio = document.createElement('audio');
            $(audio).attr('src','http://tts.baidu.com/text2audio?per=4&spd=4&pit=6&tex='+text+'&lan=zh&tok=24.8b22950c43ef8dcf6d8cf9b854abb749.2592000.1507707029.282335-9994738&ctp=1&cuid=9mzdA8hEfOQJdpIJ6ZWUyAWexAXYNnw92Qcn/5AzQCWHJrG5u30+Is9fMB+6PNzJn3e0xmKkUuzhZ71cWUXybkq4EScc');
            $('body').append(audio);
            audio.play();
        }
            return false;
    }
    // 关闭语音
    var $closeVoice = $('.voice');
    $closeVoice.click(function(){
        ttsa('星宝休息一下，再见');
        isclose = !isclose;
        if(isclose){
            $closeVoice.html('<img src="/fuwuhao/Public/mobile/img/close.png" alt="开">')
        }else{
            $closeVoice.html('<img src="/fuwuhao/Public/mobile/img/voice_03.png" alt="关">')
        }
    })
    // 询问是否开启语音效果
    function text() {
        $(".lineOne").css({ width: 0 });
        $(".lineTwo").css({ width: 0 });
        $('.interact').stop().animate({ opacity: 1 }, 1500);
        $(".lineOne").stop().animate({ width: '100%' }, 1500, 'linear');
        setTimeout(function () {
            $('.lineTwo').stop().animate({ width: '100%' }, 1500, 'linear');
        }, 1500);
        setTimeout(function () {
            $('.lineThree').stop().animate({ width: '100%' }, 1500, 'linear');
        }, 3000);
        setTimeout(function () {
            $('.warning').css({ display: 'block' });
        }, 3800)
    }
    text();

    $('.btn_no').click(function () {
        $('.ask').css({ display: 'none' });
        $('.closed').css({ display: 'block' }).stop().animate({ opacity: '1' }, 500);
        text();
        ttsa('星宝休息一下，再见');
        isclose = true;
        $closeVoice.html('<img src="/fuwuhao/Public/mobile/img/close.png" alt="开">')
    })

    $('.btn_konw').click(function () {
        $('.closed').css({ display: 'none' });
        $('.type').css({ display: 'block' }).stop().animate({ opacity: '1' }, 500);
        var textTwo = '您好，请选择推荐类型：类型一：最佳幸运号码（包含异地号码）,幸运指数、五颗星。类型二：最佳本地幸运号码，幸运指数、四颗星';
        ttsa(textTwo);
        
    })

    $('.btn_yes').click(function () {
        $('.ask').css({ display: 'none' });
        $('.closed').css({ display: 'block' }).stop().animate({ opacity: '1' }, 500);
        $('.isClosed').html('开启');
        $('.isOpen').html('关闭');
        text();
        var textOne =$('.voice_one').text().trim();
        ttsa(textOne);
    })
    var clearTime2,clearTime1,clearTime0;
    $('.btn_type_one').click(function () {
        var textThree = '请稍后，星宝正在为您分析最佳号码......'
        ttsa(textThree);
        $('.type').css({ display: 'none' });
        $('.number_animate').css({ display: 'block' }).stop().animate({ opacity: 1 })
        clearTime0 = setTimeout(function () {
            $('.number_animate').css({ display: 'none' });
            showTel('.page_one li');
        }, 3200)

        $('.tips_Two').css({ display: 'block' }).animate({ opacity: 1 }, 500);
        clearTime1 = setTimeout(function () {
            if ($('.page_yindao').css('opacity') > 0.5) {
                // $('.tips_One').css({ display: 'block' }).animate({ opacity: 1 }, 500);
                $('.tips_Three').css({ display: 'block' }).animate({ opacity: 1 }, 500);
                $('.tips_Two').css({ display: 'none' });
                var textFour = '为您推荐以下六个最佳幸运手机号码，您可以从中选择您喜欢的号码！';
                ttsa(textFour);
            }
        }, 5000)
        clearTime2 = setTimeout(function(){
            var textFive = '星宝提示：一下号码中”*“代表任意数字';
            ttsa(textFive);
            $('.tips_One').css({ display: 'block' }).animate({ opacity: 1 }, 500);
            $('.tips_Three').css({ display: 'none' });
        },15000)
        
    })
    $('.btn_type_two').click(function () {
        var textThree = '请稍后，星宝正在为您分析最佳号码......'
        ttsa(textThree);
        $('.type').css({ display: 'none' });
        $('.number_animate').css({ display: 'block' }).stop().animate({ opacity: 1 })
        clearTime0 = setTimeout(function () {
            $('.number_animate').css({ display: 'none' });
            showTel('.page_one li');
        }, 3200)
        $('.tips_Two').css({ display: 'block' }).animate({ opacity: 1 }, 500);
        clearTime1 = setTimeout(function () {
            if ($('.page_yindao').css('opacity') > 0.5) {
                // $('.tips_One').css({ display: 'block' }).animate({ opacity: 1 }, 500);
                $('.tips_Three').css({ display: 'block' }).animate({ opacity: 1 }, 500);
                $('.tips_Two').css({ display: 'none' });
                var textFour = '为您推荐以下六个最佳幸运手机号码，您可以从中选择您喜欢的号码！';
                ttsa(textFour);
            }
        }, 5000)
        clearTime2 = setTimeout(function(){
            var textFive = '星宝提示：一下号码中”*“代表任意数字';
            ttsa(textFive);
            $('.tips_One').css({ display: 'block' }).animate({ opacity: 1 }, 500);
            $('.tips_Three').css({ display: 'none' });
        },15000)
        
    })

    // 号码显示
    function showTel(e) {
        var top = 0;
        $(e).each(function (i, e) {
            $(this).stop().animate({ opacity: 1, top: top + 'rem' }, 1000);
            $('.page_yindao').css({ display: 'block' }).stop().animate({ opacity: 1 }, 2000);
            top += 1.9;
        })
    }

    // 号码切换
    var flag = true;
    function change() {
        if ($('.page_one').css('display') == 'block') {
            $('.page_one').stop().animate({ opacity: 0 }, 500).css({ display: 'none' });
            $('.page_one li').stop().animate({ opacity: 0 }, 500).css({ top: 4 + 'rem' });
            $('.page_two').css({ display: 'block' }).stop().animate({ opacity: 1 });
            showTel('.page_two li');
            flag = false;
        } else {
            $('.page_two').stop().animate({ opacity: 0 }, 500).css({ display: 'none' });
            $('.page_two li').stop().animate({ opacity: 0 }, 500).css({ top: 4 + 'rem' });
            $('.page_one').css({ display: 'block' }).stop().animate({ opacity: 1 });
            showTel('.page_one li');
            flag = true;
        }
    }

    $('.page_tab').on('click','.page_tab_left',function () {
        $(this).remove();
        $('.page_tab').html("<div class='page_yindao page_tab_right'><img src='/fuwuhao/Public/mobile/img/yindao_right.png'></div>");
        change();
        if (flag) {
            $('.point_one').css({ backgroundColor: '#fff' }).siblings().css({ backgroundColor: '#1349a1' })
        } else {
            $('.point_one').css({ backgroundColor: '#1349a1' }).siblings().css({ backgroundColor: '#fff' })
        }
        flag = !flag;
        $('.checked_left').css('display','block');
        $('.checked_right').css('display','none');
    })
    $('.page_tab').on('click','.page_tab_right',function () {
        console.log('object');
        $(this).remove();
        $('.page_tab').html("<div class='page_yindao page_tab_left'><img src='/fuwuhao/Public/mobile/img/yindao_left.png'></div>");
        change();
        if (flag) {
            $('.point_one').css({ backgroundColor: '#fff' }).siblings().css({ backgroundColor: '#1349a1' })
        } else {
            $('.point_one').css({ backgroundColor: '#1349a1' }).siblings().css({ backgroundColor: '#fff' })
        }
        flag = !flag;
        $('.checked_left').css('display','none');
        $('.checked_right').css('display','block');
    })

    // 号码类型ajax
    var $mobileList = $('.number_list li');
    $('.btn_type_one').click(function(){
        $.ajax({
            url:'http://wx.fuxiyi.com/fuwuhao/index.php/Home/mobile/get_best?type=1',
            success:function(res){
                var mobile_list = res.res;
                for( var i =0 ; i<3; i++){
                    var city = mobile_list[i].city;
                    var mobile_num = mobile_list[i].mobile;
                    var li = document.createElement('li');
                    // $(li).html("<span class='add'>"+city+"</span>");
                    var cityLength = city.length;
                    if(cityLength<=4){
                        $(li).html("<span class='add' style='line-height:1.33333333rem'>"+city+"</span>");
                    }else{
                        $(li).html("<span class='add' style='padding-top:0.26666667rem'>"+city+"</span>");
                    }
                    var span = document.createElement('span');
                    $(span).addClass('tel');
                    for( var l = 0 ;l<mobile_num.length; l++){
                        var _i =document.createElement('i');
                        $(_i).html(mobile_num[l]);
                        $(span).append(_i);
                    }
                    $(li).append(span);
                    $('.page_one').append(li);
                }
                setTimeout(function(){
                    $('.checked_right').css('display','block');
                },3200)
                
                for( var m =3 ; m<6; m++){
                    var city = mobile_list[m].city;
                    var mobile_num = mobile_list[m].mobile;
                    var li = document.createElement('li');
                    // $(li).html("<span class='add'>"+city+"</span>");
                    var cityLength = city.length;
                    if(cityLength<=4){
                        $(li).html("<span class='add' style='line-height:1.33333333rem'>"+city+"</span>");
                    }else{
                        $(li).html("<span class='add' style='padding-top:0.26666667rem'>"+city+"</span>");
                    }
                    var span = document.createElement('span');
                    $(span).addClass('tel');
                    for( var n = 0 ;n<mobile_num.length; n++){
                        var _i =document.createElement('i');
                        $(_i).html(mobile_num[n]);
                        $(span).append(_i);
                    }
                    $(li).append(span);
                    $('.page_two').append(li);
                }
                // 点击号码列表语音
                var numList_one = $('.page_one').children();
                var numList_two = $('.page_two').children();
                console.log(numList_one);
                $(numList_one).click(function(){
                    var numInfo = $(this).text();
                    numInfo = numInfo.split('').join(' ');
                    ttsa(numInfo);
                    clearTimeout(clearTime1);
                    clearTimeout(clearTime2);
                    $('.tips_One').css({ display: 'block' }).animate({ opacity: 1 }, 500);
                    $('.tips_Three').css({ display: 'none' });
                    $('.tips_Two').css({ display: 'none' });
                    var target = $(this).index()*1.6;
                    $('.checked_right_img').stop().animate({top: 0.8+target*1.2+'rem'},500)
                })
                $(numList_two).click(function(){
                    var numInfo = $(this).text();
                    numInfo = numInfo.split('').join(' ');
                    ttsa(numInfo);
                    clearTimeout(clearTime1);
                    clearTimeout(clearTime2);
                    $('.tips_One').css({ display: 'block' }).animate({ opacity: 1 }, 500);
                    $('.tips_Three').css({ display: 'none' });
                    $('.tips_Two').css({ display: 'none' });
                    var target = $(this).index()*1.6;
                    $('.checked_left_img').stop().animate({top: 0.8+target*1.2+'rem'},500)
                })
            }
        })
    })
    $('.btn_type_two').click(function(){
        $.ajax({
            url:'http://wx.fuxiyi.com/fuwuhao/index.php/Home/mobile/get_best?type=2',
            success:function(res){
                var mobile_list = res.res;
                for( var i =0 ; i<3; i++){
                    var city = mobile_list[i].city;
                    
                    var mobile_num = mobile_list[i].mobile;
                    var li = document.createElement('li');
                    var cityLength = city.length;
                    if(cityLength<=4){
                        $(li).html("<span class='add' style='line-height:1.33333333rem'>"+city+"</span>");
                    }else{
                        $(li).html("<span class='add' style='padding-top:0.26666667rem'>"+city+"</span>");
                    }
                    
                    var span = document.createElement('span');
                    $(span).addClass('tel');
                    for( var l = 0 ;l<mobile_num.length; l++){
                        var _i =document.createElement('i');
                        $(_i).html(mobile_num[l]);
                        $(span).append(_i);
                    }
                    $(li).append(span);
                    $('.page_one').append(li);
                }
                setTimeout(function(){
                    $('.checked_right').css('display','block');
                },3200)
                for( var m =3 ; m<6; m++){
                    var city = mobile_list[m].city;
                    // var city = '内蒙呼和浩特';
                    var mobile_num = mobile_list[m].mobile;
                    var li = document.createElement('li');
                    // $(li).html("<span class='add'>"+city+"</span>");
                    var cityLength = city.length;
                    if(cityLength<=4){
                        $(li).html("<span class='add' style='line-height:1.33333333rem'>"+city+"</span>");
                    }else{
                        $(li).html("<span class='add' style='padding-top:0.26666667rem'>"+city+"</span>");
                    }
                    var span = document.createElement('span');
                    $(span).addClass('tel');
                    for( var n = 0 ;n<mobile_num.length; n++){
                        var _i =document.createElement('i');
                        $(_i).html(mobile_num[n]);
                        $(span).append(_i);
                    }
                    $(li).append(span);
                    $('.page_two').append(li);
                }
                // 点击号码列表语音
                var numList_one = $('.page_one').children();
                var numList_two = $('.page_two').children();
                console.log(numList_one);
                $(numList_one).click(function(){
                    var numInfo = $(this).text();
                    numInfo = numInfo.split('').join(' ');
                    ttsa(numInfo);
                    clearTimeout(clearTime1);
                    clearTimeout(clearTime2);
                    $('.tips_One').css({ display: 'block' }).animate({ opacity: 1 }, 500);
                    $('.tips_Three').css({ display: 'none' });
                    $('.tips_Two').css({ display: 'none' });
                    var target = $(this).index()*1.6;
                    $('.checked_right_img').stop().animate({top: 0.8+target*1.2+'rem'},500)
                })
                $(numList_two).click(function(){
                    var numInfo = $(this).text();
                    numInfo = numInfo.split('').join(' ');
                    ttsa(numInfo);
                    clearTimeout(clearTime1);
                    clearTimeout(clearTime2);
                    $('.tips_One').css({ display: 'block' }).animate({ opacity: 1 }, 500);
                    $('.tips_Three').css({ display: 'none' });
                    $('.tips_Two').css({ display: 'none' });
                    var target = $(this).index()*1.6;
                    $('.checked_left_img').stop().animate({top: 0.8+target*1.2+'rem'},500)
                })
            }
        })
    })
    
    
        // 语音
    //     (function (a) {
    //         a.fn.speech = function (b) {
    //             var c = { speech: true, lang: "zh", speed: 3, sWidth: 16, sHeight: 13, https: true, bg: "./image/speech.png", content: "这是一段测试内容" };
    //             var b = a.extend(c, b);
    //             return this.each(function () {
    //                 var j = a(this), i = j.find(".speech_iframe"), d = b.https ? "https" : "http", f = j.text();
    //                 f = (!f || f === undefined || f === null) ? b.content : f;
    //                 var h = d + "://tts.baidu.com/text2audio?lan=" + b.lang + "&ie=UTF-8&text=" + f + "&spd=" + b.speed;
    //                 if (b.speech) {
    //                     var g = "<a href='javascript:void(0);' class='speech'></a>"; j.append(g); var e = j.find(".speech");
    //                     e.css({ width: b.sWidth, height: b.sHeight, display: "inline-block", background: "url(" + b.bg + ") no-repeat" });
    //                     e.on("click", function () {
    //                         i.length > 0 ? i.attr("src", h) : (function () {
    //                             var k = "<iframe height='0' width='0' class='speech_iframe' scrolling='no' frameborder='0' src='" + h + "' ></iframe>";
    //                             j.append(k);
    //                         })();
    //                     });
    //                 } else {
    //                     i.length > 0 ? i.attr("src", h) : (function () {
    //                         var k = "<iframe height='0' width='0' class='speech_iframe' scrolling='no' frameborder='0' src='" + h + "' ></iframe>";
    //                         j.append(k);
    //                     })();
    //                 }
    //             });
    //         };
    //     })(jQuery);


    // $('#Result').speech({
    //     "speech": true,
    //     "speed": 6,
    //     "bg": "../imgs/voice_03.png",
    //     'http': false,
    // });
})