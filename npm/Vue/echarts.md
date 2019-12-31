### echarts

* 安装方式
    * `npm install echarts --save-dev`

* 配置 main.js
```js
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
```

* 使用 echarts
```js
this.eCharts = this.$echarts.init(
    document.getElementById('idName')
)

this.eCharts.setOption({
    // 背景颜色
    backgroundColor: '#2c343c',
    // backgroundColor: {
    //     image: base64,
    //     repeat: 'repeat'
    // },
    // 数据提示
    tooltip: {
        trigger: 'item',
        // a 数据图名称 b 数据名 c 数据值 d 数据占比
        formatter: "{a} <br/>{b} : {c} ({d}%)",
        // trigger: 'axis',
        // axisPointer : {            // 坐标轴指示器，坐标轴触发有效
        //     type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        // }
    },
    // 表头
    title: {
        text: 'Customized Pie', // 显示内容
        subtext: 'xxx', // 子内容
        left: 'center', // 位置
        top: 20,  // 位置
        textStyle: {
            // 字体设置
            color: '#ccc'
        }
    },
    // 数据颜色
    color: ["#fa481e", "#22d1c5"],
    // 数据标签
    legend: {
        orient: 'vertical', // 标签排列方式
        x: "center",
        y: "bottom",
        data: ["正常", "异常"],
        textStyle: {
            fontSize: 18, //字体大小
            color: "#ffffff" //字体颜色
        },
        selected: ["正常", "异常"], // 显示出来的对比数据
    },
    // 数据显示
    series: [
        name: 'hello world', // 数据图名称
        type: 'pie', // 饼状图 
        // type:'bar', // 柱状图
        // barWidth: '60%', // 柱子宽度
        radius: '55%', // 饼状图半径 可以是数组 ['50%', '70%'] 内空半径和外半径
        center: ['50%', '50%'], // 饼状图中心位置
        data: [ // 数据
            { value: this.city.try, name: "异常" }, // value 值, name 数据名
            { value: this.city.def, name: "正常" }
        ],
        roseType: "radius", // 饼状图按百分比凸出显示
        // 标签设置
        label: {
            // 普通模式
            normal: {
                textStyle: { // 字体设置
                    color: 'rgba(255, 255, 255, 0.3)'
                },
                show: true, // 是否显示
                position: 'center', // 显示位置 inside 内部
            }
            // 鼠标移入后
            emphasis: {
                show: true,
                textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                }
            }
        },
        // 标签线设置
        labelLine: {
            normal: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.3)'
                },
                smooth: 0.2,
                length: 10,
                length2: 20,
                show: true,
            }
        },
        // 数据样式设置
        itemStyle: {
            normal: {
                color: '#ffffff',
                // color: {
                //     image: base64,
                //     repeat: 'repeat'
                // },
                opacity: 0.7,
                shadowBlur: 200,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                borderWidth: 3,
                borderColor: '#235894',
            }
        },
        // 开始动画类型
        animationType: 'scale',
        // 开始动画播放曲线
        animationEasing: 'elasticOut',
        // 动画延时播放
        animationDelay: function (idx) {
            return Math.random() * 200;
        }
    ],
    // 网格设置
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    // 横坐标
    xAxis : [
        {
            type : 'category',
            data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: { // 显示位置在格子上
                alignWithLabel: true
            }
        }
    ],
    // 纵坐标
    yAxis : [
        {
            type : 'value',
            // 格式化显示
            axisLabel: {
                formatter: '{value}%'
            }
        }
    ],
})
```
    