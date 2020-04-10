# webpack

## 为什么需要构建工具

- 模块化
- 转换`es6`语法,转换`jsx`
- `scss` `less`等预处理器,前缀补全
- 压缩混淆
- 图片压缩

## 基本配置

```javascript
module.exports = {
  // 入口文件的配置 推荐使用对象语法,方便扩展
  entry: {},
  // 出口文件的配置
  // filename 输出文件名 path 输出的文件路径
  output: {},
  // 生成 scoure maps 方便调试
  devtool: '',
  // 构建本地服务器
  devServer: {},
  // 配置babel 对es6,css等语法进行解析
  module: {},
  // 插件 扩展功能,在整个构建过程中生效,执行相关的任务
  plugins: [],
}
```

## webpack3 和 webpack4 的区别

1. webpack4 增加了一个`mode`的配置, 只有两种值 `production | development`
2. CommonsChunkPlugin 在 webpack4 中移除,可以设置`optimization.splitChunks.chunks = 'all'`
3. 使用 MiniCssExtractPlugin 取代 ExtractTextWebpackPlugin
4. 代码分割 使用动态 import，而不是用 system.import 或者 require.ensure
5. vue-loader
6. 不需要 UglifyJsPlugin, 使用 optimization.minimize 为 true

## webpack 热更新

1. 使用 watch 监测变化
2. 使用 webpack-dev-server 创建 web 服务器
3. 使用 webpack-dev-middleware 配合 express 或者 koa 等

## 文件指纹

Hash: 和整个项目有关,只要项目有文件修改,整个项目构建的 hash 值就会改变

ChunkHash: webpack 打包的 chunk 有关,不同 entry 生成不同的 chunkhash

ContentHash: 根据文件内容来定义 hash,文件内容不变,则 contenthash 不变

### js 的设置

```js
module.exports = {
  output: {
    filename: '[name][chunkhash:8]',
  },
}
```

### css的设置

设置MiniCssExtractPlugin的filename

```js
plugins: [
  new MiniCssExtractPulgin({
    filename: '[name][contenthash:8]'
  })
]
```

### 图片的设置

设置file-loader的name,使用hash.这里的hash指的是文件内容的hash.

```js
module.exports = {
  rules: [
    {
      test: /\.(png|svg|jpg|gif)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'img/[name][hash:8].[ext]'
        }
      }]
    }
  ]
}
```
