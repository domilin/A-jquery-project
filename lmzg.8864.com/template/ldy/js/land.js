var httpUrl = 'http://lmzg.8864.com';

$(function () {


    //移动与PC端判断
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
        //移动端
    } else {
        //PC端
        $('div.pc-tips').show();
    }

    var appleUrl = '',
        androidUrl = '';

    ajaxGet(httpUrl + '/api_main', function (data) {
        androidUrl = data[3].url;
        appleUrl = data[1].url;
        $('a.android-btn').attr('href', androidUrl);
        $('a.apple-btn').attr('href', appleUrl);
        $('a.game-download-href').attr({
            'data-android': androidUrl,
            'data-apple': appleUrl
        });
    });


    judgeWeixin('#appleDownload', function ($this) {
        window.location.href = $this.attr('href');
    });
    judgeWeixin('#androidDownload', function ($this) {
        window.location.href = $this.attr('href');
    });
    judgeWeixin('#gameDownload', function ($this) {
        var u = window.navigator.userAgent.toLowerCase();
        if (u.indexOf('iphone') > 0 || u.indexOf("iPad") > 0) {
            window.location.href = $this.attr('data-apple');
        } else if (u.indexOf('android') > 0) {
            window.location.href = $this.attr('data-android');
        }
    });


    new Swiper('#roleTab', {
        pagination: '.swiper-pagination',
        paginationClickable: true
    });
    new Swiper('#imgTab', {
        pagination: '.swiper-pagination',
        paginationClickable: true
    });

})

//judgeWeixin
function judgeWeixin(ele, fn) {
    var $shadow = $('#shadow');
    $shadow.off('click');
    $shadow.click(function () {
        $(this).css('display', 'none');
    });

    $(ele).click(function () {
        var $this = $(this),
            useragent = window.navigator.userAgent.toLowerCase();
        if (useragent.indexOf('micromessenger') > 0) {
            $shadow.show();
        } else {
            fn.call(window, $this);
        }
        return false;
    });
}


//ajaxGet
function ajaxGet(url, fn) {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: url,
        success: function (data) {
            fn.call(window, data);
        }
    })
}
