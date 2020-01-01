### mysql

* 安装方式
    * `npm install mysql --save-dev`

* mysql连接池
```js
//创建连接池
//导入所需模块  
var mysql=require("mysql");    
//导入配置文件  
var cfg  =require("./config/db");  
var pool = mysql.createPool({    
    host:      cfg.HOST,  
    user:      cfg.USER,   
    password:  cfg.PASS,    
    database:  cfg.NAME    
    port:      cfg.PORT  
});    
//导出查询相关  
var query=function(sql,callback){    
    pool.getConnection(function(err,conn){    
        if(err){    
            callback(err,null,null);    
        }else{    
            conn.query(sql,function(qerr,vals,fields){    
                //释放连接    
                conn.release();    
                //事件驱动回调    
                callback(qerr,vals,fields);    
            });    
        }    
    });    
};    
module.exports=query;
// 使用连接池
var query=require("./lib/pool.js");    

query("select * from token ",function(err,vals,fields){    
    //其他信息  
});
```