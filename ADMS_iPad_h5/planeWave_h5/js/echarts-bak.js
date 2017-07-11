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
        'time': ['00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '00:00', '00:30', '01:00', '01:30', '08:00', '02:30', '03:00', '00:00', '00:30', '01:00', '01:30', '11:00', '02:30', '03:00', '00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '00:00', '18:30', '01:00', '01:30', '02:00', '02:30', '03:00', '00:00', '00:30', '01:00', '01:30', '02:00', '22:30', '22:30', '24:00'/*最后一项*/, '00:00'/*对接第一项*/],
        'arrnum': [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0/*最后一项*/, 0/*对接第一项*/],
        'depnum': [0, 0, 0, 0, 0, 7, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0/*最后一项*/, 0/*对接第一项*/]
    };
    log('', data);

    function log(message, data) {
        var $echartsCon = $('#echartsCon'),
            $echartsMask = $('#echartsMask'),
            $echartsMaskWrap = $('#echartsMaskWrap'),
            $clickVal = $('#clickVal'),
            $timeVal = $('#timeVal'),
            $echartsWrap = $('#echartsWrap'),
            $outFlight = $('#outFlight'),
            $circlePoint = $('#circlePoint'),
            $inFlight = $('#inFlight');

        var eRem = parseInt($('body').css('font-size')),
            eWidth = 100 * parseInt(eRem),
            eLength = data.time.length;
        var wh = parseInt($echartsWrap.height()),
            ch = parseInt(wh - 1.8 * eRem);
        var maxArr = data.depnum.concat(data.arrnum),
            maxh = Math.ceil(Math.max.apply(null, maxArr) / 100) * 100;


        $echartsMask.css({
            height: ch + 0.2 * eRem,
            width: eWidth
        });
        $echartsMaskWrap.css({
            left: 1,
            height: ch - 40 + eRem * 0.5,
            width: 40
        });
        $echartsCon.css({
            height: ch,
            width: eWidth
        });
        $clickVal.css({
            height: ch - 40,
            width: eWidth - 40 + 1,
            left: -1
        });
        $timeVal.css({
            bottom: 1.85 * eRem,
            height: 40,
            width: eWidth - 40 + 1
        });


        var str = '',
            stime = '';
        for (var i = 0; i < eLength; i++) {
            str += '<a><span></span></a>';
            stime += '<span>' + data.time[i] + '</span>'
        }
        $clickVal.html(str);
        $timeVal.html(stime);


        var $ea = $clickVal.children('a'),
            $es = $timeVal.children('span');


        //默认
        $outFlight.text(data.depnum[0]);
        $inFlight.text(data.arrnum[0]);


        //点击元素高宽
        $ea.width((eWidth - 40) / (eLength - 1));
        $ea.eq(eLength - 1).hide();
        $es.width((eWidth - 40) / (eLength - 1));
        $es.eq(eLength - 1).hide();


        //曲线显示区域滚动监听
        $(document).on('touchstart', '#echartsWrap', function () {
            $circlePoint.hide();
            $ea.removeClass('focus');
        });

        //点击
        $(document).on('tap', '#clickVal a', function () {
            var i = $ea.index(this),
                $this = $(this);

            var ph = parseInt($this.height()),
                pw = parseInt($this.width()),
                pl = parseInt($this.offset().left),
                pt = parseInt($this.offset().top);

            $circlePoint.css({
                left: pl,
                top: pt,
                display: 'block',
                height: ph,
                width: pw
            });


            if (parseInt($(window).width()) >= 710) {
                $circlePoint.children('span.green').css('bottom', data.depnum[i] / maxh * ph - 0.3 * eRem);
                $circlePoint.children('span.blue').css('bottom', data.arrnum[i] / maxh * ph - 0.3 * eRem);
            } else {
                $circlePoint.children('span.green').css('bottom', data.depnum[i] / maxh * ph - 0.6 * eRem);
                $circlePoint.children('span.blue').css('bottom', data.arrnum[i] / maxh * ph - 0.6 * eRem);
            }


            $outFlight.text(data.depnum[i]);
            $inFlight.text(data.arrnum[i]);
            $es.removeClass('focus');
            $es.eq(i).addClass('focus');
            $ea.removeClass('focus');
            $this.addClass('focus');
            return false;
        });

        //y轴最大值
        var ymax = 5,
            contactArr = data.arrnum.concat(data.depnum);
        var contactArrMax = Math.max.apply(null, contactArr);
        if (contactArrMax > 5) {
            ymax = contactArrMax;
        }


        var myChart = echarts.init(document.getElementById('echartsCon')),
            myChartY = echarts.init(document.getElementById('echartsMask'));


        function option(color) {
            return {
                title: null,
                tooltip: null,
                toolbox: null,
                legend: null,
                color: color,
                calculable: false,
                grid: {
                    bottom: '40',
                    left: '40',
                    right: '0',
                    top: '5',
                    containLabel: false
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: data.time,
                    splitLine: {
                        lineStyle: {
                            color: ['#f0f0f0'],
                            type: 'solid'
                        }
                    },
                    axisLabel: {
                        formatter: function (value, index) {
                            return value;
                        },
                        interval: 0,
                        rotate: '45',
                        textStyle: {
                            color: '#dbdbdb',
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
                        name: '航班一',
                        type: 'line',
                        showSymbol: false,
                        stack: '',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data: data.depnum
                    },
                    {
                        name: '航班二',
                        type: 'line',
                        showSymbol: false,
                        stack: '',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data: data.arrnum
                    }
                ]
            }
        }


        myChart.setOption(option(['#add415', '#62baec']));
        myChartY.setOption(option(['#fff', '#fff']));
    }

});

