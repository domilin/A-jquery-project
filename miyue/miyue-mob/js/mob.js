/**
 * Author: liushaozong
 * Date: 2017/7/13
 * Time: 11:18
 * Description:Description
 */
//var Url = 'http://192.168.84.1:5000';
var Url = 'http://opm.8864.com';
var UrlImg = 'http://opm.8864.com'

$(function () {
    videoPlay('#playVideo');

    downloadGame('#downloadBtnOne');
    downloadGame('#downloadBtnTwo');

    var $dialogContent = $('#dialogContent'),
        $dialogTips = $('#dialogTips');
    $dialogTips.click(function () {
        $(this).addClass('active');
        $dialogContent.addClass('active');

        setInterval(function () {
            dialog();
        }, 2000)
    });

    var i = 0;
    dialog();

    function dialog() {
        if (i <= 4) {
            $dialogContent.find('p').removeClass('active');
            $dialogContent.find('p').eq(i).addClass('active');
            i++;
        }
    }

    $(document).on('click', '#copybtn', function () {
        Copy($(this).data('zclip-text'));
    });

    function Copy(str) {
        var save = function (e) {
            e.clipboardData.setData('text/plain', str);
            e.preventDefault();
        };
        document.addEventListener('copy', save);
        document.execCommand('copy');
        document.removeEventListener('copy', save);
        alert('复制成功！');
    }


    /*----------------shaozong----------------*/
    function rem(num) {
        return num / 24 * parseInt($('html').css('font-size'))
    }

    var swiper1 = new Swiper('.page3 .swiper-container', {
        pagination: '.page3 .swiper-pagination',
        paginationClickable: true,
        spaceBetween: 0,
        loop: true,
        onTransitionEnd: function (swiper) {
            $('.swiper-slide-active').children('.p1').addClass('img-flash').parent().siblings().children('.p1').removeClass('img-flash');
            $('.swiper-slide-active').children('.p1-t').addClass('rightImg').parent().siblings().children('.p1-t').removeClass('rightImg');
        }
    });

    newImg(515)

    function newImg(column_id) {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: Url + '/api/website/getcolumncontentpage',
            data: {
                pageSize: 10,
                column_id: column_id
            },
            success: function (data) {
                var str = '',
                    dataArr = data.data.data;
                console.log(dataArr)
                $.each(dataArr, function (i) {
                    console.log(dataArr)
                    str += '<div class="swiper-slide slide' + (i + 1) + '"><a href="' + dataArr[i].mobile_url + '" target="_blank"><img src="' + UrlImg + dataArr[i].mobile_default_img + '" alt=""></a></div>'
                })
                $('.page6 .swiper-wrapper').append(str);
                var swiper2 = new Swiper('.page6 .swiper-container', {
                    pagination: '.page6 .swiper-pagination',
                    nextButton: '.page6 .swiper-button-next',
                    prevButton: '.page6 .swiper-button-prev',
                    paginationClickable: true,
                    spaceBetween: 0,
                    loop: true,
                });
            }
        })
    }

    window.addEventListener("deviceorientation", function (event) {
        $('.page5-img').css({
            'left': event.gamma * 2 + rem(-500)
        });
    }, true);

    $('.page6 .top').on('touchstart', function () {
        $(document.body).animate({
            scrollTop: 0
        }, 500)
    })

    $('p.skill-btn').on('click', function () {
        $('.gif-div p').eq(0).find('img').attr('src', './img/zhangzui.gif');
        var index = $(this).index();
        $(this).children('span').show().parent()
            .siblings().children('span').hide();
        $('.gif-div p').eq(index).addClass('active').siblings().removeClass('active')
    })


});

