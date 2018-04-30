mui.init({
    swipeBack:true, //启用右滑关闭功能
    scrollY: true, //是否竖向滚动
    scrollX: false, //是否横向滚动
    startX: 0, //初始化时滚动至x
    startY: 0, //初始化时滚动至y
    indicators: true, //是否显示滚动条
    deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
    bounce: true, //是否启用回弹
    gestureConfig: {
        tap: true, //默认为true
        //doubletap: true, //默认为false
        longtap: true, //默认为false
        swipe: true, //默认为true
        drag: true, //默认为true
        hold: true, //默认为false，不监听
        release: true //默认为false，不监听
    }

});
mui('.mui-scroll-wrapper').scroll();
// 手机号码验证
jQuery.validator.addMethod("isMobile", function(value, element) {
    var length = value.length;
    var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
    return this.optional(element) || (length == 11 && mobile.test(value));
}, "请正确填写您的手机号码");

$("#Startup").click(function(event) {
  $("#fortuneType").val(2016);
});
$("#My_fortu_but").click(function(event) {
  $("#fortuneType").val(2017);
});

var submitAction = {};
 $("#search-form").validate({
  ignore: ["hidden"],
  errorElement : 'span',  
  errorClass : 'Personal_new_text',  
  focusInvalid : false,  
  rules: {
   lastName: "required",
   firstName: {
    required: true,
   },
   yanli: {
    required: true,
   }
  },
  messages: {
   lastName: "请输入姓",
   firstName: {
    required: "请输入名",
   },
   yanli: {
     require: "请选择出生日期"
   }
  },
  highlight : function(element) {  
      $(element).parent().addClass('has-error');  
  },  
  success : function(label) {  
      label.parent().removeClass('has-error');  
      label.remove();  
  },
  errorPlacement : function(error, element) {  
      element.parent().append(error);  
  }, 
  submitHandler: function(form) 
  {      
    //$(form).ajaxSubmit();
    //postMyPrizeInfo(form);

    //submitUserInfo("#peo-info-form");
       // form.submit();
        var form_obj = $("#search-form");
        var lname = form_obj.find("#lastName").val();
        var fname = form_obj.find("#firstName").val();
        var yanli = form_obj.find(".spBirthDate").text();
        var fortuneType = form_obj.find("#fortuneType").val();
        var rili = yanli.match(/\d+/g);
        var yanli_str = rili[0] + "-" + rili[1] + "-" + rili[2];
        form_obj.find("#yanli").val(yanli_str);
        
	
		if (Date.parse(new Date(rili[0]+'/'+rili[1]+'/'+rili[2])) > Date.parse(new Date())){
			 mui.alert('您的出生日期有误！');
			 return false;
		};
		
		var html = "<div class='modal-buy-confirm'>";
        html += "<p>姓氏:<span>" + lname + "</span></p>";
        html += "<p>名字:<span>" + fname + "</span></p>";
        html += "<p>出生日期:<span>" + yanli_str + "</span></p>";
		if (fortuneType!=2016){
				checkPayedCalendar();
			if (!cost){
			html += "<p>该服务价格:<span>¥9.8</span></p>";}
		}
        html += "</div>";
        // $.confirm(html, function() {
        //   //点击确认后的回调函数
        //   form.submit();
        // });
        var btnArray = ['取消', '确认'];
        mui.confirm(html, '运程信息确认', btnArray, function(e) {
          if (e.index == 0) {
          } else {
            // form.submit();
            submitAction = function(){form.submit();}
            if(fortuneType==2016){
              submitAction();
            }else{
				if (cost){
					showFree2017View && showFree2017View();
				}else{
					submitAction();
				}
              
            }
            
          }
        });
  }
});
 
$("#Myfort_mbut").click(function(event) {
  console.log("Myfort_mbut");
  submitAction && submitAction();
});
function checkPayedCalendar(){
  var form_obj = $("#search-form");
  var lname = form_obj.find("#lastName").val();
  var fname = form_obj.find("#firstName").val();
  if(check_pay_calendar_url){
    mui.ajax(check_pay_calendar_url,{
        data: {
          'first_name': fname,
          'last_name': lname,
        },
        dataType:'json',//服务器返回json格式数据
		async:false,
        type:'post',//HTTP请求类型
        timeout:30000,//超时时间设置为10秒；
        success:function(data){
            console.log(JSON.stringify(data));
			//alert(data.status)
			cost = data.status>0 ? true : false;
            /*if(data && data.status>0){
              showFree2017View && showFree2017View();
            }else {
              action && action();
            }
            */
        },
        error:function(xhr,type,errorThrown){
            //异常处理；
            console.log(type);
        }
    });
  }else {
    console.error("url is empty");
  }
}