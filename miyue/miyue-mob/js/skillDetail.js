/**
 * Created by Administrator on 2017/9/1.
 */
// 技能详情页
var Url = 'http://opm.8864.com';
var UrlImg = 'http://opm.8864.com'

$(function () {
    downloadGame('#downloadBtnOne');
    function getSkillDetail (id) {
        $.ajax({
            type: 'GET',
            url: Url + '/api/website/getskillinfo',
            data: {
                id: id
            },
            dataType: 'json',
            success: function (res) {
                var data = res.data
                var hero_img = UrlImg + data.m_img;
                var $heroStarImg = $('.hero_star img');
                var name = data.character;
                var skillImgs = data.imgs.slice(1, -1).split(',');
                var starSrc = $heroStarImg.attr('src').replace(/star-1/, "star-" + data.x);
                var skill = JSON.parse(data.skill);
                console.log(skill);
                var destinyData = data.y.replace(/\"/g,'').split('\n');
                var destinyItem = '';
                console.log(data);
                $heroStarImg.attr('src', starSrc);
                $('.hero_name span').text(name);
                $('.hero_img img').attr('src', hero_img);
                $('.hero_detail_name').text(name);
                $('.hero_detail p .type').text(data.d);
                $('.hero_detail .intro').text(data.desc);
                var $level_text = $('.skill_num p .level_text')
                for (var i = 0; i < skillImgs.length; i++) {
                    var src = UrlImg + skillImgs[i].replace(/\"/g,'').replace(/[\\]/g, '');
                    $('.skill_pic img').eq(i).attr('src', src);
                    $('.skill_pic .skill_name_1').eq(i).text(skill.name[i])
                }
                for (var i = 0; i < skill.level.length; i++) {
                    var n = []
                    if (i % 2 == 1) {
                        if (skill.level[i].length <= 13) {
                            $level_text.eq(i).css('text-align', 'right')
                        }
                        console.log(skill.level[i].length)
                    }
                    $level_text.eq(i).text(skill.level[i])
                }
                for (var i = 0; i < skill.s.length; i++) {
                    $('.value_detail p .value_num').eq(i).text(skill.s[i])
                }
                for (var i = 0; i < destinyData.length; i++) {
                    var item1 = destinyData[i].match(/与(\S*)一/)
                    var item2 = destinyData[i].match(/一(\S*)/)
                    destinyItem += '<li>与 ' + '<span class="destiny_name">' + item1[1] + ' </span>' + item2[0] + '</li>'
                }
                $('.destiny_desc_bg .destiny_ul').html(destinyItem)
            }
        })
    }
    getSkillDetail (getQueryString('id'))
});
