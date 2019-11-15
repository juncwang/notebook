### 数据
+ string    key-val
+ hash      [ 数据 ]
+ list      [ 数据 ]
+ set       [ 数据 ]
+ zset      [ 有序数据 ]

### 基本使用

+ 说明: Redis 安装好后, 默认有 16 个数据库, 初始化默认使用 0 号库, 编号 0...15

1. 添加 key-val [set]
    + `set [key] [value]`
2. 查看当前 redis 的所有 key [keys *]
    + `keys *`
3. 获取 key 对应的值 [get key]
    + `get [key]`
4. 切换 redis 数据库 [select index]
    + `select [index]`
5. 如何查看当前数据库的 key-val 数量 [dbsize]
    + `dbsize`
6. 清空当前数据库的 key-val 和清空所有数据库的 key-val [flushdb flushall]
    + `flushdb` 清空当前数据库数据
    + `flushall` 清空所有数据库数据

### 增删改查

+ Redis 的五大数据类型: String(字符串), Hash(哈希), List(列表), Set(集合), ZSet(有序集合)

##### String 字符串

+ string 是 redis 最基本的类型, 一个 key 对应一个 value
+ string 类型是二进制安全的, 除普通的字符串外, 也可以存放图片等数据
+ redis 中字符串 value 最大是 512M

+ 举例: 
    + `set [key] [value]` 把数据 value 存放在 key
    + `setex [key] [second] [value]` 把数据 value 存放在 key 内, second 秒后自动删除
    + `mset [key] [value] [key] [value]...` 存放多组 value 到多个 key
        + set [如果存在 key 相当于修改, 如果不存在 key 相当于添加]

    + `get [key]` 从 key 获取数据 value
    + `mget [key] [key]...` 获取多组 key 的 value

    + `del [key]` 删除 key 的 value

##### Hash 哈希(类似于 golang 内的 map)

+ redis hash 是一个键值对集合. 
+ redis hash 是一个 string 类型的 field 和 value 的映射表, hash 特别合适于存储对象

+ 举例:
    + `hset [key] [field] [value]` 把 hash 数据 field:value 存放在 key
    + `hmset [key] [field] [value] [field] [value]...` 存放多个 value 到多个 field, 最后放入到 key  

    + `hget [key] [field]` 从 key:field 获取数据 value
    + `hmget [key] [field] [field]...` 从 key 中的多个 field 获取 value
    + `hgetall [key]` 从 key 获取所有 field 的数据

    + `hlen [key]` 获取 key 中有多少个 field

    + `hexists [key] [field]` 判断 key 中是否有 field 字段 - 有 1 无 0

    + `hdel [key]` 删除 key 的所有 field 及 value

##### List 列表

+ 列表是简单的字符串列表, 按照插入顺序排序. 你可以添加一个元素到类别的头部或尾部
+ list 本质是个链表, list 的元素是有序的, 元素的值可以重复

+ 举例:
    + `lpush [key] [value] [value]...` 把多个 value 数据依次从左边存放到 key 中
    + `rpush [key] [value] [value]...` 把多个 value 数据依次从右边存放到 key 中

    + `lrange [key] [start] [end]` 从 key 取出数据 从第 start(0代表第一个数据) 个数据到 end(-1代表倒数第一个数据) 个数据
    + `lindex [key] [index]` 获取 key 的 list 中的第 index 个元素, 第一位是 0 

    + `llen [key]` 获取 key 的 list 长度

    + `lpop [key]` 获取 key 中最前面的值, 并从 list 中删除
    + `rpop [key]` 获取 key 中最后面的值, 并从 list 中删除

    + `dele [key]` 删除 key 的 List

##### Set 集合

+ redis 的 set 是 string 类型的无需集合
+ 底层是 HashTable 数据结构, set 也是存放多个字符串元素, 字符串元素是无序的, 并且元素的值不能重复

+ 举例:
    + `sadd [key] [member] [member]...` 把多个 menber 数据存入到 key

    + `smembers [key]` 从 key 获取到所有的 member 值

    + `sismember [key] [member]` 判断 member 在 key 集合中是否存在, 有 1 无 0

    + `srem [key] [member]` 删除 key 集合中的 member 元素
