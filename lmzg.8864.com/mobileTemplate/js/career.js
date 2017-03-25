//fontRem
var fontRem = parseInt($('html').css('font-size'));

//skill swiper
var skillData = {
    magic: [
        {
            title: '烈风斩',
            intro: '战士快速的向前方拔剑挥砍两次，对前方敌人造成物理伤害。'
        }, {
            title: '破风斩',
            intro: '战士转身跃起并对前方敌人挥剑斩击，对前方敌人造成的物理伤害。'
        }, {
            title: '怒涛',
            intro: '战士跃起空中并施展强力的三次踢击，造成物理伤害。'
        }, {
            title: '龙卷',
            intro: '战士快速的回转身体，如同龙卷风般对周围的敌人进行猛烈的多段斩击最后击飞敌人，造成物理伤害。'
        }, {
            title: '突风',
            intro: '战士快速向前拔剑突刺，造成物理伤害。'
        }, {
            title: '风牙斩',
            intro: '战士手持双剑向前方跃起并施展十字交叉斩击，造成物理伤害并使敌人浮空。'
        }, {
            title: '海啸',
            intro: '战士跃起空中旋转身体并踢出强力的一击，造成物理伤害。'
        }, {
            title: '裂空击',
            intro: '战士挥舞双剑向前上方跃起攻击，对敌人造成物理伤害。'
        }, {
            title: '深渊蔑噬',
            intro: '战士旋转身体同时舞动双剑两次，然后向身后奋力刺击，对敌人造成物理伤害。'
        }, {
            title: '暗礁',
            intro: '战士浮空或硬直后迅速调整身姿后翻倒勾攻击，造成物理伤害。'
        }, {
            title: '逆流',
            intro: '战士倒地后迅速调整身姿施展回旋斩击，造成物理伤害。'
        }, {
            title: '翻腾',
            intro: '战士迅速向前方指定方向翻滚5.5米。'
        }, {
            title: '怒吼',
            intro: '战士发出怒吼，使身周20米半径范围内的敌人对自己瞬间提升仇恨，吸引敌人的火力。'
        }, {
            title: '剑格挡',
            intro: '战士举起双剑，快速挡在自己面前，使自己受到的伤害降低，并进入霸体状态(不会进入受控状态)。'
        }
    ],
    hunter: [
        {
            title: '连环射击',
            intro: '赏金猎人拔出双枪向前方发射连环贯通子弹，对前方敌人造成物理伤害。'
        }, {
            title: '魔能轰炸',
            intro: '向后翻身并向前方区域投掷魔能炸弹，对前方敌人进行轰炸造成魔法伤害。'
        }, {
            title: '封印炸弹',
            intro: '赏金猎人手持双枪向前方射出两枚炸弹，造成魔法伤害。'
        }, {
            title: '子弹风暴',
            intro: '赏金猎人将双枪启动连射模式，对前方敌人进行扫射，造成物理伤害并将敌人击飞。'
        }, {
            title: '回旋踢',
            intro: '赏金猎人转身踢击面前的敌人，造成物理伤害并击退敌人。'
        }, {
            title: '枪之启幕',
            intro: '赏金猎人操纵浮游炮对前方敌人进行攻击，造成魔法伤害。'
        }, {
            title: '枪之回响',
            intro: '赏金猎人操纵浮游炮排成纵列对前方敌人进行射击，造成物理伤害。'
        }, {
            title: '枪之狂舞',
            intro: '赏金猎人操纵浮游炮飞向前方空中对下方地面进行射击，造成物理伤害。'
        }, {
            title: '枪之终曲',
            intro: '赏金猎人将双枪启动散射模式，对前方扇形区域的敌人进行扫射，造成物理伤害并将敌人击飞。'
        }, {
            title: '回身射击',
            intro: '赏金猎人被浮空或硬直后迅速调整身姿并向四周拔枪射击，造成物理伤害。'
        }, {
            title: '隐蔽射击',
            intro: '赏金猎人被击倒后迅速向后方跃起同时拔枪射击，造成魔法伤害。'
        }, {
            title: '闪避',
            intro: '赏金猎人迅速朝指定方向侧翻移动5.5米。'
        }, {
            title: '护甲破坏',
            intro: '赏金猎人用腐蚀魔法攻击目标，使目标的护甲降低。'
        }, {
            title: '治愈魔弹',
            intro: '赏金猎人用武器发出治愈魔弹，恢复前方友军生命。'
        }
    ],
    puppet: [
        {
            title: '半月斩',
            intro: '傀儡师用力挥舞镰刀，对前方敌人造成物理伤害。'
        }, {
            title: '连环斩',
            intro: '傀儡师用力旋转镰刀，对前方敌人造成物理伤害。'
        }, {
            title: '封印炸弹',
            intro: '赏金猎人手持双枪向前方射出两枚炸弹，造成魔法伤害。'
        }, {
            title: '回旋斩',
            intro: '傀儡师掷出回旋的镰刀将前方的敌人聚拢至身前，并对敌人造成物理伤害。'
        }, {
            title: '月轮回',
            intro: '傀儡师手持镰刀快速旋转自身对自身周围的敌人进行多段斩击最后将敌人击飞。'
        }, {
            title: '锁魂手',
            intro: '傀儡师召唤虚空之爪将敌人拉至自己面前同时造成魔法伤害。'
        }, {
            title: '噩梦之爪',
            intro: '傀儡师召唤虚空之爪对面前的敌人进行两次挥击，造成魔法伤害。'
        }, {
            title: '禁断牢狱',
            intro: '傀儡师操纵虚空之爪进行横扫并锤击，造成物理伤害。'
        }, {
            title: '虚空震荡',
            intro: '傀儡师操纵虚空之爪进行三次震地锤击，造成物理伤害。'
        }, {
            title: '无限地狱',
            intro: '傀儡师向前方连续发射数个虚空之爪攻击，之后跃向前方奋力斩击，造成物理伤害并将敌人击飞。'
        }, {
            title: '血色绽放',
            intro: '傀儡师倒地后立刻旋转镰刀并起身反击，对前方敌人造成物理伤害。'
        }, {
            title: '幻视之影',
            intro: '傀儡师幻化为一道虚空幻影向指定方向快速移动5.5米。'
        }, {
            title: '恶魔之嘲',
            intro: '来自傀儡师的蔑视，噩梦之爪使身周20米半径范围内的敌人对自己瞬间提升仇恨，吸引敌人的火力。'
        }, {
            title: '暗护之手',
            intro: '傀儡师全力加持噩梦之爪挡在身前，使自己受到的伤害降低，并进入霸体状态(不会进入受控状态)。'
        }
    ],
    soldier: [
        {
            title: '寒冰镜像',
            intro: '魔导师用寒冰迅速制造一个自己的镜像。该镜像不断向前方发射冰冻弹，一段时间后爆炸。'
        }, {
            title: '冰封领域',
            intro: '魔导师用全身之力，迅速将身体周围的空气冻结，阻止敌人靠近。'
        }, {
            title: '炎龙弹',
            intro: '魔导师迅速挥手向前方发射一发火焰弹。'
        }, {
            title: '冰千针',
            intro: '魔导师将冰魔法灌入地面，在敌人脚下生成一个冰冻陷阱。短时间后区域内生成大量由下而上的冰针。'
        }, {
            title: '炎龙咆哮',
            intro: '魔导师向前方连续快速发射三发火焰弹。多次施放此技能后，魔导师改为将向前方发射一发巨型火焰弹'
        }, {
            title: '炎龙连弹',
            intro: '魔导师向前方连续发射三发火焰弹。'
        }, {
            title: '治疗术',
            intro: '单个友方目标立刻回复一定生命值，并持续治疗一段时间。'
        }, {
            title: '力量祝福',
            intro: '为单个友方目标增加伤害输出。'
        }, {
            title: '烈焰禁地',
            intro: '魔导师迅速在身体周围放置若干个烈焰符文，将敌人浮空。'
        }, {
            title: '治疗链',
            intro: '为最近的友方目标和自己回复一定生命值，然后转而治疗附近的下一个目标。如果施法者在一支小队中，则治疗链只会治疗其队友。'
        }, {
            title: '闪电罗网',
            intro: '魔导师发射多束闪电，将前方一定范围内的敌人聚集到一起。'
        }, {
            title: '雷霆炙烤',
            intro: '魔导师用闪电，对前方的敌人轮番点击。'
        }, {
            title: '闪现',
            intro: '向某一方向迅速移动5.5m。过程中处于霸体状态（不会被打硬直），并且不受伤害。'
        }, {
            title: '烈焰曼陀罗',
            intro: '魔导师将身体周围的烈焰符文引爆，并向四周发射击退敌人。'
        }, {
            title: '天罚',
            intro: '魔导师召唤从天而降的雷电，对前方大范围内敌人造成巨大伤害。'
        }
    ]
};

var weaponsArr = {},
    originalArr = {};

var numArr = [0, 1, 2, 3],
    weaponsrlArr = ['/enchanter_weap', '/nicole_weap', '/puppeteer_weap', '/muladi_weap'],
    originalUrlArr = ['/enchanter_original', '/nicole_original', '/puppeteer_original', '/muladi_original'],
    careerArr = ['magic', 'hunter', 'puppet', 'soldier'];

var httpUrl = 'http://lmzg.8864.com',
    imgUrl = 'http://img.linekong.com';

$(function () {

    for (var i in numArr) {
        (function (i) {
            skillSwiper('#careerSkill' + numArr[i]);
            videoPlay('#playVideo' + numArr[i]);
            getBigImg('#careerSkill' + numArr[i], weaponsrlArr[i], weaponsArr);
            getBigImg('#careerSkill' + numArr[i], originalUrlArr[i], originalArr);
            swiperRender('#careerWeapons' + numArr[i], careerArr[i], weaponsrlArr[i], function (ele) {
                weaponsSwiper(ele);
                bigImgPop('#careerWeapons' + numArr[i] + ' div.swiper-slide', weaponsArr);
            });
            swiperRender('#careerOriginal' + numArr[i], careerArr[i], originalUrlArr[i], function (ele) {
                orginalSwiper(ele);
                bigImgPop('#careerOriginal' + numArr[i] + ' div.swiper-slide', originalArr);
            });
        })(i);
    }

    setRotateY();

    pageRotateY();

    $('div.career-item').addClass('current');

});


//bigImgGet
function getBigImg(ele, url, arr) {
    arr[$(ele).attr('data-type')] = [];
    var arrTemp = arr[$(ele).attr('data-type')];
    ajaxGet(httpUrl + url, function (data) {
        $.each(data, function (i, d) {
            arrTemp.push(d.filePath);
        });
    });
}

//video play
function videoPlay(ele) {
    var $popmask = $('div.popmask'),
        $videoWrap = $('div.video-wrap'),
        $close = $('a.close-video'),
        $videoCon = $videoWrap.children('video');

    $(document).on('tap', ele, function () {
        var src = $(this).attr('data-src');

        $videoCon.attr('src', src);
        $popmask.show();
        $videoWrap.show();

        $videoCon[0].play();
    });

    $close.off('tap');
    $close.click(function () {
        $popmask.hide();
        $videoWrap.hide();
    });
}


//bigimg popup
function bigImgPop(ele, arr) {
    var $popmask = $('div.popmask'),
        $imgWrap = $('div.big-img-wrap'),
        $close = $('a.close-img'),
        $imgConOut = $imgWrap.find('div.big-img-con'),
        $imgCon = $imgWrap.find('img.big-img');

    $(document).on('tap', ele, function () {
        var $this = $(this),
            dataType = $this.attr('data-type'),
            index = $this.index(),
            cHeight = 40 * fontRem / 24,
            wHeight = parseInt($(window).height());

        var imgSrc = imgUrl + arr[dataType][index];
        $imgCon.attr('src', imgSrc);

        var imgObj = new Image();
        imgObj.src = imgSrc;
        $popmask.show();
        $imgWrap.show();
        imgObj.onload = function () {
            var eHeight = parseInt($imgConOut.height());

            if (eHeight <= wHeight - cHeight) {
                $imgWrap.css({
                    top: (wHeight - eHeight) / 2 + cHeight,
                    height: eHeight
                });
                $imgWrap.find('img').css({
                    height: 'auto',
                    width: '100%'
                });
            } else {
                $imgWrap.css({
                    top: eHeight,
                    height: wHeight - cHeight
                });
                $imgWrap.find('img').css({
                    height: '100%',
                    width: 'auto'
                });
            }
        };
    });

    $close.off('tap');
    $close.click(function () {
        $popmask.hide();
        $imgWrap.hide();
    });
}

//swiperRender
function swiperRender(ele, type, url, fn) {
    ajaxGet(httpUrl + url, function (data) {
        var str = '';
        $.each(data, function (i, d) {
            str += '<div class="swiper-slide" data-type="' + type + '"><img src="' + imgUrl + d.filePath2 + '"></div>';
        });
        $(ele).find('div.swiper-wrapper').html(str);
        fn.call(window, ele);
    });
}


//ajaxGet
function ajaxGet(url, fn) {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: url,
        success: function (data) {
            fn.call(window, data);
        }
    })
}

//page rotateY
function pageRotateY() {
    var $switchPage = $('div.switch-page'),
        $careerItem = $('div.career-item'),
        $careerCon = $careerItem.children('div.career-con').children(),
        $prev = $switchPage.children('a.prev-btn'),
        $next = $switchPage.children('a.next-btn');

    var val = 0,
        timer;
    var oNum = 1,//current page
        iNum = $careerItem.length;

    $prev.click(function () {
        if (oNum == 1) {
            oNum = iNum;
        } else {
            oNum--;
        }
        val--;
        setRotateY(val);
        classToggle();
    });
    $next.click(function () {
        if (oNum == iNum) {
            oNum = 1;
        } else {
            oNum++;
        }
        val++;
        setRotateY(val);
        classToggle();
    });


    function classToggle() {
        clearTimeout(timer);
        $careerCon.hide();
        $careerItem.removeClass('current');
        timer = setTimeout(function () {
            $careerCon.show();
            $careerItem.addClass('current');
        }, 400);
    }
}

//set translateZ
function setRotateY(arg) {

    var $careerContainer = $('div.career-container'),
        $creerItem = $careerContainer.children('div.career-item');
    var rotate = 360 / $creerItem.length,
        transZ = parseInt(parseInt($(window).width()) / 2 / Math.tan((rotate / 2 / 180) * Math.PI));

    var addNum = 0;
    if (arg) {
        addNum = arg;
        $creerItem.css({
            'transition': 'transform 0.8s ease-out 0s',
            '-webkit-transition': 'transform 0.8s ease-in-out 0s'
        });
    }

    $creerItem.each(function (i) {
        var $this = $(this);
        transform($this[0], 'rotateY(' + (i + addNum) * rotate + 'deg) translateZ(' + transZ + 'px)');
    });
}


//set transform
function transform(element, value, key) {
    key = key || "transform";
    ["webkit", ""].forEach(function (prefix) {
        element.style[prefix + key] = value;
    });
    return element;
}


//skillSwiper
function skillSwiper(ele) {
    new Swiper(ele + ' .swiper-container', {
        prevButton: ele + ' a.btn-prev',
        nextButton: ele + ' a.btn-next',
        paginationClickable: true,
        slidesPerView: 5
    });

    $(ele).find('div.swiper-slide').tap(function () {
        var $this = $(this),
            $ski = $('div.skill-intro'),
            curType = $(ele).attr('data-type');

        $ski.find('h3').text(skillData[curType][$this.index()].title);
        $ski.find('p').text(skillData[curType][$this.index()].intro);

        var pLeft = $this.offset().left,
            pTop = $this.offset().top,
            popHeight = parseInt($ski.height());

        $ski.css({
            left: pLeft - fontRem * 2,
            top: pTop - popHeight - fontRem * 0.2
        }).css('visibility', 'visible');

        return false;
    });
}
$(document).on('tap', function () {
    $('div.skill-intro').css('visibility', 'hidden');
});


//weapons swiper
function weaponsSwiper(ele) {
    new Swiper(ele + ' .swiper-container', {
        prevButton: ele + ' a.btn-prev',
        nextButton: ele + ' a.btn-next',
        paginationClickable: true
    });
}

//orginal swiper
function orginalSwiper(ele) {
    new Swiper(ele + ' .swiper-container', {
        prevButton: ele + ' a.btn-prev',
        nextButton: ele + ' a.btn-next',
        slidesPerView: 2,
        spaceBetween: 564 / fontRem - 280 / fontRem,
        paginationClickable: true
    });
}