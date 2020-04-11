* 初始化数据库
```go
// 导入 mysql 及 数据库操作方法
import (
	"database/sql"
	_ "module/mysql"
)

// 定义全局变量 Db 方便全局调用
var (
	Db *sql.DB
	err error
)

// 初始化方法 第一次引入该包时会调用
func init()  {
    // 获取 mysql 数据库连接 - 这里不一定立即就能获取到
	Db, err = sql.Open("mysql", "root:root@tcp(localhost:3306)/test")
	if err != nil {
		panic(err.Error())
	}
}
```

* 添加数据
```go
// 使用预处理添加数据 =================
// 写 SQL
	sqlStr := "insert into users(username, password, email) values(?,?,?)"
	// Db.Prepare 预编译
	inStmt, err := utils.Db.Prepare(sqlStr)
	if err != nil {
		fmt.Println("预编译出现异常", err)
		return
	}
	// 执行
	_, err = inStmt.Exec("admin", "123456","admin@live.com")
	if err != nil {
		fmt.Println("执行出现异常", err)
		return
    }
    
// 直接添加数据 ========================
// 写 SQL
	sqlStr := "insert into users(username, password, email) values(?,?,?)"
	// 直接使用 Db 执行
	_, err = utils.Db.Exec(sqlStr, "admin2", "666666", "admin2@live.com")
	if err != nil {
		fmt.Println("执行出现异常", err)
		return
	}
```