function goToUrl(url){
    if(url){
        window.location.href = url;
    }
}

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
var my_ajax_post = function(action_url, data, callback){
    showLoading();
    $.ajax({
      url: action_url,
      type: 'POST',
      dataType: 'JSON',
      timeout : 20000,
      data: data || {}
    })
    .done(function(data) {
      console.log("success");
      console.log(data);
      callback(data);
    })
    .fail(function(data) {
      console.log("error");
      closeDloading();
      alert('请求错误!');
    })
    .always(function() {
      console.log("complete");
      closeDloading();
    });
  }

var showLoading = function(){
  $.showLoading();
}
var closeDloading = function(){
  $.hideLoading();
}

 $("#post-form").validate({
  errorElement : 'span',  
  errorClass : 'help-block',  
  focusInvalid : false,  
  rules: {
   lastName: "required",
   firstName: {
    required: true,
   },
   f_lastName: {
    required: true,
   },
   f_firstName: {
    required: true,
   }
  },
  messages: {
   lastName: "请输入姓",
   firstName: {
    required: "请输入名",
   },
   f_lastName: {
    required: "请输入姓"
   },
   f_firstName: {
    required: "请输入名"
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

 $("#marry-month-list .month-part").click(function() {
        var muid = $("#muid").val();
        if(is_empty(muid)){
          alert('无效用户id');
          return;
        }
        var date = $(this).attr('dt');
        var month_type = $(this).attr('type');
        if(is_empty(month_type)){
          alert('类型错误');
          return;
        }
        //免费或已付费
        if(true){
          $("#date").val(date);
          $("#month-form").submit();
          return;
        }
});
 $("#pay_money_btn").click(function() {
        var muid = $("#muid").val();
        if(is_empty(muid)){
          alert('无效用户id');
          return;
        }
        //alert(date);
        var money = $("#money").val();
        var html = "<div class='modal-buy-confirm'><p>女:<span>" + muser_info['uname'] + ":" + muser_info['yanli'] + "</span></p>";
        html += "<p>男:<span>" +  muser_info['f_uname'] + ":" + muser_info['f_yanli'] + "</span></p>";
        html += "<p>价格:<span>" + money + "</span></p>";
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
            { text: "确认", onClick: function(){ 
                    postMyPrizeInfo({muid:muid});
              }
            },
          ]
        });
});

 	var postMyPrizeInfo = function(data){
 		var ligtUrl = post_my_marry_info_url;
 		my_ajax_post(ligtUrl,data, function(data){
			if(data.status>0){
				goToUrl(data.url);
			}else {
				alert(data.msg);
			}
		});
 		
 	}
