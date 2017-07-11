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

    window.onerror = function (err) {
        log('window.onerror: ' + err)
    };

    function setupWebViewJavascriptBridge(callback) {
        if (window.WebViewJavascriptBridge) {
            return callback(WebViewJavascriptBridge);
        }
        if (window.WVJBCallbacks) {
            return window.WVJBCallbacks.push(callback);
        }
        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function () {
            document.documentElement.removeChild(WVJBIframe)
        }, 0)
    }

    setupWebViewJavascriptBridge(function (bridge) {
        bridge.registerHandler('getHbbData', function (data, responseCallback) {
            log('ObjC called testJavascriptHandler with', data.result);
            var responseData = {'Javascript Says': 'Right back atcha!'};
            log('JS responding with', responseData);
            responseCallback(responseData)
        })
    });

    var data = {
        'time': ['00:00', '00:30', '01:00', '01:30', '02:00', '02:30',
            '03:00', '03:30', '04:00', '04:30', '05:00', '05:30', '06:00',
            '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
            '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
            '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30','22:00', '22:30','23:00', '23:30'/*最后一项*/, '24:00'/*对接第一项*/],
        'arrnum': [286, 235, 332, 375, 278, 332, 465, 385, 525, 445, 312, 378, 432, 485, 345, 525, 425, 386, 478, 432, 387, 345, 505, 345, 312, 478, 403, 455, 345, 435, 345, 264, 378, 432, 465, 345, 475, 345, 412, 378, 432, 365, 352,345, 505, 345, 312, 478/*最后一项*/, 473/*对接第一项*/],
        'depnum': [128, 103, 134, 145, 223, 235, 189, 276, 223, 204, 365, 323, 245, 234, 256, 223, 334, 315, 213, 345, 234, 356, 183, 304, 255, 213, 305, 284, 326, 243, 184, 200, 180, 265, 294, 356, 223, 314, 235, 280, 345, 234, 275,315, 213, 345, 234, 356/*最后一项*/, 234/*对接第一项*/]
//        'quarantinearea': [256, 225, 332, 375, 298, 332, 245, 385, 525, 445, 312, 378, 432, 485, 345, 525, 425, 386, 478, 432, 387, 345, 505, 345, 312, 478, 403, 455, 345, 435, 345, 264, 378, 432, 465, 345, 475, 345, 412, 378, 432, 365, 352,345, 505, 345, 312, 478/*最后一项*/, 473/*对接第一项*/],
  
    };
    log('', data);

    function log(message, data) {
        var $echartsCon = $('#echartsCon'),
            $echartsWrap = $('#echartsWrap'),
            $outFlight = $('#outFlight'),
            $inFlight = $('#inFlight');


        //y轴最大值
        var ymax = 5,
            contactArr = data.arrnum.concat(data.depnum);
        var contactArrMax = Math.max.apply(null, contactArr);
        if (contactArrMax > 5) {
            ymax = contactArrMax;
        }


        var axisLabelFontSize = 16,//横轴时间刻度字体大小
            symbolSize = 15,//当前标记大小
            egTop = 1.4;
        if (parseInt($(window).width()) > 710) {
            axisLabelFontSize = 20;
            symbolSize = 20;
            egTop = 1
        }

        var eRem = parseInt($('body').css('font-size')),
            eWidth = parseInt($(window).width()),
            eHeight = parseInt(parseInt($echartsWrap.height()) - parseInt($('div.charts_eg').height()) - egTop * eRem);
        $echartsCon.css({
            height: '278',
            width: eWidth
        });

        var myChart = echarts.init(document.getElementById('echartsCon'));
        myChart.setOption(option(['#add415', '#62baec']));

        //默认
//        $outFlight.text(data.depnum[0]);
//        $inFlight.text(data.arrnum[0]);

        function option(color) {
            return {
                title: null,
                toolbox: null,
                legend: null,
                color: color,
                grid: {
                    bottom: '50',
                    left: '40',
                    right: '0',
                    top: '5',
                    containLabel: false
                },
                tooltip: {
                    trigger: 'axis',
                    showContent: false,
                    formatter: '<div class="charts_eg">' +
                    '<div class="ce_item"><span>{c0}</span><em>{a0}</em></div>' +
                    '<div class="ce_item"><span>{c1}</span><em>{a1}</em></div>' +
                    '</div>',
                    position: [10, 10],
                    padding: 0,
                    backgroundColor: '#f6f7f9',
                    axisPointer: {
                        lineStyle: {
                            color: '#f48993'
                        }
                    }
                },
                dataZoom: [
                    {
                        type: 'inside',
                        start: 0,
                        end: 20
                    }
                ],
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: data.time,
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: ['#f0f0f0'],
                            type: 'solid'
                        }
                    },
                    axisLabel: {
                        formatter: function (value, index) {
                            return value;
                        },
                        rotate: '45',
                        margin: 12,
                        textStyle: {
                            color: '#6f6f6f',
                            fontFamily: '微软雅黑 Light',
                            fontSize: axisLabelFontSize
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
                },
                yAxis: [
                    {
                        type: 'value',
                        max: ymax,
                        splitLine: false,
                        axisLabel: {
                            textStyle: {
                                color: '#dbdbdb'
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
                series: [
                    {
                        name: '出港航班总量',
                        type: 'line',
                        showSymbol: false,
                        /*symbol: 'image://url',*/
                        symbol: 'pin',
                        symbolSize: symbolSize,
                        data: data.depnum
                    },
                    {
                        name: '进港航班总量',
                        type: 'line',
                        /*symbol: 'image://url',*/
                        symbol: 'pin',
                        symbolSize: symbolSize,
                        showSymbol: false,
                        data: data.arrnum
                    },
                    {
                         name: '隔离区',
                         type: 'line',
                         showSymbol: false,
                         /*symbol: 'image://url',*/
                         symbol: 'pin',
                         symbolSize: symbolSize,
                         data: data.quarantinearea
                    }
                ]
            }
        }
    }

});

