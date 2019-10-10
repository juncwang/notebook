### 官方网站
+ `https://git-scm.com`  官网下载
    + windows 需要下载 .exe 文件进行安装
    + mac linux 自带 git

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

+ `$ git commit [options] <file>`
    + 提交代码到本地仓库内, 默认使用 vim 编辑器编辑文件描述内容
    + 不写 file 表示提交所有暂存区文件
        + options
            + -m '描述信息' 使用简洁方式 (不进入 vim) 描述文件
            + -a






+ `$ git checkout -- <file>`
    + 把文件从仓库内去除

+ `$ git reset HEAD <file>`
    + 