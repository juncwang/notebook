+ ssh username@servername 链接服务器 用户名加服务器 ip
+ scp username@servername:/serverPath/filename /localPath(本地目录) 把服务器上的文件下载到本地目录
+ scp /localPath/filename username@servername:/serverPath 把本地文件上传到服务器目录
+ scp -r ... ... 上传下载整个文件目录及内容