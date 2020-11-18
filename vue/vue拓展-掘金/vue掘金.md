### 0.那你能讲一讲MVVM吗？

- Model层代表数据模型，View代表UI组件，ViewModel用于连接View和Model层
- 数据会绑定到viewModel层并自动将数据渲染到页面中
- 视图变化的时候会通知viewModel层更新数据



### 1.简单说一下Vue2.x响应式数据原理

- Vue在初始化数据时，会使用`Object.defineProperty`重新定义data中的所有属性(**数据劫持**)
- 当页面使用对应属性时，首先会进行**依赖收集**(收集当前组件的`watcher`)
- 如果属性发生变化时，**通知相关依赖进行更新**操作



### 2.那你知道Vue3.x响应式数据原理吗？

Vue3.x改用`Proxy`替代Object.defineProperty

- Proxy可以直接监听对象和数组的变化，并且有多达13种拦截方法
- 作为新标准将受到浏览器厂商重点持续的性能优化

处理Proxy只会代理对象的第一层的方法

- 判断当前Reflect.get的返回值是否为Object，为对象时再次使用 `reactive`方法进行代理，实现深度观察



### 3.再说一下vue2.x中如何监测数组变化

使用了**函数劫持的方式，重写数组的方法**

- Vue将data中的数组进行了原型链重写，指向了自己定义的数组原型方法，当调用数组api时，可以通知依赖更新
- 如果数组中包含着引用类型，会对数组中的引用类型再次递归遍历进行监控



### 4.nextTick知道吗，实现原理是什么？

将回调延迟到下次 DOM 更新循环之后执行



### 5.说一下Vue的生命周期

- beforeCreate
  - 在当前阶段data、methods、computed以及watch上的数据和方法都不能被访问
- created
  - 在实例创建完成后发生，当前阶段已经完成了数据观测
  - 但更改数据不会触发updated函数，可用于初始数据的获取
  - 当前阶段无法与Dom进行交互，但仍可以通过vm.$nextTick来访问Dom
- beforeMount
  - 发生在挂载之前，template模板已导入渲染函数编译
  - 当前阶段虚拟Dom已经创建完成，即将开始渲染
- mounted
  - 挂载完成后发生，在当前阶段，真实的Dom挂载完毕
  - 数据完成双向绑定，可以访问到Dom节点
  - 使用$refs属性对Dom进行操作
- beforeUpdate
  - 响应式数据发生更新，虚拟dom重新渲染之前被触发
  - 在当前阶段进行更改数据，不会造成重渲染

- updated
  - 当前阶段组件Dom已完成更新
  - 避免在此期间更改数据，防止无限循环更新
- beforeDestroy
  - 发生在实例销毁之前，在当前阶段实例完全可以被使用
  - 可进行善后收尾工作，比如清除计时器
- destroyed
  - 发生在实例销毁之后，只剩下dom空壳
  - 组件已被拆解，数据绑定被卸除，监听被移出，子实例也统统被销毁



### 6.你的接口请求一般放在哪个生命周期中

接口请求一般放在`mounted`中

- 但需要注意的是服务端渲染时不支持mounted，需要放到`created`中



### 7.再说一下Computed和Watch

Computed本质是一个**具备缓存**的watcher，依赖的属性发生变化就会更新视图

- 适用于计算比较消耗性能的计算场景
- 模板中复杂的逻辑放入计算属性中处理

`Watch`没有缓存性，更多的是观察的作用，可以监听某些数据执行回调

- 需要深度监听对象中的属性时，可以打开deep：true选项，但带来性能问题



### 8.说一下v-if和v-show的区别

当条件不成立时，`v-if`不会渲染DOM元素，`v-show`操作的是样式(display)，切换当前DOM的显示和隐藏



### 9.组件中的data为什么是一个函数？

为了保证组件不同的实例之间data不冲突，如果data是对象的话，对象属于引用类型，会影响到所有的实例



### 10.说一下v-model的原理

`v-model`本质 使用 `value` property 和 `input` 事件 的语法糖

原生的v-model，会根据标签的不同生成不同的事件和属性



### 11.Vue事件绑定原理说一下

**原生事件绑定**是通过`addEventListener`绑定给真实元素的

**组件自定义事件绑定**是通过Vue自定义的`$on`实现的



### 12.Vue模版编译原理知道吗，能简单说一下吗？

Vue的编译过程就是将`template`转化为`render`函数的过程

- 生成AST树
- 优化
- codegen



### 13.Vue2.x和Vue3.x渲染器的diff算法分别说一下



### 14.再说一下虚拟Dom以及key属性的作用

虚拟Dom的产生原因

- 在浏览器中操作DOM是很昂贵的。频繁的操作DOM，会产生一定的性能问题
- Virtual DOM本质就是用一个原生的JS对象去描述一个DOM节点。是对真实DOM的一层抽象
- VirtualDOM映射到真实DOM要经历VNode的create、diff、patch等阶段

key属性的作用

- **key的作用是尽可能的复用 DOM 元素**
- 新旧 children 中的节点只有顺序是不同的时候，最佳的操作应该是通过移动元素的位置来达到更新的目的
- 需要在新旧 children 的节点中保存映射关系，以便能够在旧 children 的节点中找到可复用的节点。key也就是children中节点的唯一标识



### 15.keep-alive了解吗

`keep-alive`可以实现组件缓存，当组件切换时不会对当前组件进行卸载

- 常用的两个属性include/exclude，允许组件有条件的进行缓存
- 两个生命周期`activated/deactivated`，用来得知当前组件是否处于活跃状态
- keep-alive的中还运用了`LRU(Least Recently Used)`算法



### 16.Vue中组件生命周期调用顺序说一下

组件的调用顺序都是`先父后子`,渲染完成的顺序是`先子后父`

组件的销毁操作是`先父后子`，销毁完成的顺序是`先子后父`

- 加载渲染过程

  ```
  父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount- >子mounted->父mounted
  ```

- 子组件更新过程

  ```
  父beforeUpdate->子beforeUpdate->子updated->父updated
  ```

- 父组件更新过程

  ```
  父 beforeUpdate -> 父 updated
  ```

- 销毁过程

  ```
  父beforeDestroy->子beforeDestroy->子destroyed->父destroyed
  ```



### 17.Vue2.x组件通信有哪些方式？

父子组件通信

- 父->子`props`，子->父 `$on、$emit`
- 获取父子组件实例 `$parent、$children`
- `Ref` 获取实例的方式调用组件的属性或者方法
- `Provide、inject` 官方不推荐使用，但是写组件库时很常用

兄弟组件通信

- Event Bus 实现跨组件通信 `Vue.prototype.$bus = new Vue`
- Vuex

跨级组件通信

- Vuex
- $attrs、$listeners
- Provide、inject



### 18.SSR了解吗？

SSR也就是服务端渲染，`也就是将Vue在客户端把标签渲染成HTML的工作放在服务端完成，然后再把html直接返回给客户端`

优点

- SSR有着更好的SEO、并且首屏加载速度更快等

缺点

- 开发条件会受到限制，服务器端渲染只支持`beforeCreate`和`created`两个钩子
- 当我们需要一些外部扩展库时需要特殊处理，服务端渲染应用程序也需要处于Node.js的运行环境
- 还有就是服务器会有更大的负载需求



### 19.你都做过哪些Vue的性能优化？

**编码阶段**

- 尽量减少data中的数据，data中的数据都会增加getter和setter，会收集对应的watcher
- v-if和v-for不能连用
- 如果需要使用v-for给每项元素绑定事件时使用事件代理
- SPA 页面采用keep-alive缓存组件
- 在更多的情况下，使用v-if替代v-show
- key保证唯一
- 使用路由懒加载、异步组件
- 防抖、节流
- 第三方模块按需导入
- 长列表滚动到可视区域动态加载
- 图片懒加载

**SEO优化**

- 预渲染
- 服务端渲染SSR

**打包优化**

- 压缩代码
- Tree Shaking/Scope Hoisting
- 使用cdn加载第三方模块
- 多线程打包happypack
- splitChunks抽离公共文件
- sourceMap优化

**用户体验**

- 骨架屏
- PWA



### 20.hash路由和history路由实现原理说一下

`location.hash`的值实际就是URL中`#`后面的东西

history实际采用了HTML5中提供的API来实现，主要有`history.pushState()`和`history.replaceState()`