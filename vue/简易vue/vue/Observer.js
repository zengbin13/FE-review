// 劫持监听所有属性
class Observer {
  constructor(data) {
    // 调用observe方法
    this.observer(data);
  }
  observer(data) {
    //非对象
    if (!data || typeof data !== 'object') {
      return;
    }
    //获取data对象上的键值数组并对进行遍历
    Object.keys(data).forEach(key => {
      // 劫持 - 实现数据响应式
      this.defineReactive(data, key, data[key]);
      // 深度劫持
      this.observer(data[key]);
    });
  }
  // 数据响应式
  defineReactive(data, key, value) {
    const _this = this;
    // 每个变化的数据都对应一个数组，该数组存放所有更新操作
    let dep = new Dep();
    // 数据劫持
    Object.defineProperty(data, key, {
      enumerable: true, //可枚举的
      configurable: true, //可删除的
      // 取值
      get() {
        //订阅数据变化时，往dep添加观察者
        Dep.target && dep.addSub(Dep.target);
        return value;
      },
      set(newValue) {
        if (newValue !== value) {
          _this.observer(newValue); //重新赋值为对象时，深度劫持
          value = newValue;
          dep.notify(); //通知所有人数据更新
        }
      },
    });
  }
}

// Dep发布者 管理订阅者,并在某时刻通知全部订阅者更新 —— data中每个属性为发布者
class Dep {
  constructor() {
    this.subs = [];
  }
  // 添加订阅
  addSub(watcher) {
    this.subs.push(watcher);
  }
  // 通知
  notify() {
    this.subs.forEach(watcher => {
      watcher.update();
    });
  }
}

// Watcher订阅者 对数据进行观察以及保存数据修改需要触发的回调
class Watcher {
  constructor(vm, variable, callback) {
    // 保存vm实例
    this.vm = vm;
    // 保存需要修改的属性
    this.variable = variable;
    // 保存属性修改时需要触发的回调
    this.callback = callback;
    // 保存属性的初始值,并将当前订阅者添加到发布者上
    this.value = this.get();
  }
  get() {
    // 将当前的 watcher 添加到Dep发布者的静态属性上
    Dep.target = this;
    // 获取到当前的属性值
    let value = CompilerUtil.getValue(this.vm, this.variable);
    // 在Dep发布者的静态属性上清除当前 watcher
    Dep.target = null;
    return value;
  }
  update() {
    // 发生修改的时候，重新获取值
    let newValue = CompilerUtil.getValue(this.vm, this.variable);
    // 比较旧值
    let oldValue = this.value;
    if (newValue !== oldValue) {
      this.callback(newValue);
    }
  }
}
