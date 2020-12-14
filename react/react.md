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

```jsx
const element = <h2>hello world</h2>
```

- JSX是一种JavaScript的语法扩展（extension）
  - 用于描述UI界面
  - 可以和JavaScript融合在一起使用

**书写规范**

- **顶层只能有一个根元素**——包裹原生div或者Fragment组件
- 为方便阅读在JSX外层包裹小括号