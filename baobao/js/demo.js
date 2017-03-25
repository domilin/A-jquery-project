$(function () {
    /*$(document).on('swipeUp', function(){
     alert('a');
     })*/

    var $wrap = $('div.wrap');
    $(document).on('click', '#addBtn', function () {
        var num = parseInt($wrap.children('button').length) + 1,
            str = '<button><span>×</span>App' + num + '</button>';

        $(str).appendTo($wrap);

        var $this = $wrap.children('button').eq(num - 1);
        $this.longPress(function () {
            $(this).children('span').css('display', 'block');
        });
        $this.children('span').click(function () {
            $this.remove();
        });

    });


});


$.fn.longPress = function (fn) {
    var timeout = undefined;
    var $this = this;
    for (var i = 0; i < $this.length; i++) {
        $this[i].addEventListener('touchstart', function (event) {
            timeout = setTimeout(function () {
                fn.call($this);
            }, 800);  //长按时间超过800ms，则执行传入的方法
        }, false);
        $this[i].addEventListener('touchend', function (event) {
            clearTimeout(timeout);  //长按时间少于800ms，不会执行传入的方法
        }, false);
    }
}