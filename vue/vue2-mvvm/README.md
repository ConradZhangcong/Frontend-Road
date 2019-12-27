# mvvm

`mvvm原理`: [掘金-不好意思！耽误你的十分钟，让 MVVM 原理还给你](https://juejin.im/post/5abdd6f6f265da23793c4458)

vue 双向数据绑定是通过`数据劫持+发布订阅模式`来实现的,数据劫持使用`es5`提供的`Object.defineProperty`来实现.

## defineProperty

语法: `Object.defineProperty(obj, prop, descriptor)`

参数:

- obj 要在其上定义属性的对象
- prop 要定义或修改的属性名
- descriptor 将被定义或修改的属性描述符

返回值: 被传递给函数的对象

### descriptor(属性描述符)

对象里主要有两种主要形式:`数据描述符`和`存取描述符`.数据描述符是一个具有值的属性,该值可能是可写的,也可能不是可写的.存取描述符是由 getter-setter 函数对描述的属性.描述符必须是这两种形式之一;不能同时是两者.

描述符可同时具有的键值

|            | configurable | enumrable | value | writable | get | set |
| :--------- | ------------ | --------- | ----- | -------- | --- | --- |
| 数据描述符 | √            | √         | √     | √        | ×   | ×   |
| 存取描述符 | √            | √         | ×     | ×        | √   | √   |

- `configurable` 当 configurable 为 true 时,该属性可以被修改并且能够被在对象的对象上删除。默认为`false`.
- `enumrable` 当 enumerable 为 true,该属性可以出现在对象的枚举属性中,默认为`false`.
- `value` 该属性对应的值.可以是任何有效的 js 值(数值,对象,函数等),默认为`undefined`
- `writable` 当 writable 为 true 时,value 才能被赋值运算符改变,默认为`false`.
- `get` 当访问该属性时,该方法会被执行,方法执行没有参数传入,但会传入 this 对象(由于继承关系,这里的 this 并不一定是定义该属性的对象).默认为`undefined`
- `set` 当属性值修改时,触发执行该方法.该方法接受唯一参数,为该属性新的参数值.
