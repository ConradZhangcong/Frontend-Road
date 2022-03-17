# Element.scrollIntoView()

`Element`接口的`scrollIntoView()`方法会滚动元素的父容器, 使被调用 scrollIntoView()的元素对用户可见.

## 语法

```js
element.scrollIntoView(); // 等同于element.scrollIntoView(true)
element.scrollIntoView(alignToTop); // Boolean型参数
element.scrollIntoView(scrollIntoViewOptions); // Object型参数
```

## 参数

**alignToTop**

布尔值, 默认参数为`true`

如果为`true`, 元素顶端将和滚动区域可视区的顶端对齐, 相对应的`scrollIntoViewOptions`为`{ block: "start", inline: "nearest" }`;

如果为`false`, 元素底端将和滚动区域可视区的底部对齐, 相对应的`scrollIntoViewOptions`为`{ block: "end", inline: "nearest" }`.

**scrollIntoViewOptions**

对象, 包含以下属性:

- `behavior`: 动画过渡效果, `'auto'`或者`'smooth'`之一. 默认为`'auto'`
- `block`: 定义垂直方向的对齐, `'start'`, `'center'`, `'end'`或`'nearest'`之一. 默认为`'start'`
- `inline`: 定义水平方向的对齐, `'start'`, `'center'`, `'end'`或`'nearest'`之一. 默认为`'nearest'`

## 示例

```js
var element = document.getElementById("box");

element.scrollIntoView();
element.scrollIntoView(false);
element.scrollIntoView({ block: "end" });
element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
```

## 参考

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollIntoView)
