(function (doc, win) {
    var docEl = doc.documentElement;
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    var recalc = function () {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        docEl.style.fontSize = (clientWidth * 29 / 750).toFixed(5) + 'px';
    };
    recalc();
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

$(function () {

    var $echartsCon = $('#echartsCon'),
        $clickVal = $('#clickVal'),
        $outFlight = $('#outFlight'),
        $inFlight = $('#inFlight');

    var data = {
        'names': ['00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '00:00', '00:30', '01:00', '01:30', '08:00', '02:30', '03:00', '00:00', '00:30', '01:00', '01:30', '11:00', '02:30', '03:00', '00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '00:00', '18:30', '01:00', '01:30', '02:00', '02:30', '03:00', '00:00', '00:30', '01:00', '01:30', '02:00', '22:30', '23:00'],
        'dataone': [345, 575, 345, 12, 78, 432, 465, 345, 575, 345, 12, 78, 432, 465, 345, 575, 345, 12, 78, 432, 465, 345, 575, 345, 12, 78, 432, 465, 345, 575, 345, 12, 78, 432, 465, 345, 575, 345, 12, 78, 432, 465],
        'datatwo': [456, 23, 34, 465, 23, 345, 234, 456, 23, 34, 465, 23, 345, 234, 456, 23, 34, 465, 23, 345, 234, 456, 23, 34, 465, 23, 345, 234, 456, 23, 34, 465, 23, 345, 234, 456, 23, 34, 465, 23, 345, 234]
    };

    $outFlight.text(data.dataone[0]);
    $inFlight.text(data.datatwo[0]);

    var eRem = parseInt($('body').css('font-size')),
        eWidth = 280 * eRem,
        eLength = data.names.length;

    $echartsCon.width(eWidth);
    $clickVal.width(eWidth);

    var str = '';
    for (var i = 0; i < eLength; i++) {
        str += '<a></a>';
    }
    $clickVal.html(str);

    var $ea = $clickVal.children('a');
    //默认
    $ea.eq(0).addClass('focus');
    $outFlight.text(data.dataone[0]);
    $inFlight.text(data.datatwo[0]);
    $ea.width(eWidth / eLength);
    //点击
    $(document).on('tap', '#clickVal a', function () {
        var i = $ea.index(this),
            $this = $(this);
        $outFlight.text(data.dataone[i]);
        $inFlight.text(data.datatwo[i]);
        $ea.removeClass('focus');
        $this.addClass('focus');
        return false;
    });

    var myChart = echarts.init(document.getElementById('echartsCon'));

    option = {
        tooltip: null,
        toolbox: null,
        legend: null,
        color: ['#add415', '#62baec'],
        calculable: false,
        grid: {
            bottom: '30',
            left: '0',
            right: '0',
            top: '0',
            containLabel: false
        },
        xAxis: [
            {
                type: 'category',
                data: data.names,
                splitLine: {
                    lineStyle: {
                        color: ['#f0f0f0'],
                        type: 'dashed'
                    }
                },
                axisLabel: {
                    formatter: function (value, index) {
                        return value;
                    },
                    textStyle: {
                        color: '#6f6f6f',
                        fontSize: 14
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#dbdbdb'
                    }
                },
                axisTick: {
                    lineStyle: {
                        color: '#dbdbdb'
                    }
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                splitLine: false,
                axisLine: {
                    lineStyle: {
                        color: '#dbdbdb'
                    }
                }
            }
        ],
        series: [
            {
                name: '航班一',
                type: 'bar',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                data: data.dataone
            },
            {
                name: '航班二',
                type: 'bar',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                data: data.datatwo
            }
        ]
    };

    myChart.setOption(option);

});

