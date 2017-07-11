$(function () {


    var dataAjax,
        workArea;

    //死数据激活
    dataAjax = {
        "message": 'sucess',
        "result": [
            {
                "busy": 0,
                "counter": 'A01',
                "island": 'A',
                "passNum": 10,
                "passTotal": 20
            },
            {
                "busy": 1,
                "counter": 'A02',
                "island": 'A',
                "passNum": 10,
                "passTotal": 24
            },
            {
                "busy": 0,
                "counter": 'B01',
                "island": 'B',
                "passNum": 10,
                "passTotal": 20
            },
            {
                "busy": 1,
                "counter": 'B020202',
                "island": 'B',
                "passNum": 13,
                "passTotal": 24
            }
            ,
            {
                "busy": 0,
                "counter": 'C01',
                "island": 'C',
                "passNum": 10,
                "passTotal": 5
            },
            {
                "busy": 1,
                "counter": 'C02',
                "island": 'C',
                "passNum": 10,
                "passTotal": 24
            }
            ,
            {
                "busy": 0,
                "counter": 'D01',
                "island": 'D',
                "passNum": 10,
                "passTotal": 5
            },
            {
                "busy": 1,
                "counter": 'D02',
                "island": 'D',
                "passNum": 10,
                "passTotal": 24
            }
        ]
    };
    workArea = {"param": {"terminal": "T1", "type": ""}};
    renderList(dataAjax, workArea);


    //ios传递数据
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


    //请求版激活
    setupWebViewJavascriptBridge(function (bridge) {
        bridge.registerHandler('getCounterListData', function (data, responseCallback) {

            renderList(data, workArea);

            log('ObjC called testJavascriptHandler with', data);
            var responseData = {'Javascript Says': 'Right back atcha!'};
            log('JS responding with', responseData);
            responseCallback(responseData)
        });
        function log(message, data) {
            console.log(data);
        }
    });

    setupWebViewJavascriptBridge(function (bridge) {
        bridge.registerHandler('getWorkArea', function (data, responseCallback) {
            workArea = JSON.parse(data);

            //死数据激活
            //renderList(dataAjax, workArea);

            log('ObjC called testJavascriptHandler with', data);
            var responseData = {'Javascript Says': 'Right back atcha!'};
            log('JS responding with', responseData);
            responseCallback(responseData)
        });
        function log(message, data) {
            console.log(data);
        }
    });

});

function renderList(dataIos, workArea) {
    var data = {};
    var resultGet = dataIos.result;
    $.each(resultGet, function (i) {
        var island = resultGet[i].island.substring(0, 1);
        if (island in data == false) {
            data[island] = [{
                "name": resultGet[i].counter,
                "status": resultGet[i].busy == true ? 1 : 0,
                "current": resultGet[i].passNum,
                "inten": resultGet[i].passTotal
            }]
        } else {
            data[island].push({
                "name": resultGet[i].counter,
                "status": resultGet[i].busy == true ? 1 : 0,
                "current": resultGet[i].passNum,
                "inten": resultGet[i].passTotal
            })
        }
    });

    var $checkinCon = $('#checkinCon'),
        $letterCon = $('#letterCon'),
        $letterPopup = $('#letterPopup');
    var con = '',
        btn = '';
    $.each(data, function (i, d) {

        if (i != '') {
            btn += '<a id="letterBtn_' + i + '">' + i + '</a>';
        }

        var conin = '';
        if (d.length != 0) {
            $.each(d, function (di, da) {
                var eStatus = '',
                    eClass = '';
                switch (da.status) {
                    case 1:
                        eStatus = '忙碌';
                        eClass = 'yellow';
                        break;
                    case 0:
                        eStatus = '空闲';
                        eClass = 'green';
                        break;
                }
                conin += '<li class="' + eClass + '">' +
                    '<div class="check_name"><h4>' + da.name + '</h4><i>[' + eStatus + ']</i></div>' +
                    '<div class="check_info"><span>当日旅客通过量：<em>' + da.current + '</em></span><span>10分钟内通过量：<em>' + da.inten + '</em></span></div>' +
                    '</li>';
            });
        }

        var conTitle = '';
        if (i != '') {
            if (workArea.param.type == 'sec' || workArea.param.type == 'board') {
                conTitle = '<h3 id="letterCon_' + i + '">' + i + '</h3>'
            } else {
                conTitle = '<h3 id="letterCon_' + i + '">' + i + '岛</h3>'
            }
        }
        con += conTitle + '<ul>' + conin + '</ul>';
    });

    $checkinCon.append(con);
    if (workArea.param.type == 'sec' || workArea.param.type == 'board') {
        $letterCon.remove();
        $letterPopup.remove();
    } else {
        $letterCon.remove();
    }

    var timer;
    $(document).on('tap', '#letterCon a', function () {
        var idName = $(this).attr('id').split('_')[1];
        clearTimeout(timer);
        $letterPopup.html(idName).css('opacity', 1);
        timer = setTimeout(function () {
            $letterPopup.css('opacity', 0);
        }, 1000);
        $("body").scrollTo({toT: parseInt($('#letterCon_' + idName).offset().top)});
    })
}

$.fn.scrollTo = function (options) {
    var defaults = {
        toT: 0,    //滚动目标位置
        durTime: 500,  //过渡动画时间
        delay: 30,     //定时器时间
        callback: null   //回调函数
    };
    var opts = $.extend(defaults, options),
        timer = null,
        _this = this,
        curTop = _this.scrollTop(),//滚动条当前的位置
        subTop = opts.toT - curTop,    //滚动条目标位置和当前位置的差值
        index = 0,
        dur = Math.round(opts.durTime / opts.delay),
        smoothScroll = function (t) {
            index++;
            var per = Math.round(subTop / dur);
            if (index >= dur) {
                _this.scrollTop(t);
                window.clearInterval(timer);
                if (opts.callback && typeof opts.callback == 'function') {
                    opts.callback();
                }
                return;
            } else {
                _this.scrollTop(curTop + index * per);
            }
        };
    timer = window.setInterval(function () {
        smoothScroll(opts.toT);
    }, opts.delay);
    return _this;
};
