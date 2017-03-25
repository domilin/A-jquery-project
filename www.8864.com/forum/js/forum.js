$(function () {

    headerPullDownList();
    blockFlostRightPosition();
    clickBackToTop();
    blockLoginPopup('#mineWord');
    blockLoginPopup('#userGroupCon');
    blockLoginPopup('#tipsMsg');

});


//头部搜索下拉列表
function headerPullDownList() {
    var $hpdl = $('#headerPullDownList'),
        $btn = $hpdl.find('a.pd-btn'),
        $con = $hpdl.find('div.pd-con'),
        $item = $hpdl.find('span.pd-item');

    $hpdl.click(function () {
        $con.toggle();
    });
    $item.click(function () {
        $btn.text($(this).text());
        $con.hide();
        return false;
    });
}

//右侧浮动块位置
function blockFlostRightPosition() {
    $('#blockFloatRight').css('right', (parseInt($(window).width()) - 1200) / 2 - (50 + 20))
}

//点击回到顶部
function clickBackToTop() {
    $('#backToTop').click(function () {
        $('body,html').animate({scrollTop: 0}, 1000);
        return false
    });
}

//登陆块弹出
function blockLoginPopup(ele) {
    var $ele = $(ele),
        $btn = $ele.find('.slide-button'),
        $con = $ele.find('.slide-down');
    $(ele).hover(function () {
        $con.css({
            'right':-15,
            'top': parseInt($ele.height()) - 1
        }).toggle();
    }, function () {
        $con.css({
            'right':-10000,
            'top': -10000
        }).hide();
    });
}