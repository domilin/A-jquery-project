/**
 * Author: liushaozong
 * Date: 2017/5/23
 * Time: 14:58
 * Description:Description
 */


if (!isPc()) {
    window.location.href = 'http://nn.8864.com/mobile'
}

$(function () {
    var imgUrl = 'http://img.linekong.com';

    $('.qq-group').click(function () {
        $(this).find('.qq-pop').toggle();
        return false;
    });
    $('html').click(function () {
        $('.qq-pop').hide();
    });


    //音乐点击播放
    var $pm = $('#playMusic'),
        $bm = $('#bgMusic');
    $pm.on('click', function () {
        var $this = $(this);
        if ($this.hasClass('active')) {
            $this.removeClass('active');
            $bm[0].pause();
        } else {
            $this.addClass('active');
            $bm[0].play();
        }
    });

    $(document).on('click', '.video-play-btn', function () {
        $bm[0].pause();
    })

    //音频只播放一次
    var audio = document.getElementById("bgMusic");
    audio.loop = false;
    audio.addEventListener('ended', function () {
        $('.music a').removeClass('active');
    }, false);


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
            //$('.ios a').attr('href', iosUrl);
            //$('.and a').attr('href', andUrl);
        }
    });
    $.ajax({
        type: 'GET',
        url: '/api_web_download',
        success: function (data) {
            var ewmImg = JSON.parse(data).data;
            $('.down-ewm p').find('img').attr('src', imgUrl + ewmImg[0].filePath)
        }
    });

    //banner 视频
    $('.banner-con .video').on('click', function () {
        $('.video-wrap').show();
        $('.popmask').show();
        $('.video-wrap video').attr('src', $(this).find('a').attr('data-src'));
        $bm[0].pause();
    });
    $('.close-video').on('click', function () {
        $('.video-wrap').hide();
        $('.popmask').hide();
        $('.video-wrap video').attr('src', 'null');
        if ($('.music a').hasClass('active')) {
            $bgMusic[0].play();
        }
    });
    //视频播放
    $.ajax({
        type: 'GET',
        url: '/api_web_video',
        success: function (data) {
            var $videoSwiper = $('#videoSwiper');
            var video = JSON.parse(data).data;

            var str = '';
            $.each(video, function (i, d) {
                str += '<div class="swiper-slide">' +
                    '<img src="' + imgUrl + d.filePath + '">' +
                    '<span class="video-con-mask"></span>' +
                    '<a class="video-play-btn" id="videoPlay' + i + '" data-src="' + d.url + '"></a>' +
                    '<p>' + d.title + '</p>' +
                    '</div>';
            });
            $videoSwiper.html(str);

            $videoSwiper.find('a').each(function (i, d) {
                videoPlay('#videoPlay' + i);
            });
            $('#videoSwiper').css('width', $('.swiper-slide').length * 433);
            $('#videoSwiper').find('.swiper-slide').css('width', '420');
            var slideLength = $('.swiper-slide').length;

            var preNum = 0;
            $('.videobtn.swiper-button-next').on('click', function (e) {
                e.preventDefault();
                if (slideLength > 2 && slideLength / preNum > preNum) {
                    preNum++;
                    $('#videoSwiper').animate({
                        'left': -430 * preNum
                    }, 500)
                }
            });
            $('.videobtn.swiper-button-prev').on('click', function (e) {
                e.preventDefault();
                if (preNum / 2 <= 0) {
                    return false
                } else {
                    preNum--;
                    $('#videoSwiper').animate({
                        'left': -430 * preNum
                    }, 500)
                }
            });

        }
    });


    //英雄
    var $cardImg = $('#cardImg'),
        $detailLink = $('#detailLink');

    $.ajax({
        type: 'GET',
        url: '/api_web_hero',
        success: function (data) {
            var $heroBtn = $('#heroBtn');
            var hero = JSON.parse(data).data;

            var str = '';
            $.each(hero, function (i, d) {
                if (i === 0) {
                    $cardImg.find('img').attr('src', imgUrl + d.filePath2);
                    $detailLink.attr('data-id', d.id);
                }

                str += '<a data-id="' + d.id + '" data-card="' + d.filePath2 + '">' +
                    '<img src="' + imgUrl + d.filePath + '">' +
                    '<span style="display: block; background: url(' + imgUrl + d.filePath + ') center;' +
                    'background-size: 100% 100%;"></span>' +
                    '</a>'
            });

            if (hero.length % 7 !== 0) {
                for (var n = 0; n < 7 - hero.length % 7; n++) {
                    str += '<a class="hero-null">' +
                        '<img src="http://nn.8864.com/mobile_nn/img/hero-null.png">' +
                        '</a>'
                }
            }

            $heroBtn.html(str);

            $('.hero-btn a:last').prev().attr('data-last', 100);
            $('.hero-btn a:first').attr('data-first', 100)
            if (!getQueryString('id')) {
                $heroBtn.find('a').eq(0).addClass('active');
            }
        }
    });

    $(document).on('click', '#heroBtn a:not([class="hero-null"])', function () {
        var $this = $(this);
        $(this).addClass('active').siblings().removeClass('active')
        $cardImg.find('img').attr('src', imgUrl + $(this).data('card'));
        $detailLink.attr('data-id', $this.data('id'));
    });

    $detailLink.click(function () {
        window.location.href = '/detail?id=' + $(this).data('id');
    });


    $('.hero-right-btn').on('click', function () {
        if ($('.hero-btn').children('a.active').attr('data-last') == '100') {
            return false
        } else {
            $('.hero-btn').children('a.active').removeClass('active').next().addClass('active');
            $('.detail-link').attr('data-id', $('.hero-btn').children('a.active').attr('data-id'));
            $cardImg.find('img').attr('src', imgUrl + $('.hero-btn').children('a.active').data('card'));
        }
    });
    $('.hero-left-btn').on('click', function () {
        if ($('.hero-btn').children('a.active').attr('data-first') == '100') {
            return false
        } else {
            $('.hero-btn').children('a.active').removeClass('active').prev().addClass('active');
            $('.detail-link').attr('data-id', $('.hero-btn').children('a.active').attr('data-id'));
            $cardImg.find('img').attr('src', imgUrl + $('.hero-btn').children('a.active').data('card'));
        }
    });


    $('.nav').find('li:not([class="music"],[class="share"])').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');

    });

    $('.home-top').on('click', function () {
        $('html,body').stop().animate({'scrollTop': 0}, 500)
    });

    $('.down .ewm,.down .ios').on('click', function (e) {
        e.stopPropagation();
        //$('.down-ewm').show()
    });
    $(document).on('click', function () {
        $('.down-ewm').hide();
    });

    $('.share').on('click', function (e) {
        e.stopPropagation();
        $('.share-box').toggle();
    });

    $('.weixin').on('click', function () {
        $('.wx-wemImg').toggle();
    });


    $('#cloud').parallax();
    $('.cloud').css({'width': '200%', 'left': '-40%'});
});


