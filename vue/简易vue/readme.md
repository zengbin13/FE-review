> https://juejin.im/post/6857669921166491662
> https://juejin.im/post/6844903710129127431
> https://www.jianshu.com/p/0d8a9a238dd6
> https://www.cnblogs.com/init00/p/12653738.html
> https://www.jianshu.com/p/945b914820a5
> https://www.cnblogs.com/10manongit/p/12742201.html



## 一、双向绑定

Vue 实现数据双向绑定的方式：**数据劫持** 和 **发布订阅者模式**

- 通过 **`Object.definerProperty()`**劫持 data 中属性的 `getter` 、`setter`
- 数据变动时，发布消息给订阅者触发相应的监听回调

功能实现：

- **Observer**
  - 通过 Object.definePropty 进行数据劫持
- **Dep 发布订阅者**
  - 添加观察者以及在数据改变时通知观察者
- **Watcher 观察者**
  - 能够订阅每个属性变动通知
  - 执行指令绑定相应回调函数，从而更新视图
  - 作为连接 Observer 和 Compile 的桥梁
- **Compiler 模板编译器**
  - 对 HTML 模板进行编译，提取其中的变量并转化为数据
  - 主要对元素节点的 **指令** 和 **文本节点中 Mustache 语法**进行编译
- **入口函数**

![image-20201113175527805](C:\Users\Administrator\Desktop\zengBin\vue\简易vue\readme.assets\image-20201113175527805.png)

```js
class Vue {
  constructor(options) {
    this.$data = options.data;
    this.$el = options.el;
    if (this.$el) {
      // 劫持$data
      new Observer(this.$data);
      // 将数据或方法代理到实例上 如vm.message
      this.proxyData(this.$data);
      this.proxyData(this.$methods);
      // 使用数据和元素进行编译
      new Compile(this.$el, this);
    }
  }
  //代理数据的方法
  proxyData(data) {
    Object.keys(data).forEach(key => {
      Object.defineProperty(this, key, {
        get() {
          return data[key];
        },
        set(newValue) {
          data[key] = newValue;
        },
      });
    });
  }
}
```


```js
class Compile {
  constructor(el, vm) {
    this.el = el.nodeType === 1 ? el : document.querySelector(el);
    this.vm = vm;
    //根元素存在 才开始编译
    if (this.el) {
      // 1.将真实的DOM移入内存 转换为文档碎片
      let fragment = this.vNodeFragment(this.el);
      // 2.将模板中指令的变量和{{}}中变量替换为真实数据
      this.compile(fragment);
    }
  }
  vNodeFragment(el) {
    let fragment = document.createDocumentFragment();
    let firstChild;
    // 遍历当前所有的DOM子节点
    while ((firstChild = el.firstChild)) {
      fragment.appendChild(firstChild);
    }
    return fragment;
  }
  compile(fragment) {
    let childNodes = fragment.childNodes;
    Array.from(childNodes).forEach(node => {
      if (node.nodeType === 1) {
        // 元素节点
        this.compile(node); //递归遍历
        this.complieElement(node); //编译元素节点
      } else {
        //文本节点
        this.complieText(node); //编译文本
      }
    });
  }
  complieElement(node) {
    let attrs = node.attributes;
    Array.from(attrs).forEach(attr => {
      let attrName = attr.name;
      if (attrName.inculdes('v-')) {
        // v-
        let value = attr.value;
        let [, type] = attrName.split('-');
        // 处理指令
        CompileUtil[type](node, this.vm, value);
      } else if (attrName.inculdes('@')) {
        //@
        let event = attrName.slice(1);
        let methd = attr.value;
        // 处理事件
        CompileUtil.addEvent(node, event, value, this.vm);
      }
    });
  }
  complieText(node) {
    let content = node.textContent;
    let reg = /\{\{(.+?)\}\}/g; // 匹配模板编译器的内容
    if (reg.test(content)) {
      //处理Mustache语法
      CompileUtil.text(node, this.vm, content);
    }
  }
}
```

```js
CompileUtil = {
  //辅助函数

  //更新Dom节点的方法
  updater: {
    textUpdater(node, value) {
      node.textContent = value;
    },
    modelUpdater(node, value) {
      node.value = value;
    },
  },
  //获取{{}}中变量
  getTextValue(vm, variable) {
    let reg = /\{\{([^}]+)\}\}/g;
    return variable.replace(reg, ($0, $1) => {
      // 通过属性名，调用getValue方法，获取属性值
      return this.getValue(vm, $1);
    });
  },
  //获取属性值
  getValue(vm, variable) {
    let varibale = variable.split('.')
    return variable.reduce((prev, next) => prev(next), vm.$data)
  },


  //处理文本节点 {{}}
  text(node, vm, variable) {
    //获取赋值的方法
    let updateFn = this.updater.textUpdater;
    //获取data中对应变量的值
    let value = this.getTextValue(vm, variable);

    //通过正则匹配变量，给变量添加观察者
    let reg = /\{\{(.+?)\}\}/g;
    variable.replace(reg, ($0, $1) => {
      //当解析模板遇到变量时 应该使用观察者监听该变量
      new Watcher(vm, $1, newValue => {
        //观察者的回调函数 当数据改变就触发该回调
        updateFn && updateFn(node, newValue)
      })
    })
    // 第一次设置值
    updateFn && updateFn(node, value)
  },
  //处理元素节点上指令
  //v-model

  //处理元素节点上事件
  addEvent(node, event, value, vm) {
    node.removeAttribute('@' + event)
    node.addEventListener(event, (...args) => {
      vm[method].apply(vm, args)
    })
  }

};
```

```js
class Watcher {
  constructor(vm, varibale, cllback) {
    this.vm = vm
    this.variable = variable
    this.callback = callback

    //更改前的值
    this.value = this.get()
  }
  get() {
    //将当前的watcher添加到Dep类的静态属性上
    Dep.target = this
    // 获取值触发数据劫持
    let value = CompileUtil.getValue(this.vm, this.variable)
    //清空Dep上Watcher 防止重复添加
    Dep.target = null
    return value
  }
  update() {
    // 获取新值
    let newValue = CompileUtil.getValue(this.vm, this.variable)
    let oldValue = this.value
	// watcher比较新旧值变化,执行回调,把新值重新赋给节点
    if(oldValue !== newValue) {
      this.callBack(newValue)
    }
  }
}
```
```js
class Dep {
  constructor() {
    this.subs = []
  }
  //添加订阅
  addSub(watcher) {
    this.subs.push(watcher)
  }
  //通知
  notify() {
    this.subs.forEach(watcher => watcher.update())
  }
}
```
```js
class Observer {
  constructor(data) {
    this.observe(data)
  }
  //添加数据监听
  observe(data) {
    if(!data || typeof data !== 'object') {
      return 
    }
    Object.keys(data).forEach(key => {
      //劫持 实现数据响应式
      this.defineReactive(data, key, data[key])
      this.observe(data[key]) //深度劫持
    })
  }
  //数据响应式
  defineReactive(data, key, value) {
    let _this = this
    let dep = new Dep()

    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      //get监听到属性数据, 增加监听者watcher（每个数据有自己的监听者）
      //set检测到数据变化时，会通知dep（dep.notify）,dep通知对应的watcher去更新
      get() {
        Dep.target && dep.addSub(Dep.target)
        return value
      }
      set(newValue) {
        if(newValue !== value) {
          _this.observe(newValue) // 重新赋值如果是对象进行深度劫持
          vaue = newValue
          dep.notify() //通知所有人更新
        }
      }
    })
  }
}
```



## 二、图解 Vue 响应式原理          

### Vue初始化

```vue
<template>
  <div>
    {{ message }}
  </div>
</template>
<script>
new Vue({
  data() {
    return {
      message: "hello world",
    };
  },
});
</script>
```

**执行 `new Vue()`时， 依次执行以下方法**

- **_init(options)**

- 源码的`src/core/instance/index.js`中  将Vue类传入各种初始化方法 其中 `initMixin(Vue)`
- Vue 初始化：合并配置，初始化生命周期，初始化事件中心，初始化渲染，初始化 `data、props、computed、watcher` 等等

```js
// 1.Vue.prototype._init(options)

// merge options   合并options
 vm.$options = mergeOptions(
    resolveConstructorOptions(vm.constructor),
    options || {},
    vm
  )
// expose real self
vm._self = vm
initLifecycle(vm)//初始化生命周期
initEvents(vm)//初始化事件中心
initRender(vm)//初始化渲染

callHook(vm, 'beforeCreate')
initInjections(vm) // resolve injections before data/props

initState(vm) // 初始化state

initProvide(vm) // resolve provide after data/props
callHook(vm, 'created')
```

- **初始化state**

```js
// 2.initState(vm)

export function initState (vm: Component) {
  vm._watchers = []
  //如果定义了options，则始初化options,
  const opts = vm.$options
  if (opts.props) initProps(vm, opts.props) //如果有props，则初始化initProps
  if (opts.methods) initMethods(vm, opts.methods)//如果有methods，则初始化initMethods
  if (opts.data) {
    initData(vm)
  } else {
    observe(vm._data = {}, true /* asRootData */)
  }
  if (opts.computed) initComputed(vm, opts.computed)
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch)
  }
}
```

```js
//2.1 initData(vm)

function initData (vm: Component) {
  let data = vm.$options.data
  data = vm._data = typeof data === 'function'    //判断data类型是否是一个function，并赋值给vm._data
    ? getData(data, vm)
    : data || {}
  if (!isPlainObject(data)) {  //判断data是否是一个对象，如果不是，报一堆警告
    data = {}
    process.env.NODE_ENV !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    )
  }
  // 拿到对象的keys,props,methods
  const keys = Object.keys(data)
  const props = vm.$options.props
  const methods = vm.$options.methods
  let i = keys.length
  while (i--) {
    const key = keys[i]
    if (process.env.NODE_ENV !== 'production') {
      if (methods && hasOwn(methods, key)) {
        warn(
          `Method "${key}" has already been defined as a data property.`,
          vm
        )
      }
    }
    if (props && hasOwn(props, key)) {
      process.env.NODE_ENV !== 'production' && warn(
        `The data property "${key}" is already declared as a prop. ` +
        `Use prop default value instead.`,
        vm
      )
    } else if (!isReserved(key)) {
      proxy(vm, `_data`, key)
    }
  }
  // observe data
  observe(data, true /* asRootData */)
}
```

- **根据data创建观察者实例**

```js
// 3.observe(vm_data)

export function observe (value: any, asRootData: ?boolean): Observer | void {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  let ob: Observer | void
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value)
  }
  if (asRootData && ob) {
    ob.vmCount++
  }
  return ob
}
```

-  **观察者类**

```js
// 4.new Observer(data)
constructor (value: any) {
    this.value = value
    this.dep = new Dep()
    this.vmCount = 0
    def(value, '__ob__', this)
    if (Array.isArray(value)) {
      if (hasProto) {
        protoAugment(value, arrayMethods)
      } else {
        copyAugment(value, arrayMethods, arrayKeys)
      }
      this.observeArray(value)
    } else {
      this.walk(value)
    }
}
```

- **遍历属性**

```js
//5.调用walk方法 遍历data中每一个属性 监听数据的变化
walk (obj: Object) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i])
  }
}
```

- **监听数据变化**

```js
// 6. 执行 defineReactive 监听数据读取和设置
export function defineReactive (
  obj: Object,
  key: string,
  val: any,
  customSetter?: ?Function,
  shallow?: boolean
) {
  // 为每个属性创建 Dep（依赖搜集的容器）
  const dep = new Dep()

  const property = Object.getOwnPropertyDescriptor(obj, key)
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  const getter = property && property.get
  const setter = property && property.set
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key]
  }

  let childOb = !shallow && observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      const value = getter ? getter.call(obj) : val
      // 如果有 target 标识，则进行依赖搜集
      if (Dep.target) {
        dep.depend()
        if (childOb) {
          childOb.dep.depend()
          if (Array.isArray(value)) {
            dependArray(value)
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      const value = getter ? getter.call(obj) : val
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter()
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) return
      if (setter) {
        setter.call(obj, newVal)
      } else {
        val = newVal
      }
      // 修改数据时，通知页面重新渲染
      childOb = !shallow && observe(newVal)
      dep.notify()
    }
  })
}
```

![image-20201116110445690](C:\Users\Administrator\Desktop\zengBin\vue\简易vue\readme.assets\image-20201116110445690.png)



> Dep 对象用于依赖收集，实现一个发布订阅模式
>

```js
class Dep {
  // 根据 ts 类型提示，我们可以得出 Dep.target 是一个 Watcher 类型。
  static target: ?Watcher;
  // subs 存放搜集到的 Watcher 对象集合
  subs: Array<Watcher>;
  constructor() {
    this.subs = [];
  }
  addSub(sub: Watcher) {
    // 搜集所有使用到这个 data 的 Watcher 对象。
    this.subs.push(sub);
  }
  depend() {
    if (Dep.target) {
      // 搜集依赖，最终会调用上面的 addSub 方法
      Dep.target.addDep(this);
    }
  }
  notify() {
    const subs = this.subs.slice();
    for (let i = 0, l = subs.length; i < l; i++) {
      // 调用对应的 Watcher，更新视图
      subs[i].update();
    }
  }
}
```

![image-20201116110827572](C:\Users\Administrator\Desktop\zengBin\vue\简易vue\readme.assets\image-20201116110827572.png)

> 渲染视图 Watcher 实现了渲染方法 `_render` 和 Dep 的关联
>
>  初始化 Watcher 时，打上 Dep.target 标识，然后调用 get 方法进行页面渲染

```js
class Watcher {
  constructor(vm: Component, expOrFn: string | Function) {
    // 将 vm._render 方法赋值给 getter。
    // 这里的 expOrFn 其实就是 vm._render
    this.getter = expOrFn;
    this.value = this.get();
  }
  get() {
    // 给 Dep.target 赋值为当前 Watcher 对象
    Dep.target = this;
    // this.getter 其实就是 vm._render
    // vm._render 用来生成虚拟 dom、执行 dom-diff、更新真实 dom。
    const value = this.getter.call(this.vm, this.vm);
    return value;
  }
  addDep(dep: Dep) {
    // 将当前的 Watcher 添加到 Dep 收集池中
    dep.addSub(this);
  }
  update() {
    // 开启异步队列，批量更新 Watcher
    queueWatcher(this);
  }
  run() {
    // 和初始化一样，会调用 get 方法，更新视图
    const value = this.get();
  }
}

```

**整个流程**：

1. Vue 通过 `defineProperty` 完成了 Data 中所有数据的代理
2. 当数据触发 get 查询时，会将当前的 Watcher 对象加入到依赖收集池 Dep 中，
3. 当数据 Data 变化时，会触发 set 通知所有使用到这个 Data 的 Watcher 对象去 update 视图

![image-20201116111610597](C:\Users\Administrator\Desktop\zengBin\vue\简易vue\readme.assets\image-20201116111610597.png)

### 模板渲染

`new Vue` 执行到最后，会调用 mount 方法，将 Vue 实例渲染成 dom

```js
// new Vue 执行流程。
// 1. Vue.prototype._init(option)
// 2. vm.$mount(vm.$options.el)
// 3. render = compileToFunctions(template) ，编译 Vue 中的 template 模板，生成 render 方法。
// 4. Vue.prototype.$mount 调用上面的 render 方法挂载 dom。
// 5. mountComponent

// 6. 创建 Watcher 实例
const updateComponent = () => {
  vm._update(vm._render());
};
// 结合上文，我们就能得出，updateComponent 就是传入 Watcher 内部的 getter 方法。
new Watcher(vm, updateComponent);

// 7. new Watcher 会执行 Watcher.get 方法
// 8. Watcher.get 会执行 this.getter.call(vm, vm) ，也就是执行 updateComponent 方法
// 9. updateComponent 会执行 vm._update(vm._render())

// 10. 调用 vm._render 生成虚拟 dom
Vue.prototype._render = function (): VNode {
  const vm: Component = this;
  const { render } = vm.$options;
  let vnode = render.call(vm._renderProxy, vm.$createElement);
  return vnode;
};
// 11. 调用 vm._update(vnode) 渲染虚拟 dom
Vue.prototype._update = function (vnode: VNode) {
  const vm: Component = this;
  if (!prevVnode) {
    // 初次渲染
    vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false);
  } else {
    // 更新
    vm.$el = vm.__patch__(prevVnode, vnode);
  }
};
// 12. vm.__patch__ 方法就是做的 dom diff 比较，然后更新 dom，这里就不展开了。

```

![image-20201116112728830](C:\Users\Administrator\Desktop\zengBin\vue\简易vue\readme.assets\image-20201116112728830.png)