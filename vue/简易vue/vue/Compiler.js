// Compiler模板编译器
class Compiler {
  constructor(el, vm) {
    // 获得需要编译的DOM节点
    this.el = el.nodeType === 1 ? el : document.querySelector(el);
    // 获得当前实例
    this.vm = vm;
    // 若存在el, 则开始编译
    if (this.el) {
      // 将真实DOM转换为文档片段
      let fragment = this.vNodeFragment(this.el);
      // 调用compiler方法进行编译
      this.compile(fragment);
      // 编译完成后添加到真实DOM
      this.el.appendChild(fragment);
    }
  }
  // DOM文档片段
  vNodeFragment(el) {
    //创建文档片段
    //创建一个新的空白的文档片段,存在于内存中不会引起页面回流
    let fragment = document.createDocumentFragment();
    let firstChild;
    // 遍历当前所有DOM子节点
    while ((firstChild = el.firstChild)) {
      // 将真实DOM节点添加到文档片段中
      fragment.appendChild(firstChild);
    }
    // 返回虚拟文档片段
    return fragment;
  }
  // 进行编译
  compile(fragment) {
    // 获取文档片段的所有子节点
    let children = fragment.childNodes;
    // 转换为真实数组并进行遍历
    Array.prototype.slice.call(children).forEach(node => {
      if (node.nodeType === 1) {
        this.compile(node); //对元素节点递归编译
        this.compileElement(node); //编译元素节点
      } else {
        // 文本节点，编译文本
        this.complieText(node);
      }
    });
  }
  // 编译元素节点
  compileElement(node) {
    // 获取元素所有属性
    let attrs = node.attributes;
    Array.prototype.slice.call(attrs).forEach(attr => {
      // 获取当前属性名
      let attrName = attr.name;
      // 判断当前属性是否为指令或事件
      if (attrName.includes('v-')) {
        // 获取指令属性的值
        let value = attr.value;
        // 获取指令名
        let [, type] = attrName.split('-');
        // 对当前指令执行编译
        CompilerUtil[type](node, this.vm, value);
      } else if (attrName.includes('@')) {
        // 获取事件名
        let event = attrName.slice(1);
        // 获取触发事件方法名
        let method = attr.value;
        //
        CompilerUtil.addEvent(node, event, method, this.vm);
      }
    });
  }
  // 编辑文本节点
  complieText(node) {
    let content = node.textContent; // 获取文本节点的内容
    let reg = /\{\{(.+?)\}\}/g; // 匹配模板编译器的内容
    if (reg.test(content)) {
      //编译文本节点
      CompilerUtil.text(node, this.vm, content);
    }
  }
}

// 模板编译工具对象
const CompilerUtil = {
  // 获取vm实例中对应的值
  getValue(vm, variable) {
    // 获取对象的属性
    variable = variable.split('.');
    // 通过reduce方法递归遍历vm.$data, 拿到最终在vm实例中的属性值
    return variable.reduce((prev, next) => prev[next], vm.$data);
  },
  // 添加事件
  addEvent(node, event, method, vm) {
    node.removeAttribute('@' + event);
    node.addEventListener(event, (...args) => {
      // 调用vm上的方法，并传入参数
      // vm[method].apply(vm, args);
    });
  },
  // 编译文本节点
  text(node, vm, variable) {
    // 文本节点的修改函数
    let updateFn = this.textUpdater;
    // 获取文本节点变量的值
    let value = this.getTextValue(vm, variable);
    // 定义正则
    let reg = /\{\{(.+?)\}\}/g;
    //通过正则匹配变量， 给变量添加观察者
    variable.replace(reg, ($0, $1) => {
      // 当解析模板遇到变量时, 使用观察者和监听该变量
      new Watcher(vm, $1, newValue => {
        //观察者回调函数，当数据发生改变时触发该回调
        updateFn && updateFn(node, newValue);
      });
    });
    //第一次设置值
    updateFn && updateFn(node, value);
  },
  // 文本编译的回调函数
  textUpdater(node, value) {
    node.textContent = value;
  },
  // input编译的回调函数
  modelUpdater(node, value) {
    node.value = value;
  },
  getTextValue(vm, variable) {
    // 通过正则匹配获得属性名
    let reg = /\{\{([^}]+)\}\}/g;
    return variable.replace(reg, ($0, $1) => {
      // 通过属性名，调用getValue获得属性值

      return this.getValue(vm, $1);
    });
  },
  // 获取vm实例对应的值
  getValue(vm, variable) {
    variable = variable.split('.');
    //通过reduce方法递归vm.$data 获取属性值
    return variable.reduce((prev, next) => prev[next], vm.$data);
  },
  //设置value
  setValue(vm, variable, newValue) {
    variable = variable.split('.');
    return variable.reduce((prev, next, index) => {
      if (index === variable.length - 1) {
        // 给当前属性设置值
        return (prev[next] = newValue);
      }
      return prev[next];
    }, vm.$data);
  },
  // 双向数据绑定
  model(node, vm, variable) {
    // 获取双向数据绑定修改的方法
    let updateFn = this.modelUpdater;
    // 获取对应的值
    let value = this.getValue(vm, variable);
    // 添加订阅者
    new Watcher(vm, variable, newValue => {
      // 数据修改时，触发当前回调修改元素节点的值
      updateFn && updateFn(node, newValue);
    });
    //将V-model属性从DOM节点上删除
    node.removeAttribute('v-model');
    //给当前元素节点添加input事件
    node.addEventListener('input', e => {
      let value = e.target.value;
      //更新到节点
      this.setValue(vm, variable, value);
    });
    // 初次渲染时 设置一次
    updateFn && updateFn(node, value);
  },
};
