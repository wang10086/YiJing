
$("#try-btn").click(function(){
  $("#is_try").val(1);
});
$("#normal-buy-btn").click(function(){
  $("#is_try").val(0);
});

$("#yanli_y").click(function(){
   $("#yanli_y option[text='1972']").attr("selected", true);
});
function is_empty(data){
    if(typeof(data)=="undefined"){return true;}
    if(data===0){return false;}
    return (typeof(data)=="undefined" || data==null || data=='' || data=={}) ? true : false;
}
function is_not_empty(data){
    return !is_empty(data);
}
var ub_template  = function(divName,listData,templateName) {
  var this_part = $("#" + divName);
  templateName = is_empty(templateName) ? "#js-" + divName: templateName;
  var myTemplate = $.templates(templateName);
  myTemplate.link(this_part, {data:listData});
  // this_part.listview('refresh');
  return this_part;
}
var showModal = function(id){
	var div = $(id);
	div && div.modal({
	  keyboard: false
	});
}
var hideModal = function(id){
	var div = $(id);
	div && div.modal('hide');
}
function conveterParamsToJson(paramsAndValues) {  
    var jsonObj = {};  
  
    var param = paramsAndValues.split("&");  
    for ( var i = 0; param != null && i < param.length; i++) {  
        var para = param[i].split("=");  
        jsonObj[para[0]] = para[1];  
    }  
  
    return jsonObj;  
}
function queryParamByFormId(form) {  
    var formValues = $("#" + form).serialize();  
  
    //关于jquery的serialize方法转换空格为+号的解决方法  
    formValues = formValues.replace(/\+/g," ");   // g表示对整个字符串中符合条件的都进行替换  
    formValues = decodeURIComponent(formValues);   // g表示对整个字符串中符合条件的都进行替换  
    var temp = JSON.stringify(conveterParamsToJson(formValues));  
    var queryParam = JSON.parse(temp);  
    return queryParam;  
} 

	$("#open-tree-btn-2").click(
		function(){
			loadingLightPageData(gift_status_url, showGiftPage);
			var div = $("#open-gift-modal-1");
			div.modal('hide');
			joinOpenGift(join_url);
		}
	);

	$(document).on("click", "#more-friend-list-btn", function(){
		var list = $("#friend-list-wrap");
		list.toggleClass('show-m');
	});
	

 $("#calendar-form").validate({
	errorElement : 'span',  
	errorClass : 'help-block',  
	focusInvalid : false,  
  rules: {
   lastName: "required",
   firstName: {
    required: true,
   },
   is_man: {
    required: true,
   },
   yanli_y: {
    required: true,
   },
   yanli_m: {
    required: true,
   },
   yanli_d: {
    required: true,
   }
  },
  messages: {
   lastName: "请输入姓",
   firstName: {
    required: "请输入名",
   },
   is_man: {
    required: "请选择性别"
   },
   yanli_y: {
    required: "请选择出生日期"
   },
   yanli_m: {
    required: "请选择出生日期"
   },
   yanli_d: {
    required: "请选择出生日期"
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
        var man = $("input[name='is_man']:checked").val();
        var lname = $("#lastName").val();
        var fname = $("#firstName").val();
        var yanli = $("#yanli_y").val() + "-" + $("#yanli_m").val() + "-" + $("#yanli_d").val();
        var money = $("#money").val();

        var html = "<div class='modal-buy-confirm'><p>姓名:<span>" + lname + fname + "</span></p>";
        html += "<p>性别:<span>" + (man == 1 ? "男":"女") + "</span></p>";
        html += "<p>阳历:<span>" + yanli + "</span></p>";
        html += "<p>价格:<span>" + money + "</span></p>";
		html += "<p><span style='font-weight:bold;'>非专业人士请慎入</span></p>";
        html += "</div>";

        // $.confirm(html, function() {
        //   //点击确认后的回调函数
        //   form.submit();
        // });
        $.modal({
          title: "购买确认",
          text: html,
          buttons: [
            { text: "取消", onClick: function(){}},
            { text: "确认", onClick: function(){ form.submit();}},
          ]
        });
	}
});

 	var postMyPrizeInfo = function(form){
 		var ligtUrl = post_my_prize_info_url;
 		var data = $(form).serialize();
 		my_ajax_post(ligtUrl,data, function(data){
 			hideModal("#get-gift-input-information");
			if(data.status>0){
				showGiftSuccessPage();
			}else {
				alert(data.msg);
			}
		});
 		
 	}

 	//下拉列表联动
 	var changeCate = function(area){
 		var data = "";
 		if(area=="北京"){
 			data = ["集团总部","工程研究总院","海外事业本部","营销管理本部","福田康明斯","奥铃发动机事业部","欧辉客车事业部北京工厂","金融服务事业部","智科物流","雷萨重机事业部北京工厂","北京多功能工厂","福田戴姆勒","欧马可事业本部","轻型商用车事业本部","拓陆者事业本部","采购事业本部","配件公司","福田产业投资"];
 		}
 		if(data){
 			var this_part = ub_template("userCate",data);
 		}
 	}
 	$('#goods_id').change(function(){
 		var p1=$(this).children('option:selected').attr("price");
 		$("#money").val(p1);
 	});



var submitUserInfo = function(form){
	var tel=$("#userPhone").val();
	if(!tel.match(/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/))
	{
		alert("请正确输入您的电话号码！");
		$("#userPhone").focus();
		return;
	}
	$.ajax({
		url:save_data_url,
		data:$(form).serialize(),
		type:"POST",
		dataType:"JSON",
		beforeSend: function()
		{
			$("#post-peo-info-btn").attr("disabled", "true");
		},
		success: function(data)
		{
			var status=data.status;
			$("#post-peo-info-btn").attr("disabled", false);
			if(status>0)
			{
				alert("保存成功");
				if(data.backurl) {
					window.location.href= data.backurl;
				}
			}
			else
			{
				//alert("系统错误！");
				alert(data.msg);
			}
		},
		complete: function(data){
			$("#post-peo-info-btn").attr("disabled", false);
		}

	});

	
}
