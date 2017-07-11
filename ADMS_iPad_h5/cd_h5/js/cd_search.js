$(function () {

    var $dateshow = $('#dateshow'),
        $ayear = $('#ayear'),
        $amonth = $('#amonth'),
        $adate = $('#adate');
    var date = new Date(),
        oyear = date.getFullYear(),
        omonth = date.getMonth() + 1,
        odate = date.getDate();

    $dateshow.val(oyear + '-' + omonth + '-' + odate);
    $ayear.text(oyear);
    $amonth.text(omonth);
    $adate.text(odate);
    $dateshow.calendar({
        okFunc: function($this){
            var val = $this.val(),
                date = val.split('-');
            $ayear.text(date[0]);
            $amonth.text(date[1]);
            $adate.text(date[2]);
        }
    });
  
  
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
        $('#searchBtn').click(function () {
            bridge.callHandler('testObjcCallback', {
                param: {
                    'fltDate': $dateshow.val(),
                    'fltNo': $('#flightNumber').val()
                }
            }, function (response) {
                console.log(response);

            })

            return false;
        });


    })
  
    
});


