## 基础

### 起步

- 将组件映射到路由，告诉 Vue Router 在哪里渲染
- 使用 **router-link 组件**来导航， 通过传入 `to` 属性指定链接
- <router-link> 默认会被渲染成一个 `<a>` 标签
- 使用 **router-view** **组件**作为路由出口将路由匹配的组件渲染到此处

**html的使用**

```html
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>

<div id="app">
  <h1>Hello App!</h1>
  <p>
    <!-- 使用 router-link 组件来导航. -->
    <!-- 通过传入 `to` 属性指定链接. -->
    <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
    <router-link to="/foo">Go to Foo</router-link>
    <router-link to="/bar">Go to Bar</router-link>
  </p>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
</div>
```

**模块化的使用**

- 导入Vue和VueRouter，要调用 `Vue.use(VueRouter)`
-  每个路由应该映射一个组件,其中component可以为
  -  Vue.extend() 创建的组件构造器
  - 一个组件配置对象
- 通过注入路由器，可在任意组件内访问路由器或当前路由
  - 路由器: this.$router
  - 当前路由: this.$route `this.$route.params.username`

```js
// 1. 定义 (路由) 组件
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

//2.定义路由
const routes = [
    {path: '/foo', component: Foo},
    {path: '/bar', component: Bar},
]
//3.创建router实例， 传入routes配置
const router = new VueRouter({
  routes
})
//4.创建和挂载根实例
const app = new Vue({
  router
}).$mount('#app')
```
- <router-link> 对应的路由匹配成功，将自动设置 class 属性值 .router-link-active




### 动态路由匹配

- 动态路径参数使用冒号 : 标记 `path: '/user/:id'`
- 匹配到路由时，参数将被设置到 `this.$route.params`中
```js
const User = {
  template: `<div>User {{ $route.params.id }}</div>`
}
```
- 多段路径参数

| 模式                          | 匹配路径            | $route.params                          |
| ----------------------------- | ------------------- | -------------------------------------- |
| /user/:username               | /user/evan          | `{ username: 'evan' }`                 |
| /user/:username/post/:post_id | /user/evan/post/123 | `{ username: 'evan', post_id: '123' }` |
- $route对象的其他属性
  -  `$route.query`：URL中查询参数
  - `$route.hash`： 当前路由的 hash 值 (带 `#`)

**响应路由参数的变化**

-  `/user/foo` 导航到 `/user/bar`，**原组件实例会被复用，组件生命周期不会调用**

- 对路由参数进行监测

  ```js
  const User = {  
      template: `<div>User {{ $route.params.id }}</div>`,
      watch: {
          $roue(to, from) {
              //对路由变化进行响应
          }
      }
  }
  ```

- 使用导航守卫

  ```js
  const User = {  
      template: `<div>User {{ $route.params.id }}</div>`,
      beforeRouterUpdate(to, from, next) {
          // react to route changes...
      	// don't forget to call next()
      }
  }
  ```

**捕获所有路由或 404 Not found 路由**

- 匹配任意路径，可以使用通配符 (*)

  ```js
  {
    // 会匹配以 `/user-` 开头的任意路径
    path: '/user-*'
  }
  ```

- 含有*通配符*的路由应该放在最后。路由 `{ path: '*' }` 通常用于客户端 404 错误

- 使用一个通配符时，`$route.params` 内会自动添加一个名为 `pathMatch` 参数

- 匹配的优先级按照路由的定义顺序



### 嵌套路由

- 一个被渲染组件同样可以包含自己的**嵌套 <router-view>**
- 在嵌套的出口中渲染组件，需要在 `VueRouter` 的参数中使用 `children` 配置

```js
roter: [
    {
      path: '/user/:id',
      component: User,
      children: [
        {
          // 当 /user/:id/profile 匹配成功
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'profile',
          compoent: UserProfile
        },
        {
          // / 开头的嵌套路径会被当作根路径
          path: 'posts',
          component: UserPosts
        },
        { 
          // 当 /user/:id 匹配成功
          path: '', 
          component: UserHome 
        },
      ]
    }
]
```



### 编程式的导航

- 借助 router 的实例方法，通过编写代码来实现导航

| 声明式                    | 编程式             |
| ------------------------- | ------------------ |
| `<router-link :to="...">` | `router.push(...)` |

-  `router.push(location, onComplete?, onAbort?)`

  - 向 history 栈添加一个新的记录
  - 点击 `<router-link>` 时，该方法会在内部调用
  - 参数可是一个字符串路径，或者一个描述地址的对象

  ```js
  router.push('home')
  router.push({path: 'home'})
  // 命名的路由
  router.push({name: 'user', params: {userId: '123'}})
  // 带查询参数，变成 /register?plan=private
  router.push({path: 'register', query: {plan: 'private'}})
  ```

  - 如果提供`path`，`params` 会被忽略

  ```js
  const userId = '123'
  router.push({ name: 'user', params: { userId }}) // -> /user/123
  router.push({ path: `/user/${userId}` }) // -> /user/123
  ```



| 声明式                            | 编程式                |
| --------------------------------- | --------------------- |
| `<router-link :to="..." replace>` | `router.replace(...)` |

- `router.replace(location, onComplete?, onAbort?)`
  - 替换掉当前的 history 记录

- `router.go(n)`
  - 在 history 记录中向前或者后退多少步



###  命名视图

- 命名视图，可以在界面中**拥有多个单独命名的视图**，而不是只有一个单独的出口

  ```html
  <router-view class="view one"></router-view>
  <router-view class="view two" name="slider"></router-view>
  <router-view class="view three" name="main"></router-view>
  ```

  ```js
  routes: [
    {
      path: '/',
      components: {
        default: Header,
        slider: Slider,
        main: Main
      }
    }
  ]
  
  ```

  

### 重定向和别名

**重定向**

- 导航守卫并没有应用在跳转路由上，而仅仅应用在其目标上

```js
routes: [
  { path: '/a', redirect: '/b' }
    
  // 重定向到命名的路由
  { path: '/a', redirect: { name: 'foo' }}
  
  //动态返回重定向目标
  { path: '/a', redirect: to => {
      // 方法接收 目标路由 作为参数
      // return 重定向的 字符串路径/路径对象
  }}
]
```

**别名**

```js
routes: [
    {
        path: '/a',
        component: A,
        alias: '/b'
    }
]
```



### 路由组件传参

- 在组件中使用 `$route` 会使之与其对应路由形成高度耦合

- 如果 `props` 被设置为 `true`，`route.params` 将会被设置为组件属性
- 如果 `props` 是一个对象，它会被按原样设置为组件属性