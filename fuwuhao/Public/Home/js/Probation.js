$(document).ready(function(){

  $("#divprice").load("getprice?id=21",function(responseText,textStatus){
    $("#summoney").val(responseText);
    $("#smoney0").val(responseText);
    });  
  

  $(".ipt_item .check_sp").click(function(){
    $(this).addClass("on").siblings(".check_sp").removeClass("on");
    $("#field_k").val($(this).attr("data-id"));
  });
  $(".btn").click(function(){
    firstname=$.trim($("#firstname").val());
    lastname=$.trim($("#lastname").val());
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
    if(!r_name.test($("#firstname").val())||!r_name.test($("#lastname").val()))
    {
     $(this).msg({msg:'请输入正确的姓名！'});
     return false;
    } 
    /*var uname=$("#lastname").val()+$("#firstname").val();
    location.href=$("#u_form").attr("action")+"?uname="+uname+"&field_k="+$("input[name='field_k']").val()+"&field_v="+$("input[name='field_v']").val();*/
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


///功能选择-复选框控制
$(document).on('click', ".ipt_ckm",function() {

  if($(this).val()=='√')
    {
      $(this).val('▆');
    }
  else
    {
      $(this).val('√');
    };

  var s=0;
  for(i=0;i<=$(".ipt_ckm").length-1;i++)
  {
      var tval=$(".ipt_ckm").eq(i).val()[0].replace("√","1").replace("▆","0")*1;
      var sval=$("input[name='smoney']").eq(i).val()*1;
      s+=tval*sval;
  }
  $("#summoney").val(s);
  
});


//历法-单选框控制 btnNew  chkPurchase_tim
$(document).on('click', "span[name='chkCalendar']",function() {

  $("#calendar").val($(this).attr("data-id"));
  
});


//购买时长-单选框控制
$(document).on('click', "span[name='chkPurchase_tim']", function() {

  $("#purchase_tim").val($(this).attr("data-id"));
  
  //$("#btnNew").attr("disabled","disabled"); 

  $("#divprice").load("getprice?id="+$(this).attr("data-gid"),
    function(responseText,textStatus){
    $("#summoney").val(responseText);
    $("#smoney0").val(responseText);    
    //$("#btnNew").attr("disabled",""); 
    //$("#display").append("<hr>textStatus:"+textStatus);
    });  
  
});


//将表单数据转换为json
function InputToJson () {
    var strJson="{";
    $("input").each(function(){
    strJson=strJson+'"'+$(this).attr('id')+'":"'+$(this).val()+'",';
  });
    strJson=strJson+"}";
    strJson=strJson.replace(",}","}");
    return strJson;
}

//Ajax Post提交表单
 function PostSubmit(){

    $("#birthday").val($("#bYear").val()+"-"+$("#bMonth").val()+"-"+$("#bDay").val());

    //获取表单数据Json
    var inputJson=InputToJson();

    //获取提交表单的的action url
    var acturl=$("form").eq(0).attr("action");

    $("#Loading").show();

    $.ajax({ 
            type: "post", 
            url: acturl, 
            async: true, 
            data: inputJson, 
            dataType: "text", 

            success: function(data) { 
                
                $("#Loading").hide();
                //$("#Loading").html(data);
                eval(data);//执行服务器端的脚本
                //alert($("#Loading").text()); 
                //window.location.href="service.html"+$("#Loading").text();//"http://www.baidu.com";//
                //$("#LoadIfr").attr("src",data).css("width","100%").css("height","400");
            }, 

            error: function(e) { 
                alert("错误："+e); 
                $("#Loading").hide();
            } 
    }); 
    
    }

 //btnNew新增购买
$(document).on('click', "#btnNew",function() {

  //ajax post 提交
  PostSubmit();
  
});

//btnProba试用一次
$(document).on('click', "#btnProba",function() {

  $("#summoney").val(0);
  //ajax post 提交
  PostSubmit();
  
});



