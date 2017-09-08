/**
 * Author：zhoushuanglong
 * Time：2017/8/24
 * Description：Description
 */

if (!isPc()) {
    window.location.href = 'http://miyue.8864.com/mobile/'
}

var nodeUrl = 'http://opm.8864.com/api/website',
    serverUrl = 'http://opm.8864.com';

$(function () {
    browserTips();

    /*-------------------------ajax-------------------------*/
    $.ajax({//首页图片
        type: 'GET',
        url: nodeUrl + '/getcolumncontentpage',
        data: {
            column_id: 515,
            pageSize: 5
        },
        dataType: 'jsonp',
        success: function (data) {
            var slide = '',
                intro = '';
            $.each(data.data.data, function (i, d) {
                slide += '<div class="swiper-slide"><a target="_blank" href="' + d.pc_url + '"><img src="' + serverUrl + d.pc_default_img + '"></a></div>'
                intro += ' <span>' + d.title + '</span>'
            });
            $('#imgContent').html(slide);
            $('#newsCon').html(intro);

            newsImgShow();
        }
    });

    $.ajax({//首页新闻列表
        type: 'GET',
        url: nodeUrl + '/getcolumncontentpage',
        data: {
            column_id: 199,
            type: 'article',
            pageSize: 10
        },
        dataType: 'jsonp',
        success: function (data) {
            var str = '';
            $.each(data.data.data, function (i, d) {
                str += '<li><a target="_blank" href="detail.html?column_id=199&id=' + d.id + '">' + d.title + '</a><time>' + d.create_time.split(' ')[0] + '</time> </li>';
            });

            $('#newsListIndex').html(str);
        }
    });


    //新闻列表页
    getArticleList(199, 1);
    $(document).on('click', '#newsPage a', function () {
        getArticleList($(this).data('column'), $(this).data('page'))
    });
    $(document).on('click', '#newsNav a', function () {
        getArticleList($(this).data('column'), 1);

        var $ele = $('#newsNav a');
        $ele.removeClass('active');
        $(this).addClass('active')
    });

    function getArticleList(columnId, pageNum) {
        $.ajax({//新闻列表
            type: 'GET',
            url: nodeUrl + '/getallcolumncontent',
            data: {
                column_id: columnId,
                type: 'article',
                page: pageNum,
                pageSize: 14
            },
            dataType: 'jsonp',
            success: function (data) {
                var list = '';
                $.each(data.data.data, function (i, d) {
                    var columnName = '';
                    switch (d.column_id) {
                        case 199:
                            columnName = '新闻';
                            break;
                        case 517:
                            columnName = '活动';
                            break;
                        case 519:
                            columnName = '公告';
                            break;
                        case 521:
                            columnName = '攻略';
                            break;
                    }

                    list += '<li>' +
                        '<a target="_blank" href="detail.html?column_id=' + d.column_id + '&id=' + d.id + '">' +
                        '<span>[' + columnName + ']</span>' + d.title + '</a>' +
                        '<time>[' + d.create_time.split(' ')[0] + ']</time>' +
                        '</li>';
                });
                $('#newsListPage').html(list);


                var dataIn = data.data;
                if (dataIn.totalPage !== 1) {
                    var prveBtn = (parseInt(dataIn.page) - 1) === 0 ? '' : '<a data-page="' + (parseInt(dataIn.page) - 1) + '" data-column="' + columnId + '">上一页</a>';
                    var page = '<a data-page="1" data-column="' + columnId + '">首页</a>' + prveBtn;
                    for (var i = 1; i <= dataIn.totalPage; i++) {
                        var classStyle = '';
                        if (parseInt(i) === parseInt(dataIn.page)) {
                            classStyle = 'active';
                        }
                        page += '<a data-page="' + i + '" class="' + classStyle + '" data-column="' + columnId + '">' + i + '</a>';
                    }
                    var nextBtn = parseInt(dataIn.page) === dataIn.totalPage ? '' : '<a data-page="' + (parseInt(dataIn.page) + 1) + '" data-column="' + columnId + '">下一页</a>';
                    page += nextBtn + '<a data-page="' + dataIn.totalPage + '" data-column="' + columnId + '">末页</a>';
                    $('#newsPage').html(page);
                }
            }
        });
    }

    //获取新闻详情
    getArticlaDetail(getQueryString('column_id'), getQueryString('id'));

    function getArticlaDetail(columnId, id) {
        $.ajax({
            type: 'GET',
            url: nodeUrl + '/getinfos',
            data: {
                type: 'article',
                column_id: columnId,
                id: id
            },
            dataType: 'jsonp',
            success: function (data) {
                var $newsDetailTitle = $('#newsDetailTitle'),
                    $newsDetailTime = $('#newsDetailTime'),
                    $newsDetailCon = $('#newsDetailCon'),
                    $detailBtnPrev = $('#detailBtnPrev'),
                    $detailBtnNext = $('#detailBtnNext');

                var dataNow = data.data;
                $newsDetailCon.html(dataNow.current.content);
                $newsDetailTime.text(dataNow.current.create_time.split(' ')[0]);
                $newsDetailTitle.text(dataNow.current.title);
                $detailBtnPrev.attr('href', 'detail.html?column_id=' + columnId + '&id=' + dataNow.up.id).text(dataNow.up.title);
                $detailBtnNext.attr('href', 'detail.html?column_id=' + columnId + '&id=' + dataNow.down.id).text(dataNow.down.title);
            }
        });
    }

    /*---------------------首页---------------------*/
    videoPlay('#playVideo');
    $("#copybtn").zclip({
        path: 'js/ZeroClipboard.swf',
        copy: function () {
            return $(this).data("zclip-text");
        },
        afterCopy: function () {
            alert('已复制到剪切板');
        }
    });


    function newsImgShow() {
        new Swiper('#newsShow', {
            pagination: '#newsPageIndex',
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            initialSlide: 2,
            autoplay: 3000,
            autoplayDisableOnInteraction: false,
            coverflow: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true
            },
            onTransitionEnd: function (swiper) {
                var i = swiper.activeIndex;
                var $newsCon = $('#newsCon').find('span');
                $newsCon.hide();
                $newsCon.eq(i).show();
            }
        });
    }

    new Swiper('#personShow', {
        pagination: '#personShow .swiper-pagination',
        paginationClickable: true,
        nextButton: 'a.next-btn',
        prevButton: 'a.prev-btn'
    });


    /*技能*/
    var $imgBtn = $('#imgBtn').find('a'),
        $imgShow = $('#imgShow');
    $imgBtn.click(function () {
        var i = $(this).index();
        $imgShow.attr('src', './img/pc-fig/skill-' + i + '.gif');
        $imgBtn.removeClass('active');
        $(this).addClass('active');
    });

    /*对话*/
    var $dialogBg = $('#dialogBg');
    $('#partFourBtn').find('a').click(function () {
        var i = $(this).index();
        if (i === 0) {
            $dialogBg.removeClass('right');
            $dialogBg.addClass('left');

            $dialogTips.removeClass('right');
            $dialogTips.addClass('left');

            $dialogContent.removeClass('right');
            $dialogContent.addClass('left');
        } else if (i === 1) {
            $dialogBg.removeClass('left');
            $dialogBg.removeClass('right');

            $dialogTips.removeClass('left');
            $dialogTips.removeClass('right');

            $dialogContent.removeClass('left');
            $dialogContent.removeClass('right');
        } else if (i === 2) {
            $dialogBg.removeClass('left');
            $dialogBg.addClass('right');

            $dialogTips.removeClass('left');
            $dialogTips.addClass('right');

            $dialogContent.removeClass('left');
            $dialogContent.addClass('right');
        }
    });


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
});