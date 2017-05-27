/**
 * Author: liushaozong
 * Date: 2017/5/23
 * Time: 14:58
 * Description:Description
 */

$(function () {
    lightImgWrap('#lightImgOne');
    lightImgWrap('#lightImgTwo');
    lightImgWrap('#lightImgThree');
    function lightImgWrap(ele) {
        var num = -1,
            numNext = 0;
        var $ele = $(ele).find('span');
        lightImg();
        setInterval(function () {
            lightImg();
        }, 2000);

        function lightImg() {
            if (numNext === $ele.length - 1) {
                num = numNext;
                numNext = 0;
            } else if (num === $ele.length - 1) {
                num = 0;
                numNext = 1;
            } else {
                num++;
                numNext++
            }

            $ele.css('z-index', 0);
            $ele.eq(num).css('z-index', 1).removeClass('active');
            $ele.eq(numNext).css('z-index', 2).show().addClass('active');
        }
    }


    videoPlay('#myVideo', '#videoMask');
    videoPlay('#myVideoOne', '#videoMaskOne');
    function videoPlay(ele, mask) {
        var $video = $(ele).get(0),
            $videoMask = $(mask);
        wx.config({
            debug: false,
            appId: '',
            timestamp: 1,
            nonceStr: '',
            signature: '',
            jsApiList: []
        });
        wx.ready(function () {
            $video.play();
        });
        $videoMask.click(function () {
            $video.play();
            $(this).hide();
        });
        $video.onended = function () {
            $videoMask.show();
        };
    }


    var swiper = new Swiper('.swiper-container.box', {
        direction: 'vertical',
        slidesPerView: 1,
        paginationClickable: true,
        spaceBetween: 0,
        mousewheelControl: true,
        onSlideChangeStart: function (swiper) {


            var num = swiper.activeIndex,
                $music = $('#music');
            if(num === 1 || num === 2 || num === 3){
                $music.get(0).play();
            }else{
                $music.get(0).pause();
            }

            if (swiper.activeIndex !== 0) {
                $('#myVideo').get(0).pause();
                $('#videoMask').show();
            }
            if (swiper.activeIndex !== 4) {
                $('#myVideoOne').get(0).pause();
                $('#videoMaskOne').show();
            }


            if (swiper.activeIndex == 1) {
                slidePage($('.lunbo'), '.lunbo');
                $('.pop').addClass('on')
            } else {
                clearInterval(timeId)
            }

            if (swiper.activeIndex == 2) {
                slidePage($('.lunbo2'), '.lunbo2');
                $('.pop2').addClass('on')
            } else {
                clearInterval(timeId)
            }

            if (swiper.activeIndex == 3) {
                slidePage($('.lunbo3'), '.lunbo3');
                $('.pop3').addClass('on')
            } else {
                clearInterval(timeId)
            }
        }
    });
    var swiperPage5 = new Swiper('.swiper-container.page5', {
        pagination: '.swiper-pagination.fiv',
        nextButton: '.button-next',
        prevButton: '.button-prev',
        loop: true
    });

    //获取屏幕高度
    var wapH = $(document).height();
    var p1Video = $('.video').height();
    var sloganbgH = $('.slogan-bg').height(wapH - p1Video);

    var timeId = null;

    function slidePage(aclass, sChass) {
        var oul = aclass;
        var oulHtml = oul.html();
        oul.html(oulHtml + oulHtml)
        var ali = $(sChass + ' ' + 'li');
        $(sChass + ' li:eq(0) img').load(function () {
            var aliWidth = $(sChass + ' li:eq(0) img').width();
            var aliSize = ali.length;
            var ulWidth = aliWidth * aliSize + 1;
            oul.width(ulWidth);
            oul.css('visibility', 'visible');
            var speed = -2;

            function trundle() {
                if (speed < 0) {
                    if (parseInt(oul.css('left')) <= -ulWidth / 2) {
                        oul.css('left', 0);
                    }
                    oul.css('left', '+=-2');
                }
            }

            timeId = setInterval(trundle, 40);
        })
    }
});