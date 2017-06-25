$(function () {
    var myChart = echarts.init(document.getElementById('echarts')),
        option = {
            title: {
                text: '今日出港旅客人数变化'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            color: ['rgba(114, 181, 55, 0.4)', 'rgba(247, 134, 40, 0.4)', 'rgba(104, 178, 251, 0.4)'],
            legend: {
                data: ['已值机未安检', '当前隔离区', '登机未起飞']
            },
            toolbox: null,
            grid: {
                left: '2%',
                right: '2%',
                bottom: '4%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '已值机未安检',
                    type: 'line',
                    areaStyle: {normal: {}},
                    data: [22, 44, 901, 934, 1290, 1330, 1320]
                }, {
                    name: '当前隔离区',
                    type: 'line',
                    areaStyle: {normal: {}},
                    data: [220, 182, 191, 234, 290, 330, 310]
                }, {
                    name: '登机未起飞',
                    type: 'line',
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    areaStyle: {normal: {}},
                    data: [120, 132, 101, 134, 90, 230, 210]
                }
            ]
        };


    myChart.setOption(option);
});