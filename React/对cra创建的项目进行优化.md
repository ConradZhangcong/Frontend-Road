# 对 cra 创建的项目进行优化

## 打包时关闭 source-map

本来以为进行打包时会默认关闭`source-map`, 但是部署了一个版本后发现代码没有进行压缩. 于是去翻了一下源码:

```js
// node_modules/react-scripts/config/webpack.config.js

const isEnvDevelopment = webpackEnv === "development";
const isEnvProduction = webpackEnv === "production";
// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== "false";

return {
  // ...
  devtool: isEnvProduction
    ? shouldUseSourceMap
      ? "source-map"
      : false
    : isEnvDevelopment && "cheap-module-source-map",
};
```

根据逻辑可以看出只要将`process.env.GENERATE_SOURCEMAP`设置为`false`即可:

在项目根目录下创建`.env`文件:

```
GENERATE_SOURCEMAP=true
```

修改完成后打包(`npm run build`)会发现已经对代码进行了打包压缩, 并且正常调试时`source-map`仍然是开启状态.

## 打包文件分析

我们可以通过`webpack-bundle-analyzer`或者`create-react-app`官网提供的`source-map-explorer`方式来分析打包结果

### source-map-explorer

首先安装依赖

```js
npm install source-map-explorer
```

然后在`package.json`中添加命令:

```
  "scripts": {
+    "analyze": "source-map-explorer 'build/static/js/*.js'",
     "start": "react-scripts start",
     "build": "react-scripts build",
     "test": "react-scripts test",
  }
```

进行打包前需要检查一下是否将`devtool`设置为`source-map`, 需要保证打开`source-map`才能正常对打包后的结果进行分析

```shell
npm run build
npm run analyze
```

### webpack-bundle-analyzer

使用`webpack-bundle-analyzer`, 需要通过`react-app-rewired`与`customize-cra`对默认配置进行修改.

首先安装依赖:

```shell
npm i webpack-bundle-analyzer -D
npm i react-app-rewired customize-cra -D
```

在根目录下创建`config-overrides.js`文件:

```js
const { override } = require("customize-cra");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const addAnalyzer = () => (config) => {
  config.plugins.push(new BundleAnalyzerPlugin());

  return config;
};

module.exports = override(addAnalyzer());
```

### 分析打包文件

因为我这边是一个 demo 项目, 打包后依赖的大小是我编写的源代码的几十倍, `antd`的大小约为`200多kb`, `react`以及`react-dom`也有`100多kb`. 这就需要使用 CDN 来进行加速, 减少打包的体积并且加快脚本加载的速度.

## CDN 加速

CDN 加速是通过修改`webpack`的`externals`配置项, 需要通过`react-app-rewired`与`customize-cra`对默认配置进行修改(参考上一节).

首先安装依赖:

```shell
npm i webpack-bundle-analyzer -D
npm i react-app-rewired customize-cra -D
```

在根目录下新建文件`config-overrides.js`:

```js
// config-overrides.js
const {
  override,
  addWebpackPlugin,
  addWebpackExternals,
} = require("customize-cra");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const CompressionWebpackPlugin = require("compression-webpack-plugin");

const isEnvProduction = process.env.NODE_ENV === "production";
const openAnalyzer = process.env.OPEN_ANALYZE_REPORT === "true";

module.exports = override(
  isEnvProduction &&
    openAnalyzer &&
    addWebpackPlugin(new BundleAnalyzerPlugin()),
  addWebpackExternals({
    react: "React",
    "react-dom": "ReactDOM",
    antd: "antd",
    clipboard: "ClipboardJS",
    dayjs: "dayjs",
  })
);
```

修改`public/index.html`模板文件

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- ...样式文件添加在head标签内 -->
    <!-- antd样式 -->
    <link
      rel="stylesheet"
      href="https://unpkg.com/antd@4.18.8/dist/antd.min.css"
    />
    <link rel="text/less" href="https://unpkg.com/antd@4.18.8/dist/antd.less" />
  </head>
  <body>
    <!-- ...脚本文件添加在底部 -->
    <!-- react -->
    <script
      crossorigin
      src="https://unpkg.com/react@17.0.2/umd/react.production.min.js"
    ></script>
    <script
      crossorigin
      src="https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js"
    ></script>
    <!-- antd -->
    <script
      crossorigin
      src="https://unpkg.com/antd@4.18.8/dist/antd.min.js"
    ></script>
    <!-- clipboard -->
    <script src="https://unpkg.com/clipboard@2.0.10/dist/clipboard.min.js"></script>
    <!-- dayjs -->
    <script src="https://unpkg.com/dayjs@1.10.7/dayjs.min.js"></script>
  </body>
</html>
```

打包完成后可以打开本地服务器或者部署到测试服务器查看一下网络请求, 可以看到刚才添加到`externals`中的依赖都已经被拆分成单个请求, 一般为`xx.min.js`. 这样就加快了打包的速度, 并且提高了页面加载速度.

## 开启 gzip

在`config-overrides.js`文件中添加;

```js
const generatorGzip = process.env.GENERATE_GZIP === "true";

module.exports = override(
  isEnvProduction &&
    generatorGzip &&
    addWebpackPlugin(
      new CompressionWebpackPlugin({
        test: /\.(css|js)$/,
        // 只处理比1kb大的资源
        threshold: 1024,
        // 只处理压缩率低于90%的文件
        minRatio: 0.9,
      })
    )
);
```

这样打包完成后, 有些js文件会多一个同名的`.gz`文件, 然后通过配置nginx来优先加载`.gz`文件.
