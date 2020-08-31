### C 项目编译软件
* 安装方法 `apt-get install make`

* Makefile 文件语法 文件名为 Makefile
```conf
main: main.o input.o calcu.o
    gcc -o main main.o input.o calcu.o

main.o: main.c
    gcc -c main.c

input.o: input.c
    gcc -c input.c

calcu.o: calcu.c
    gcc -c calcu.c

clean:
    rm *.o
    rm main
```

* `make [option]` 生成配置文件第一行配置的文件
    * `make clean` 根据配置文件 clean 下面的命令执行清除文件操作

* 变量的使用
```conf
# = 传地址  := 传参数   ?= 如果变量没有被赋值,就会被赋予值   += 变量追加
objects = main.o input.o calcu.o

main: $(objects)
    gcc -o main $(objects)
```

* 使用 shell 命令
```conf
name = zzk
curname = $(name)       
name = juncwang         

print:
    @echo curname: $(curname)
```

* 自动匹配依赖
```conf
objects = main.o input.o calcu.o

main : $(objects)
    gcc -o main $(objects)

# % 通配符 表示所有以.o .c 结尾的文件
%.o : %.c
    # $< 根据目标文件名称进行匹配
    gcc -c $<

# 申明 clean 为伪目标 下面的 clean 就算有对应文件 也会执行下面的命令
.PHONY: clean
# 如果没有申明 phony 那么有 clean 文件时 clean 将不执行
clean: 
    rm *.o
```
