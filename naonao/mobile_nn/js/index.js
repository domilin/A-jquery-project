/**
 * Author: liushaozong
 * Date: 2017/5/23
 * Time: 14:58
 * Description:Description
 */


$(function () {

    function rem(num) {
        return num / 24 * parseInt($('html').css('font-size'))
    }

    window.addEventListener("deviceorientation", function (event) {
        // 处理event.alpha、event.beta及event.gamma

        $('#stone').css({
            'left': event.gamma * 0.3 + rem(40),
            'bottom': event.beta * 0.3 + rem(140)
        });

        $('.logo').css({
            'left': event.gamma * 0.6 + rem(144)
        });

        $('.slogan').css({
            'left': event.gamma * 0.3 + rem(30)
        });

        $('.home.one').css({
            'left': event.gamma * 0.3 + rem(300)
        });
        $('.home.two').css({
            'left': event.gamma * 0.2 + rem(400)
        });
        $('.home.three').css({
            'left': event.gamma * 0.1 + rem(450)
        });
        $('.home.four').css({
            'left': event.gamma * 0.05 + rem(500)
        });

        $('.download-btn').css({
            'margin-left': event.gamma * 0.2 + rem(-240 * 640 / 750 / 2),
            'bottom': event.beta * 0.2 + rem(120 * 640 / 750)
        });

    }, true);


    videoPlay('#slogan');

    var imgUrl = 'http://img.linekong.com';

    $('.qq-group .qq-group-btn').click(function () {
        $('.qq-pop').toggle();
        return false;
    });
    $('html').click(function () {
        $('.qq-pop').hide();
    });

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
            $this.removeClass('active');
            $bm[0].pause();
        } else {
            $this.addClass('active');
            $bm[0].play();
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
                if (u.indexOf('iphone') > 0 || u.indexOf("ipad") > 0) {
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
                str += '<div class="swiper-slide">' +
                    '<img src="' + imgUrl + d.filePath + '">' +
                    '<span class="video-con-mask"></span>' +
                    '<em>' + d.title + '</em>' +
                    '<a class="video-play-btn" id="videoPlay' + i + '" data-src="' + d.url + '"></a>' +
                    '</div>';
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


    //英雄
    var $cardImg = $('#cardImg'),
        $detailLink = $('#detailLink');

    var heroArr = [];
    var $heroBanner = $('#heroBanner'),
        $heroIntro = $('#heroIntro');//此处详情页

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
                    $detailLink.attr('data-id', d.id);
                }

                if (d.id === parseInt(getQueryString('id'))) {
                    $heroBanner.attr('src', imgUrl + d.filePath3);
                    $heroIntro.attr('src', imgUrl + d.filePath4);

                    $('#heroVideo').attr('src', imgUrl + d.filePath5);
                    $('#videoPlayBtn').data('src', d.url);
                }


                str += '<a data-id="' + d.id + '" data-card="' + d.filePath2 + '">' +
                    '<img src="' + imgUrl + d.filePath + '">' +
                    '<span></span>' +
                    '</a>'
            });

            if (hero.length % 4 !== 0) {
                for (var n = 0; n < 4 - hero.length % 4; n++) {
                    str += '<a class="hero-null">' +
                        '<img src="http://nn.8864.com/mobile_nn/img/hero-null.png">' +
                        '</a>'
                }
            }
            $heroBtn.html(str);

            if (!getQueryString('id')) {
                $heroBtn.find('a').eq(0).addClass('active');
            }
        }
    });

    $(document).on('tap', '#heroBtn a:not([class="hero-null"])', function () {
        var $this = $(this);

        if (!getQueryString('id')) {
            $('#heroBtn a').removeClass('active');
            $this.addClass('active');
        }

        $skillBtn.find('a').removeClass('active');
        $skillBtn.find('a').eq(0).addClass('active');
        $skillCon.find('li').hide();
        $skillCon.find('li').eq(0).show();


        $cardImg.find('img').attr('src', imgUrl + $(this).data('card'));
        $detailLink.attr('data-id', $this.data('id'));

        $.each(heroArr, function (i, d) {
            if (d.id === parseInt($this.data('id'))) {
                $heroBanner.attr('src', imgUrl + d.filePath3);
                $heroIntro.attr('src', imgUrl + d.filePath4);

                $('#heroVideo').attr('src', imgUrl + d.filePath5);
                $('#videoPlayBtn').data('src', d.url);
            }
        });

        skillShow(skillArr, parseInt($this.data('id')));
        if (getQueryString('id')) {
            $(window).scrollTop(0);
        }
    });

    $detailLink.click(function () {
    //    window.location.href = '/mobile/detail.html?id=' + $(this).data('id');
        window.location.href = '/mobile/detail?id=' + $(this).data('id');
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

                str += '<div class="swiper-slide"><img src="' + imgUrl + d.filePath4 + '"/></div>';
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


    //技能
    var $skillBtn = $('#skillBtn'),
        $skillCon = $('#skillCon');
    $skillBtn.find('a').click(function () {
        var i = $(this).index();
        $skillBtn.find('a').removeClass('active');
        $(this).addClass('active');

        $skillCon.find('li').hide();
        $skillCon.find('li').eq(i).show();
    });

    var skillArr = [];
    $.ajax({
        type: 'GET',
        url: '/api_skill',
        success: function (data) {
            skillArr = JSON.parse(data).data;
            skillShow(skillArr, parseInt(getQueryString('id')));
        }
    });
    videoPlay('#videoPlayBtn');
    function skillShow(skillArr, id) {
        var $a = $skillBtn.find('a'),
            $li = $skillCon.find('li');
        $.each(skillArr, function (i, d) {
            if (d.location === id) {
                $a.eq(0).children('img').attr('src', imgUrl + d.filePath);
                $a.eq(1).children('img').attr('src', imgUrl + d.filePath2);
                $a.eq(2).children('img').attr('src', imgUrl + d.filePath3);
                $a.eq(3).children('img').attr('src', imgUrl + d.filePath4);

                $li.eq(0).children('h4').text(d.roleName);
                $li.eq(1).children('h4').text(d.roleServer);
                $li.eq(2).children('h4').text(d.roleSchool);
                $li.eq(3).children('h4').text(d.types);

                $li.eq(0).children('p').children('em').text(d.standby1);
                $li.eq(1).children('p').children('em').text(d.standby2);
                $li.eq(2).children('p').children('em').text(d.standby3);
                $li.eq(3).children('p').children('em').text(d.standby4);
            }
        });
    }

});