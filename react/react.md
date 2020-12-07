## react

- 用于构建用户界面的 JavaScript 库
  - 以组件划分功能模块
  - 组件内：使用**JSX**描述UI，使用**state**存储组件状态
  - 当应用状态改变时，通过 **setState** 来修改状态，状态改变时UI主动更新

<img src="react.assets/image-20201130182158921.png" alt="image-20201130182158921" style="zoom:80%;" />

**特点**

- 声明式编程
- 组件化开发
- 多平台适配



**React开发依赖**

- react：包含了react和react-native所共同拥有的核心代码
- react-dom：react渲染在不同平台所需要的核心代码
- babel：将jsx转换成React代码的工具

```html
<script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
```

> script标签中，必须添加 `type="text/babel"`，作用是可以让babel解析jsx的语法





