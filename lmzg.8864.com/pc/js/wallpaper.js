var hostUrl = 'http://lmzg.8864.com';

$(function () {

    //原画
    $.ajax({
        url: hostUrl + '/original',
        type: 'GET',
        dataType: 'json',
        error: function () {
            console.log('error');
        },
        success: function (data) {
            var $originalPainting = $('#originalPainting');
            appendEle($originalPainting, data, function () {
                imageSwitch($originalPainting);
            });
        }
    });


    //截图
    $.ajax({
        url: hostUrl + '/screenshots',
        type: 'GET',
        dataType: 'json',
        error: function () {
            console.log('error');
        },
        success: function (data) {
            var $screenShot = $('#screenShot');
            appendEle($screenShot, data, function () {
                imageSwitch($screenShot);
            });
        }
    });


    //壁纸
    var wallpaperStr = '';
    for (var i = 1; i < 7; i++) {
        var cla = '';
        if (i % 2 == 0) {
            cla = 'double';
        }
        wallpaperStr += '<li class="' + cla + '"><div class="rules"><h3 class="one">电脑版</h3><div class="rules-con">' +
            '<a target="_blank" href="http://img.linekong.com/dbm/2016/11/02/0' + i + '/1024x768.jpg">1024×768</a>' +
            '<a target="_blank" href="http://img.linekong.com/dbm/2016/11/02/0' + i + '/1366x768.jpg">1366×768</a>' +
            '<a target="_blank" href="http://img.linekong.com/dbm/2016/11/02/0' + i + '/1600x900.jpg">1600×900</a>' +
            '<a target="_blank" href="http://img.linekong.com/dbm/2016/11/02/0' + i + '/1920x1080.jpg" class="last">1920×1080</a>' +
            '</div>' +
            '<h3>手机版</h3><div class="rules-con">' +
            '<a target="_blank" href="http://img.linekong.com/dbm/2016/11/02/0' + i + '/640x1136.jpg">iPhone 5</a>' +
            '<a target="_blank" href="http://img.linekong.com/dbm/2016/11/02/0' + i + '/750x1334.jpg">iPhone 6s</a>' +
            '<a target="_blank" href="http://img.linekong.com/dbm/2016/11/02/0' + i + '/1080x1920.jpg" class="last">iPhone 6s plus</a>' +
            '</div></div>' +
            '<img src="../images/wallpaper/wallscale/0' + i + '.jpg">' +
            '</li>';
    }
    $('#wallpaperEle').html(wallpaperStr);


    //切换
    var $btnTitle = $('#btnTitle a'),
        $conCon = $('div.con-con');

    $conCon.eq(0).show();
    $btnTitle.click(function () {
        var index = $btnTitle.index(this);
        $conCon.hide();
        $conCon.eq(index).show();
        $btnTitle.removeClass('current');
        $(this).addClass('current');
    });

});

function appendEle(ele, data, fn) {
    var imgLittle = '',
        imgBig = '';
    $.each(data, function (i, d) {
        var classStr = '';
        if (i == 0) {
            classStr = 'current';
        }
        imgBig += '<span><img src="http://img.linekong.com' + d.filePath + '"></span>';
        imgLittle += '<a class="btn-ele ' + classStr + '">' +
            '<img src="http://img.linekong.com' + d.filePath2 + '">' +
            '<span class="btn-mask"></span>' +
            '<em class="btn-check"></em>' +
            '</a>';
    });
    $(imgBig).appendTo(ele.find('div.image-con'));
    $(imgLittle).appendTo(ele.find('div.btn-con-main'));
    fn.call(window);
}


function imageSwitch(ele) {
    var $imageCon = ele.find('div.image-con'),
        $btnPrevBig = ele.find('a.btn-prev-big'),
        $btnNextBig = ele.find('a.btn-next-big'),
        $openCloseBtn = ele.find('a.open-close-btn'),
        $btnConSlider = ele.find('div.btn-con-slider'),
        $btnConMain = ele.find('div.btn-con-main'),
        $btnPrevLittle = ele.find('a.btn-prev-little'),
        $btnNextLittle = ele.find('a.btn-next-little'),
        $btnWraper = ele.find('div.btn-wraper'),
        $imgEle = $imageCon.children('span'),
        $btnEle = $btnConMain.children('a.btn-ele');

    var imgEleLg = $imgEle.length,
        btnMarginRight = (970 - 3 * 322) / 2,
        btnConMainWidth = imgEleLg * (btnMarginRight + 322),
        moveDistance = (970 - 3 * 322) / 2 + 322;
    $imageCon.width(imgEleLg * 970);
    $btnConMain.width(btnConMainWidth);

    var curEleNum = 0;
    $btnPrevBig.click(function () {
        clickRight();
    });

    $btnNextBig.click(function () {
        clickLeft();
    });
    $btnPrevLittle.click(function () {
        clickRight();
    });
    $btnNextLittle.click(function () {
        clickLeft();
    });

    $btnEle.click(function () {
        curEleNum = $btnEle.index(this);
        if (!$imageCon.is(':animated') && !$btnConMain.is(':animated') && !$btnWraper.is(':animated')) {
            currentBtn(curEleNum);
            $imageCon.stop(true, true).animate({'left': -970 * curEleNum}, 500);
            if (!$openCloseBtn.hasClass('current')) {
                $btnConMain.stop(true, true).animate({'left': caculateBtnLeft()}, 500);
            }
            btnConClose();
        }
    });

    $openCloseBtn.click(function () {
        if (!$btnWraper.is(':animated')) {
            var $this = $(this),
                type = $this.attr('data-type');
            switch (type) {
                case 'close':
                    btnConOpen();
                    break;
                case 'open':
                    btnConClose();
                    break;
                default:
                    console.log('open and close');
            }
        }
    });

    function btnConOpen() {
        $openCloseBtn.attr('data-type', 'open').addClass('current');
        $btnWraper.stop(true, true).animate({'height': (190 + 20) * 3 - 20}, 500);
        $btnConSlider.width(970 + 10);
        $btnConMain.css({
            'left': 0,
            'width': 970 + btnMarginRight + 20,
            'overflow-y': 'auto'
        });
    }

    function btnConClose() {
        $openCloseBtn.attr('data-type', 'close').removeClass('current');
        $btnWraper.stop(true, true).animate({'height': 190}, 500);
        setTimeout(function () {
            $btnConSlider.width('100%');
            $btnConMain.width(btnConMainWidth).css('left', caculateBtnLeft());
            $btnConMain.css({
                'left': caculateBtnLeft(),
                'width': btnConMainWidth,
                'overflow-y': 'inherit'
            });
        }, 500);
    }


    function caculateBtnLeft() {
        var btnConmainLeft = 0;
        if (curEleNum <= 1) {
            btnConmainLeft = 0;
        } else if (curEleNum >= imgEleLg - 2) {
            btnConmainLeft = -moveDistance * (imgEleLg - 3);
        } else {
            btnConmainLeft = -moveDistance * (curEleNum - 1);
        }
        return btnConmainLeft;
    }

    function clickLeft() {
        if (!$imageCon.is(':animated') && !$btnWraper.is(':animated')) {
            curEleNum++;
            animateLeft(curEleNum);
            animateBtnLeft(curEleNum);
        }
    }

    function clickRight() {
        if (!$imageCon.is(':animated') && !$btnWraper.is(':animated')) {
            curEleNum--;
            animateRight(curEleNum);
            animateBtnRight(curEleNum);
        }
    }

    function animateLeft(num) {
        if (num < imgEleLg) {
            var conLeft = parseInt($imageCon.css('left'));
            $imageCon.stop(true, true).animate({'left': conLeft - 970}, 500);
        } else if (num >= imgEleLg) {
            curEleNum = imgEleLg - 1;
        }
    }

    function animateRight(num) {
        if (num > -1) {
            var conLeft = parseInt($imageCon.css('left'));
            $imageCon.stop(true, true).animate({'left': conLeft + 970}, 500);
        } else if (num <= -1) {
            curEleNum = 0;
        }
    }

    function animateBtnLeft(num) {
        currentBtn(num);
        if (!$openCloseBtn.hasClass('current')) {
            if (num > 1 && num < imgEleLg - 1) {
                var btnLeft = parseInt($btnConMain.css('left'));
                $btnConMain.stop(true, true).animate({'left': btnLeft - moveDistance}, 500);
            }
        }
    }

    function animateBtnRight(num) {
        currentBtn(num);
        if (!$openCloseBtn.hasClass('current')) {
            if (num < imgEleLg - 2 && num > 0) {
                var btnLeft = parseInt($btnConMain.css('left'));
                $btnConMain.stop(true, true).animate({'left': btnLeft + moveDistance}, 500);
            }
        }
    }

    function currentBtn(num) {
        $btnEle.removeClass('current');
        $btnEle.eq(num).addClass('current');
    }
}