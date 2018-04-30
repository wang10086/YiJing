
$("#try-btn").click(function(){
  $("#is_try").val(1);
});
$("#normal-buy-btn").click(function(){
  $("#is_try").val(0);
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

	

 $("#calendar-form").validate({
	errorElement : 'span',  
	errorClass : 'help-block',  
	focusInvalid : false,  
  rules: {
   lastName: "required",
   firstName: {
    required: true,
   },
   yanli: {
    required: true,
   },
   startTime: {
    required: true,
   }
  },
  messages: {
   lastName: "请输入姓",
   firstName: {
    required: "请输入名",
   },
   yanli: {
    required: "请选择出生日期"
   },
   startTime: {
    required: "请选择时间"
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
        form.submit();
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
