$(function () {
    $(function () {
        FastClick.attach(document.body);//解决延迟
    });

    /*弹出 */
    jQuery.fn.slideLeftHide = function (speed, callback) { this.animate({ width: "hide", paddingLeft: "hide", paddingRight: "hide", marginLeft: "hide", marginRight: "hide" }, speed, callback); }
    jQuery.fn.slideLeftShow = function (speed, callback) { this.animate({ width: "show", paddingLeft: "show", paddingRight: "show", marginLeft: "show", marginRight: "show" }, speed, callback); }
    function hide_start() {
        $(".Layer_bg").hide();
    }
    // 用户列表弹出
    $(".nav_option").click(function () {
        $(".list_bg").fadeIn(300);
        $(".name_list").slideLeftShow(200);
        // $(".list_bg").show(300);
        // $(".name_list").show(300);

        $(".list_bg").click(function () {
            $(this).fadeOut(300);
            $(".name_list").slideLeftHide(200);
            // $(this).hide(300);
            // $(".name_list").hide(300);
        })
    })

    // 用户列表逻辑
    var isFull = $('.name_list_lis').find('li').length;
    if (isFull > 20) {
        let del = isFull - 20;
        for (let i = 0; i < del; i++) {
            $('.name_list_lis').find('li:eq(0)').remove();
        }
    }
    $('.name_list_lis').on('click', 'li', function () {
        console.log('点击跳转相应人的页面');
    })

    // 进度条
    var scor = $('.scor').text()/10;
    var scorgood = 100-scor;
    var step = 0;
    // console.log($('body').scrollTop());
    window.onscroll = function () {
        if ($('body').scrollTop() >= 242) {
            $('.yellow').animate({ width: scorgood + '%' }, 1000);
        }else if($('body').scrollTop() >= 230){
            $('header').css('border-bottom','1px solid #e5e5e5');
        }
    }

    // 波浪
    var bl = 0;
    var bolang = document.querySelector('.Pnumber');
    setInterval(function () {
        bl -= 2;
        bolang.style.backgroundPositionX = bl + "px";
    }, 50);

    // 电话号码
    var number = mobile + '';
    var lis = $('.numBox').children();

    var timer = setInterval(function () {
        var randomnum = [parseInt(Math.random() * 10), parseInt(Math.random() * 10), parseInt(Math.random() * 10), parseInt(Math.random() * 10), parseInt(Math.random() * 10), parseInt(Math.random() * 10), parseInt(Math.random() * 10), parseInt(Math.random() * 10), parseInt(Math.random() * 10), parseInt(Math.random() * 10), parseInt(Math.random() * 10)];
        for (var i = 0; i < number.length; i++) {
            lis[i].innerText = randomnum[i];
        }
    }, 100)
    setTimeout(function () {
        clearInterval(timer);
        for (var i = 0; i < number.length; i++) {
            lis[i].innerText = number[i];
        }
    }, 2000)

    // 指针
    var target = -180+180*scor/100;
    var begin = -180;
    var zhizhen =document.querySelector('.zhizhen');
    // var basescor = $('.scor').text();
    var timer2 = setInterval(function(){
        begin +=1;
        // basescor = basescor*1+1;
        // $('.scor').text(basescor);
        zhizhen.style.transform="rotate("+begin+"deg)";
        if(begin > target){
            clearInterval(timer2);
        }
    },15)
    var list_mobile = $('.user_phone').html();
    list_mobile = list_mobile.replace(list_mobile.substring(3,7),'****');
    $('.user_phone').html(list_mobile);

})