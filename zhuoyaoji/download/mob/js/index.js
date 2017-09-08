/**
 * Author: liushaozong
 * Date: 2017/7/13
 * Time: 11:18
 * Description:Description
 */

$(function () {
    $(document).on('click', 'a.downloadbtn', function () {
        var $this = $(this);
        var useragent = window.navigator.userAgent.toLowerCase();
        if (useragent.indexOf('micromessenger') > 0) {
            $('#shadow').show();
        } else {
            window.location.href = $this.data('href');
        }
        return false;
    })
});

