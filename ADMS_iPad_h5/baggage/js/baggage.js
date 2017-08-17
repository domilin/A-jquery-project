var data = [
    {
        time: '2017-7-24 18:20:20',
        state: '抱歉！行李未到达'
    }, {
        time: '2017-7-25 18:20:20',
        state: '已装仓'
    }, {
        time: '2017-7-26 18:20:20',
        state: '已打包'
    }, {
        time: '2017-7-26 18:20:20',
        state: '已安检'
    }, {
        time: '2017-7-26 18:20:20',
        state: '已托运'
    }
];
$(function () {
    var str = '';
    for (var i in data) {
        var time = data[i].time.split(' ');
        
        // alert(data[i].state);
        var s = '抱歉';//包含的关键字
        if(data[i].state.indexOf(s)!=-1){
            $('.search').show();

        }
        str += '<div class="flow_con">' +
            '<h2 class="time">' + time[0] + '</br>' + time[1] + '</h2>' +
            '<div class="v_line"></div>' +
            '<div class="dot"></div>' +
            '<h3 class="state">' + data[i].state + '</h3>' +
            '</div>'
        
    }

    $('.content').html(str);

    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true
    });

});

/*
 $.ajax({
 type: 'GET',
 url: '',
 data: {},
 dataType: 'json',
 success: function (data) {
 var str = '';
 $.each(data, function (d, i) {
 str += '<li>' + d.id + '</li>';
 $(element).html(str);
 });
 }
 });*/