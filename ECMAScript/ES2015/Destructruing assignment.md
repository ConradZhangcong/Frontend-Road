# 变量的结构赋值

- 1.数组的解构赋值
- 2.对象的解构赋值
- 3.字符串的解构赋值
- 4.数值和布尔值的解构赋值
- 5.函数参数的解构赋值
- 6.圆括号问题
- 7.用途

## 1.数组的结构赋值

### 基本用法

如果等号的右边不是数组(严格来说不是可遍历的结构),那么将会报错:

```javascript
let [foo] = 1;
let [foo] = false;
let [foo] = NaN;
let [foo] = undefined;
let [foo] = null;
let [foo] = {};
```

只要某种数据结构具有`Iterator`接口,都可以采用数组形式的解构函数

```javascript
function* fibs() {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

let [first, second, third, fourth, fifth, sixth] = fibs();
// 0 1 1 2 3 5
```

### 默认值

当一个数组成员严格等于`undefined`,默认值才会生效.

## 2.对象的解构赋值

### 简介

数组的元素是按次序排列的,变量的取值由它的位置决定;而对象的属性没有次序,变量必须与属性同名,才能取到正确的值.
