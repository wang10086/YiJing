var share_num=0;
$(document).ready(function(){
  $(".ipt_item .check_sp").click(function(){
	  $(this).addClass("on").siblings(".check_sp").removeClass("on");
	  $("#ipt_gender").val($(this).attr("data-id"));
	});
	$(".btn").click(function(){
		/*姓名验证*/
		 r_name=/[^u4e00-u9fa5]/;
		if(!r_name.test($("#ipt_firstname").val())||!r_name.test($("#ipt_lastname").val()))
		{
		 $(this).msg({msg:'请输入正确的姓名！'});
		 return false;
		}
		/*年份验证*/
		r_year=/^\d{4}$/;
		if(!r_year.test($("#ipt_year").val())||parseInt($("#ipt_year").val())<1900||parseInt($("#ipt_year").val())>2015)
		{
		 $(this).msg({msg:'请输入正确的年份！'});
		 return false;
		}
		/*月份验证*/
		r_month=/^(0?[1-9]|1[0-2])$/;
		if(!r_month.test($("#ipt_month").val()))
		{
			$(this).msg({msg:'请输入正确的月份！'});
		    return false;
		}
		/*日期验证*/
		r_month=/^((0?[1-9])|((1|2)[0-9])|30|31)$/;
		if(!r_month.test($("#ipt_day").val()))
		{
			$(this).msg({msg:'请输入正确的日期！'});
		    return false;
		}
		$("#u_form").submit();
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