### 全局API

#### Vue.extend(options)

- 使用或继承Vue构造器**创建子类**
- `data`选项必须为函数

```js
let profile = Vue.extrend({
    template: `<p>{{firstName}}-{{lastName}}</p>`,
    data() {
        return {
            firstName: 'Walter',
            lastName: 'White'
        }
    }
})
// 创建 Profile 实例，并挂载到一个元素上
new Profile().$mount('#mount-point')
```



#### Vue.nextTick([callback, context])

- **在下次DOM更新循环结束后执行延时回调**
- 在修改数据后立即使用该方法，获取更新后DOM

```js
//修改数据
vm.message = 'vue'
//DOM还未更新
Vue.nextTick(function() {
    //DOM已更新
})
//或者作为promise
Vue.nextTick().then(
    function() {
        //DOM更新
    }
)
```



#### Vue.set(target, propertyName/index, value)

- 向响应对象中添加一个property，并确保该property为**响应式且触发视图更新**
- 响应对象不能为Vue实例或vue实例的根数据对象

```js
data() {
    return {
        userInfo: {
            nickname: "昵称",
        }
    }
}
//非响应式
this.userInfo.gender = 2
//响应式
Vue.set(this.userInfo, 'gender', 1)
```



#### Vue.delete(target, propertyName/index)

- 删除对象的属性，用于避免Vue不能检测到属性删除的限制
- 响应式数据删除确保能够触发视图更新



#### Vue.directive(id, [definition])

- 注册或获取**全局指令**

```js
//注册
Vue.directive('my-directive', {
    bind() {}, //调用一次，指令绑定在元素上时
    inserted() {}, //元素插入到父节点时
    update() {}, //组件VNode更新时
    componetUpdated() {}, //组件及其子VNode全部更新时
    unbind() {} //调用一次，指令在元素解绑时
})
//注册 指令函数
Vue.directive('my-directive', function() {
    // bind 和 update 调用
})
//getter 返回已注册指令
let myDirective = Vue.directive('my-directive')
```



#### Vue.filter(id, [definition])

- 注册或获取**全局过滤器**

```js
Vue.filter('my-filter', function(value) {
    //返回处理后的值
})
let myFilter = Vue.filter('my-filter')
```



#### Vue.componnet(id, [definition])

- 注册或获取**全局组件**， `id`值为组件名称

```js
//注册组件 扩展后的构造器
Vue.component('my-component', Vue.extend({...}))
//注册组件 选项对象 将自动调用构造器
Vue.component('my-component', {...})
//获取组件 将返回构造器
let MyComponent = Vue.component('my-component')
```



#### Vue.use(plugin)

- 安装Vue.js插件
  - 传入对象， 必须提供 `install`方法
  - 传入函数，直接作为`install`方法
- install方法调用时，将Vue作为参数传入
- 该方法需要在调用 `new Vue()` 之前被调用

```js
function MyPlugin(Vue, options) {
    //添加全局方法或属性
    Vue.myGlobalMethod = function() {}
    //添加全局资源
    VUe.directive(...)
  	//注入混入对象
  	Vue.mixin({})
    //添加实例方法或属性
    Vue.prototype.$myMethod = function() {}
} 
Vue.use(MyPlugin)
```



#### Vue.mixin(mixin) 

- 全局注册一个混入，影响注册之后所有创建的每个 Vue 实例



#### Vue.compile(template) ——未完成

- 将一个模板字符串编译成 render 函数
- **只在完整版时可用**



#### Vue.observale(object) ——未完成

- 让一个对象可响应



#### Vue.version

- 提供字符串形式的 Vue 安装版本号，可以根据不同的版本号采取不同的策略



### 选项 / 数据

#### data

- 组件的定义只接受 `function`
- Vue 实例的数据对象。Vue 将会递归将 data 的 property 转换为 getter/setter，从而让 data 的 property 能够响应数据变化
- 一旦观察过，无法在根数据对象上添加响应式 property
- 以 `_` 或 `$` 开头的 property **不会**被 Vue 实例代理
- `JSON.parse(JSON.stringify(...))` 得到深拷贝的原始数据对象



#### props

- props 可以是数组或对象，用于接收来自父组件的数据

  ```js
  props: ['size', 'myMessage']
  props: {
      age: {
          type: Number,
          default: 0,
          required: true,
          validator: function (value) {
          	return value >= 0
        }
      }
  }
  ```



#### propsData

- 只用于 `new` 创建的实例中
- 创建实例时传递 props。主要作用是方便测试

```js
let Comp = Vue.extend({
  props: ['msg'],
  template: '<div>{{ msg }}</div>'
})

let vm = new Comp({
  propsData: {
    msg: 'hello'
  }
})
```



#### computed

- 计算属性将被混入到 Vue 实例中。所有 getter 和 setter 的 this 上下文自动地绑定为 Vue 实例

- 计算属性使用箭头函数，可以将其实例作为函数的第一个参数来访问

  ```js
  computed: {
    aDouble: vm => vm.a * 2
  }
  ```

- 计算属性的结果会被缓存，除非依赖的响应式 property 变化才会重新计算



#### methods

- methods 将被混入到 Vue 实例中。可以直接通过 VM 实例访问这些方法，或者在指令表达式中使用
- 方法中的 this 自动绑定为 Vue 实例
- **不应该使用箭头函数来定义 method 函数** 



#### watch

- 一个对象，键是需要观察的表达式，值是对应回调函数
- Vue 实例将会在实例化时调用 `$watch()`，遍历 watch 对象的每一个 property