# webpack

## 为什么需要构建工具

- 模块化
- 转换`es6`语法,转换`jsx`
- `scss` `less`等预处理器,前缀补全
- 压缩混淆
- 图片压缩

## 开始使用 webpack

通过 npm 安装 webpack:

```shell
# 全局安装
npm install -g webpack
# 安装到项目目录
npm install -D webpack
```

查看 webpack 版本号:

```shell
# 直接查看
npm info webpack
# 安装webpack-cli后查看
webpack -v
```

## 配置文件

### entry 入口起点

推荐使用对象语法,方便扩展.

### output 输出

- filename 输出文件名
- path 输出的文件路径

```javascript
const config = {
  entry: {
    pageOne: "./src/pageOne/index.js",
    pageTwo: "./src/pageTwo/index.js"
  },
  output: {
    filename: "[name].js",
    path: __dirname + "dist",
    publicPath: "http://cdn.example.com/assets/[hash]/"
  }
};
```

### devtool

生成 scoure maps 方便调试

### devServer

构建本地服务器

```shell
npm install -D webpack-dev-server
```

```javascript
const config = {
  devServer: {
    contentBase: "./public", // 设置本地服务器的根目录
    port: 8080, // 端口号, 默认为8080
    inline: true, // 当源文件改变时自动刷新页面
    open: true, // 默认为false, 设置为true时启动服务器后自动打开浏览器
    historyApiFallback: true // 默认为false,
  }
};
```

### loader

可以通过使用不同的 loader,对不同格式的文件进行处理,比如将 scss 转为 css,将 es6 语法转为现代浏览器兼容的语法,将 jsx 文件转为 js 文件.

#### babel-loader

babel 其实是一个编译 js 的平台,它可以编译代码达到一下目的:

- 将最新的 es6,es7...语法转为被当前使用的浏览器兼容的语法
- 能使用基于 js 进行扩展的语言,比如 react 的 jsx

babel-loader 的**安装和配置**

babel 其实是几个模块化的包,其核心功能位于`babel-core`.对于不同功能和扩展,都需要安装单独的包(解析 es6 的`babel-preset-env`,解析 jsx 的`babel-preset-react`包等).

babel-loader@8 对应 babel-core@7
babel-loader@7 对应 babel-core@6

在 webpack 中配置 babel

```javascript
const config = {
  module: {
    rules: [
      {
        test: /(.jsx|.js)$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env", "react"]
          }
        },
        exclude: "/node_modules/"
      }
    ]
  }
};
```

babel 具有非常多配置选项,在 webpack 配置文件中进行配置显得复杂,所以单独放在`.babelrc`的配置文件中:

```json
// .babelrc
{
  "presets": ["react", "env"]
}
```

#### css-loader & style-loader

webpack 提供两个工具处理样式表

`css-loader`可以使用类似`@import`和`url(...)`的方法实现`require()`的功能

`style-loader`将所有的计算后的样式加入页面中

配置如下:

```js
const config = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }]
      }
    ]
  }
};
```

`css module`: 通过 css 模块化,所有类名,动画名默认作用域当前模块,避免全局污染,在 css-loader 中进行配置:

```javascript
const config = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: {
                mode: "local",
                localIdentName: "[name]__[local]--[hash:base64:5]"
              }
            }
          }
        ]
      }
    ]
  }
};
```

#### css 预处理器

sass less 之类的预处理器是对原生 css 的扩展,一下是常用的 css 处理器 loader:

- less loader
- sass loader
- stylus loader

还有一个处理 css 的`postcss`,可以为 css 代码自动添加不同厂商的 css 前缀.

安装 postcss-loader 和 autoprefixer

```shell
npm install --save-dev postcss-loader autoprefixer
```

在 webpack 中进行配置

```javascript
const config = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: {
                mode: "local",
                localIdentName: "[name]__[local]--[hash:base64:5]"
              }
            }
          },
          { loader: "postcss-loader" }
        ]
      }
    ]
  }
};
```

新建`postcss.config.js`文件

```javascript
module.exports = {
  plugins: [require("autoprefixer")]
};
```

### Plugins

插件是用来扩展 webpack 功能的,在整个构建过程中生效,执行相关的任务.

#### webpack.BannerPlugin

可以在打包的文件上方添加文字

```javascript
const webpack = require("webpack");

const config = {
  plugins: [
    new webpack.BannerPlugin('created by conrad')
  ]
};
```

#### htmlWebpackPlugin

依据一个简单的 html 模板,生成自动引用打包后的 js 文件的新的 html 文件
