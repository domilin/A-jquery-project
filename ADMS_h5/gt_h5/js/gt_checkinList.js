$(function () {


    var dataAjax,
        workArea;

    //死数据激活
    /*dataAjax = {
        "message": 'sucess',
        "result": [
            {
                "busy": false,
                "counter": 'A01',
                "island": 'Egland岛',
                "passNum": 10,
                "passTotal": 20
            },
            {
                "busy": false,
                "counter": 'A02',
                "island": 'Egland岛',
                "passNum": 10,
                "passTotal": 24
            },
            {
                "busy": false,
                "counter": 'B01',
                "island": 'Egland岛',
                "passNum": 10,
                "passTotal": 20
            },
            {
                "busy": true,
                "counter": 'B020202',
                "island": null,
                "passNum": 13,
                "passTotal": 24
            }
            ,
            {
                "busy": true,
                "counter": 'C01',
                "island": null,
                "passNum": 10,
                "passTotal": 5
            },
            {
                "busy": true,
                "counter": 'C02',
                "island": null,
                "passNum": 10,
                "passTotal": 24
            }
            ,
            {
                "busy": false,
                "counter": 'D01',
                "island": null,
                "passNum": 10,
                "passTotal": 5
            },
            {
                "busy": false,
                "counter": 'D02',
                "island": null,
                "passNum": 10,
                "passTotal": 24
            }
        ]
    };
    workArea = {"param": {"terminal": "T1", "type": ""}};
    renderList(dataAjax, workArea);*/


    if (!window.localStorage) {
        alert("浏览器支持localstorage");
        return false;
    } else {
        var storage = window.localStorage;
        workArea = {
            "param": {
                "terminal": storage.getItem("terminal"),
                "type": storage.getItem("type") ? storage.getItem("type") : ''
            }
        }
    }

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

    setupWebViewJavascriptBridge(function (bridge) {
        bridge.registerHandler('getCounterListData', function (data, responseCallback) {

            if (data.result.length == 0) {
                $('div.loading').text('暂时没有数据');
            } else {
                $('div.loading').text('加载完成').remove();
            }
            renderList(data, workArea);

            log('ObjC called testJavascriptHandler with', data);
            var responseData = {'Javascript Says': 'Right back atcha!'};
            log('JS responding with', responseData);
            responseCallback(responseData)
        })
    });
    function log(message, data) {
        console.log(message);
        console.log(data);
    }
});

function renderList(dataIos, workArea) {
    var data = {};
    var resultGet = dataIos.result;
    $.each(resultGet, function (i) {
        /*var oIsland = resultGet[i].island,
            island = oIsland ? oIsland.substring(0, oIsland.length - 1) : '';*/
        var island = resultGet[i].island;
        if (island in data == false) {
            data[island] = [{
                "name": resultGet[i].counter,
                "status": resultGet[i].busy ? 1 : 0,
                "current": resultGet[i].passNum,
                "inten": resultGet[i].passTotal
            }]
        } else {
            data[island].push({
                "name": resultGet[i].counter,
                "status": resultGet[i].busy ? 1 : 0,
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
                //conTitle = '<h3 id="letterCon_' + i + '">' + i + '</h3>'
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
        $letterCon.append(btn);
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