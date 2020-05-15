### fs

* 引入 `const fs = require('fs')`

* 参数
    * `path <string> | <Buffer> | <URL> | <integer>` 文件名或文件描述符
    * `file <string> | <Buffer> | <URL> | <FileHandle>` 文件名或 FileHandle 路径名称
    * `data <string> | <Buffer> | <Uint8Array>` 数据
    * `oldPath <string> | <Buffer> | <URL>` 旧路径
    * `newPath <string> | <Buffer> | <URL>` 新路径

* err.code 参数
    * `err.code === 'ENOENT'` 读取文件没有找到

* 方法
    * fs.mkdir(path[, options], callback) 异步创建目录
        * `options <Object> | <integer>`
            * `recursive <boolean>` 默认值: false
            * `mode <string> | <integer>` 在 Windows 上不支持。默认值: 0o777
        * `callback <Function>` 
            * `err <Error>` 错误
    * fs.writeFile(file, data[, options], callback) 异步创建并写入文件
        * `options <Object> | <string>`
            * `encoding <string> | <null>` 默认值: 'utf8'
            * `mode <integer>` 默认值: 0o666
            * `flag <string>` 参见文件系统 flag 的支持。默认值: 'w'
        * `callback <Function>` 
            * `err <Error>` 错误
    * fs.appendFile(path, data[, options], callback) 异步在文件中添加内容
        * `options <Object> | <string>`
            * `encoding <string> | <null>` 默认值: 'utf8'
            * `mode <integer>` 默认值: 0o666
            * `flag <string>` 参见文件系统 flag 的支持。默认值: 'a'
        * `callback <Function>` 
            * `err <Error>` 错误
    * fs.readFile(path[, options], callback) 异步读取文件内容
        * `options <Object> | <string>`
            * `encoding <string> | <null>` 默认值: null
            * `flag <string>` 参见文件系统 flag 的支持。默认值: 'r'
        * `callback <Function>` 
            * `err <Error>` 错误
            * `data <string> | <Buffer>` 数据
    * fs.rename(oldPath, newPath, callback) 文件重命名
        * `callback <Function>` 
            * `err <Error>` 错误