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

    function rem(num) {
        return num / 24 * parseInt($('html').css('font-size'))
    }
    downloadGame('#downloadBtnOne');
    //新闻列表页
    getArticleList('199,517,519,521', 1);
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
        $.ajax({//首页新闻列表
            type: 'GET',
            url: Url + '/api/website/getallcolumncontent',
            data: {
                column_id: columnId,
                type: 'article',
                page: pageNum,
                pageSize: 8
            },
            dataType: 'json',
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
                    var newTime = d.create_time.split(' ')[0].split('-');
                    var arrTime = newTime[1] + '/' + newTime[2];
                    list += '<li>' +
                        '<a target="_blank" href="details.html?column_id=' + d.column_id + '&id=' + d.id + '">' +
                        '<span>[' + columnName + ']</span>' + d.title + '</a>' +
                        '<time>' + arrTime + '</time>' +
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


    getArticlaDetail(getQueryString('column_id'), getQueryString('id'));

    function getArticlaDetail(columnId, id) {
        $.ajax({
            type: 'GET',
            url: Url + '/api/website/getinfos',
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
                $detailBtnPrev.attr('href', 'details.html?column_id=' + columnId + '&id=' + dataNow.up.id).text(dataNow.up.title);
                $detailBtnNext.attr('href', 'details.html?column_id=' + columnId + '&id=' + dataNow.down.id).text(dataNow.down.title);
            }
        });
    }


    $('#backTop').on('touchstart', function () {
        $(document.body).animate({
            scrollTop: 0
        }, 500)
    })
});

