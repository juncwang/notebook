### gsap

* 安装方式
    * cdn: `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.1.1/gsap.min.js`
    * npm: `npm install gsap`

* 官方网站
    * `https://greensock.com/`

* 使用方法
    * 动画执行
        * `gsap.to(元素名称, 动画属性对象)`
    * 时间线执行动画, 动画会根据 to 方法一个接一个执行
        * `const t = gsap.timeline({defaults: 动画属性对象})` defaults 默认动画属性, 在后面设置动画时, 就算不设置，也会执行默认的动画
        * `t.to(元素名称, 动画属性对象)`
        * `.to()...`
        * 动画会一个 to 一个 to 的执行到最后一个
    * 全局动画控制
        * `gsap.globalTimeline.timeScale(0.1)` 全局动画速率
        * `gsap.globalTimeline.pause()` 全局动画暂停
        * `gsap.globalTimeline.play()` 全局动画播放
        * `gsap.globalTimeline.paused()` 全局动画播放状态 暂停为 true

* 说明
    * 动画属性对象 = {
        * duration 动画持续时间 num
        * delay 播放动画延迟时间 num
        * stagger 同一种 元素名称 的元素, 按延迟时间一个一个交错执行 num

        * repeat 动画重复次数 num -1 为永久循环播放
        * repeatRefresh 重复播放动画时, 元素在目前动画位置继续播放下一个动画, 不会回到初始点 bool

        * ease 动画曲线 string
            * `elastic`

        * 属性值都可以使用网页上的属性名或值来用 值需要加引号
        * x => translateX 轴方向移动距离 num or string(执行函数)
            * `random(100, 500)` 系统会随机取一个 100 - 500 之间的数给到 x
            * `+=50` 比现在的位置增加50
        * y => translateY 轴方向移动距离 num or string(执行函数)
        * rotation => rotate 旋转数量 num
        * rotationX => rotateX 旋转X轴数量 num
        * rotationY => rotateY 旋转Y轴数量 num
        * height 设置高度 num or string(执行属性)
            * `auto` 按照子元素的高度而变高
        * width 设置宽度 num or string(执行属性)
        
        
        * keyframes 动画播放顺序数组 array
            * `[动画属性对象, 动画属性对象, ...]`
    * }

* 工具
    * snap() 拦截数值或是阵列中最接近的数值
    * mapRange() 设定一个数字范围及相对于的换算, 将数字范围换算成相对应换算值回传
    * interpolate() 相似类型的任意两个值具有多个属性的对象制作之间线性插值, 介于 0 和 1 之间
    * pipe() 将多个函数调用组合, 将结果传入到下一个函数

```javascript
const snap = gsap.utils.snap({values: [0, window.innerWidth], radius: 100}) 
// values 取值范围
// radius 取值范围边界, 边界上的值不会被取到
// gsap.utils.snap(50) 拦截阵列中 最接近50倍数的值 1-25=0， 26-75=50， ...
const mapRange = gsap.utils.mapRange(0, window.innerWidth, 0, 1)
// 1. 取的最小值 2. 取的最大值 3. 转换后最小值 4. 转换后最大值
const interpolate = gsap.utils.interpolate('#fff', '#000')
// 1. 0的时候的值 2. 1的时候的值
const pipe = gsap.utils.pipe(
    snap, mapRange, interpolate
)

const varS = snap(x) // 从 101 开始取值到 window.innerWidth -100 范围，其他部分不会取值
const varM = mapRange(varS) // 把 varS 的值转换成 0 - 1 之间
const varI = interpolate(varM) // 把 0 - 1 之间的数换算成相应的颜色
const varP = pipe(x) // 把上面上个方法依次执行, 得到最后的返回结果
```
