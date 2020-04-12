### 概述

+ sql包提供了保证SQL或类SQL数据库的泛用接口。
+ 使用sql包时必须注入（至少）一个数据库驱动。参见http://golang.org/s/sqldrivers 获取驱动列表。
+ 更多用法示例，参见wiki页面：http://golang.org/s/sqlwiki。

### 索引

* `type DB struct`
    * `func (db *DB) Prepare(query string) (*Stmt, error)`
    * `func (db *DB) Exec(query string, args ...interface{}) (Result, error)`
    * `func (db *DB) QueryRow(query string, args ...interface{}) *Row`
    * `func (db *DB) Query(query string, args ...interface{}) (*Rows, error)`

* `type Row struct`
    * `func (r *Row) Scan(dest ...interface{}) error`
* `type Rows struct`
    * `func (rs *Rows) Next() bool`
    * `func (rs *Rows) Scan(dest ...interface{}) error`

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
    * `func (db *DB) QueryRow(query string, args ...interface{}) *Row`
        * QueryRow执行一次查询，并期望返回最多一行结果（即Row）。QueryRow总是返回非nil的值，直到返回值的Scan方法被调用时，才会返回被延迟的错误。（如：未找到结果）
    * `func (db *DB) Query(query string, args ...interface{}) (*Rows, error)`
        * Query执行一次查询，返回多行结果（即Rows），一般用于执行select命令。参数args表示query中的占位参数。

* `type Row struct`
    * QueryRow方法返回Row，代表单行查询结果
    * 代码:
    ```go
    type Row struct {
        // 内含隐藏或非导出字段
    }
    ```
    * `func (r *Row) Scan(dest ...interface{}) error`
        * Scan将该行查询结果各列分别保存进dest参数指定的值中。如果该查询匹配多行，Scan会使用第一行结果并丢弃其余各行。如果没有匹配查询的行，Scan会返回ErrNoRows。
* `type Rows struct`
    * Rows是查询的结果。它的游标指向结果集的第零行，使用Next方法来遍历各行结果：
    ```go
    rows, err := db.Query("SELECT ...")
    // ...
    defer rows.Close()
    for rows.Next() {
        var id int
        var name string
        err = rows.Scan(&id, &name)
        // ...
    }
    err = rows.Err() // get any error encountered during iteration
    // ...
    ```
    * 代码:
    ```go
    type Rows struct {
        // 内含隐藏或非导出字段
    }
    ```
    * `func (rs *Rows) Next() bool`
        * Next准备用于Scan方法的下一行结果。如果成功会返回真，如果没有下一行或者出现错误会返回假。Err应该被调用以区分这两种情况。
        * 每一次调用Scan方法，甚至包括第一次调用该方法，都必须在前面先调用Next方法。
    * `func (rs *Rows) Scan(dest ...interface{}) error`
        * Scan将当前行各列结果填充进dest指定的各个值中。
        * 如果某个参数的类型为*[]byte，Scan会保存对应数据的拷贝，该拷贝为调用者所有，可以安全的,修改或无限期的保存。如果参数类型为*RawBytes可以避免拷贝；参见RawBytes的文档获取其使用的约束。
        * 如果某个参数的类型为*interface{}，Scan会不做转换的拷贝底层驱动提供的值。如果值的类型为[]byte，会进行数据的拷贝，调用者可以安全使用该值。

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