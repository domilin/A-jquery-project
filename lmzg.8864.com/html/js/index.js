/**
 * Author：zhoushuanglong
 * Time：5/16/2017
 * Description：meng bao
 */

$(function () {
    $('body').on('touchstart', function () {
        $('#mainvideo').get(0).play();
        $('#floatLayer').height($(window).height() + 100);
    });

    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        direction: 'vertical'
    });

    //Ios微信audio自动播放
    wx.config({
        debug: false,
        appId: '',
        timestamp: 1,
        nonceStr: '',
        signature: '',
        jsApiList: []
    });
    wx.ready(function () {

    });

});
