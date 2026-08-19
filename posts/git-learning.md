# Git学习笔记

Git作为当下流行的版本管理工具，在Ai时代更是显现了其重要性，故有必要进行针对学习，直接指挥Ai也可操作Git，但自己操作可以**省Token**。帮助Ai开发进行版本管理，明确分支。

## Git操作流程

### 1.初始化仓库

- 在项目文件夹下创建仓库，是后续所有操作的基础。初始化仓库后，git才能管理内部文件

```bash
git init
```
### 2.将文件加入暂存区并进行跟踪

```bash
git add 

/* 基础指令 */

git add .

/* 添加当前文件夹下所有文件,将更改（包括新增，删除，修改）加入暂存区 */

git add -A 
git add --all

/* 添加仓库所有文件,将更改（包括新增，删除，修改）加入暂存区 */
```
该操作并不是提交，相当于产生本地的备份，不需要另外保存到其他文件夹，而且可以随时回溯到已暂存的版本

### 3.将暂存区文件提交进仓库

```bash
git commit [<-m '备注'>]

/* -m意思是message，这个备注会作为这次提交的元数据关联在这个快照，同时还会管理作者和时间，作为一个可以肉眼直接识别的标识，不仅可以作为对内容及改动的注释，还可以相较于id快速分别其他快照。*/
```

### 4.对git进行配置

- 有<--system> <--global> <--local> 三个作用域，system是系统级，配置在[安装目录](D:\Program Files\Git\etc\gitconfig)，global是用户级,配置在[用户目录](C:\Users\Administrator\.gitconfig),local是项目级，配置中[项目目录](D:\Project\项目目录\.git\config)
优先级local高于globalg高于system。system一般不用，一般直接配置global

- list 后可以接<--system> <--global> <--local>，会输出对应作用域的配置，如果不加，会直接顺序输出<--system> <--global> <--local>三个作用域的配置
```bash
git config list --global
```

- <user.name "你的昵称"> <user.email "你的邮箱"> 设置作为提交来源，只有配置后才能提交，不然只有clone，pull等只读命令
```bash
git config --global user.name "你的昵称"
git config --global user.email "你的邮箱"
```

- <http.proxy http://127.0.0.1:<port>> <https.proxy http://127.0.0.1:<port>> 代理设置，根据自身代理代理选择端口号配置即可,上传云端时需要配置代理
```bash
git config --global http.proxy http://127.0.0.1:<port>
git config --global https.proxy http://127.0.0.1:<port>
```

### 5.对分支进行改名

有些默认分支名是master，但现在主流分支名是main，需要先修改分支名，直接运行**git branch -m master main**

```bash
git branch (-m|-M) [<old-branch>] <new-branch>
/* 将<old-branch>改为<new-branch>，不写[<old-branch>]则将当前分支名改为<new-branch>*/
```
### 6.绑定远程仓库

```bash
git remote add origin <url>
```
给云端仓库的url赋予别名，在本项目中origin就相当于该<url>，简化了填写。且别名origin也可另外取名，但全球统一默认别名为origin，最好直接用origin就可以

### 7.将提交推送到云端

```bash
git push (-u) origin <branch>
```
将对应的分支推送到云端，-u 可以将该分支绑定到云端，此后在当前分支下可以直接git push，不需要其他参数
如果是跨分支还是需要写git push origin <branch>，如在main分支，要push dev，即使已经绑定，还是需要写 git push origin dev

### 8.创建新分支和转移分支

```bash
git branch <new_branch> 

/* 创建new_branch新分支,但不转移分支 */

git checkout <branch>

git switch <branch>

/* 转移到branch分支 */

git checkout -b <new_branch>

git switch -c <new_branch>

/* 创建new_branch新分支,但转移到分支new_branch*/
```
