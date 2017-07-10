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

    $(document).on('click', ele, function () {
        var src = $(this).attr('data-src');

        $videoCon.attr('src', src);
        $popmask.show();
        $videoWrap.show();

        $videoCon[0].play();
    });

    $close.off('click');
    $(document).on('click', 'a.close-video', function () {
        $popmask.hide();
        $videoWrap.hide();
    });
}

if(!isPc()){
    window.location.href = 'http://nn.8864.com/mobile'
}