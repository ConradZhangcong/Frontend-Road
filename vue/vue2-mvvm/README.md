# mvvm

`mvvm原理`: [掘金-不好意思！耽误你的十分钟，让 MVVM 原理还给你](https://juejin.im/post/5abdd6f6f265da23793c4458)

vue 双向数据绑定是通过`数据劫持+发布订阅模式`来实现的,数据劫持使用`es5`提供的`Object.defineProperty`来实现.

## 原理

1. 首先通过创建 observer 使用`Object.defineProperty`进行数据劫持,对 data 数据进行深度监测
2. 从根节点开始获取子节点,通过递归替换`{{}}`里面的内容,进行数据编译
3. 使用Watcher配合发布订阅模式检测数据的变化,从而更改试图变化,达到数据双向绑定的效果
