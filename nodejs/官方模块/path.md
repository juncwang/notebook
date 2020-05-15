### path

* 引入 `const path = require('path')`

* 参数
    * `path <string>` 路径名称
    * `ext <string>` 可选的文件扩展名
    * `...paths <string>` 路径片段的序列

* 方法
    * path.basename(path[, ext]) 返回文件路径名的最后一部分
    * path.dirname(path) 返回文件路径名的目录名
    * path.extname(path) 返回文件路径名的扩展名
    * path.parse(path) 把文件路径名转成一个对象返回
    * path.join([...paths]) 串联路径