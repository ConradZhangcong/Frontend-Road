# mac 环境下升级 node 版本

使用 npm 包`n`,来进行 node 版本的升级

## 清除 node 的 cache

```
sudo npm cache clean -f
```

## 安装"n"版本管理工具，管理 node

```
sudo npm install -g n
```

## 更新 node 版本

```
sudo n stable
```

## 更新 npm 版本

```
sudo npm install npm@latest -g
```
