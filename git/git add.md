# git add

## `git add .`

监控工作区的状态树,会将工作时的所有变化提交到暂存区,包括文件内容`修改`以及`新文件`,但是不包括被删除的文件.

## `git add -u`

监控已经被 add 的文件(即 tracked file),他会将被修改的文件提交到暂存区,不会提交新文件,是`git add -update`的缩写

## `git add -A`

会将文件内容修改,新文件,删除的文件一起提交到暂存区,是上面两个功能的合集,是`git add -all`的缩写

## 总结

git 版本不同会有所区别:

git Version 1.x:

|            | new | modified | deleted |
| :--------- | --- | -------- | ------- |
| git add -A | √   | √        | √       |
| git add .  | √   | √        | ×       |
| git add -u | ×   | √        | √       |

git Version 2.x:

|                            | new | modified | deleted |
| :------------------------- | --- | -------- | ------- |
| git add -A                 | √   | √        | √       |
| git add .                  | √   | √        | √       |
| git add --ignore-removal . | √   | √        | ×       |
| git add -u                 | ×   | √        | √       |
