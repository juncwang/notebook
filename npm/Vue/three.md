### 安装 Three
+ `npm install three` 安装 threejs 插件
+ `npm install three-orbit-controls` 安装轨道控制插件
+ `npm i --save three-obj-mtl-loader` 安装加载.obj和.mtl文件的插件
+ `npm i --save three-css2drender` 安装 three-css2drender 插件

### 使用案例

+ 导入插件方法
```js
// 导入 THREE
import * as THREE from "three";
// 导入 材质模型加载器
import { OBJLoader, MTLLoader } from "three-obj-mtl-loader";
// import MTLLoader from  'three-mtl-loader';
// import OBJLoader from  'three-obj-loader';
// 导入 three-css2drender
import { CSS2DRenderer, CSS2DObject } from "three-css2drender";
// 导入轨道控制器
const OrbitControls = require("three-orbit-controls")(THREE);
```

+ 控制器的使用
```js
controls = new OrbitControls(camera)
```

+ 加载器的使用
```js
//包含材质
// 文件路径为 /public 目录下的静态文件
// 加载材质
new MTLLoader().setPath('/model/modelFirst/').load('modelFirst.mtl', materials => {
    console.log("materials", materials);
    materials.preload();
    // 设置模型材质并加载模型
    new OBJLoader().setMaterials(materials).setPath('/model/modelFirst/').load('modelFirst.obj', obj => {
        // 设置模型缩放
        obj.scale.set(0.8, 0.8, 0.8);
        // 设置模型位置
        obj.position.set(-40, -50, 10);
        this.addSprite(-95, -55, -110, '/image/shoop.png', -70, 'SKECH', obj, function () {
        });
        this.addSprite(-80, -65, -90, '/image/cloth.png', -52, 'FILA', obj, function () {
        });
        this.addSprite(-100, -45, -80, '/image/apple.png', -63, 'APPLE', obj, function () {
        });
        // 将模型放入场景
        this.scene.add(obj);
    });
});
```

+ 简单例子
```js
this.scene = new THREE.Scene()  // 创建场景对象

// this.geometry = new THREE.SphereGeometry(60, 40, 40)  // 创建一个球体几何对象
this.geometry = new THREE.BoxGeometry(100,100,100)  // 创建一个盒子几何对象
// 创建一个材质对象
this.material = new THREE.MeshLambertMaterial({
color: 0x0000ff
})
this.mesh = new THREE.Mesh(this.geometry, this.material) // 创建一个网格模型对象并放入几何对象
this.scene.add(this.mesh) // 把网格对象放入场景

// 创建一个点光源
this.point = new THREE.PointLight(0xffffff)
this.point.position.set(400,200,300)
this.scene.add(this.point)

// 创建一个环境光
this.ambient = new THREE.AmbientLight(0x444444)
this.scene.add(this.ambient)

// 相机设置
let width = window.innerWidth // 窗口宽度
let height = window.innerHeight // 窗口高度
let k = width / height  // 窗口宽高比
let s = 200 // 场景显示范围控制, 系数越大, 显示的范围越大
// 创建一个相机对象
this.camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
this.camera.position.set(200,300,200)
this.camera.lookAt(this.scene.position)

// 创建渲染对象
this.renderer = new THREE.WebGLRenderer();
this.renderer.setSize(width, height)  // 设置渲染区尺寸
this.renderer.setClearColor(0xb9d3ff, 1)  // 设置背景颜色
document.getElementById('container').appendChild(this.renderer.domElement)  // 在对象上插入 canvas 对象
this.renderer.render(this.scene, this.camera)
```

### 案例

+ `https://github.com/mfnn/Three.js`


### API

+ `https://threejs.org/` 官方文档
+ `http://www.yanhuangxueyuan.com/threejs/docs/index.html`  中文文档