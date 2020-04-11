### 索引

* `type DB struct`
    * `func (db *DB) Prepare(query string) (*Stmt, error)`
    * `func (db *DB) Exec(query string, args ...interface{}) (Result, error)`

* `type Stmt struct`
    * `func (s *Stmt) Exec(args ...interface{}) (Result, error)`

* `func Open(driverName, dataSourceName string) (*DB, error)`

### 说明

* `type DB struct`
    * DB是一个数据库（操作）句柄，代表一个具有零到多个底层连接的连接池。它可以安全的被多个go程同时使用。
    * sql包会自动创建和释放连接；它也会维护一个闲置连接的连接池。如果数据库具有单连接状态的概念，该状态只有在事务中被观察时才可信。一旦调用了BD.Begin，返回的Tx会绑定到单个连接。当调用事务Tx的Commit或Rollback后，该事务使用的连接会归还到DB的闲置连接池中。连接池的大小可以用SetMaxIdleConns方法控制。
    * 代码:
    ```go
    type DB struct {
        // 内含隐藏或非导出字段
    }
    ```
    * `func (db *DB) Prepare(query string) (*Stmt, error)`
        * Prepare创建一个准备好的状态用于之后的查询和命令。返回值可以同时执行多个查询和命令。
    * `func (db *DB) Exec(query string, args ...interface{}) (Result, error)`
        * Exec执行一次命令（包括查询、删除、更新、插入等），不返回任何执行结果。参数args表示query中的占位参数。

* `type Stmt struct`
    * Stmt是准备好的状态。Stmt可以安全的被多个go程同时使用。
    * 代码:
    ```go
    type Stmt struct {
        // 内含隐藏或非导出字段
    }
    ```
    * `func (s *Stmt) Exec(args ...interface{}) (Result, error)`
        * Exec使用提供的参数执行准备好的命令状态，返回Result类型的该状态执行结果的总结。

* `func Open(driverName, dataSourceName string) (*DB, error)`
    * Open打开一个dirverName指定的数据库，dataSourceName指定数据源，一般包至少括数据库文件名和（可能的）连接信息。
    * 大多数用户会通过数据库特定的连接帮助函数打开数据库，返回一个*DB。Go标准库中没有数据库驱动。参见http://golang.org/s/sqldrivers获取第三方驱动。
    * Open函数可能只是验证其参数，而不创建与数据库的连接。如果要检查数据源的名称是否合法，应调用返回值的Ping方法。
    * 返回的DB可以安全的被多个go程同时使用，并会维护自身的闲置连接池。这样一来，Open函数只需调用一次。很少需要关闭DB。