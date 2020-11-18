class Vue {
  constructor(options) {
    this._init(options);
  }
  _init(options) {
    this.$options = options;
    // 获取data数据, 没有默认为空对象
    this.$data = this.initData(this.$options) || {};
    // 获取method方法, 没有默认为空对象
    this.$methods = this.$options.methods || {};

    // 进行数据劫持
    new Observer(this.$data);

    // 对数据和方法进行代理
    this.proxyData(this.$data);
    this.proxyData(this.$methods);

    // 若具有el属性, 自动调用$mount方法 挂载到DOM节点上
    if (this.$options.el) {
      this.$mount(this.$options.el);
    }
  }

  // 将Vue实例挂载到DOM节点上
  $mount(el) {
    let $el;
    if (typeof el === 'string') {
      $el = document.querySelector(el);
    } else if (el.nodeType === 1) {
      $el = el;
    } else {
      throw new Error('el为选择器或者元素节点');
    }
    // 将DOM保存在$el属性上
    this.$el = $el;
    // 通过Compiler编译器进行编译
    new Compiler(this.$el, this);
    // 返回当前vm实例 确保外部能够拿到正确的实例
    return this;
  }

  // 初始化Vue实例的data
  initData(options) {
    // function调用函数获取对象
    const type = typeof options.data;
    return type === 'function' ? options.data() : options.data;
  }

  // 对data内的数据进行代理
  proxyData(data) {
    // 获取对象的所有属性组成的数组进行遍历
    Object.keys(data).forEach(key => {
      // 通过Object.defineProperty对数据进行处理
      // Object.defineProperty 直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象
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
