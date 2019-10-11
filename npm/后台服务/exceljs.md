### exceljs

* 安装方式
    * `npm i exceljs`

* 使用方法

```js
var Excel = require("exceljs");

var workbook = new Excel.Workbook();

// 基本的创建信息
// workbook.creator = "Me";
// workbook.lastModifiedBy = "Her";
// workbook.created = new Date(1985, 8, 30);
// workbook.modified = new Date();
// workbook.lastPrinted = new Date(2016, 9, 27);

// 视图大小， 打开Excel时，整个框的位置，大小
// workbook.views = [
//     {
//         x: 0,
//         y: 0,
//         width: 10000,
//         height: 20000,
//         firstSheet: 0,
//         activeTab: 1,
//         visibility: "visible"
//     }
// ];

// 标签创建
var worksheet = workbook.addWorksheet("第一个标签");
  // 带颜色的
// var worksheet2 = workbook.addWorksheet("第二个标签", { properties: { tabColor: { argb: "FFC0000" } } });

// 遍历标签
// workbook.eachSheet((worksheet, sheetId) => {
//     console.log("标签ID：", sheetId)
// })
// console.log(worksheet);
// 删除一个标签
// workbook.removeWorksheet(2)

// var firstSheet = workbook.getWorksheet(1);
// console.log("标签信息-id", firstSheet.id);
// console.log("获取总的：行/实际行 /列/实际列 个数： ", firstSheet.rowCount, firstSheet.actualColumnCount, firstSheet.columnCount, firstSheet.actualColumnCount);

// 添加那个筛选箭头
// worksheet.autoFilter = 'A1:C1';

// 行设置
worksheet.getRow(5).font = { size: 14, bold: true };
// 列设置
worksheet.getColumn('A').font = { size: 14, bold: true };

// 合并表格
worksheet.mergeCells('A2:C2');
// 设置表格的值
worksheet.getCell("A2").value = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
// 单独设置
worksheet.getCell("A2").font = {
    name: "Arial Black",
    color: { argb: "FF00FF00" },
    family: 2,
    size: 14,
    italic: true,
    bold: true
};


// 设置内容位置
// worksheet.getCell('A2').alignment = { vertical: 'top', horizontal: 'left' };
worksheet.getCell('A2').alignment = { vertical: 'middle', horizontal: 'center'};
// worksheet.getCell('A2').alignment = { vertical: 'bottom', horizontal: 'bottom' };

// 设置内容边框
worksheet.getCell('A2').border = {
    top: {style:'thin'},
    left: {style:'thin'},
    bottom: {style:'thin'},
    right: {style:'thin'}
};


// save workbook to disk
workbook.xlsx.writeFile("first.xlsx").then(function() {
    console.log("saved");
});


// read from a file
var workbook = new Excel.Workbook();
workbook.xlsx.readFile(filename)
    .then(function() {
        // use workbook
    });

```