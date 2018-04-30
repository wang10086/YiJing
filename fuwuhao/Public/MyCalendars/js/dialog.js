/**
 * User: jeakeyliang
 * Date: 14-08-22
 * Time: 下午9:20
 */

!function($){

	// 默认模板
	var _dialogTpl='<div class="ui-dialog <%=className%>">'+
        '<div class="ui-dialog-cnt">'+
            '<div class="ui-dialog-bd">'+
                '<div>'+
                '<h4><%=title%></h4>'+
                '<div><%=content%></div></div>'+
            '</div>'+
            '<div class="ui-dialog-ft ui-btn-group">'+
            	'<% for (var i = 0; i < button.length; i++) { %>' +
				'<% if (i == select) { %>' +
				'<button type="button" data-role="button"  class="select" id="dialogButton<%=i%>"><%=button[i]%></button>' +
				'<% } else { %>' +
				'<button type="button" data-role="button" id="dialogButton<%=i%>"><%=button[i]%></div>' +
				'<% } %>' +
				'<% } %>' +
            '</div>'+
        '</div>'+
    '</div>';
	// 默认参数
	var defaults={
		title:'',
		content:'',
		className:'',
		button:['确认'],
		select:0,
		allowScroll:false,
		callback:function(){}
	}
	// 构造函数
	var Dialog  = function (el,option,isFromTpl) {

		this.option=$.extend(defaults,option);
		this.element=$(el);
		this._isFromTpl=isFromTpl;
		this.button=$(el).find('[data-role="button"]');
		this._bindEvent();
		this.toggle();
	}
	Dialog.prototype={
		_bindEvent:function(){
			var self=this;
			self.button.on("click",function(e){
				e.preventDefault();
				var index=$(self.button).index($(this));
				// self.option.callback("button",index);
				e=$.Event("dialog:action");
				e.index=index;
				self.element.trigger(e);
				self.hide.apply(self);
			});
		},
		toggle:function(){
			if(this.element.hasClass("show")){
				this.hide();
			}else{
				this.show();
			}
		},
		show:function(){
			var self=this;
			// self.option.callback("show");
			self.element.trigger($.Event("dialog:show"));
			self.element.addClass("show");
			this.option.allowScroll && self.element.on("touchmove" , _stopScroll);

		},
		hide :function () {
			var self=this;
			// self.option.callback("hide");
			self.element.trigger($.Event("dialog:hide"));
			self.element.off("touchmove" , _stopScroll);
			self.element.removeClass("show");

			self._isFromTpl&&self.element.remove();
		}
	}
	// 禁止冒泡
	function _stopScroll(){
		return false;
	}
	function Plugin(option) {

		return $.adaptObject(this, defaults, option,_dialogTpl,Dialog,"dialog");
	}
	$.fn.dialog=$.dialog= Plugin;
	$.alert=function(content,cb){
		$.dialog({
			content:content,
			button:['确定']
		}).on('dialog:action',function(){
			cb&&cb();
		});

	};

	$.confirm=function(content,confirm,cancel){
		var args = arguments;
		$.dialog({
			content:content,
			button:['取消','确定']
		}).on('dialog:action',function(e){
			var cb = args[2-e.index];
			cb&&cb();
		});
	};
	var toastContainer,toastTimer;
	$.toast=function(content,expire,callback){
		if(!toastContainer){
			toastContainer = $('<div class="toast-wrapper"></div>').appendTo('body');
		}
		toastContainer.empty();
		var defExpire=1500, toast = $('<div class="toast"><div class="cnt">'+content+'</div></div>').appendTo(toastContainer);
		toast.fadeIn(200);
		if($.isFunction(expire)){
			callback=expire;
			expire=defExpire;
		}
		expire||(expire=defExpire);
		clearInterval(toastTimer);
		toastTimer = setTimeout(function(){
			toast.fadeOut(function(){
				toast.remove();
				callback&&callback.call(toast);
				toast=null;
				if(toastContainer.children().length==0){
					toastContainer.remove();
					toastContainer=null;
				}
			});
		},expire);
		return toast;
	}

    //弹出提示框
    var tipLayer, tipBox;
    $.tips = function(title, content) {
        if(!tipLayer) {
            tipLayer = $('<div class="tip-layer"></div>').appendTo('body');
        }
		tipLayer.empty();
        if(!tipBox) {
            tipBox = $('<div class="tip-box"><div class="hd"><h4>' + (title || '提示') +'</h4><span class="close icon icon-del"></span></div><div class="cnt">' + content + '</div></div>').appendTo(tipLayer);
        }
		tipLayer.addClass('show');
		tipBox.on('click', '.close', function() {
			tipLayer.remove();
			tipLayer = null;
			tipBox = null;
		});
    }

}(window.jQuery)
	

