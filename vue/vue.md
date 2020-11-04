## vue基础

### vue实例

- Vue实例被创建时，将 `data`对象所有属性加入到Vue**响应式系统**：数据改变时视图将重新渲染
- `Object.freeze()` 将会破坏响应式系统
- Vue实例被创建时的初始化过程：**设置数据监听**、 **编译模板**、 **将实例挂载在DOM上**、 **数据变化更新DOM**
- 不要在选项对象上 property 或回调上使用**箭头函数**



### 模板语法

- Vue使用基于HTML的**模板语法**，底层上Vue将模板编译成**虚拟DOM渲染函数**，并将DOM操作降到最少
-  `v-once` 指令，执行一次性地插值
- `v-html`指令， 将解析成原始HTML片段，谨慎使用防止XSS攻击
- 模板表达式只能访问如 `Math`和 `Date`的全局变量
- 使用**动态参数** `<a v-bind:[attributeName]="url"> ... </a>`



### 计算属性和侦听器

- 使用**计算属性**用于防止模板中出现复杂的逻辑

- `methods`能够实现`computed`的相同效果，但是 **计算属性是基于它们的响应式依赖进行缓存的**

  - 响应式依赖没有改变，计算属性不会重新执行
  - 如`Date.now()` 不是响应式依赖

- 计算属性的 `setter`，可以改变计算属性值

  ```js
  computed: {
  	fullName: {
          get() {
              return this.firstName + '' + this.lastName
          },
          set(newValue) {
              let names = newValue.split('')
              this.firstName = names[0]
              this.lastName = names[names.length - 1]
          }
      }
  }
  	...
  vm.fullName = 'John Doe'
  ```

  

- Vue 通过**侦听属性** `watch` 提供一个更通用的方法，来响应数据的变化

- 数据变化时**执行异步**或**开销较大**的操作时，使用 `watch`



### Class 与 Style 绑定

-  `v-bind` 用于 `class` 和 `style` 时，表达式结果类型可为`字符串、对象或数组`

- class 对象语法 `:class = {样式名: 布尔值}`

  ```html
  <div :class="{ active: isActive }"></div>
  //可绑定返回对象的计算属性
  ```

- class 数组语法 `:class = [值为样式名的变量]`

  ```html
  <div v-bind:class="[activeClass, errorClass]"></div>
  //可使用三元表达式动态切换样式
  <div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>
  ```

- class样式 用在自定义组件上时，将会添加到组件根元素并且不会覆盖已有class样式

- style 对象语法 `:style = {样式属性: 含有样式属性值的变量}`

  ```html
  <div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
  ```

- style 数组语法 `:style = [多个样式对象]`

  ```html
  div v-bind:style="[baseStyles, overridingStyles]"></div>
  ```

- `:style` 自动侦测并添加相应的**浏览器引擎前缀**，如 `transform`

- `:style` 多重值可渲染到最后一个浏览器支持的值

  ```html
  <div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
  ```

  

### 条件渲染

- 条件渲染多个元素，可在 `<template>`元素上使用 `v-if`
  - ``<template>`作为不可见包裹元素，不会保留在DOM中
- 多结果的条件渲染可使用 `v-else-if`
- 条件渲染中，使用 `key`管理可复用元素
  - 不使用 `key`将就地更新元素，不会销毁再重新创建
  - 绑定唯一 `key`值，将会重新创建渲染
- 使用`v-show` 的元素，只是简单切换 `display:none`，元素始终保留在DOM上
- `v-show` 不支持 `<template>` 元素，也不支持 `v-else`

| v-if                                       | v-show                           |
| ------------------------------------------ | -------------------------------- |
| 条件块的事件监听器和子组件适当的销毁和重建 | 只改变dislpay属性，仍保留在DOM中 |
| 惰性，初始条件为假不渲染                   | 初始条件假，仍渲染               |
| 更高切换开销                               | 更高初始渲染开销                 |

- 当 `v-if` 与 `v-for` 一起使用时，`v-for` 具有比 `v-if` 更高的优先级



### 列表渲染

- v-for 指令基于一个数组来渲染一个列表 `v-for = (item, index) in items`

  > for ... in 循环对**数组的元素或对象的属性**进行操作

- `v-for`使用对象， `v-for = (value, name, index) in object`

  > 在遍历对象时，会按 `Object.keys()` 的结果遍历