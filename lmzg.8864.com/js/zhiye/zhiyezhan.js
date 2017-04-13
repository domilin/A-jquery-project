// zhiyezhan.js @zhangxiaotong 20161103

var hostPath = 'http://192.168.84.43:3000';


var agent = navigator.userAgent.toLowerCase();
if (agent.indexOf('trident') > 0) {

    //window.location.href = 'http://lmzg.8864.com/template/zhiye_IE.html';

}


$('.conbox ul li').find('a').each(function (i, v) {
    $(v).on('mousemove', function () {
        $(this).find('.fontbk').show();
    }).mouseout(function () {
        $(this).find('.fontbk').hide();
    })
})

function roll(zxtzLbtn, zxtzRbtn, zBoxImg, zNumber, leftN) {
    var zNum = 0;
    $(zxtzLbtn).on('click', function () {
        if (zNum > 0) {
            zNum--;
            $(zBoxImg).stop().animate({
                'left': -leftN * zNum
            }, 300)
        } else {
            zNum = 0
        }
    });
    $(zxtzRbtn).on('click', function () {

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
//原画


//技能
roll('.swordlbtn', '.swordrbtn', '.sword-skill', 2, 402);
roll('.zslbtn', '.zsrbtn', '.zhanshijn', 2, 402);
roll('.klslbtn', '.klsrbtn', '.kuileisijn', 2, 402);
roll('.sjlrlbtn', '.sjlrrbtn', '.sjlrjn', 2, 402);
roll('.mfslbtn', '.mfsrbtn', '.mfsjn', 2, 402);


//大剑士武器
$.ajax({
    type: 'get',
    dataType: 'json',
    url: hostPath + '/bsword_weap',
    success: function (data) {
        var strongImg = '';
        var arr = [];
        $.each(data, function (i, v) {
            strongImg += '<li><a href="javascript:void(0);"><img src="http://img.linekong.com' + v.filePath2 + '"+/> </a></li>';
            arr.push('<img src="http://img.linekong.com' + v.filePath + '"/>');
        });
        $('.swordlist').append(strongImg);

        var onewidth = $('.swordlist li').eq(0).css('width');
        var oPicWidth = onewidth.substring(0, onewidth.length - 2) * $('.swordlist li').size();
        $('.swordlist').css('width', oPicWidth);

        $('.swordlist li').on('click', function () {
            oWin('win_wuqi');
            $('.pageImgBox_img').html(arr[$(this).index()]);
        })

    }
});
//大剑士武器
$.ajax({
    type: 'get',
    dataType: 'json',
    url: hostPath + '/bsword_original',
    success: function (data) {
        var yhImg = '';
        var arrYh = [];
        $.each(data, function (i, v) {

            yhImg += '<li><a href="javascript:void(0);"><img src="http://img.linekong.com' + v.filePath2 + '"+/> </a></li>';
            arrYh.push('<img src="http://img.linekong.com' + v.filePath + '"/>');
        });
        console.log(data)
        $('.swordyuanhua').append(yhImg);

        var onewidth = $('.swordyuanhua li').eq(0).css('width');
        var oPicWidth = (onewidth.substring(0, onewidth.length - 2) + 3) * $('.swordyuanhua li').size();
        $('.swordyuanhua').css('width', oPicWidth);

        $('.swordyuanhua li').on('click', function () {
            oWin('win_wuqi');
            $('.pageImgBox_img').html(arrYh[$(this).index()]);
        })
        roll('.swordyhlbtn', '.swordyhrbtn', '.swordyuanhua', data.length - 2, 203);
    }

})


//战士武器
$.ajax({
    type: 'get',
    dataType: 'json',
    url: hostPath + '/muladi_weap',
    success: function (data) {
        var strongImg = '';
        var arr = [];
        $.each(data, function (i, v) {
            strongImg += '<li><a href="javascript:void(0);"><img src="http://img.linekong.com' + v.filePath2 + '"+/> </a></li>';
            arr.push('<img src="http://img.linekong.com' + v.filePath + '"/>');
        });
        $('.zswqlist').append(strongImg);

        var onewidth = $('.zswqlist li').eq(0).css('width');
        var oPicWidth = onewidth.substring(0, onewidth.length - 2) * $('.zswqlist li').size();
        $('.zswqlist').css('width', oPicWidth);

        $('.zswqlist li').on('click', function () {
            oWin('win_wuqi');
            $('.pageImgBox_img').html(arr[$(this).index()]);
        })

    }
});
//战士原画
$.ajax({
    type: 'get',
    dataType: 'json',
    url: hostPath + '/muladi_original',
    success: function (data) {
        var yhImg = '';
        var arrYh = [];
        $.each(data, function (i, v) {

            yhImg += '<li><a href="javascript:void(0);"><img src="http://img.linekong.com' + v.filePath2 + '"+/> </a></li>';
            arrYh.push('<img src="http://img.linekong.com' + v.filePath + '"/>');
        });
        $('.zsyuanhua').append(yhImg);

        var onewidth = $('.zsyuanhua li').eq(0).css('width');
        var oPicWidth = (onewidth.substring(0, onewidth.length - 2) + 3) * $('.zsyuanhua li').size();
        $('.zsyuanhua').css('width', oPicWidth);

        $('.zsyuanhua li').on('click', function () {
            oWin('win_wuqi');
            $('.pageImgBox_img').html(arrYh[$(this).index()]);
        })
        roll('.zsyhlbtn', '.zsyhrbtn', '.zsyuanhua', data.length - 2, 203);
    }

})
//傀儡师武器
$.ajax({
    type: 'get',
    dataType: 'json',
    url: hostPath + '/puppeteer_weap',
    success: function (data) {
        var klsImg = '';
        var klsArr = [];
        $.each(data, function (i, v) {
            klsImg += '<li><a href="javascript:void(0);"><img src="http://img.linekong.com' + v.filePath2 + '"+/> </a></li>';
            klsArr.push('<img src="http://img.linekong.com' + v.filePath + '"/>');
        });
        $('.klswqlist').append(klsImg);

        var onewidth = $('.klswqlist li').eq(0).css('width');
        var oPicWidth = onewidth.substring(0, onewidth.length - 2) * $('.klswqlist li').size();
        $('.klswqlist').css('width', oPicWidth);

        $('.klswqlist li').on('click', function () {
            oWin('win_wuqi');
            $('.pageImgBox_img').html(klsArr[$(this).index()]);
        })

    }

});
//傀儡师原画
$.ajax({
    type: 'get',
    dataType: 'json',
    url: hostPath + '/puppeteer_original',
    success: function (data) {
        var yhklsImg = ''
        var arrYhkls = [];
        $.each(data, function (i, v) {
            yhklsImg += '<li><a href="javascript:void(0);"><img src="http://img.linekong.com' + v.filePath2 + '"+/> </a></li>';
            arrYhkls.push('<img src="http://img.linekong.com' + v.filePath + '"/>');
        });
        $('.klsyuanhualist').append(yhklsImg);

        var onewidth = $('.klsyuanhualist li').eq(0).css('width');
        var oPicWidth = (onewidth.substring(0, onewidth.length - 2) + 3) * $('.klsyuanhualist li').size();
        $('.klsyuanhualist').css('width', oPicWidth);

        $('.klsyuanhualist li').on('click', function () {
            oWin('win_wuqi');
            $('.pageImgBox_img').html(arrYhkls[$(this).index()]);
        })
        roll('.klsyhlbtn', '.klsyhrbtn', '.klsyuanhualist', data.length - 2, 203);

    }

})
//赏金猎人武器
$.ajax({
    type: 'get',
    dataType: 'json',
    url: hostPath + '/nicole_weap',
    success: function (data) {
        var sjlrImg = '';
        var sjlrArr = [];
        $.each(data, function (i, v) {
            sjlrImg += '<li><a href="javascript:void(0);"><img src="http://img.linekong.com' + v.filePath2 + '"+/> </a></li>';
            sjlrArr.push('<img src="http://img.linekong.com' + v.filePath + '"/>');
        });
        $('.sjlrwqlist').append(sjlrImg);

        var onewidth = $('.sjlrwqlist li').eq(0).css('width');
        var oPicWidth = onewidth.substring(0, onewidth.length - 2) * $('.sjlrwqlist li').size();
        $('.sjlrwqlist').css('width', oPicWidth);

        $('.sjlrwqlist li').on('click', function () {
            oWin('win_wuqi');
            $('.pageImgBox_img').html(sjlrArr[$(this).index()]);
        })

    }

});
//赏金猎人原画
$.ajax({
    type: 'get',
    dataType: 'json',
    url: hostPath + '/nicole_original',
    success: function (data) {
        var yhsjlrImg = '';
        var arrYhsjlr = [];
        $.each(data, function (i, v) {

            yhsjlrImg += '<li><a href="javascript:void(0);"><img src="http://img.linekong.com' + v.filePath2 + '"+/> </a></li>';
            arrYhsjlr.push('<img src="http://img.linekong.com' + v.filePath + '"/>');
        });
        $('.sjlryhlist').append(yhsjlrImg);

        var onewidth = $('.sjlryhlist li').eq(0).css('width');
        var oPicWidth = (onewidth.substring(0, onewidth.length - 2) + 3) * $('.sjlryhlist li').size();
        $('.sjlryhlist').css('width', oPicWidth);

        $('.sjlryhlist li').on('click', function () {
            oWin('win_wuqi');
            $('.pageImgBox_img').html(arrYhsjlr[$(this).index()]);
        })
        roll('.sjlryhlbtn', '.sjlryhrbtn', '.sjlryhlist', data.length - 2, 203);

    }

})
//魔法师武器
$.ajax({
    type: 'get',
    dataType: 'json',
    url: hostPath + '/enchanter_weap',
    success: function (data) {
        var wqmfsImg = '';
        var arrwqmfs = [];
        $.each(data, function (i, v) {

            wqmfsImg += '<li><a href="javascript:void(0);"><img src="http://img.linekong.com' + v.filePath2 + '"+/> </a></li>';
            arrwqmfs.push('<img src="http://img.linekong.com' + v.filePath + '"/>');
        });
        $('.mfswqlist').append(wqmfsImg);

        var onewidth = $('.mfswqlist li').eq(0).css('width');
        var oPicWidth = onewidth.substring(0, onewidth.length - 2) * $('.mfswqlist li').size();
        $('.mfswqlist').css('width', oPicWidth);

        $('.mfswqlist li').on('click', function () {
            oWin('win_wuqi');
            $('.pageImgBox_img').html(arrwqmfs[$(this).index()]);
        })

    }

})
//魔法师原画
$.ajax({
    type: 'get',
    dataType: 'json',
    url: hostPath + '/enchanter_original',
    success: function (data) {
        var yhmfsImg = '';
        var arrYhmfs = [];
        $.each(data, function (i, v) {

            yhmfsImg += '<li><a href="javascript:void(0);"><img src="http://img.linekong.com' + v.filePath2 + '"+/> </a></li>';
            arrYhmfs.push('<img src="http://img.linekong.com' + v.filePath + '"/>');
        });
        $('.mfsyhlist').append(yhmfsImg);

        var onewidth = $('.mfsyhlist li').eq(0).css('width');
        var oPicWidth = (onewidth.substring(0, onewidth.length - 2) + 3) * $('.mfsyhlist li').length;
        $('.mfsyhlist').css('width', oPicWidth);

        $('.mfsyhlist li').on('click', function () {
            oWin('win_wuqi');
            $('.pageImgBox_img').html(arrYhmfs[$(this).index()]);
        })
        roll('.mfsyhlbtn', '.mfsyhrbtn', '.mfsyhlist', data.length - 2, 203);
    }

})

//武器
function wuqi(oUl, oLbtn, oRbtn) {
    var iNow = 0;
    var onewidth = $(oUl + ' li').eq(0).css('width');
    // var oPicWidth = onewidth.substring(0,onewidth.length -2) *$(oUl +' li').size();

    // $(oUl).css('width',oPicWidth);

    function picTab(iNow) {
        $(oUl).stop().animate({'left': -399 * iNow + 'px'});
    }

    $(oLbtn).click(function () {
        if (iNow == 0) {
            return;
        } else {
            iNow--;
            picTab(iNow);
        }
    });

    $(oRbtn).click(function () {
        autoplay();
    });

    function autoplay() {
        if (iNow == $(oUl + ' li').size() - 1) {
            return;
        } else {
            iNow++;
            picTab(iNow);
        }
    }

}

wuqi('.mfswqlist', '.mfswqlbtn', '.mfswqrbtn');
wuqi('.sjlrwqlist', '.sjlrwqlbtn', '.sjlrwqrbtn');
wuqi('.klswqlist', '.klswqlbtn', '.klswqrbtn');
wuqi('.zswqlist', '.zswqlbtn', '.zswqrbtn');

clearTimeout(oTimer)
var oTimer = setTimeout(function () {
    $('.jinengbox').eq(0).addClass('unanimate');
    $('.wuqibox').eq(0).addClass('unanimate');
    $('.yuanhuabox').eq(0).addClass('unanimate');
    $('.quancon').eq(0).addClass('unanimate');

}, 1);


$('.close').on('click', function () {
    oMark('win_wuqi');
    $('.pageImgBox_img').empty();
});

var arr = [
    'http://gdl1401.8864.com/dbm/market/zs.mp4',
    'http://gdl1401.8864.com/dbm/market/sjlr.mp4',
    'http://gdl1401.8864.com/dbm/market/kls.mp4',
    'http://gdl1401.8864.com/dbm/market/mds.mp4'
];
$('.spbox').each(function (i, e) {
    $(e).click(function () {
        oWin('win_video');
        $('#video1').attr('src', arr[i]);
    })
})
$('.Vclose').on('click', function () {
    oMark('win_video');
    $('#video1').attr('src', '');
});

function oWin(id) {
    var oW = $(window).width();
    var oH = $(window).height();
    var oD = $(document).height();
    var oDw = $(document).width();
    var oSrcllL = $(document).scrollLeft();
    var oSrcllT = $(document).scrollTop();

    $('#mark').css({'width': oDw + 'px', 'height': oD + 'px'});
    $('#mark').show();
    $('#' + id).css({'top': (oH - $('#' + id).height()) / 2 + oSrcllT + 'px'});
    $('#' + id).css({'left': (oW - $('#' + id).width()) / 2 + oSrcllL + 'px'});
    $('#' + id).show();
}

function oMark(id) {
    $('#' + id).hide();
    $('#mark').hide();
}