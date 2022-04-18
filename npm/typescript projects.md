# 搭建项目

## 初始化项目

```shell
npm init -y
```

创建一些文件

```shell
# .gitignore
# TODO: 补全
```

## 代码格式化(eslint+prettier)

### eslint

安装`eslint`, 并且创建`.eslintrc.js`进行一些基本配置.

```shell
npm install eslint -D
```

或者可以使用`npx eslint --init`这个命令, 通过一些选项自动生成`.eslintrc.js`文件并且安装依赖.

具体的`eslint`配置文件可以自行翻阅[eslint 官网](https://eslint.org/)或者其他文章, 这边不多做展开.

在这里我会使用`react`和`typescript`, 所以我的`eslintrc`配置文件是这样的:

```js
// .eslintrc.js
// TODO: 文件内容补全
```

创建`.eslintignore`文件, 忽略一些不需要进行`eslint`检测的文件.

```text
// .eslintignore
// TODO: 文件内容补全
dist

node_modules
```

## webpack 安装以及基本配置

### 安装 webpack

```shell
npm i webpack webpack-cli webpack-merge -D
```

- `webpack@4.65.0`
- `webpack-cli@4.9.1`
- `webpack-merge@5.8.0`

### webpack 基本配置

创建一个存放一些配置文件(`webpack`)的文件夹, 以及三个`webpack`的配置文件: `webpack.common.js` `webpack.dev.js` `webpack.prod.js`, 这三个配置文件用于存放公共配置, 开发环境的配置以及生产环境的配置.

```shell
mkdir config
touch config/webpack.common.js
touch config/webpack.dev.js
touch config/webpack.prod.js
```

添加一些配置与代码:

```json
// package.json
{
  // ...
  "scripts": {
    "start": "npm run dev",
    "dev": "webpack --config ./config/webpack.dev.js",
    "build": "webpack --config ./config/webpack.prod.js"
    // ...
  }
  // ...
}
```

```js
// config/webpack.common.js
const path = require("path");

const baseConfig = {
  entry: {
    app: "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[file].[hash].js",
  },
};

module.export = baseConfig;
```

```js
// config/webpack.dev.js
const webpackMerge = require("webpack-merge");
const baseConfig = require("./webpack.common.js");

const devConfig = {
  mode: "development",
};

const mergedDevConfig = webpackMerge.merge(baseConfig, devConfig);

module.exports = mergedDevConfig;
```

```js
// config/webpack.prod.js
const webpackMerge = require("webpack-merge");
const baseConfig = require("./webpack.common.js");

const devConfig = {
  mode: "production",
};

const mergedDevConfig = webpackMerge.merge(baseConfig, devConfig);

module.exports = mergedDevConfig;
```

创建一个简单的文件来测试一下:

```shell
mkdir src
touch src/index.js
```

```js
// src/index.js
const a = "world";

console.log(`hello ${a}!`);
```

接下来可以分别运行`npm run build`和`npm start`看一下通过`webpack`打包的结果.

### webpack 基本配置扩展

```shell
# 处理css需要的依赖
npm install css-loader style-loader postcss-loader postcss postcss-preset-env -D
# 处理sass需要的依赖
npm install sass-loader node-sass -D
# node-sass安装失败的话 可以使用淘宝镜像重试
# npm i node-sass --sass_binary_site=https://npm.taobao.org/mirrors/node-sass/ -D
# 一些plugins
npm install html-webpack-plugin clean-webpack-plugin webpack-dev-server mini-css-extract-plugin -D
```

- `css-loader@6.5.1`
- `style-loader@3.3.1`
- `postcss@8.4.5`
- `postcss-loader@6.2.1`
- `postcss-preset-env@7.2.0`

- `sass-loader@12.4.0`
- `node-sass@7.0.1`

- `html-webpack-plugin@5.5.0` 通过模板生成 html 文件
- `clean-webpack-plugin@4.0.0` 清空打包目标文件夹
- `webpack-dev-server@4.7.2` 可以启动 web 服务器
- `mini-css-extract-plugin@2.4.5` 分离样式文件

```js

```

### 启动 web 服务器

安装`webpack-dev-server`

- `webpack-dev-server@4.7.2` 启动本地服务器

## babel 配置

安装依赖

```shell
npm i babel-loader @babel/core @babel/preset-env @babel/preset-typescript -D
# 解决babel解析async/await报错
npm i @babel/polyfill -D
```

在入口文件引入`@babel/polyfill`

新建`.babelrc.js`, TODO: 配置

`webpack`配置修改

## 配置环境变量(process.env)

在根目录创建`.env`, `.env.development`, `.env.production`三个文件来进行公共, 开发, 生产三个环境的环境变量的配置, 通过`dotenv`引入配置.

首先安装依赖:

```shell
npm install dotenv -D
```

- `dotenv@10.0.0`

然后在`webpack`配置中添加代码, 引入环境变量, 并且通过`DefinePlugin`将`process.env`暴露到浏览器环境中.

```js
// ./config/webpack.common.js
// ...
require("dotenv").config();

const baseConfig = {
  // ...
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
  ],
};

// ./config/webpack.dev.js
// ...
require("dotenv").config({
  path: path.resolve(__dirname, "../.env.development"),
});

// ./config/webpack.prod.js
// ...
require("dotenv").config({
  path: path.resolve(__dirname, "../.env.production"),
});
```

这样就可以在接下来的`webpack`配置文件以及需要打包的文件中使用`process.env`变量.

## TypeScript 配置

安装依赖

```shell
npm i typescript ts-loader -D
```

使用命令`tsc --init`创建初始化文件, 或者直接在根目录下新建文件`tsconfig.json`.

入口文件修改为`.ts`文件, 对 webpack 相应配置进行修改.

## react 配置

```shell
npm i react react-dom react-router-dom
npm i @types/react @types/react-dom @types/react-router-dom @babel/preset-react -D
```

## 参考

[webpack5 手动搭建 React TS 项目](https://juejin.cn/post/6955740697081151524)

[🔥【万字】透过分析 webpack 面试题，构建 webpack5.x 知识体系](https://juejin.cn/post/7023242274876162084)
