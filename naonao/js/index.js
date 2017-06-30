/**
 * Author: liushaozong
 * Date: 2017/5/23
 * Time: 14:58
 * Description:Description
 */

$(function () {

    var imgUrl = 'http://img.linekong.com';

    //音乐播放
    wx.config({
        debug: false,
        appId: '',
        timestamp: 1,
        nonceStr: '',
        signature: '',
        jsApiList: []
    });
    wx.ready(function () {
        document.getElementById('bgMusic').play();
    });
    //音乐点击播放
    var $pm = $('#playMusic'),
        $bm = $('#bgMusic');
    $pm.tap(function () {
        var $this = $(this);
        if ($this.hasClass('active')) {
            $bm[0].pause();
            $this.removeClass('active');
        } else {
            $bm[0].play();
            $this.addClass('active');
        }
    });


    //下载
    var iosUrl = '',
        andUrl = '';
    $.ajax({
        type: 'GET',
        url: '/api_download',
        success: function (data) {
            var url = JSON.parse(data).data;
            iosUrl = url[0].url;
            andUrl = url[1].url;
            downloadGame();
        }
    });

    function downloadGame() {
        var $shadow = $('#shadow');
        $shadow.off('tap');
        $shadow.tap(function () {
            $(this).css('display', 'none');
        });

        $('#downloadBtn').tap(function () {
            var useragent = window.navigator.userAgent.toLowerCase();
            if (useragent.indexOf('micromessenger') > 0) {
                $shadow.show();
            } else {
                var u = window.navigator.userAgent.toLowerCase();
                if (u.indexOf('iphone') > 0 || u.indexOf("iPad") > 0) {
                    window.location.href = iosUrl;
                } else if (u.indexOf('android') > 0) {
                    window.location.href = andUrl;
                }
            }
            return false;
        });
    }


    //视频播放
    $.ajax({
        type: 'GET',
        url: '/api_video',
        success: function (data) {
            var $videoSwiper = $('#videoSwiper');

            var video = JSON.parse(data).data;
            var str = '';
            $.each(video, function (i, d) {
                str += '<div class="swiper-slide"><img src="' + d.icon + '"><a class="video-play-btn" id="videoPlay' + i + '" data-src="' + imgUrl + d.url + '"></a></div>'
            });
            $videoSwiper.html(str);

            $videoSwiper.find('a').each(function (i, d) {
                videoPlay('#videoPlay' + i);
            });

            new Swiper('.video', {
                nextButton: '.videobtn.swiper-button-next',
                prevButton: '.videobtn.swiper-button-prev'
            });
        }
    });

    function videoPlay(ele) {
        var $popmask = $('div.popmask'),
            $videoWrap = $('div.video-wrap'),
            $close = $('a.close-video'),
            $videoCon = $videoWrap.children('video');

        $(document).on('tap', ele, function () {
            var src = $(this).attr('data-src');

            $videoCon.attr('src', src);
            $popmask.show();
            $videoWrap.show();

            $videoCon[0].play();
        });

        $close.off('tap');
        $(document).on('tap', 'a.close-video', function () {
            $popmask.hide();
            $videoWrap.hide();
        });
    }


    //英雄
    var heroArr = [];
    var $cardImg = $('#cardImg');
    $.ajax({
        type: 'GET',
        url: '/api_hero',
        success: function (data) {
            var $heroBtn = $('#heroBtn');
            var hero = JSON.parse(data).data;
            heroArr = hero;


            var str = '';
            $.each(hero, function (i, d) {
                if (i === 0) {
                    $cardImg.find('img').attr('src', imgUrl + d.filePath2);
                    $cardImg.attr('data-id', d.id);


                }
                str += '<a data-id="' + d.id + '" data-card="' + d.filePath2 + '"><img src="' + imgUrl + d.filePath + '"></a>'
            });
            $heroBtn.html(str);
        }
    });
    $(document).on('tap', '#heroBtn a', function () {
        $cardImg.find('img').attr('src', imgUrl + $(this).data('card'));
        $cardImg.attr('data-id', $(this).data('id'));
    });

    $cardImg.click(function () {
        window.location.href = '/naonao/detail.html?id=' + $(this).data('id');
    });


    //壁纸
    var $wallpaperContent = $('#wallpaperContent'),
        $wallpaperDownload = $('#wallpaperDownload').children('a');
    var wallpaperArr = [];
    $.ajax({
        type: 'GET',
        url: '/api_pic',
        success: function (data) {

            var video = JSON.parse(data).data;
            var str = '';
            $.each(video, function (i, d) {
                if (i === 0) {
                    $wallpaperDownload.eq(0).attr('href', imgUrl + d.filePath);
                    $wallpaperDownload.eq(1).attr('href', imgUrl + d.filePath2);
                    $wallpaperDownload.eq(2).attr('href', imgUrl + d.filePath3);
                }

                str += '<div class="swiper-slide"><img src="' + d.filePath4 + '"/></div>';
                wallpaperArr.push({
                    pageOne: d.filePath,
                    pageTwo: d.filePath2,
                    pageThree: d.filePath3
                })
            });
            $wallpaperContent.html(str);


            new Swiper('.wallpapercon', {
                effect: 'coverflow',
                grabCursor: true,
                centeredSlides: true,
                slidesPerView: 'auto',
                initialSlide: 1,
                coverflow: {
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true
                },
                nextButton: '.wallbtn.swiper-button-next',
                prevButton: '.wallbtn.swiper-button-prev',
                onSlideChangeEnd: function (swiper) {
                    var arrIndex = wallpaperArr[swiper.activeIndex];
                    $wallpaperDownload.eq(0).attr('href', imgUrl + arrIndex.pageOne);
                    $wallpaperDownload.eq(1).attr('href', imgUrl + arrIndex.pageTwo);
                    $wallpaperDownload.eq(2).attr('href', imgUrl + arrIndex.pageThree);
                }
            });
        }
    });

});