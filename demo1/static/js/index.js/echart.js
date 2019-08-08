//曲线
function main() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));


    // 指定图表的配置项和数据
    // var myChart = echarts.init(dom);
    var app = {};
    option = null;
    option = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisLine: {
                lineStyle: {
                    color: "#ffffff",
                }
            }
        },
        yAxis: {
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: "#ffffff",
                },
            }
        },
        series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true
        },
        {
            data: [1500, 200, 100, 300, 1290, 1330, 1320],
            type: 'line',
            smooth: true
        },
        {
            data: [1500, 400, 100, 300, 300, 1330, 1320],
            type: 'line',
            smooth: true
        },
        {
            data: [1500, 400, 100, 300, 600, 1330, 1320],
            type: 'line',
            smooth: true
        }]
    };
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}
main();

//柱状图
function container() {
    var myChart = echarts.init(document.getElementById('container'));
    var app = {};
    option = null;
    var option = {
        dataset: {
            source: [
                ['score', 'amount', 'product'],
                [89.3, 58212, 'A'],
                [57.1, 78254, 'B'],
                [74.4, 41032, 'C'],
                [50.1, 12755, 'D'],
                [89.7, 20145, 'E'],
                [68.1, 79146, 'F'],
                [19.6, 91852, 'G'],
                [10.6, 101852, 'H'],
                [32.7, 20112, 'I']
            ]
        },
        grid: { containLabel: true },
        xAxis: {
            name: 'amount',
            axisLine: {
                lineStyle: {
                    color: "#ffffff",
                }
            }
        },
        yAxis: {
            type: 'category',
            axisLine: {
                lineStyle: {
                    color: "#ffffff",
                }
            }
        },
        visualMap: {
            orient: 'horizontal',
            left: 'center',
            min: 10,
            max: 100,
            text: ['High Score', 'Low Score'],
            // Map the score column to color
            dimension: 0,
            inRange: {
                color: ['#D7DA8B', '#E15457']
            }
        },
        series: [
            {
                type: 'bar',
                encode: {
                    // Map the "amount" column to X axis.
                    x: 'amount',
                    // Map the "product" column to Y axis
                    y: 'product'
                }
            }
        ]
    };
    ;
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}
container();

//饼图
function circle() {
    var myChart = echarts.init(document.getElementById('circle'));
    var app = {};
    option = null;
    option = {
        // backgroundColor: '#435c70',

        title: {
            text: 'Customized Pie',
            left: 'center',
            top: 20,
            textStyle: {
                color: '#ccc'
            }
        },

        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        visualMap: {
            show: false,
            min: 80,
            max: 600,
            inRange: {
                colorLightness: [0, 1]
            }
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '50%'],
                data: [
                    { value: 335, name: '直接访问' },
                    { value: 310, name: '邮件营销' },
                    { value: 274, name: '联盟广告' },
                    { value: 235, name: '视频广告' },
                    { value: 400, name: '搜索引擎' }
                ].sort(function (a, b) { return a.value - b.value; }),
                roseType: 'radius',
                label: {
                    normal: {
                        textStyle: {
                            color: 'rgba(255, 255, 255, 0.3)'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.3)'
                        },
                        smooth: 0.2,
                        length: 10,
                        length2: 20
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#c23531',
                        shadowBlur: 200,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },

                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                    return Math.random() * 200;
                }
            }
        ]
    }
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}
circle();