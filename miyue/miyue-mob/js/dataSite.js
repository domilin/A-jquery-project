/**
 * Author：tantingting
 * Time：2017/8/31
 * Description：Description
 */
$(function () {
    downloadGame('#downloadBtnOne');

    var Url = 'http://opm.8864.com';
    function rem(num) {
        return num / 24 * parseInt($('html').css('font-size'))
    }
    /* 视频轮播*/
    $.ajax({
        type: 'GET',
        url: Url + '/api/website/getcolumncontentpage',
        data: {
            column_id: 515,
            pageSize: 5
        },
        dataType: 'jsonp',
        success: function (res) {
            console.log(res)
            var s="<div class='swiper-slide'><div class='item'><img src='./img/dataImg/vdeo-img1.png'/><div class='icons icon-play'></div></div><span class='item-text'>后宫养成类手机游戏推荐 后宫养成类手机游戏大全</span></div>"
            if(res.code==200){
                var _data=res.data.data,_html="",_page="";
                for(var i=0;i<_data.length;i++){
                    _html+="<a href='"+_data[i].mobile_url+"' class='swiper-slide'><div class='item'><img src='"+Url+_data[i].pc_big_img+"'/></div><span class='item-text'>"+_data[i].title+"</span></a>";
                    _page+="<span class=\"swiper-pagination-bullet\"></span>";
                }
                $(".page2-video-container .swiper-wrapper").html(_html);
                $(".page2-video-container .swiper-pagination").html(_page);
                var dataSwiper2 = new Swiper('.data-page2 .swiper-container', {
                    pagination: '.data-page2 .swiper-pagination'
                });
            }
        }
    })
    /*新闻资讯*/
    var news=new newsList();
    news.init();
    function newsList(){
        //
        this.init=function(){
            var _this=this;
            this.getNewsList("99,517,519,521");
            $(document).on('click', '#newsNav a', function () {
                _this.getNewsList($(this).data('column'));
                var $ele = $('#newsNav a');
                $ele.removeClass('active');
                $(this).addClass('active')
            });
        };
        this.formatDate=function(date){
            var date=date.split(" ")[0].split("-");
            return date[1]+"/"+date[2]
        };
        this.getNewsList=function(column_id){
            var _this=this;
            $.ajax({
                type: 'GET',
                dataType: 'json',
                url: Url+"/api/website/getallcolumncontent",
                data: {"column_id":column_id,"pageSize":"5"},
                success: function (res) {
                    var _html="";
                    if(res.code==200){
                        var _data=res.data.data;
                        for(var i=0;i<_data.length;i++){
                            _html+=_this.htmlStr(_data[i]);
                        }
                        $("#newsListPage").html(_html);
                    }
                }
            })
        }
        this.htmlStr=function(data){
            return "<li><a target='_blank' href='details.html?column_id="+data.column_id+"&amp;id="+data.id+"'><span>[新闻]</span>"+data.title+"</a><time>"+this.formatDate(data.create_time)+"</time></li>";
        }
    }
    /*芈月大百科轮播*/
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: Url+"/api/website/getcolumncontentpage",
        data: {"column_id":"523","type":"article","pageSize":"5"},
        success: function (res) {
            var _html="";
            if(res.code==200){
                var _data=res.data.data;
                for(var i=0;i<_data.length;i++){
                    var _a="a[data-id='"+_data[i].id+"']";
                    $("#encyclopedia .swiper-wrapper").find(_a).attr("href",_data[i].description)
                }
            }
        }
    })
    var dataSwiper4 = new Swiper('.encyclopedia .swiper-container', {
        /*loop: true,*/
        effect: 'coverflow',
        initialSlide:2,
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflow: {
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false
        }
        /*onInit:function(swiper){
            swiper.setWrapperTranslate(rem(-320));
            console.log(swiper)
        },
        onSetTranslate: function(swiper,translate){
            //自定义事件
            // console.log(translate)
        }*/
    });
    /*华服*/
    var costumes=new showCostumes($(".data-page5"));
    costumes.init();
    function showCostumes(page){
        this.swiper='';
        this.page=page;
        this.init=function(){
            var _this=this;
            this.getData(Url+'/api/website/getcolumncontentpage',{"type":"image","column_id":"525","pageSize":"10"},_this.appendHtml);
            $("#womanBtn").on('click',function(){
               // this.sw.destroy(false);
                _this.show(_this.page.find(".woman.swiper-container"),_this.page.find(".male1.swiper-container"))
                _this._click($(this),_this.page.find(".woman.swiper-container"));

            })
            $("#male1Btn").on('click',function(){
                _this.show(_this.page.find(".male1.swiper-container"),_this.page.find(".woman.swiper-container"))
                _this._click($(this),_this.page.find(".male1.swiper-container"));
            })
        };
        this._click=function(el,container){
            el.siblings().removeClass("active");
            el.addClass("active");
            this.initSwiper(container)
        };
        this.show=function(container,other){
            other.css({"display":"none"});
            container.css({"display":"block"});
        };
        this.getHtml=function(data,imgUrl){
            var _heart="";
            for(var i=0;i<parseInt(data.desc);i++){
                _heart+="<div class='heart'></div>"
            }
            var htmlStr="<div class='swiper-slide'>"+
                "<img src='"+imgUrl+"'/><div class='legend'><div>"+
                "<div class='hearts'>"+_heart+"</div><div class='sign'><span class='text-vrl'>"+data.title+"</span></div>"+
                "<div class='desc text-vrl'>"+data.short_title+"</div></div></div></div>";
            return htmlStr;
        };
        this.appendHtml=function(data){
            var _mhtml="",_whtml="",_mpageHtml="",_wpageHtml="",m=0,w=0;
            for(var i=0;i<data.length;i++){
                if(!!data[i].pc_default_img){
                    m++;
                    _mhtml+=this.getHtml(data[i],Url+data[i].pc_default_img);
                    _mpageHtml+="<span class='swiper-pagination-bullet'><div><div></div><span>0"+(m)+"</span><span class='cover-line'></span></div><span>0"+(m)+"</span></span>"

                }
                if(!!data[i].mobile_default_img){
                    w++;
                    _whtml+=this.getHtml(data[i],Url+data[i].mobile_default_img);
                    _wpageHtml+="<span class='swiper-pagination-bullet'><div><div></div><span>0"+(w)+"</span><span class='cover-line'></span></div><span>0"+(w)+"</span></span>"

                }
                //_mhtml+=this.getHtml(data[i],Url+data[i].pc_default_img);
                //_whtml+=this.getHtml(data[i],Url+data[i].mobile_default_img);
                //_pageHtml+="<span class='swiper-pagination-bullet'><div><div></div><span>0"+(parseInt(i)+1)+"</span><span class='cover-line'></span></div><span>0"+(parseInt(i)+1)+"</span></span>"
            }
            _mpageHtml+="<div class='line'></div><div class='prev swiper-button-prev'></div><div class='next swiper-button-next'></div>";
            _wpageHtml+="<div class='line'></div><div class='prev swiper-button-prev'></div><div class='next swiper-button-next'></div>";
            this.page.find(".woman .swiper-wrapper").html(_whtml);
            this.page.find(".woman .swiper-pagination>div").html(_wpageHtml);
            this.page.find(".male1 .swiper-wrapper").html(_mhtml);
            this.page.find(".male1 .swiper-pagination>div").html(_mpageHtml);
            this.show(this.page.find(".woman.swiper-container"),this.page.find(".male1.swiper-container"));
            this.initSwiper(this.page.find(".woman.swiper-container"));
        };
        this.getData=function(url,sendData,fn){
            var _this=this;
            $.ajax({
                type: 'GET',
                dataType: 'json',
                url: url,
                data: sendData,
                success: function (res) {
                    if(res.code==200){
                        fn.call(_this,res.data.data)
                    }

                }
            })
        }
        this.initSwiper=function(_swiper){
            var dataSwiper= new Swiper(_swiper, {
                /* pagination: '.data-page5 .swiper-pagination',*/
                nextButton: _swiper.find('.swiper-button-next'),
                prevButton: _swiper.find('.swiper-button-prev'),
                initialSlide :0,
                onInit:function(swiper){
                    _swiper.find('.swiper-pagination-bullet').removeClass("swiper-pagination-bullet-active");
                    _swiper.find('.swiper-pagination-bullet').eq(0).addClass("swiper-pagination-bullet-active");
                },
                onSlideChangeStart:function(swiper){
                    // console.log(swiper.activeIndex)
                    _swiper.find('.swiper-pagination-bullet').removeClass("swiper-pagination-bullet-active");
                    _swiper.find('.swiper-pagination-bullet').eq(swiper.activeIndex).addClass("swiper-pagination-bullet-active");
                }
            });
            this.swiper=dataSwiper;
        }
    }
    /*随从图鉴*/
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: Url+"/api/website/getskilllist",
        data: {"id":"69"},
        success: function (res) {
            var _html="";
            if(res.code==200){
                var _data=res.data;
                for(var i=0;i<_data.length;i++){
                    _html+="<a href='/miyue-mob/skillDetail.html?id="+_data[i].id+"' class='item'><div class='img-box'><div><img src='"+Url+_data[i].pc_img+"'/></div></div><span>"+_data[i].character+"</span></a>"
                }
                $("#servent .s-contain").html(_html);
            }
        }
    })
    /*视频播放*/
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: Url+"/api/website/getcolumncontentpage",
        data: {"column_id":"527","pageSize":"4"},
        success: function (res) {
            var _html="";
            var s="<div class='item'><div class='video-box'><img src='./img/dataImg/moves-img1.png'/><div class='play'><img src='img/dataImg/icon-play.png'></div></div><p>芈月传手游24日全平台上线 蓝港携手花儿乐视打造影游联动</p></div>";
            if(res.code==200){
                var _data=res.data.data;
                for(var i=0;i<_data.length;i++){
                    _html+="<div class='item'><div class='video-box' data-src='"+_data[i].video_url+"'><img src='"+Url+_data[i].pc_img+"'/><div class='play'><img src='img/dataImg/icon-play.png'></div></div><p>"+_data[i].description+"</p></div>"
                }
                $("#moves .m-contain").html(_html);
                videoPlay(".video-box")
            }
        }
    })
    /*$(".video-box").on("click",function(){
        $(this).find(".play").css({"display":"none"})
        $(this).find("video")[0].play()
    })*/
//回到顶部
    $('.data-page8 .top').on('touchstart', function () {
        $(document.body).animate({
            scrollTop: 0
        }, 500)
    })
})