### gyp: No Xcode or CLT version detected!

* 解决方法
    1. `$ xcode-select --install`
        * 如果系统提示如下信息：`xcode-select: error: command line tools are already installed, use "Software Update" to install updates` 而事实上并没有所谓的"Software Update"可以更新
    2. `$ sudo rm -rf $(xcode-select -print-path)` 删除
    3. `$ xcode-select --install` 再安装