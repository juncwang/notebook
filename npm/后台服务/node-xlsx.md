### node-xlsx

* 安装方式
    * `npm install node-xlsx --save-dev`

* 使用方法
```js
const path = require('path')
const fs = require('fs')
// 载入 xlsx
const xlsx = require('node-xlsx')
// 解析 xlsx 文件 --- path.resolve('./') + '\\test.xlsx' 获取文件路径
const sheets = xlsx.parse(path.resolve('./') + '\\test.xlsx')
// 遍历读取的文件
sheets.forEach((sheet) => {
    // 分页名称
    console.log(sheet['name'])
    // 每行的数据
    for (let rowId in sheet['data']) {
        // 每行行号
        console.log(rowId)
        // 获取每一行的数据 返回的数组
        let row = sheet['data'][rowId]
        console.log(row)
    }
})

var data = [{
    name: 'sheet1',
    data: [
        [
            'ID',
            'Name',
            'Score'
        ],
        [
            '1',
            'Michael',
            '99'

        ],
        [
            '2',
            'Jordan',
            '98'
        ]
    ]
},
{
    name: 'sheet2',
    data: [
        [
            'AA',
            'BB'
        ],
        [
            '23',
            '24'
        ]
    ]
}
]
// 构建 xlsx
let buffer = xlsx.build(data)
// 写入文件
fs.writeFile('test2.xlsx', buffer, (err) => {
    if(err) {
        console.log('Write failed:', err)
        return
    }

    console.log('Write completed.')
})

// 获取当前路劲方法
// console.log( __dirname )
// console.log(path.resolve('./') + '\\test.xls')
// console.log(process.cwd())
```