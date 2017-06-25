$(function () {

    window.onerror = function (err) {
        log('window.onerror: ' + err)
    }

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

        bridge.registerHandler('testJavascriptHandler', function (data, responseCallback) {
            log('ObjC called testJavascriptHandler with', data)
            var responseData = {'Javascript Says': 'Right back atcha!'}
            log('JS responding with', responseData)
            responseCallback(responseData)
        })


    })

    function log(message, data) {
        console.log(data);
        var result = data.result[0];
        $('#sum').text(result.sum);
        $('#class_all').text(result.class_all);
        $('#fre').text(result.fre);
        $('#pos').text(result.pos);
        $('#bag').text(result.bag);
        $('#bagp').text(result.bagp);
        $('#traSum').text(result.traSum);
        $('#traFre').text(result.traFre);
        $('#traPos').text(result.traPos);
        $('#traBag').text(result.traBag);
        $('#traBagp').text(result.traBagp);
        $('#traBagTra').text(result.traBagTra);
    }


});