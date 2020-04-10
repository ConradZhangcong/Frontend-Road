# vue

## vue 中 key 的作用

参考:

[掘金 - 为什么使用 v-for 时必须添加唯一的 key?](https://juejin.im/post/5aae19aa6fb9a028d4445d1a)

- 为了高效得更新虚拟 DOM
- 相同标签名元素过渡切换,为了让 vue 可以区分它们,避免只替换其内部属性而不会触发过渡效果

### v-for 中的 key

`v-for`更新已渲染的元素列表时,默认会使用`就地复用`的策略,会根据 key 值判断是否修改.如果使用 index 作为 key 值会产生 bug,因此推荐每条数据中唯一的 id 标识作为 key 值

### diff 算法

在 react 中渲染 map 时,同样必须也要加 key 值,这是因为虚拟 dom 使用 diff 算法实现的原因.

react 和 vue 的虚拟 DOM 的 diff 算法大致相同,核心时两个简单的假设:

1. 两个相同的组件产生类似的 DOM 结构,不同组件产生不同的 DOM 结构
2. 同一层级的以组节点通过唯一的 id 进行区分.

基于以上这两点假设,虚拟 DOM 的 diff 算法的复杂度从 O(n^3)降到了 O(n).

## 修饰符

### 事件修饰符

- .stop -- 阻止事件冒泡
- .prevent -- 阻止组件本来该发生的事情
- .capture -- 按照捕获的方式触发函数(需要写在最外层)
- .self -- 当前元素自身触发处理函数时才会触发函数 event.target确定是否当前元素本身，来决定是否触发的事件/函数
- .once -- 事件只能触发一次
- .passive

### 按键修饰符

- keyup.enter
- keyup.tab
- keyup.delete
- keyup.esc
- keyup.up
- `keycode(number)`
- ctrl
- alt
- shift
- meta

### 鼠标修饰符

- .left
- .right
- .middle

### v-model修饰符

- .lazy -- input事件改为change事件
- .number -- 配合type=number 只允许输入数字
- .trim -- 删除前后空格

### .sync

可以对prop进行双向绑定,子组件使用`$emit`传递事件

`this.$emit('update:title', newTitle)`

父组件监听那个事件并且更新一个本地数据:

```html
<parent-item :title="doc.title" @update:title="doc.title = $event"></parent-item>
<!-- 可以使用.sync修饰符简写 -->
<parent-item :title.sync="doc.title"></parent-item>
```
