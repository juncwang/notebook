### react 基础
1. 安装 react 脚手架工具
    * `npm install create-react-app -g`
2. 创建项目
    * `create-react-app projectName`
3. 使用 jsx 语法需要引入
    * `import React from 'react';`

##### 组件传参 state props 父传子
* 父组件
```jsx
import React, {Component} from 'react';
class App extends Component {
  // state 用户改变组件内容状态的值(动态)
  // props 用于组件通信进行传值
  state = {
    persons: [
      {name: 'juncwang', count: 52},
      {name: 'wangjunc', count: 25}
    ],
    otherState: 'anything'
  }

  switchNameHandler = () => {
    this.setState({
      persons: [
        {name: 'juncwang1111', count: 52},
        {name: 'wangjunc222', count: 25}
      ]
    })
  }

  render = () => {
    return (
      <div className="App">
        <button onClick={this.switchNameHandler}>点击</button>
        <Person name={this.state.persons[0].name} count={this.state.persons[0].count}/>
        <Person name={this.state.persons[1].name} count={this.state.persons[1].count}>hello</Person>
      </div>
    );
  }
}
```
* 子组件
```jsx
const person = (props) => {
    return (
        <div>
            <p>用户账户 : {props.name}</p>
            <p>用户数字 : {props.count}</p>
            <p>{props.children}</p>
        </div>
    )
    // props.children => hello 组件标签中间加入的内容
}
```

##### 事件方法传参
1. `<div onClick={this.methodName.bind(this, param)}></div>`
2. `<div onClick={() => this.methodName(param)}></div>`

##### 子传父事件
* 子组件 `<p onClick={props.myclick}></p>`
* 父组件 `<Person myclick={this.methodName.bind(this, param)} />`