## 条件判断 `extends ? :`

## 推导 `infer`

## 联合 `|`

## 交叉 `&`

交叉类型可以对类型做合并, 同一类型可以合并, 不同类型会被舍弃

```ts
type A = (string | number | boolean) & string;
// type A = string
type B = { a: string } & { b: number };
// type B = { a: string } & { b: number };
```

## 映射类型

```ts
type MapType<T> = {
  [Key in keyof T]?: T[Key];
};

type MapType<T> = {
  [Key in keyof T as `${Key & string}${Key & string}${Key & string}`]: [
    // 重映射
    T[Key],
    T[Key],
    T[Key]
  ];
};
```

`keyof T`叫做`索引查询`

`T[key]`叫做`索引访问`

`in`用于遍历联合类型

修改`key`, 使用`as`, 叫做重映射

## 套路

1. 匹配模式

TS 类型的匹配模式通过 extends 对参数类型做匹配, 结果保存到通过 infer 声明的局部变量里面, 如果匹配从局部变量中提取出类型.

2. 重新构造

TS 的`type` `infer` 类型参数声明的变量不能修改, 如果要生成新的类型需要重新构造.

3. 递归复用

TS 不支持循环, 但是支持递归

4. 数组长度做计数

TS 没有加减乘除运算, 可以使用数组的长度来完成数值计算

5. 联合分散

分布式条件类型: 当类型参数左边为联合类型, 并且在条件类型左边直接引用该类型参数的时候, TS 会把每个元素单独传入来做类型运算, 最后合并为联合类型, 叫做**分布式条件类型**

```ts
type Union = "a" | "b" | "c";
type UppercaseA<Item extends string> = Item extends "a"
  ? Uppercase<Item>
  : Item;
type result = UppercaseA<Union>;
```

判断是否为联合类型:

```ts
type IsUnion<A, B = A> = A extends A ? ([B] extends [A] ? false : true) : never;
```

当 A 为联合类型时: `A extends A`触发分布式条件类型, 让 A 每个类型单独传入; `[B] extends [A]`避免触发分布式条件类型, `B`就是整个联合类型.

6. 特殊特性

- any 类型与任何类型的交叉都是 any，也就是 1 & any 结果是 any，可以用这个特性判断 any 类型。
- 联合类型作为类型参数出现在条件类型左侧时，会分散成单个类型传入，最后合并。
- never 作为类型参数出现在条件类型左侧时，会直接返回 never。
- any 作为类型参数出现在条件类型左侧时，会直接返回 trueType 和 falseType 的联合类型。
- 元组类型也是数组类型，但每个元素都是只读的，并且 length 是数字字面量，而数组的 length 是 number。可以用来判断元组类型。
- 函数参数处会发生逆变，可以用来实现联合类型转交叉类型。
- 可选索引的值为 undefined 和值类型的联合类型。可以用来过滤可选索引，反过来也可以过滤非可选索引。
- 索引类型的索引为字符串字面量类型，而可索引签名不是，可以用这个特性过滤掉可索引签名。
- keyof 只能拿到 class 的 public 的索引，可以用来过滤出 public 的属性。
