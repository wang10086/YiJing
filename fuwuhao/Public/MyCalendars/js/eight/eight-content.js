$(function () {
	var fxbg = document.querySelector('#fxbg');
	var fx = document.querySelector('.fx');
	// fx.onclick = function () {
	//     fxbg.style.display = 'block';
	// }
	// fxbg.onclick = function () {
	//     this.style.display = 'none';
	// }

	//用户名点击效果
	var userNameList = document.querySelector('.name_list');
	var nameShadow = document.querySelector('.name_shadow');
	var nameClick = document.querySelector('.clickname');
	var nameListUl = document.querySelector('.name_list_lis');
	var isClick = false;

	var span = document.createElement('span');
	var a = document.createElement('a');
	nameShadow.addEventListener('touchmove', function (e) {
		e.preventDefault();
	});
	nameListUl.addEventListener('touchmove', function (e) {
		e.preventDefault();
	});
	window.onload = function () {
		$.get('http://wx.fuxiyi.com/fuwuhao/index.php/Home/Api/getList?type=2', function (res) {
			var res = JSON.parse(res)
			var eight = res.eight;
			nameClick.onclick = function () {
				$.get('http://wx.fuxiyi.com/fuwuhao/index.php/Home/Api/getList', function (res) {
					var res = JSON.parse(res);
					console.log(res);
					var usermobile = res.mobile.replace(res.mobile.substring(3, 7), '****');
					$('.user_phone').html(usermobile);
				})
				var zhugeliang = sessionStorage.getItem('zhugeliang');
				if (zhugeliang) {
					console.log('asdasd')
					$('.user_viptype').css('display', 'none');
				} else {
					$('.user_viptype').css('display', 'block');
				}
				isClick = !isClick;
				$('.name_list_lis').html('');
				if (isClick) {
					userNameList.style.display = "block";
					nameShadow.style.display = 'block';
					nameShadow.onclick = function () {
						userNameList.style.display = "none";
						this.style.display = 'none';
						isClick = !isClick;
					}
				} else {
					userNameList.style.display = "none";
					nameShadow.style.display = 'none';
				}
				span.innerHTML = '';
				a.innerText = '';
				for (let i = 0; i < eight.length; i++) {

					var chunkModule = document.createElement('div');
					var eightTime = document.createElement('div');
					chunkModule.setAttribute('class', 'chunk-module');
					eightTime.setAttribute('class', 'eight-time');
					$(chunkModule).html(" <div class='ui-row-flex module-flex chunk_box'><div class='ui-col ui-col-2'><a href='http://wx.fuxiyi.com/fuwuhao/index.php/Home/Eight/insert?nid=" + eight[i].nid + "&date=" + eight[i].date + "'><p class='md-desc'><span>" + eight[i].name.substring(0, 1) + "</span><span>" + eight[i].name + "</span>&nbsp;&nbsp;&nbsp;</p></a></div><div class='ui-col txt-right'><a href='http://wx.fuxiyi.com/fuwuhao/index.php/Home/Eight/the-eight'><i class='remove-txt show'>再次购买</i> </a></div>");
					$(eightTime).html("<div class='birth'><p><span></span>八一下日期：" + eight[i].date.substring(0, 4) + "年" + eight[i].date.substring(4, 6) + "月" + eight[i].date.substring(6, 8) + "日" + "</p></div><em></em>");
					$('.name_list_lis').append(chunkModule);
					$('.name_list_lis').append(eightTime);
				}
			}

		})
	}
})