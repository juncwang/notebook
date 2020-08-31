##### shell 脚本

* `shell.sh` 脚本名称以 .sh 结尾
* `#!/bin/bash` 第一行必须写该语句

##### 命令

* `echo "hello world"` 在终端显示字符串
    * `echo "$变量名"` 打印变量

* `read 变量名` 把键盘输入的字符串存在变量中
    * `read -p "想要提示的文字" 变量1 变量2` 提示用户 并让用户输入两次分别传入两个变量(输入时用空格分隔)

* `变量名=$((变量1+变量2))` 获得两个变量的和付给新的变量

* `test` 命令主要用于进行数值、字符、文件三方面的测试
    * `test -e $filename && echo "$filename exit" || echo "$filename no exit"` 
        * 使用 test -e 判断文件名为filename的文件是否存在
        * `&&` 表示当前面为真时执行
        * `||` 表示当前面为假时执行
    * `test $firstStr == $secondStr && echo "firstStr == secondStr" || echo "firstStr != secondStr"`
        * 判断两个变量的字符串是否相等
        * `[ "$firstStr" == "$secondStr" ] && echo "firstStr == secondStr" || echo "firstStr != secondStr"` 中括号判断符 与 test 差不多

* `exit 0` 退出

##### 默认参数

```conf
#!/bin/bash
echo "file name:" $0            # sh脚本文件名
echo "total param num:" $#      # 参数数量
echo "whole param:" $@          # 整个参数的内容
echo "first param:" $1          # 第一个参数
echo "second param:" $2         # 第二个参数
```
* `./my.sh param1 param2`       # 运行脚本

##### 条件判断

* if
```conf 
if [ 条件判断 ]; then
    # 判断成立要做的事情
elif [ 条件判断 ]; then
    # 判断成立要做的事情
else
    # 条件不满足要做的事情
fi 
    # 语句结束
```

* case 
```conf
case $变量 in
    "比较参数")
        程序段
        ;;
    "比较参数")
        程序段
        ;;
    *)              # 通配符
        程序段
        ;;
esac
```

##### 函数

```
function fname() {
    // 函数代码段
    echo "param is $1 $2"
}
# 调用函数 a b 为参数$1 $2
fname a b
```

##### 循环

* 当条件成立循环
```
while [ 条件 ]      # 挎号内的状态是判断式
do                  # 循环开始
    // 循环代码
done
```

* 当条件不成立循环
```
until [ 条件 ]
do
    // 循环代码
done
```

* 根据 con 的个数觉得循环次数, 每次循环 var = con
```
for var in con1 con2 con3 ... 
do
    // 循环代码
done
```

* 循环数值处理
```
for((初始值; 限制值; 执行步长))
do
    // 循环代码
done
```