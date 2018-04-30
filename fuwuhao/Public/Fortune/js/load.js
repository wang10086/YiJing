//加载动画
function showResultPage(){
  $("#Pro_box").addClass('hidden');
  $("#Pro_conter").addClass('hidden');
  $("#MyZocontent").removeClass('hidden');
}
window.onload = function progressBar(){
  //初始化js进度条
  $(".Pro_prog").css("width","0px");
    //进度条的速度，越小越快
  var speed = 30;
  bar = setInterval(function(){
  nowWidth = parseInt($(".Pro_prog").width());
     //宽度要不能大于进度条的总宽度
  if(nowWidth<=213){
    $('.Pro_digital').html(Math.round(nowWidth / 2.14) + "<i>%</i>");
      barWidth = (nowWidth + 1)+"px";
      $(".Pro_prog").css("width",barWidth);
     }else{
    $(".Pro_picon1").removeClass("Rotation");
    showResultPage();
      //进度条读满后，停止
      clearInterval(bar);

     } 
  },speed);
  
}
