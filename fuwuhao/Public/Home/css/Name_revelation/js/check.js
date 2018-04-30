

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




	
$(document).ready(function(){ 
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
   yanli: {
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
   yanli: {
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
	 
	  //postMyPrizeInfo(form);

	  //submitUserInfo("#peo-info-form");
       // $("#calendar-form").submit();
        var man = $("input[name='is_man']:checked").val();
        var lname = $("#lastName").val();
        var fname = $("#firstName").val();
        var yanli = $("#yanli").val();


        var html = "<div class='modal-buy-confirm'><p>姓名:<span>" + lname + fname + "</span></p>";
        html += "<p>性别:<span>" + (man == 1 ? "男":"女") + "</span></p>";
        html += "<p>阳历:<span>" + yanli + "</span></p></div>";
       $.modal({
          title: "确认",
          text: html,
          buttons: [
            { text: "取消", onClick: function(){}},
            { text: "确认", onClick: function(){ form.submit();}},
          ]
        }); 
	}
});

});

 	

 
