### better-scroll

* 安装方式
    * `npm install better-scroll --save-dev`

* 使用方式

```xml
<!-- html 结构 -->
<template>
  <div class="scroll-wrap" ref="wrapper">
    <div>
      <!-- 需要滑动的内容, 注意: 滑动时此区域高度必须比上层 DIV 的高度高 -->
      
      <slot><!-- 此区域是要从外部插入的内容 VUE 的特性 --></slot>
        
      </div>
    </div>
  </div>
</template>
```
```js
// js 逻辑
import BScroll from "better-scroll";
export default {
  name: "scroll",
  mounted() {
    setTimeout(() => {
      this.initScroll();
    }, 50);
  },
  methods: {
    initScroll() {
      if (!this.$refs.wrapper) {
        return;
      }

      this.scroll = new BScroll(this.$refs.wrapper, { probeType: 1 });

      // 滚动事件
      this.scroll.on('scroll', pos => {
          this.dragTip.showLoading = true

          if(pos.y > 50){
              this.dragTip.text = '释放刷新'
          }
      })

      // 停止滚动事件
      this.scroll.on('touchEnd', pos => {
          if(pos.y > 50){
              this.dragTip.text = "刷新中..."

              this.$emit('pulldown')
              this.$on('refresh', this.reset)
          }else{
              this.dragTip.showLoading = false
          }
      })

      // 滚动到底部事件
      this.scroll.on('scrollEnd', () => {
        // console.log(this.scroll.maxScrollY)
        if(this.scroll.y <= this.scroll.maxScrollY + 50){
          // 触发上拉加载事件
          this.$emit('pullup')
          this.$on('loadedDone',this.loadedDone)
        }
      })
    }
  }
}
```