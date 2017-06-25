$(function () {
    var $cdlPopup = $('ul.cdl_popup'),
        $cdFlightBtn = $('#cdFlightBtn li'),
        $flightFloor = $('#flightFloor'),
        $workArea = $('#workArea');
    $(document).on('tap', '#cdFlightBtn li', function () {
        var n = $cdFlightBtn.index(this);
        $cdlPopup.removeClass('focus');
        $cdlPopup.eq(n).addClass('focus');
    });

    $(document).on('tap', '#cdlPopup0 li', function () {
        $flightFloor.text($(this).text());
        $cdlPopup.removeClass('focus');
    });

    $(document).on('tap', '#cdlPopup1 li', function () {
        var $this = $(this);
        $workArea.text($this.text());
        $workArea.attr('data-type', $this.attr('data-type'));
        $cdlPopup.removeClass('focus');
    });

    $(document).on('tap', function (event) {
        if (event.target.tagName == 'BODY') {
            $cdlPopup.removeClass('focus');
        }
    });

    $('#searchBtn').tap(function () {
        if (!window.localStorage) {
            alert("浏览器支持localstorage");
            return false;
        } else {
            var storage = window.localStorage;
            storage.setItem("terminal", $flightFloor.text());
            storage.setItem("type", $workArea.attr('data-type'));
        }
        return false;
    });


    //ios需要代码
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


    //死数据
    /*var data = {result: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6']};
    renderLi(data.result);*/

    //ios请求
    setupWebViewJavascriptBridge(function (bridge) {
        bridge.registerHandler('getTerminalData', function (data, responseCallback) {
            renderLi(data.result);
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


    setupWebViewJavascriptBridge(function (bridge) {
        $('#searchBtn').tap(function () {
            bridge.callHandler('gotolist', {
                param: {
                    'terminal': $flightFloor.text(),
                    'type': $workArea.attr('data-type')
                }
            }, function (response) {
                console.log(response);
            });
            return false;
        });
    })

});


//航站楼html渲染
function renderLi(data) {
    var str = '';
    $.each(data, function (i, d) {
        str += '<li>' + d + '</li>';
    });
    $('#cdlPopup0').html(str);
}