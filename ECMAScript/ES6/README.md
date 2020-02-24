# ES6

> ECMAScript 6.0（以下简称 ES6）是 JavaScript 语言的下一代标准，已经在 2015 年 6 月正式发布了。它的目标，是使得 JavaScript 语言可以用来编写复杂的大型应用程序，成为企业级开发语言。

## ES6 和 ECMAScript2015 的关系

每年 6 月份正式发布一次,作为当年的正式版本.ES6 的第一个版本,在 2015 年 6 月发布.

因此，ES6 既是一个历史名词，也是一个泛指，含义是 5.1 版以后的 JavaScript 的下一代标准，涵盖了 ES2015、ES2016、ES2017 等等，而 ES2015 则是正式名称，特指该年发布的正式版本的语言标准。本书中提到 ES6 的地方，一般是指 ES2015 标准，但有时也是泛指“下一代 JavaScript 语言”。

## 部署进度

## babel 转码器

babel 是一个广泛使用的 ES6 转码器,可以将 ES6 代码转为 ES5 代码,从而在现有的环境执行.

安装 babel:

```shell
npm install --save-dev @babel/core
```

### 配置文件`.babelrc`

babel 的配置文件是`.babelrc`,存放在项目的根目录下.该文件用来设置转码规则和插件,基本格式如下:

```json
{
  "presets": [],
  "plugins": []
}
```

`presets`字段设定转码规则,官方提供以下的规则集,可以根据需求安装.

```shell
# 最新转码规则
npm install --save-dev @bebel/preset-env

# react 转码规则
npm install --save-dev @babel/preset-react
```

然后将这些规则加入`.babelrc`

```json
{
  "presets": ["@babel/env", "@babel/preset-react"],
  "plugins": []
}
```

### 命令行转码

babel 提供命令行工具`@babel/cli`,用于命令行转码.安装:

```shell
npm install --save-dev @babel/cli
```

基本用法如下.

```shell
# 转码结果输出到标准输出
npx babel example.js

# 转码结果写入一个文件
# --out-file 或 -o 参数指定输出文件
npx babel example.js --out-file compiled.js
# 或者
npx babel example.js -o compiled.js

# 整个目录转码
# --out-dir 或 -d 参数指定输出目录
npx babel src --out-dir lib
# 或者
npx babel src -d lib

# -s 参数生成source map文件
npx babel src -d lib -s
```

### babel-node

`@bebel/node`模块的`babel-node`命令,提供一个支持 ES6 的 REPL 环境.它支持 Node 的 REPL 环境的所有功能,而且可以直接运行 ES6 代码.安装如下:

```shell
npm install --save-dev @babel/node
```

然后,执行`babel-node`就进入 REPl 环境.

```shell
npx bebel-node
> (x => x * 2)(1)
2
```

`babel-node`命令可以直接运行 ES6 脚本.

```shell
# template.js的代码:
# console.log((x => x * 2)(1))
npx babel-node template.js
2
```

### babel/register 模块

### babel API

### @babel/polyfill

babel 默认只转换新的 JavaScript 句法(syntax),而不转换新的 API,比如`Iterator`、`Generator`、`Set`、`Map`、`Proxy`、`Reflect`、`Symbol`、`Promise`等全局对象，以及一些定义在全局对象上的方法（比如 Object.assign）都不会转码。

举例来说，ES6 在`Array`对象上新增了`Array.from`方法。Babel 就不会转码这个方法。如果想让这个方法运行，必须使用`babel-polyfill`，为当前环境提供一个垫片。

安装:

```shell
npm install --save-dev @babel/polyfill
```

然后在脚本头部加入一行代码

```javascript
import '@babel/polyfill'
// 或者
require('@babel/polyfill')
```

### 浏览器环境

Babel 也可以用于浏览器环境，使用`@babel/standalone`模块提供的浏览器版本，将其插入网页。

```html
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script type="text/babel">
  // Your ES6 code
</script>
```

## Traceur 转码器
