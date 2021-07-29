# 删除项目中所有的.DS_Store

今天在`push`代码到`github`之后发现, 项目中多了一些`.DS_Store`文件.

然后在可视化界面中发现并没有这个文件, 打开隐藏文件后也没有, 但是可以通过`ls -A`或`ll -A`可以看到这个文件, 那么如何删除这些文件呢?

## 什么是.DS_Store

`.DS_Store`是`Mac OS`保存文件夹的自定义属性的隐藏文件, 如文件的图标位置或背景色, 相当于`Windows`的`desktop.ini`

## 如何删除所有的.DS-Store

首先需要将`.DS_Store`添加到`.gitignore`中:

```shell
echo .DS_Store >> ~/.gitignore
echo .DS_Store >> ./.gitignore
```

如果项目中还未生成`.DS_Store`, 那么这样就已经可以了; 但是如果项目中已经存在了, 首先需要将它从项目中删除, 然后添加到`git`中.

```shell
# 删除项目中的所有.DS_Store
find . -name .DS_Store -print0 | xargs -0 git rm -f --ignore-unmatch
# 提交到git
git add .
git commit -m 'delete .DS_Store'
git push
```
