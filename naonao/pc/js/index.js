/**
 * Author: liushaozong
 * Date: 2017/5/23
 * Time: 14:58
 * Description:Description
 */

if(!isPc()){
    window.location.href = 'http://nn.8864.com/mobile'
}
$(function () {

    function rem(num) {
        return num / 24 * parseInt($('html').css('font-size'))
    }

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


    //下载
    var iosUrl = '',
        andUrl = '';
    $.ajax({
        type: 'GET',
        url: '/api_download',
        success: function (data) {
            var url = JSON.parse(data).data;console.log(url)
            iosUrl = url[0].url;
            andUrl = url[1].url;
            //downloadGame();
            $('.ios a').attr('href', iosUrl)
            $('.and a').attr('href', andUrl);
        }
    });
    $.ajax({
        type: 'GET',
        url: '/api_web_download',
        success: function (data) {console.log(data)
            var ewmImg = JSON.parse(data).data;
            $('.down-ewm p').find('img').attr('src',imgUrl+ewmImg[0].filePath)

        }
    });

    // function downloadGame() {
    //     var $shadow = $('#shadow');
    //     $shadow.off('click');
    //     $shadow.on('click', function () {
    //         $(this).css('display', 'none');
    //     });
    //
    //     $('#downloadBtn').on('click', function () {
    //         var useragent = window.navigator.userAgent.toLowerCase();
    //         if (useragent.indexOf('micromessenger') > 0) {
    //             $shadow.show();
    //         } else {
    //             var u = window.navigator.userAgent.toLowerCase();
    //             if (u.indexOf('iphone') > 0 || u.indexOf("iPad") > 0) {
    //                 window.location.href = iosUrl;
    //             } else if (u.indexOf('android') > 0) {
    //                 window.location.href = andUrl;
    //             }
    //         }
    //         return false;
    //     });
    // }

    //banner 视频
    $('.banner-con .video').on('click', function () {
        $('.video-wrap').show();
        $('.popmask').show();
        $('.video-wrap video').attr('src', $(this).find('a').attr('data-src'))
    })
    $('.close-video').on('click', function () {
        $('.video-wrap').hide();
        $('.popmask').hide();
        $('.video-wrap video').attr('src', 'null')
    })
    //视频播放
    $.ajax({
        type: 'GET',
        url: '/api_web_video',
        success: function (data) {
            var $videoSwiper = $('#videoSwiper');
            var video = JSON.parse(data).data;
            console.log(video)

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
            var nextNum = 0;
            $('.videobtn.swiper-button-prev').on('click', function (e) {
                e.preventDefault();
                if (preNum/2<=0) {
                    return false
                }else{
                    preNum--;
                    $('#videoSwiper').animate({
                        'left': -430 * preNum
                    }, 500)
                }
            });

        }
    });


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


    //英雄
    var $cardImg = $('#cardImg'),
        $detailLink = $('#detailLink');

    var heroArr = [];
    var $heroBanner = $('#heroBanner'),
        $heroIntro = $('#heroIntro');//此处详情页

    $.ajax({
        type: 'GET',
        url: '/api_web_hero',
        success: function (data) {
            var $heroBtn = $('#heroBtn');
            var hero = JSON.parse(data).data;
            console.log(hero)
            heroArr = hero;

            var str = '';
            $.each(hero, function (i, d) {
                if (i === 0) {
                    $cardImg.find('img').attr('src', imgUrl + d.filePath2);
                    $detailLink.attr('data-id', d.id);

                    $('#heroVideo').attr('src', imgUrl + d.filePath5);
                    $('#videoPlayBtn').data('src', d.url);
                }

                if (d.id === parseInt(getQueryString('id'))) {
                    $heroBanner.attr('src', imgUrl + d.filePath3);
                    $heroIntro.attr('src', imgUrl + d.filePath4);
                }

                str += '<a data-id="' + d.id + '" data-card="' + d.filePath2 + '">' +
                    '<img src="' + imgUrl + d.filePath + '">' +
                    '<span style="display: block;background: url(' + imgUrl + d.filePath + ') center;' +
                    ' background-size: 100% 100%;"></span>' +
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

            if (!getQueryString('id')) {
                $heroBtn.find('a').eq(0).addClass('active');

            }
            ;
            $('.hero-btn a:last').attr('data-last', 100);
            $('.hero-btn a:first').attr('data-first', 100)

        }
    });

    $(document).on('click', '#heroBtn a:not([class="hero-null"])', function () {
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
        window.location.href = '/naonao/detail.html?id=' + $(this).data('id');
    });


    $('.hero-right-btn').on('click', function () {
        if ($('.hero-btn').children('a.active').attr('data-last') == '100') {
            return false
        } else {
            $('.hero-btn').children('a.active').removeClass('active').next().addClass('active');
            $('.detail-link').attr('data-id', $('.hero-btn').children('a.active').attr('data-id'));
            $cardImg.find('img').attr('src', imgUrl + $('.hero-btn').children('a.active').data('card'));
        }


    })
    $('.hero-left-btn').on('click', function () {
        if ($('.hero-btn').children('a.active').attr('data-first') == '100') {
            return false
        } else {
            $('.hero-btn').children('a.active').removeClass('active').prev().addClass('active');
            $('.detail-link').attr('data-id', $('.hero-btn').children('a.active').attr('data-id'));
            $cardImg.find('img').attr('src', imgUrl + $('.hero-btn').children('a.active').data('card'));
        }

    })


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

    $('#cloud').parallax();
    $('.cloud').css({'width': '200%', 'left': '-40%'})

    $('.nav').find('li:not([class="music"],[class="share"])').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');

    })

    $('.home-top').on('click', function () {
        $('html,body').stop().animate({'scrollTop': 0}, 500)
    });

    $('.down .ewm').on('click',function(e){
        e.stopPropagation();
        $('.down-ewm').show()
    });
    $(document).on('click',function(){
        $('.down-ewm').hide();
    })

    $('.share').on('click',function(e){
        e.stopPropagation();
        $('.share-box').toggle();
    });

    $('.weixin').on('click',function(){
        $('.wx-wemImg').toggle();
    })

});


