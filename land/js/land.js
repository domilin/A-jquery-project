//var httpUrl = 'http://192.168.84.1:5000';
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
        success: function (data) {console.log(data )
            var da = data.data;
            var slides = JSON.parse(da.img3);
            var slide = '';
            androidUrl = da.land_download_andurl;
            appleUrl = da.land_download_iosurl;
            $('.land-cont').children('img').attr('src', httpUrl + da.img1);

            for(var i=0;i<slides.length;i++){
                slide +='<div class="swiper-slide"><img src='+httpUrl+slides[i]+'></div>'
            };
            $('.swiper-wrapper').append(slide);

            var swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                effect: 'coverflow',
                grabCursor: true,
                centeredSlides: true,
                slidesPerView: 'auto',
                loop : true,
                observer: true,
                observeParents: true,
                coverflow: {
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows : true
                }
            });
        }
    });


    var $shadow = $('#shadow');
    $shadow.off('click');
    $shadow.click(function () {
        $(this).css('display', 'none');
    });
    $('.footer,.land-cont').on('click', function () {
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
    });



});

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}


