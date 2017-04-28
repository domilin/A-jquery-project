/**
 * Created by Administrator on 2016/11/2.
 */
//var nodeHost = 'http://192.168.84.43:3000';
var nodeHost = 'http://lmzg.8864.com';

$(function () {


    $('#dowebok').fullpage({
        anchors: ['page00', 'page0', 'page1', 'page2', 'page3', 'page4'],
        menu: '#menu',
        onLeave: function (index, nextIndex, direction) {

            if (index == 00 || index == 0 || index == 1 || index == 2 || index == 3 || index == 4) {
                $('.videoBox00').hide();
                $('.videoBox0').hide();
                $('.videoBox1').hide();
                $('.videoBox2').hide();
                $('.videoBox3').hide();
                $('.videoBox4').hide();
                $('.shade').hide();
                $('.pageImgBox').hide();
                $('.pageImgBox_img').empty();
            }
            if (direction == 'up') {
                $('.videoBox00').hide();
                $('.videoBox0').hide();
                $('.videoBox1').hide();
                $('.videoBox2').hide();
                $('.videoBox3').hide();
                $('.videoBox4').hide();
                $('.shade').hide();
            }


        }

    });

    $(document).on('click', 'div.btnBig', function () {
        var $this = $(this),
            i = $('div.btnBig').index(this),
            name = $this.attr('data-name');
        if (name == 'true') {
            console.log(1)
            $this.attr('data-name', false);
            $this.siblings('.small_img' + (i - 1)).fadeIn();
            $this.siblings('.big_img' + (i - 1)).fadeOut();
        } else if (name == 'false') {
            console.log(2)
            $this.attr('data-name', true);
            $this.siblings('.small_img' + (i - 1)).fadeOut();
            $this.siblings('.big_img' + (i - 1)).fadeIn();
        }
        if ($(this).hasClass('on')) {
            $(this).removeClass('on');
        } else {
            $(this).addClass('on');
        }
    })


    $('.jnlist').find('li').each(function (i, v) {
        $(v).on('mousemove', function () {
            if ($(this).hasClass('first')) {
                $(this).children('.showcon.first').show();
            } else if ($(this).hasClass('last')) {
                $(this).children('.showcon.last').show();
            } else {
                $(this).children('.showcon').show();
            }
        }).mouseout(function () {
            $(this).children('.showcon').hide();
        })
    })

    function roll(zLbtn, zRbtn, zBoxImg, zNumber, leftN) {
        var zNum = 0;
        $(zLbtn).on('click', function () {
            if (zNum > 0) {
                zNum--;
                $(zBoxImg).stop().animate({
                    'left': -leftN * zNum
                }, 300)
            } else {
                zNum = 0
            }
        });
        $(zRbtn).on('click', function () {

            if (zNum < zNumber) {
                zNum++;
                $(zBoxImg).stop().animate({
                    'left': -leftN * zNum
                }, 300)
            } else {
                zNum = zNumber
            }
        })
    }

    roll('.gun_jinengL', '.gun_jinengR', '.gunC_img', 1, 410);
    roll('.sword_jinengL', '.sword_jinengR', '.swordC_img', 2, 410);
    roll('.zhanshi_jinengL', '.zhanshi_jinengR', '.inengC_img', 2, 410);
    roll('.lieren_jinengL', '.lieren_jinengR', '.LrinengC_img', 2, 410);
    roll('.kuilei_jinengL', '.kuilei_jinengR', '.KlinengC_img', 2, 410);
    roll('.mofashi_jinengL', '.mofashi_jinengR', '.MfsinengC_img', 2, 410);


    $('.shade').css('width', $(window).width());
    $('.shade').css('height', $(window).height());

    //图片
    //大剑士武器
    $.ajax({
        type: "GET",
        url: nodeHost + '/rider_weap',
        dataType: "json",
        success: function (data) {
            console.log(data)
            var zsWq_01 = '';
            var zsArr = [];
            $.each(data, function (i, v) {
                zsWq_01 += '<li><img src="http://img.linekong.com/' + v.filePath2 + '"></li>';
                zsArr.push('<img src="http://img.linekong.com/' + v.filePath + '">');
                // console.log(zsArr)
            });
            $('.gun_wqBox').append(zsWq_01);
            $('.gun_wqBox').outerWidth($('.gun_wqBox li').length * $('.gun_wqBox li').width());
            $('.gun_wqBox li').on('click', function () {
                $('.pageImgBox_img').html(zsArr[$(this).index()]);
                oWin('pageImgBox');
            })
            roll('.gun_wuqiL', '.gun_wuqiR', '.gun_wqBox', data.length - 1, 399);
        }
    });
    //大剑士原画
    $.ajax({
        type: "GET",
        url: nodeHost + '/rider_original',
        dataType: "json",
        success: function (data) {//console.log(data)
            var zsWq_02 = '';
            var zsArr2 = [];
            $.each(data, function (i, v) {
                zsWq_02 += '<li><img src="http://img.linekong.com/' + v.filePath2 + '"></li>';
                zsArr2.push('<img src="http://img.linekong.com/' + v.filePath + '">');
            });
            $('.gun_yuanhua').append(zsWq_02);
            $('.gun_yuanhua').outerWidth($('.gun_yuanhua li').length * ($('.gun_yuanhua li').width() + 3));
            $('.gun_yuanhua li').on('click', function () {
                $('.pageImgBox_img').html(zsArr2[$(this).index()]);
                oWin('pageImgBox');
            });
            roll('.gun_yuanhuaL', '.gun_yuanhuaR', '.gun_yuanhua', data.length - 2, 203);
        }
    });


    //大剑士武器
    $.ajax({
        type: "GET",
        url: nodeHost + '/bsword_weap',
        dataType: "json",
        success: function (data) {
            console.log(data)
            var zsWq_01 = '';
            var zsArr = [];
            $.each(data, function (i, v) {
                zsWq_01 += '<li><img src="http://img.linekong.com/' + v.filePath2 + '"></li>';
                zsArr.push('<img src="http://img.linekong.com/' + v.filePath + '">');
                // console.log(zsArr)
            });
            $('.sword_wqBox').append(zsWq_01);
            $('.sword_wqBox').outerWidth($('.sword_wqBox li').length * $('.sword_wqBox li').width());
            $('.sword_wqBox li').on('click', function () {
                $('.pageImgBox_img').html(zsArr[$(this).index()]);
                oWin('pageImgBox');
            })
            roll('.sword_wuqiL', '.sword_wuqiR', '.sword_wqBox', data.length - 1, 399);
        }
    });
    //大剑士原画
    $.ajax({
        type: "GET",
        url: nodeHost + '/bsword_original',
        dataType: "json",
        success: function (data) {//console.log(data)
            var zsWq_02 = '';
            var zsArr2 = [];
            $.each(data, function (i, v) {
                zsWq_02 += '<li><img src="http://img.linekong.com/' + v.filePath2 + '"></li>';
                zsArr2.push('<img src="http://img.linekong.com/' + v.filePath + '">');
            });
            $('.sword_yuanhua').append(zsWq_02);
            $('.sword_yuanhua').outerWidth($('.sword_yuanhua li').length * ($('.sword_yuanhua li').width() + 3));
            $('.sword_yuanhua li').on('click', function () {
                $('.pageImgBox_img').html(zsArr2[$(this).index()]);
                oWin('pageImgBox');
            });
            roll('.sword_yuanhuaL', '.sword_yuanhuaR', '.sword_yuanhua', data.length - 2, 203);
        }
    });

    //战士武器
    $.ajax({
        type: "GET",
        url: nodeHost + '/muladi_weap',
        dataType: "json",
        success: function (data) {
            console.log(data)
            var zsWq_01 = '';
            var zsArr = [];
            $.each(data, function (i, v) {
                zsWq_01 += '<li><img src="http://img.linekong.com/' + v.filePath2 + '"></li>';
                zsArr.push('<img src="http://img.linekong.com/' + v.filePath + '">');
                // console.log(zsArr)
            });
            $('.zs_wqBox').append(zsWq_01);
            $('.zs_wqBox').outerWidth($('.zs_wqBox li').length * $('.zs_wqBox li').width());
            $('.zs_wqBox li').on('click', function () {
                $('.pageImgBox_img').html(zsArr[$(this).index()]);
                oWin('pageImgBox');
            })
            roll('.zhanshi_wuqiL', '.zhanshi_wuqiR', '.zs_wqBox', data.length - 1, 399);
        }
    });
    //战士原画
    $.ajax({
        type: "GET",
        url: nodeHost + '/muladi_original',
        dataType: "json",
        success: function (data) {//console.log(data)
            var zsWq_02 = '';
            var zsArr2 = [];
            $.each(data, function (i, v) {
                zsWq_02 += '<li><img src="http://img.linekong.com/' + v.filePath2 + '"></li>';
                zsArr2.push('<img src="http://img.linekong.com/' + v.filePath + '">');
            });
            $('.zs_yuanhua').append(zsWq_02);
            $('.zs_yuanhua').outerWidth($('.zs_yuanhua li').length * ($('.zs_yuanhua li').width() + 3));
            $('.zs_yuanhua li').on('click', function () {
                $('.pageImgBox_img').html(zsArr2[$(this).index()]);
                oWin('pageImgBox');
            });
            roll('.zhanshi_yuanhuaL', '.zhanshi_yuanhuaR', '.zs_yuanhua', data.length - 2, 203);
        }
    });
    //猎人武器
    $.ajax({
        type: "GET",
        url: nodeHost + '/nicole_weap',
        dataType: "json",
        success: function (data) {//console.log(data)
            var lrWq_01 = '';
            var lrArr = [];
            $.each(data, function (i, v) {
                lrWq_01 += '<li><img src="http://img.linekong.com/' + v.filePath2 + '"></li>';
                lrArr.push('<img src="http://img.linekong.com/' + v.filePath + '">');
                //console.log(zsArr)
            });
            $('.lr_wqBox').append(lrWq_01);
            $('.lr_wqBox').outerWidth($('.lr_wqBox li').length * $('.lr_wqBox li').width());
            $('.lr_wqBox li').on('click', function () {
                $('.pageImgBox_img').html(lrArr[$(this).index()]);
                oWin('pageImgBox');
            });
            roll('.lieren_wuqiL', '.lieren_wuqiR', '.lr_wqBox', data.length - 1, 399);
        }
    });
    //猎人原画
    $.ajax({
        type: "GET",
        url: nodeHost + '/nicole_original',
        dataType: "json",
        success: function (data) {//console.log(data)
            var lrWq_02 = '';
            var lrArr2 = [];
            $.each(data, function (i, v) {
                lrWq_02 += '<li><img src="http://img.linekong.com/' + v.filePath2 + '"></li>';
                lrArr2.push('<img src="http://img.linekong.com/' + v.filePath + '">');
            });
            $('.lr_yuanhua').append(lrWq_02);
            $('.lr_yuanhua').outerWidth($('.lr_yuanhua li').length * ($('.lr_yuanhua li').width() + 3));
            $('.lr_yuanhua li').on('click', function () {
                $('.pageImgBox_img').html(lrArr2[$(this).index()]);
                oWin('pageImgBox');
            })
            roll('.lieren_yuanhuaL', '.lieren_yuanhuaR', '.lr_yuanhua', data.length - 2, 203);
        }
    });
    //傀儡师武器
    $.ajax({
        type: "GET",
        url: nodeHost + '/puppeteer_weap',
        dataType: "json",
        success: function (data) {//console.log(data)
            var klWq_01 = '';
            var klArr = [];
            $.each(data, function (i, v) {
                klWq_01 += '<li><img src="http://img.linekong.com/' + v.filePath2 + '"></li>';
                klArr.push('<img src="http://img.linekong.com/' + v.filePath + '">');
                //console.log(zsArr)
            });
            $('.kl_wqBox').append(klWq_01);
            $('.kl_wqBox').outerWidth($('.kl_wqBox li').length * $('.kl_wqBox li').width());
            $('.kl_wqBox li').on('click', function () {
                $('.pageImgBox_img').html(klArr[$(this).index()]);
                oWin('pageImgBox');
            });
            roll('.kuilei_wuqiL', '.kuilei_wuqiR', '.kl_wqBox', data.length - 1, 399);
        }
    });
    //傀儡师原画
    $.ajax({
        type: "GET",
        url: nodeHost + '/puppeteer_original',
        dataType: "json",
        success: function (data) {//console.log(data)
            var klWq_02 = '';
            var klArr2 = [];
            $.each(data, function (i, v) {
                klWq_02 += '<li><img src="http://img.linekong.com/' + v.filePath2 + '"></li>';
                klArr2.push('<img src="http://img.linekong.com/' + v.filePath + '">');
            });
            $('.kl_yuanhua').append(klWq_02);
            $('.kl_yuanhua').outerWidth($('.kl_yuanhua li').length * ($('.kl_yuanhua li').width() + 3));
            $('.kl_yuanhua li').on('click', function () {
                $('.pageImgBox_img').html(klArr2[$(this).index()]);
                oWin('pageImgBox');
            })
            roll('.kuilei_yuanhuaL', '.kuilei_yuanhuaR', '.kl_yuanhua', data.length - 2, 203);
        }
    });
    //魔法师武器
    $.ajax({
        type: "GET",
        url: nodeHost + '/enchanter_weap',
        dataType: "json",
        success: function (data) {//console.log(data)
            var mfsWq_01 = '';
            var mfsArr = [];
            $.each(data, function (i, v) {
                mfsWq_01 += '<li><img src="http://img.linekong.com/' + v.filePath2 + '"></li>';
                mfsArr.push('<img src="http://img.linekong.com/' + v.filePath + '">');
                //console.log(zsArr)
            });
            $('.mf_wqBox').append(mfsWq_01);
            $('.mf_wqBox').outerWidth($('.mf_wqBox li').length * $('.mf_wqBox li').width());
            $('.mf_wqBox li').on('click', function () {
                $('.pageImgBox_img').html(mfsArr[$(this).index()]);
                oWin('pageImgBox');
            });
            roll('.mofashi_wuqiL', '.mofashi_wuqiR', '.mf_wqBox', data.length - 1, 399);
        }
    });
    //魔法师原画
    $.ajax({
        type: "GET",
        url: nodeHost + '/enchanter_original',
        dataType: "json",
        success: function (data) {//console.log(data)
            var mfsWq_02 = '';
            var mfsArr2 = [];
            $.each(data, function (i, v) {
                mfsWq_02 += '<li><img src="http://img.linekong.com/' + v.filePath2 + '"></li>';
                mfsArr2.push('<img src="http://img.linekong.com/' + v.filePath + '">');
            });
            $('.mf_yuanhua').append(mfsWq_02);
            $('.mf_yuanhua').outerWidth($('.mf_yuanhua li').length * ($('.mf_yuanhua li').width() + 3));
            $('.mf_yuanhua li').on('click', function () {
                $('.pageImgBox_img').html(mfsArr2[$(this).index()]);
                oWin('pageImgBox');
            })
            roll('.mofashi_yuanhuaL', '.mofashi_yuanhuaR', '.mf_yuanhua', data.length - 2, 203);
        }
    });


    $('.close').on('click', function () {
        $('.pageImgBox_img').empty();
        $(this).parent().hide();
        $('.shade').hide();
    });

    //视频

    function Avideo(Vclose, vname, boxName, pageV) {
        $(Vclose).on('click', function () {
            $(boxName).hide();
            $(vname).attr('src', '');
            $('.shade').hide();
        })
        $(pageV).on('click', function () {
            $(vname).attr('src', $(boxName).attr('_src'));
            $(boxName).show();
            $('.shade').show();
        })
    }

    Avideo('.Vclose', '.video00', '.videoBox00', '.gun_img01')
    Avideo('.Vclose', '.video0', '.videoBox0', '.sword_img01')
    Avideo('.Vclose', '.video1', '.videoBox1', '.zhanshi_img01')
    Avideo('.Vclose', '.video2', '.videoBox2', '.lieren_v1')
    Avideo('.Vclose', '.video3', '.videoBox3', '.kuileishi_v1')
    Avideo('.Vclose', '.video4', '.videoBox4', '.mofashi_v1');


    function oWin(id) {
        var oW = $(window).width();
        var oH = $(window).height();
        var oD = $(document).height();
        $('.shade').css({'width': oW + 'px', 'height': oD + 'px'});
        $('.shade').show();
        $('#' + id).css({'top': (oH - $('#' + id).height()) / 2 + 'px'});
        $('#' + id).css({'left': (oW - $('#' + id).width()) / 2 + 'px'});
        $('#' + id).show();
    }
});
