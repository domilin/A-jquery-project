/**
 * Author：zhoushuanglong
 * Time：2017/7/7
 * Description：Description
 */

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)return unescape(r[2]);
    return null;
}


function isPc() {
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}


function videoPlay(ele) {
    var $popmask = $('div.popmask'),
        $videoWrap = $('div.video-wrap'),
        $close = $('a.close-video'),
        $videoCon = $videoWrap.children('video');

    var $bgMusic = $('#bgMusic'),
        $playMusic = $('#playMusic');
    $(document).on('click', ele, function () {
        var src = $(this).attr('data-src');

        $videoCon.attr('src', src);
        $popmask.show();
        $videoWrap.show();

        $videoCon[0].play();
        $bgMusic[0].pause();
    });

    $close.off('click');
    $(document).on('click', 'a.close-video', function () {
        $popmask.hide();
        $videoWrap.hide();
        $videoCon[0].pause();

        if ($playMusic.hasClass('active')) {
            $bgMusic[0].play();
        }
    });
}

function downloadGame() {
    var $shadow = $('#shadow');
    $shadow.off('click');
    $shadow.click(function () {
        $(this).css('display', 'none');
    });

    $('#downloadBtn').click(function () {
        var $this = $(this);
        var useragent = window.navigator.userAgent.toLowerCase();
        if (useragent.indexOf('micromessenger') > 0) {
            $shadow.show();
        } else {
            var u = window.navigator.userAgent.toLowerCase();
            if (u.indexOf('iphone') > 0 || u.indexOf("ipad") > 0) {
                window.location.href = $this.data('ios');
            } else if (u.indexOf('android') > 0) {
                window.location.href = $this.data('android');
            }
        }
        return false;
    });
}