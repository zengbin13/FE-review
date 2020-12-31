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
  - web端：将JSX渲染为真实DOM，显示在浏览器
  - native端：将JSX渲染成原生控件
- babel：将jsx转换成React代码的工具

```html
<script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
```

> script标签中，必须添加 `type="text/babel"`，作用是可以让babel解析jsx的语法



### ReactDOM.render

```html
<script type="text/babel">
	//将数据定义在变量中
    let message = 'hello world';
    //通过ReactDOM对象渲染内容
    ReactDOM.render(<h1>{message}</h1>, document.getElementById('app'))
</script>
```

```js
ReactDOM.render(element, container[, callback])
```

- 在提供的 container 里渲染一个 React 元素，并返回对该组件的引用
  - 针对无状态组件返回 null
- React元素已经在 `container`渲染，则执行更新操作，并在必要时改变DOM
- **参数**
  - 渲染内容， html元素或React元素
  - 渲染内容挂载位置
  - 回调函数——在组件渲染或更新后执行



### react组件化

组件允许你将 UI 拆分为独立可复用的代码片段，并对每个片段进行独立构思

**组件**，从概念上类似于 JavaScript 函数。**接受任意的入参（即 “props”），并返回用于描述页面展示内容的 React 元素**



**函数组件**

```jsx
function Welcome(props) {
    return <h1>hello, {props.name}</h1>
}
```

- 接收唯一带有数据的 “props”对象，并返回一个React元素
- 本质为JavaScript函数

**class组件**

```jsx
class Welcome extends Reacy.Component {
    render() {
        return <h1>hello, {this.props.name}</h1>
    }
}
```

**渲染组件**

- React元素可为DOM标签或自定义组件

- React元素为自定义组件时，JSX所接受的**属性（attribute）或子组件（children）将转换为props对象**传递給该组件

  ```jsx
  function Welcome(props) {  
      return <h1>Hello, {props.name}</h1>;
  }
  const element = <Welcome name="Sara" />;
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
  ```



### Props 的只读性 

- 组件无论是使用函数声明还是通过 class 声明，都**决不能修改自身的 props**

- 所有 React 组件都必须像纯函数一样保护它们的 props 不被更改

  - **纯函数**——不会尝试修改入参，多次调用下相同入参返回同意的结果

    

### State

- State 与 props 类似，但 state 是私有的，并且完全受控于当前组件

```jsx
class Clock extends React.Component {
    constructor(props) {
        //不可变数据, 父组件属性attr或内部子组件children
        super(props); 
        //参与UI更新数据,可调用this.steState()更新数据，并且通知React进行update操作
        //update操作后，将重新调用render函数使用最新数据更新界面
        this.state = {
            date: new Date()
        }
    }
    //生命周期函数, 组件首次渲染到DOM中时
    componentDidMount() {
        this.timerID = setInterval(() => {
            this.tick()
        }, 1000);
    }
    //生命周期函数, 组件从DOM中删除时
    componentWillUnmount() {
        clearInterval(this.timerID)
    }
    //渲染函数,将返回的JSX编译
    render() {
        return (
            <div>
                <h3>hello, world</h3>
                <p>It is {this.state.date.toLocaleTimeString()}</p>
            </div>
        )
    }
    tick() {
        //调用后重新调用render方法更新界面
        this.setState({
            date: new Date()
        })
    }
}
ReactDOM.render(<Clock />, document.getElementById('app'))
```



**正确地使用 State** 

- **不要直接修改state中的数据**

  - 构造函数是唯一可给 `this.state`重新赋值的地方

  ```js
  // Wrong
  this.state.comment = 'Hello';
  // Correct
  this.setState({comment: 'Hello'});
  ```

- **State 的更新可能是异步的 **

  - 出于性能考虑，React 可能会把多个 `setState()` 调用合并成一个调用
  - 不要依赖 `this.props`和 `this.state`来更新下一个状态，可能异步更新

  ```js
  // Wrong
  this.setState({
    counter: this.state.counter + this.props.increment,
  });
  
  // Correct
  //state——上一个state props——更新被应用时的props
  this.setState((state, props) => ({
    counter: state.counter + props.increment
  }));
  
  // Correct
  this.setState(function(state, props) {
    return {
      counter: state.counter + props.increment
    };
  });
  ```

- **State 的更新会被合并** 

  - 调用 `setState()` 时，React 将提供的对象合并到当前的 state

  - **浅合并**——`this.setState({comments})` 完整保留 `this.state.posts`， 但是完全替换`this.state.comments`。

    ```js
    componentDidMount() {
        fetchPosts().then(response => {
          this.setState({
            posts: response.posts      });
        });
    
        fetchComments().then(response => {
          this.setState({
            comments: response.comments      });
        });
      }
    ```

    

### 事件处理

- React 事件的命名采用小驼峰式（camelCase），而不是原生DOM的纯小写
- 使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串

```jsx
<button onclick="activateLasers()">
  Activate Lasers
</button>
<button onClick={activateLasers}>  
    Activate Lasers
</button>
```

> 不能使用 `return false`阻止默认行为，必须显式使用 `e.preventDefault`

```jsx
class Toggle extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isToggleOn: true,
        }
        this.handleClick = this.handleClick.bind(this)
    }
    render() {
        return (
            <button onClick={this.handleClick}>
            	{this.state.isToggleOn ? 'on' : 'off' }
			</button>
        )
    }
    handleClick() {
        this.setState(state => ({
            isToggleOn: !state.isToggleOn
        }))
    }
}
ReactDOM.render(<Toggle />, document.getElementById('app'))
```

**处理class中函数this**

> class方法中默认不会绑定this，在JSX中作为事件回调使用，函数this为 `undefined`

- **bind**

  ```jsx
  this.handleClick = this.handleClick.bind(this)
  ```

  ```html
  <button onClick={this.handleClick.bind(this, id)}>改变文本</button>
  ```

- **箭头函数**

  ```html
  <button onClick={ (e) => this.handleClick(id, e) }>改变文本</button>
  ```

  - 问题：每次渲染该元素时，都将创建不同的回调函数，当该回调函数作为prop传递给子组件时，该元素可能进行额外的渲染

- **class fileds**

  ```js
  handleClick = () => {
      console.log(this)
  }
  ```

**事件参数传递**

- 获取event对象
- 获取更多参数



### 条件渲染

React中条件渲染使用 **if 运算符** 或 **条件运算符**去创建元素来表现当前的状态

**if语句**

```jsx
if(isLoggedIn) {
    return <UserGreeting />
} else {
    return <GuestGreeting />
}
```

**元素变量**

- 可以使用变量来储存元素，可以有条件地渲染组件的一部分而其他部分不会改变

  ```jsx
  render() {
      const isLoggedIn = this.state.isLoggedIn;
      let button;
      if (isLoggedIn) {      
          button = <LogoutButton onClick={this.handleLogoutClick} />;
      } else {
          button = <LoginButton onClick={this.handleLoginClick} />;
      }
      return (
        <div>
          <Greeting isLoggedIn={isLoggedIn} />
          {button}      
        </div>
      );
    }
  ```

**与运算符 &&** 

```jsx
{unreadMessages.length > 0 &&
    <h2>
        You have {unreadMessages.length} unread messages.
    </h2>
}
```

- `true && expression` 总是会返回 expression
- `false && expression` 总是会返回 false

**三目运算符**

```jsx
return (
    <div>
      The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
    </div>
  );
```

```jsx
 return (
    <div>
      {isLoggedIn
        ? <LogoutButton onClick={this.handleLogoutClick} />
        : <LoginButton onClick={this.handleLoginClick} />
      }
    </div>
 );
```

-   `condition ? true : false`



**阻止组件渲染** 

- `render` 方法直接返回 `null`，不进行任何渲染

```jsx
function WarningBanner(props) {
  if (!props.warn) {    return null;  }
  return (
    <div className="warning">
      Warning!
    </div>
  );
}
```

- `{-{false}-{undefined}-{null}-{NaN}-{0}-{''}-}`



**v-show效果**

```jsx
  render() {
    const { isLogin, username } = this.state;
    const nameDisplay = isLogin ? "block": "none";

    return (
      <div>
        <h2 style={{display: nameDisplay}}>{username}</h2>
        <button onClick={e => this.loginBtnClick()}>
            {isLogin ? "退出": "登录"}
        </button>
      </div>
    )
  }
```



### 列表渲染

可以通过使用 {} 在 JSX 内构建一个元素集合

```jsx
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li key={number.toString()}>
     {number}
  </li>
);
ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('root')
);
```



## JSX核心语法

```html
<script type="text/babel">
	const el = <h2>hello world</h2>
	ReactDOM.render(el, document.getElementById('app'))
</script>
```

JSX是一种JavaScript的语法扩展（extension）
- 用于描述UI界面
- 可以和JavaScript融合在一起使用
- React认为**渲染逻辑本质上与其他UI逻辑存在内在耦合**



**JSX书写规范**

- **顶层只能有一个根元素**——包裹原生div或者Fragment组件
- 为方便阅读在JSX外层包裹小括号
- 单标签必须以 `/>`结尾

**JSX嵌入内容**

- 书写规则：{表达式}
- 表达式——变量、字符串、数组、函数调用等

**JSX中注释**

```jsx
<div>
    {/*一段注释内容*/}
    <h2>hello world</h2>
</div>
```

**JSX嵌入变量**

- 变量是`Number、String、Array`类型时，可以**直接显示**

- 变量是`null、undefined、Boolean`类型时，**内容为空**

  ```jsx
  {this.state.flag ? <h2>显示内容</h2> : null}
  {this.state.flag && <h2>显示内容</h2>}
  ```

- 对象类型不能作为子元素——报错 （not valid as a React child）

  

**JSX嵌入表达式**

```jsx
{/*运算表达式*/}
<h2>{this.state.firstName + this.state.lastName}</h2>
{/*三元运算符*/}
<h2>{this.state.age >= 18 ? "成年人" : "未成年人"}</h2>
{/*执行函数*/}
<h2>{this.sayHello('xiaoyu')}</h2>
```



**JSX绑定属性**

- `class`作为关键字，绑定class属性不允许使用，以 `className`代替
- `style`——后加对象类型
  - key——属性名，使用驼峰形式
  - value——属性值

```jsx
<h2 title={this.state.title}>hello world</h2>
<img src={this.state.imageUrl} alt="" />
<a href={this.state.link} target="_blank">百度一下</a>

<div className={'message ' + (this.state.active ? 'active' : '')}>你好呀</div>
<div className={['message', (this.state.active ? 'active' : '')].join(' ')}>你好呀</div>

<div style={{fontSize: '30px', color: 'red'}}>文本</div>
```



**JSX的事件监听**

- 原生监听事件

  - 获取DOM，添加监听事件 `el.addEventListen('click', callback)`
  - HTML中直接绑定onclick

- JSX监听事件

  - React事件命名采用驼峰形式，而非纯小写
  - 通过 `{}`传入事件处理函数

  ```jsx
  render() {
       <button onClick={this.btnClick}>点击</button>
  }
  btnClick() {
       console.log(this)
       console.log("React按钮被点击")
  }
  ```

- **this的问题**

  - `btnClick`函数非主动调用的，而是当button改变时，React内部调用`btnClick`函数
  - **React内部调用的函数，并不知道如何绑定正确的this，值为undefined**

- 解决this问题

  - **bind显式绑定**

    ```jsx
    <button onClick={this.btnClick.bind(this)}>点击</button>
    ```

    ```jsx
    constructor(props) {
        super(props);
        this.state = {}
        this.btnClick = this.btnClick.bind(this)
    }
    ```

  - ES6 class field语法

    - btnClick定义为赋值语句，使用箭头函数赋值this去上一个作用域查找，即当前对象

    ```js
    btnClick: () => {
    	console.log(this)
        console.log("React按钮被点击")
    }
    ```

  - 事件监听时传入箭头函数

    ```
    <button onClick={ e => this.btnClick()}>点击</button>
    ```

- 事件参数传递

  - 获取event对象

  

### JSX的本质

所有的JSX最终都会被转换成**React.createElement**的函数调用

> babel官网进行JSX转换：https://babeljs.io/repl/#?presets=react



`React.createElement(component, props, ...children)`

- component：ReactElement的类型，

  - 原生标签，如 “div”
  - 自定义组件元素，如 <App />

- props：JSX中的属性，以对象形式存储

- children : 存放标签中的内容，以数组形式存储

  ```js
  //对children的处理
  const childrenLength = arguments.length - 2
  if(childrenLength === 1) {
      props.children = children
  } else if( childrenLength > 1) {
      const childArray = Array(childrenLength)
      for (let i = 0; i < childrenLength; i++) {
          childArray[i] = arguments[i + 2];
      }
      if(__DEV__) {
          if(Object.freeze) {
              Object.freeze(childArray)
          }
      }
      props.children = childArray
  }
  ```



### 虚拟DOM的创建过程

- 通过 React.createElement函数 最终创建出来一个 **ReactElement对象**

- React利用ReactElement对象组成了一个JavaScript的对象树，即**虚拟DOM**

  ```jsx
  render() {
      const ReactElememt = (
          <div key="1" ref="2">
              <div className="header" title="头部">
                  <h1>头部区域</h1>
              </div>
              <div className="content">
                  <p>内容区域</p>
                  <button>点击</button>
              </div>
          </div>
      )
      console.log(ReactElememt); //ReactElememt对象
      return ReactElememt
  }
  ```

**JSX转换过程**

```
JSX代码 -> 由React.CreateElement() -> ReactElement对象 （虚拟DOM）

ReactElement -> 由ReactDOM.render() -> 真实DOM
```



**采用虚拟DOM的理由**

- 虚拟DOM便于状态跟踪
- 操作虚拟DOM性能较低：传统开发模式进行频繁的DOM操作
  - document.createElement创建的对象较复杂
  - DOM操作引起浏览器的重排和重绘
  - react对多次操作DOM进行合并 

> Virtual DOM 是一种编程理念
>
> UI以一种理想化或者虚拟化的方式保存在内存中，并且是一个相对简单的JavaScript对象
>
> 通过ReactDOM.render让 `虚拟DOM` 和 `真实DOM`同步起来，称为协调过程