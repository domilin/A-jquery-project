var httpUrl = 'http://opm.8864.com';

$(function () {

    var appleUrl = '',
        androidUrl = '';
    $.ajax({
        type: 'GET',
        dataType: 'jsonp',
        url: httpUrl + '/api/website/getlandinfo',
        data: {
            id: getQueryString('id')
        },
        success: function (data) {
            var da = data.data;
            androidUrl = da.land_download_andurl;
            appleUrl = da.land_download_iosurl;

            $('#landImgOne').children('img').attr('src', httpUrl + da.img1);
            $('#landImgTwo').children('img').attr('src', httpUrl + da.img2);
        }
    });


    var $shadow = $('#shadow');
    $shadow.off('click');
    $shadow.click(function () {
        $(this).css('display', 'none');
    });
    $(document).on('click', 'html', function () {
        var u = window.navigator.userAgent.toLowerCase();
        if (u.indexOf('micromessenger') > 0) {
            $shadow.show();
        } else {
            if (u.indexOf('iphone') > 0 || u.indexOf("iPad") > 0) {
                window.location.href = appleUrl;
            } else if (u.indexOf('android') > 0) {
                window.location.href = androidUrl;
            }
        }
    })
});

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}