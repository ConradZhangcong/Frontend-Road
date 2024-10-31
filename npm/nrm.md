# nrm

nrm(NPM registry manager), npm镜像管理工具

## npm使用

### 全局安装

```bash
npm install nrm -g
```

### 查看镜像源

```bash
# 查看所有镜像源
nrm ls
# 查看当前使用的镜像
nrm current
```

### 切换镜像

```bash
nrm use [registry]
```

### 修改镜像源

```bash
# 添加镜像源
nrm add [registry] [url]
# 删除镜像源
nrm del [registry]
```

### 测试镜像源响应时间

```bash
nrm test [registry]
```
