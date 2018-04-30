$(document).ready(function(){
	$(".ipt_item .check_sp").click(function(){
	  $(this).addClass("on").siblings(".check_sp").removeClass("on");
	  $("#field_k").val($(this).attr("data-id"));
	});
	$("#btn").click(function(){
		firstname=$.trim($("#ipt_firstname").val());
		lastname=$.trim($("#ipt_lastname").val());
		illegal_str=/[@#\$%\^&\*\}\{]+/g;
		en_str=/[a-zA-Z0-9]+/g;
		r_name=/[^u4e00-u9fa5]/;
		/*姓名验证*/
		if(!lastname)
		{
			$(this).msg({msg:'姓氏不能为空！'});
		    return false;
		}
		if(lastname.indexOf(' ')>=0)
		{
			$(this).msg({msg:'姓氏中不能包含空格！'});
		    return false;
		}
		if(res=illegal_str.exec(lastname))
		{
			$(this).msg({msg:'姓氏中含有非法字符'+res});
		    return false;
		}
		if(en_str.test(lastname))
		{
			$(this).msg({msg:'目前只支持中文姓氏！'});
		    return false;
		}
		if(lastname.length>16)
		{
			$(this).msg({msg:'姓氏最长为16个汉字！'});
		    return false;
		}
		if(!firstname)
		{
			$(this).msg({msg:'名字不能空！'});
		    return false;
		}
		if(firstname.indexOf(' ')>=0)
		{
			$(this).msg({msg:'名字中不能包含空格！'});
		    return false;
		}
		if(res=illegal_str.exec(firstname))
		{
			$(this).msg({msg:'名字中含有非法字符'+res});
		    return false;
		}
		if(en_str.test(firstname))
		{
			$(this).msg({msg:'目前只支持中文名字！'});
		    return false;
		}
		if(firstname.length>16)
		{
			$(this).msg({msg:'名字最长为16个汉字！'});
		    return false;
		}
		if(!r_name.test($("#ipt_firstname").val())||!r_name.test($("#ipt_lastname").val()))
		{
		 $(this).msg({msg:'请输入正确的姓名！'});
		 return false;
		}	
		var uname=$("#ipt_lastname").val()+$("#ipt_firstname").val();
		location.href=$("#u_form").attr("action")+"?uname="+uname+"&field_k="+$("input[name='field_k']").val()+"&field_v="+$("input[name='field_v']").val();
	});
});
 jQuery.fn.msg=function (par){
	 str='<div class="close_m mask"></div>';
	 str+='<div class="msg_wrap"><div class="msg_cont"><p>'+par.msg+'</p><div class="close_m ok_btn"><a  href="javascript:void(0);">OK</a></div></div></div>';
	 $("html,body").css({height:$(window).height()+"px",overflow:"hidden"});
				 $("body").append(str);
				 $(".close_m").bind("click",function(){
					 if(par.url)
					 location.href=par.url;
					 else
					 {
					$(".msg_wrap").detach();
					$(".mask").detach();
					$("html,body").css({height:"auto",overflow:""});
					 }
				});	
 }
