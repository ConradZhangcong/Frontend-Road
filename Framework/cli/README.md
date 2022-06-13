# 创建脚手架

https://juejin.cn/post/6844903607855235079

## 初始化项目

```bash
mkdir utipia-scripts
cd utipia-scripts
npm init -y
mkdir bin
touch bin/build.js
```

## 配置 package.json

```json
{
  // ...
  "bin": {
    "build": "./bin/build.js"
  }
  // ...
}
```

## 配置 build.js

安装依赖

```bash
pnpm install commander download-git-repo chalk ora
```

- commander 可以解析用户输入的命令。
- download-git-repo 拉取 github 上的文件。
- chalk 改变输出文字的颜色
- ora 小图标（loading、succeed、warn 等）

```js
// bin/build.js


```

#! /usr/bin/env node是指定这个文件使用node执行。
需要安装的模块npm i commander download-git-repo chalk ora --save：
commander可以解析用户输入的命令。
download-git-repo拉取github上的文件。
chalk改变输出文字的颜色
ora小图标（loading、succeed、warn等）
