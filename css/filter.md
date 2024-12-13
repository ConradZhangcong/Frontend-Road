# filter

[MDN-filter](https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter)

filter 属性就是用来给元素添加不同的滤镜, 支持传入多种 Filter 函数

## 函数

- blur 高斯模糊
- brightness 亮度
- contrast 对比度
- drop-shadow 阴影
- grayscale 灰度
- hue-rotate 色相旋转
- invert 反转
- opacity 透明度 (对比 css 的 opacity, filter 属性会启动硬件加速)
- saturate 饱和度
- sepia 深褐色

## 应用

### 将页面设置为灰色

```css
html {
  filter: grayscale(100%);
}
```

```css
.gray {
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  filter: grayscale(100%);
  -webkit-filter: gray;
  filter: gray;
  -webkit-filter: progid:dximagetransform.microsoft.basicimage(grayscale=1);
  filter: progid:dximagetransform.microsoft.basicimage(grayscale=1);
}
```
