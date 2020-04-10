# css

## 什么是 rem

rem 是 css3 新增的一个相对单位,相对于 html 根元素.

## 流式布局和响应式布局

流式布局是 css2 时代就有,主要靠**百分比**进行排版,可以在不同分辨率下显示相同的版式.

响应式布局的关键技术是 css3 中的**媒体查询**,在不同屏幕下可以显示不同的版式.

## @import 和 link 的区别

### 老祖宗差别

link 属于 html 标签;import 是 css 的提供的一种方式.

link 标签除了加载 css 外,还可以定义 rss,定义 rel 连接属性;@import 只能加载 css.

### 加载顺序的差别

当一个页面在加载的时候,link 引用会同时被加载,而 import 引用会等到页面全部下载完再加载.所以在加载 css 的时候页面没有样式(会产生闪烁).

### 兼容性差别

import 只有在 IE5 以上才能识别,link 标签无此问题,完全兼容

### 使用 dom 控制样式的差别

js 控制 dom 改变样式时,只能用 link 标签,因为 import 不是 dom 可以控制的.

## 权重

!important > 行内样式 > ID > 类 伪类 属性 > 标签名 > 继承 > 通配符

## 定位有哪些属性 相对定位是相对什么定位

1. static(默认值): 没有定位,元素在正常的流中
2. relative: 相对定位.
3. absolute: 生成绝对定位的元素,相对于 static 以为的第一个父元素定位.
4. fixed: 生成绝对定位,相对于浏览器窗口定位.

## css 盒子模型

css 的盒子模型从内到外包括了:content padding border margin 四个部分

- 标准盒模型: 其中 width 和 height 是 content 的部分
- 怪异盒模型: 其中的 width 和 height 包括了 content padding border 三个部分

通过 box-sizeing 属性来设置盒子模型

- content-box(默认): 标准盒模型
- border-box: 怪异盒模型
- padding-box: 将 padding 计算在 width 里面

## 清除浮动

### 添加额外的标签

### 父元素设置 overflow 属性 或者设置高度

### 伪类清除

```css
.clearfix:after {
  content: '';
  display: block;
  height: 0;
  visibility: hidden;
  clear: both;
}
```
