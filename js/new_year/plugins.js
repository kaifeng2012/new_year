/**
 * Created by Administrator on 2017/2/24.
 */

    //    民族
    //加载城市事件
$('.nationality').on('click', '#zone_ids,#gr_zone_ids', function () {
    var zid = $(this).attr('id');
    $('.nation1').show();

});
//选择城市 start
$('.nationality').on('click', '.city-list p', function () {
    var type = $('.nation1').data('type');
    $('#zone_ids').html($(this).html()).attr('data-id', $(this).attr('data-id'));
    $('#gr_zone_ids').html($(this).html()).attr('data-id', $(this).attr('data-id'));
    $('.nation1').hide();
});
$('.nationality').on('click', '.letter a', function () {
    var s = $(this).html();
    $(window).scrollTop($('#' + s + '1').offset().top);
});

//  籍贯插件
$(".city").CityPicker();
$(".city1").CityPicker();
$(".city2").CityPicker();

//出生日期
$(function () {
    var currYear = (new Date()).getFullYear();
    var opt = {};
    opt.date = {preset: 'date'};
    opt.datetime = {preset: 'datetime'};
    opt.time = {preset: 'time'};
    opt.default = {
        theme: 'android-ics light', //皮肤样式
        display: 'modal', //显示方式
        mode: 'scroller', //日期选择模式
        dateFormat: 'yyyy-mm-dd',
        lang: 'zh',
        showNow: true,
        nowText: "今天",
        startYear: currYear - 20, //开始年份
        endYear: currYear + 20 //结束年份
    };
    $("#appDate").mobiscroll($.extend(opt['date'], opt['default']));
    var optDateTime = $.extend(opt['datetime'], opt['default']);
    var optTime = $.extend(opt['time'], opt['default']);
    $("#appDateTime").mobiscroll(optDateTime).datetime(optDateTime);
    $("#appTime").mobiscroll(optTime).time(optTime);
});

//    现居住地级联菜单
$(function () {
    initComplexArea('seachprov', 'seachcity', 'seachdistrict', area_array, sub_array, '0', '0', '0');
});

//得到地区码
function getAreaID() {
    var area = 0;
    if ($("#seachdistrict").val() != "0") {
        area = $("#seachdistrict").val();
    } else if ($("#seachcity").val() != "0") {
        area = $("#seachcity").val();
    } else {
        area = $("#seachprov").val();
    }
    return area;
}

function showAreaID() {
    //地区码
    var areaID = getAreaID();
    //地区名
    var areaName = getAreaNamebyID(areaID);
    alert("您选择的地区码：" + areaID + "      地区名：" + areaName);
}

//根据地区码查询地区名
function getAreaNamebyID(areaID) {
    var areaName = "";
    if (areaID.length == 2) {
        areaName = area_array[areaID];
    } else if (areaID.length == 4) {
        var index1 = areaID.substring(0, 2);
        areaName = area_array[index1] + " " + sub_array[index1][areaID];
    } else if (areaID.length == 6) {
        var index1 = areaID.substring(0, 2);
        var index2 = areaID.substring(0, 4);
        areaName = area_array[index1] + " " + sub_array[index1][index2] + " " + sub_arr[index2][areaID];
    }
    return areaName;
}

//    户口所在地
//    var area = new lArea();
//    area.init({
//        'trigger': '#residence',
//        'data': lAreaData//'js/AreaData.json'
//    });