wx.config({
	debug:true,
    appId: '{suetech:$signPackage.appId}',
    timestamp: {$signPackage.timestamp},
    nonceStr: '{$signPackage.nonceStr}',
    signature: '{$signPackage.signature}',
   jsApiList: [
        'checkJsApi',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo'
      ]
  });
  
  
  wx.ready(function () {
  // 1 判断当前版本是否支持指定 JS 接口，支持批量判断
    wx.checkJsApi({
      jsApiList: [
        'getNetworkType',
        'previewImage',
         'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ'
      ],
      success: function (res) {
        alert(JSON.stringify(res));
      }
    });
  var shareData = {
     title: '标题',
      desc: '描述',
      link: window.location.href,
      imgUrl: 'http://wx.fuxiyi.com/fuwuhao/Public/Uploads/fuxitaihao.jpg',
      trigger: function (res) {
        alert('用户点击发送给朋友');
      },
      success: function (res) {
        alert('已分享');
      },
      cancel: function (res) {
        alert('已取消');
      },
      fail: function (res) {
        alert(JSON.stringify(res));
      }
  };
  wx.onMenuShareAppMessage(shareData);
  wx.onMenuShareTimeline(shareData);
  wx.onMenuShareQQ(shareData);
  //wx.onMenuShareWeibo(shareData);
});
wx.error(function (res) {
  alert(res.errMsg);
}); 


function removeHTMLTag(str) {
 str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
 str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
 //str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
 str=str.replace(/&nbsp;/ig,'');//去掉&nbsp;
 return str;
 }