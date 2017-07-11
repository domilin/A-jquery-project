$(function () {
	//调取原生方法
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
/*	
 	//点击昨天时候，调取原生的数据
	setupWebViewJavascriptBridge(function (bridge) { 
        $('#js-yesterday').click(function () {
            bridge.callHandler('testObjcCallback', {
                param: {
                    'fltDate': $('#js-yesterday').attr('data-id'),//传自定义的值
                //    'fltNo': $('#flightNumber').val(); 
                }
            }, function (response) {
                console.log(response);
            })
            return false;
        });
    })	
*/	
	//chart2-init
	var myChart = echarts.init(document.getElementById('chats'));
	var option = {
	    tooltip: {
	        trigger: 'item',
	        confine: true,
	        formatter: "{a} <br/>{b}: {c} ({d}%)"
	    },
	    color: ["#2a98e7", "#50be29", "#ef6354"],
	    series: [
	        {
	            name:'进出港正常率',
	            type:'pie',
	            radius: ['50%', '70%'],
	            avoidLabelOverlap: false,
	            label: {
	                normal: {
	                    show: false,
	                    position: 'center'
	                },
	                emphasis: {
	                    show: false,
	                    textStyle: {
	                        fontSize: '14',
	                        fontWeight: 'bold'
	                    }
	                }
	            },
	            labelLine: {
	                normal: {
	                    show: false
	                }
	            },
	            data:[
	            	{value:203, name:'未执行'},
	            	{value:35, name:'已执行'},
	            	{value:15, name:'取消'}
	            ]
	        }
	    ]
	};
	
	 myChart.setOption(option);
 });