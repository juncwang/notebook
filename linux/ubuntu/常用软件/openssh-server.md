### ssh
* 安装方法 `apt install openssh-server`

* 修改配置
```conf
Port 22
ListenAddress 0.0.0.0 # 取消注释
#StrictModes yes # 注释
PasswordAuthentication yes # 允许密码登录
```

* 生成私钥公钥
```conf
sudo ssh-keygen -t dsa -f /etc/ssh/ssh_host_dsa_key
sudo ssh-keygen -t rsa -f /etc/ssh/ssh_host_rsa_key
```

* 启动 `service ssh start`