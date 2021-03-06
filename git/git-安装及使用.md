### 官方网站
+ `https://git-scm.com`  官网下载
    + windows 需要下载 .exe 文件进行安装
    + mac linux 自带 git

+ `$ git help 命令名称`
    + 查看命令的帮助信息

### 本地库初始化

+ `$ git init` 
    + 初始化 git 本地仓库, 并创建出 .git 目录
    + 里面是 git 本地库相关的子目录和文件及配置信息

+ `$ git config [options] user.name username`
+ `$ git config [options] user.email user@email.com`
    + 配置用户及邮箱, 必须要设置一个 全局或项目级别的用户及邮箱
    + 如果项目内设置了项目级别用户, 默认会使用项目级别用户信息进行上传资料
    + options
        + --global 不加参数为项目级别用户, 带此参数为全局级别用户


### 基础操作

+ `$ git status` 
    + 获取本地库当前的状态

+ `$ git add <file>`
    + 把新添加或修改过的 file 文件添加到本地暂存区
    + 如果把所有文件都进行添加可使用 `$ git add .`

+ `$ git rm --cached <file>`
    + 将放入本地暂存区的文件从暂存区去除

+ `$ git reset HEAD <file>`
    + 撤销放入暂存区的文件

+ `$ git commit [options] <file>`
    + 提交代码到本地仓库内, 默认使用 vim 编辑器编辑文件描述内容
    + 不写 file 表示提交所有暂存区文件
        + options
            + -m '描述信息' 使用简洁方式 (不进入 vim) 描述文件
            + -a


### 版本控制

+ `$ git log [options]`
    + 查看仓库版本记录
        + options
            + --pretty=oneline 单行显示完整版本信息
            + --oneline 单行显示版本信息 (hash部分显示)

+ `$ git reflog`
    + 查看仓库版本信息, 并显示版本指针指向, 回到哪个版本需要移动多少步

+ `$ git reset [options]`
    + 选择仓库版本 -- 移动版本指针
        + --hard [hash] 通过 `$ git reflog` 索引进行移动, 移动本地库, 暂存区, 工作区
        + --hard HEAD^ 版本往后退一步, 一个 ^ 返回一步, 可以直接添加多个 ^
        + --hard HEAD~num 版本往后退 num 步
        + --soft 只会移动本地库 HEAD 指针, 操作同上 --hard
        + --mixed 在本地库移动 HEAD 指针, 重置暂存区, 操作同上 --hard

+ `$ git diff [options] <file>`
    + 显示文件差异
        + HEAD file 与本地库进行比较
        + HEAD^ file 与后退一步的版本进行比较
        + HEAD~num file 与后退 num 步的版本进行比较


### 分支控制

+ `$ git branch [options]`
    + 查看本项目分支
        + options 
            + -v 查看本项目所有分支
            + `分支名称` 创建一个新的分支

+ `$ git checkout <分支名称>`
    + 切换分支

+ `$ git merge <需要合并的分支名称>`
    + 把需要合并的分支合并到先在的分支上
+ `$ git merge origin/master`
    + 把远程的 master 分支合并到本地


### 远程仓库控制

+ `$ git remote -v`
    + 查看远程仓库
+ `$ git remote add origin https://url.com`
    + 添加一个远程仓库的连接并且别名叫 origin

+ `$ git clone https://url.com`
    + 把远程仓库文件克隆到本地

+ `$ git pull origin master`
+ `$ git pull --rebase origin master` 如果出现新建项目上传失败, 可以尝试这个
    + 把远程仓库的 master 分支拉取到本地, 并调整暂存区及工作区
    + 等同于余下两部操作
        1. `$ git fetch origin master`
        2. `$ git merge origin/master`

+ `$ git fetch origin master`
    + 把远程仓库的 master 分支拉取到本地

+ `$ git push origin master`
    + 把本地仓库推送到 origin 远程仓库连接的 master 分支


### SSH 配置

1. 打开终端运行 $ cd ~/.ssh
2. 生成SSH KEY $ ssh-keygen -t rsa -C juncwang@live.com
3. 连续按下回车键进行生成
4. 执行 SSH KEY $ cat ~/.ssh/id_rsa.pub 查看生成内容并进行复制
5. 登陆 GitHub 进入个人设置内添加 SSH KEY

6. 如果遇到权限问题可以使用 `chmod 600 ~/.ssh/id_rsa` 进行解决