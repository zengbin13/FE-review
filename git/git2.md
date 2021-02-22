```
mkdir 
cd 
pwd 当前文件夹目录
touch 创建文件
cat 查看文件内容
rm 删除文件
```

```
创建版本库
git init 
git add <file> 添加文件到暂存区
git commit -m <message> 将文件提交到当前分支
git status 查看当前状态 
git diff <file> 对比差异
```

```
版本回退
git log 查看所有commit快照
git log --pretty=oneline
git reset --hard HEAD^ 回退上一个commit版本
git reset --hard <commit id>
git reflog 查看所有版本的操作记录

HEAD指向的版本就是当前版本
```

```
工作区和暂存区
```

![](https://static.liaoxuefeng.com/files/attachments/919020037470528/0)

![git-stage-after-commit](https://www.liaoxuefeng.com/files/attachments/919020100829536/0)



```
管理修改
git diff HEAD -- <file> 查看文件在工作区和版本库的区别
```

- 每次修改，如未git add到暂存区 则不会到commit中



```
撤销修改
git checkout -- file 丢弃工作区的修改 让文件回到最近的git commit 或git add的状态

git reset HEAD <file> 将暂存区的修改撤销 重新放回工作区

git reset命令既可以回退版本，也可以把暂存区的修改回退到工作区 使用HEAD，表示最新的版本
```

- 丢弃工作区修改： `git checkout -- file`
- 丢弃暂存区修改： `git reset HEAD file`
- 丢弃版本库修改： `git reset HEAD^`



```
删除文件
git rm file 从版本库中删除文件,确定删除
git checkout -- file 将误删文件恢复到最新版本
```

- `git checkout` 用版本库的文件替换工作区的文件 工作区的修改和删除都可以一键还原



```
添加远程仓库
```

- 创建SSH key
  - 用户主目录中 `.ssh`是否具有 `id_rsa` `id_rsa.pub`
  - `ssh-keygen -t rsa -C 'email.com'`
- 登陆GitHub
  - Add SSH Key 中，粘贴id_rsa.pub文件的内容



```
添加远程库
git remote add origin <仓库地址> 关联远程仓库
git push -u origin master 本地仓库推送到远程库
```

-   github 创建空仓库 create repository
- 关联远程仓库：`git remote add origin https://github.com/zengbin13/learn-git`
- `git push -u origin master`
  - `git push`将当前分支推送到远程
  - `-u` 
    - 将本地 `master`分支推送到远程新的 `master`分支  
    - 将本地 `master`分支和远程 `master`分支关联
  - `git push origin master` 关联后推送



```
从远程库克隆
git clone <远程仓库地址>
```



```
创建与合并分支
1.master主分支 HEAD指向master
2.创建新分支dev Git新建dev指针,可以将HEAD指向dev
3.对工作区的修改和提交在dev分支,master指针不变
4.将dev合并到master,将maste指向dev当前提交
5.删除dev分支，即将dev指针删除

git checkout -b dev 创建并切换分支
等价于 git branch dev / git checkout dev
git branch 查看所有分支
git branch -a 查看所有分支(包括远程上的分支)
git merge dev 合并指定分支到当前分支
git branch -d dev 将dev分支删除

git switch -c dev 创建并切换到dev分支
git switch master 切换到已有分支
```

![git-br-initial](https://www.liaoxuefeng.com/files/attachments/919022325462368/0)

![git-br-create](https://www.liaoxuefeng.com/files/attachments/919022363210080/l)

![git-br-dev-fd](https://www.liaoxuefeng.com/files/attachments/919022387118368/l)

![git-br-ff-merge](https://www.liaoxuefeng.com/files/attachments/919022412005504/0)

![git-br-rm](https://www.liaoxuefeng.com/files/attachments/919022479428512/0)

```
解决冲突

```

