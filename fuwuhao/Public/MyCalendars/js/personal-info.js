/**
 @ Name:			main.css
 @ Introduction:	我的方向
 @ Author：		    sun lei
 @ Time:			2017.03.16  14:10
 **/

$(function(){
    //模拟性别选择框
    function mnSex() {
        var $maskLayer = $('.mask-layer'),
            $escIcon = $('.esc-icon'),
            $sexSelect = $('.sex-select');
        $('#mn-sex').on('click',function() {
            $maskLayer.show();
            $sexSelect.show();
        });
        $escIcon.on('click',function(){
            $maskLayer.hide();
            $sexSelect.hide();
        });
        $sexSelect.find('.ui-col').on('click',function(){
            var $this = $(this),
                currSex = $this.data('sex');
            $('#mn-sex').find('.sex-name').text(currSex);
        });
    }
    mnSex();
});
