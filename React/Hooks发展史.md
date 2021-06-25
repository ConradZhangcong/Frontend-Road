# 丛 Mixin 到 HOC 到 Hook

## Mixin

### Mixin 设计模式

本质上是将一个对象的属性拷贝到另一个对象上，可以将**任意**多个的对象的**任意**个方法拷贝到新对象上，他的出现主要解决代码复用问题。

```js
function setMixin(target, mixin) {
  if (arguments[2]) {
    for (var i = 2, len = arguments.length; i < len; i++) {
      target.prototype[arguments[i]] = mixin.prototype[arguments[i]];
    }
  } else {
    for (var methodName in mixin.prototype) {
      if (!Object.hasOwnProperty(target.prototype, methodName)) {
        target.prototype[methodName] = mixin.prototype[methodName];
      }
    }
  }
}

setMixin(User, LogMixin, 'actionLog');
setMixin(Goods, LogMixin, 'requestLog');
```

### Mixin 的危害

- Mixin 可能会相互依赖，相互耦合，不利于代码维护
- 不同的 Mixin 中的方法可能会相互冲突
- Mixin 非常多时，组件是可以感知到的，甚至还要为其做相关处理，这样会给代码造成滚雪球式的复杂性

## HOC（Higher-Order Components）

高阶组件可以看成是`装饰者模式`的一种实现。高阶组件就是一个函数，接受一个组件作为参数，返回一个新组件。

> 高阶组件（HOC）是 React 中的高级技术，用来重用组件逻辑。但高阶组件本身并不是 ReactAPI。它只是一种模式，这种模式是由 React 自身的组合性质必然产生的。

### 装饰者模式

###
