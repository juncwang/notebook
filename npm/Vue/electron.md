### electron

* 安装前配置
  1. `npm config set registry https://registry.npm.taobao.org/`
  2. `npm config set ELECTRON_MIRROR http://npm.taobao.org/mirrors/electron/`
    * `npm config set ELECTRON_MIRROR https://npm.taobao.org/mirrors/electron`
    * `npm config set ELECTRON_MIRROR https://cdn.npm.taobao.org/dist/electron/`
    * 这里有多个版本的镜像可以选择

* 安装前检查
  1. 检查全局组件内是否包含 electron 
    * mac `/usr/local/node/lib/node_modules`
  2. 如果有并且运行不成功就删掉 electron 重装全局
    * `cnpm install electron -g`

* 安装方式
    1. 新建项目时, 添加 router 时不使用history模式, 选择否 ( 使用 hash # 号 )
    2. 执行 `vue add electron-builder` 这里会提示选择版本 目前只能选择 6.0.0
    3. 安装完成后自动编译项目, 可能会报错, 因为新版本里 installVueDevtools 未使用, 可以忽略
    4. 系统将自动生成一个 `src/background.js` 文件
    5. 修改 `package.json` 文件内参数 `"electron": "^8.0.1",` 目前最新版本
    6. 执行 `cnpm install` 进行安装
    7. 运行开发环境 `npm run electron:serve` 如果失败需要删除 node_modules 中的 electron 并重新 `npm install`
    8. 打包项目 `npm run electron:build`

    * 打包时, 包无法下载下来解决办法
      * 手动到 `https://npm.taobao.org/mirrors/electron/` 下载对应版本的 electron 包文件并拷贝到 `C:\Users\userName\AppData\Local\electron\Cache` 文件夹下
      * 再根据下载不成功提示把其他三个文件手动下载后拷贝到 `C:\Users\Administrator\AppData\Local\ electron-builder\cache\`

* 系统配置 `vue.config.js`
```js
module.exports = {
  pluginOptions: {
      electronBuilder: {
          builderOptions: {
              // 项目图标 win为 256x256
              win: {
                  icon: './public/favicon.ico'
              },
              // 项目图标 mac为 512x512
              mac: {
                  icon: './public/app.png'
              }
              // 项目名称
              productName: 'AppDemo'
          }
      }
  }
}
```

* 演示代码
```js
'use strict'

import { app, protocol, BrowserWindow, Menu } from 'electron'
import {
  createProtocol,
  installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }])

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    // 是否显示 默认为 true
    // show：true,
    // 背景颜色
    // backgroundColor: '#ff6600',
    // 全屏显示
    // fullscreen: true,
    // 无边框
    // frame: false,
    // 设置父窗口
    // parent: top,
    // 设置为模态窗口
    // modal: true,
    // 设置窗口出现的位置
    // x: 0, y: 0,
    webPreferences: {
      // 取消跨域限制
      // webSecurity: false,
      // 容许使用 webVview 标签
      // webviewTag: true,
      // 开启系统对象在渲染进程可用 * 重要
      nodeIntegration: true
    } })

  // 设置取消左上角菜单 需要引入 Menu
  // Menu.setApplicationMenu(null)

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  win.on('closed', () => {
    win = null
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    // Devtools extensions are broken in Electron 6.0.0 and greater
    // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
    // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
    // If you are not using Windows 10 dark mode, you may uncomment these lines
    // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
    // try {
    //   await installVueDevtools()
    // } catch (e) {
    //   console.error('Vue Devtools failed to install:', e.toString())
    // }

  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
```