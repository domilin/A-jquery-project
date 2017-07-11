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

    //英雄
    var heroArr = [];
    var $heroBanner = $('#heroBanner'),
        $heroIntro = $('#heroIntro');//此处详情页

    $.ajax({
        type: 'GET',
        url: '/api_web_hero',
        success: function (data) {
            var hero = JSON.parse(data).data;
            heroArr = hero;

            var $heroBtn = $('#heroBtn');
            var str = '';
            $.each(hero, function (i, d) {
                
                if (d.id === parseInt(getQueryString('id'))) {
                    $heroBanner.attr('src', imgUrl + d.filePath3);
                    $heroIntro.attr('src', imgUrl + d.filePath4);

                    $('#heroVideo').attr('src', imgUrl + d.filePath5);
                    $('#videoPlayBtn').attr('data-src', d.url);
                }


                str += '<a data-id="' + d.id + '" data-card="' + d.filePath2 + '">' +
                    '<img src="' + imgUrl + d.filePath + '">' +
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


            $heroBtn.find('a').eq(0).addClass('active');
        }
    });

    $(document).on('click', '#heroBtn a:not([class="hero-null"])', function () {
        var $this = $(this);

        $('#heroBtn a').removeClass('active');
        $this.addClass('active');
        $skillBtn.find('a').removeClass('active');
        $skillBtn.find('a').eq(0).addClass('active');
        $skillCon.find('li').hide();
        $skillCon.find('li').eq(0).show();

        $.each(heroArr, function (i, d) {
            if (d.id === parseInt($this.data('id'))) {
                $heroBanner.attr('src', imgUrl + d.filePath3);
                $heroIntro.attr('src', imgUrl + d.filePath4);

                $('#heroVideo').attr('src', imgUrl + d.filePath5);
                $('#videoPlayBtn').attr('data-src', d.url);
            }
        });

        skillShow(skillArr, parseInt($this.data('id')));
        $(window).scrollTop(0);
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
        url: '/api_web_skill',
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



    //分享
    $('.share').on('click', function (e) {
        e.stopPropagation();
        $('.share-box').toggle();
    });

    $('.weixin').on('click', function () {
        $('.wx-wemImg').toggle();
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

    //石头运动
    $('#bannerCon').parallax({
        alibrateX: false,
        calibrateY: true,
        invertX: false,
        invertY: true,
        limitX: false,
        limitY: 10,
        scalarX: 2,
        scalarY: 8,
        frictionX: 0.2,
        frictionY: 0.8
    });
    $('.stone').css('top', '400px');
});